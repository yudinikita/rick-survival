import Phaser from 'phaser'
import constants from '../../config/constants'
import Actor from '../Actor'
import EnemyStateController from '../EnemyStateController/EnemyStateController'
import Player from '../Player'
import ItemController from '../ItemController/ItemController'
import Item from '../Item/Item'
import type { EnemyTypeSettings } from '../../config/enemyConstants'
import type { EnemyType } from '../../types/enemies'

export default class Enemy extends Actor {
  private target!: Player
  private stateController!: EnemyStateController
  private killed = false
  private readonly itemController: ItemController
  private bloods: Phaser.GameObjects.Sprite[] = []

  declare typeEnemy: EnemyType

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame)

    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)

    this.itemController = new ItemController(scene)

    this.addBloods()

    const scale = 0.6

    this.setScale(scale)

    const radius = 50
    this.setCircle(
      radius,
      -radius + (0.5 * (scale * this.width)) / this.scale,
      -radius + (0.5 * (scale * this.height)) / this.scale
    )
  }

  private addBloods(): void {
    this.createBlood(1)
    this.createBlood(2)
    this.createBlood(3)
    this.createBlood(4)
    this.createBlood(5)
  }

  private createBlood(index: number): void {
    const blood = this.scene.add
      .sprite(0, 0, 'anim-blood-' + index, '1_0')
      .setScale(1.5)
      .setVisible(false)

    blood.anims.create({
      key: 'dead',
      frames: this.scene.anims.generateFrameNames('anim-blood-' + index, {
        prefix: '1_',
        start: 0,
        end: 28,
      }),
      frameRate: 27,
      duration: 1000,
      repeat: 0,
    })

    this.bloods.push(blood)
  }

  public spawn(x: number, y: number): void {
    this.killed = false
    this.enableBody(true, x, y, true, true)
    this.setCurrentHitPoints = this.getMaximumHitPoints
    this.stateController = new EnemyStateController(this)

    this.scene.data.set('enemiesCount', this.scene.data.get('enemiesCount') + 1)
  }

  private showTakenDamage(value: number, enemy: Enemy): void {
    if (constants.ENEMY.SHOW_FLOAT_DAMAGE && value >= 1) {
      const valueText = value.toFixed(0)
      this.scene.floatingNumbers.createFloatingText({
        textOptions: {
          fontFamily: 'Ubuntu',
          fontSize: '34px',
          color: '#FF003D',
          strokeThickness: 2,
          stroke: '#000000',
        },
        align: 'top-center',
        animation: 'fade',
        animationEase: 'Sine.easeInOut',
        text: valueText,
        parentObject: enemy,
      })
    }
  }

  public takeDamage(value?: number): void {
    if (value && value > 0) {
      this.scene.events.emit(
        constants.EVENTS.ENEMY.TAKE_DAMAGE,
        value.toString(),
        this
      )
      this.scene.sound.play('enemy-hit', { volume: 0.1 })
      this.showTakenDamage(value, this)
      this.reduceHealth(value)
    }
  }

  private getDirectionFromAngle(radians: number) {
    const deg = Phaser.Math.RadToDeg(radians)

    if ((deg >= 0 && deg <= 45) || (deg <= 0 && deg >= -45)) {
      return 'right'
    } else if (deg > 45 && deg <= 135) {
      return 'up'
    } else if ((deg <= -135 && deg >= -180) || (deg > 135 && deg <= 180)) {
      return 'left'
    } else if (deg > -135 && deg < -45) {
      return 'down'
    } else {
      return 'idle'
    }
  }

  private movementAnimate(angleRadians: number): void {
    const direction = this.getDirectionFromAngle(angleRadians)

    this.stateController.setState('idle')

    if (direction === 'left') {
      this.stateController.setState('moveLeft')
    } else if (direction === 'right') {
      this.stateController.setState('moveRight')
    }

    if (direction === 'up') {
      this.stateController.setState('moveUp')
    } else if (direction === 'down') {
      this.stateController.setState('moveDown')
    }

    if (direction === 'idle') {
      this.stateController.setState('idle')
    }
  }

  private dropItem(item: Item) {
    const random = Math.random()
    if (random < constants.ENEMY.DROP_ITEM_RATE) {
      const place = new Phaser.Geom.Circle(
        this.x,
        this.y,
        this.getBody().width * 1.5
      )
      const randomPoint = place.getRandomPoint()

      item.setPosition(this.x, this.y)
      item.setScale(0)

      this.scene.add.tween({
        targets: item,
        scale: 1,
        x: randomPoint.x,
        y: randomPoint.y,
        ease: 'Sine.easeInOut',
        duration: 700,
      })

      this.scene.add.existing(item)
      this.scene.physics.add.existing(item)
    }
  }

  private checkDropItem(): void {
    const randomItem = this.getItemController.getRandom()
    if (randomItem) {
      this.dropItem(randomItem)
    }
  }

  private killEnemy(): void {
    this.killed = true
    this.stateController.setState('dead')
    this.checkDropItem()
    this.scene.events.emit(constants.EVENTS.UI.UPDATE_KILL_COUNT, this)

    this.scene.data.set('enemiesCount', this.scene.data.get('enemiesCount') - 1)
  }

  private moveToTarget(): void {
    this.movementAnimate(
      Phaser.Math.Angle.Between(this.target.x, this.target.y, this.x, this.y)
    )
    this.scene.physics.moveTo(this, this.target.x, this.target.y, this.getSpeed)
  }

  public preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta)

    if (!this.active || !this.visible || this.killed) {
      return
    }

    if (this.getCurrentHitPoints <= 0) {
      this.killEnemy()
      return
    }

    this.checkFlip()
    this.moveToTarget()
  }

  protected setupConfig(config: EnemyTypeSettings): void {
    this.typeEnemy = config.type
    this.setMaximumHitPoints = config.health
    this.setCurrentHitPoints = config.health
    this.setSpeed = config.speed
    this.setBodyDamage = config.bodyDamage
    this.setExperience = config.experience
    this.setBodyAttackTime = config.bodyAttackTime
    this.getItemController.setItems(config.items)
  }

  public set setTarget(target: Player) {
    this.target = target
  }

  public get getItemController(): ItemController {
    return this.itemController
  }

  public get getBloods(): Phaser.GameObjects.Sprite[] {
    return this.bloods
  }

  public get getKilled(): boolean {
    return this.killed
  }
}
