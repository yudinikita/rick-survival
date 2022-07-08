import Phaser from 'phaser'
import Player from '../Player'
import type { WeaponConfig } from '../../config/weaponConstants'
import type { WeaponType } from '../../types/weapons'

export default class Bullet extends Phaser.Physics.Arcade.Sprite {
  protected speed!: number
  protected damage!: number
  protected weaponType!: WeaponType
  protected attackRate!: number
  protected ammoIndex!: number
  protected displayScale!: number

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame)

    this.speed = 0
    this.damage = 0

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.getBody().setCollideWorldBounds(false)
  }

  protected getBody(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body
  }

  public attack(): void {}

  protected fire(): void {
    const player = this.scene.data.get('player') as Player
    const target = player.getClosestEnemy
    const bulletSpeed = player.getBulletSpeed

    const checkAttack =
      target && player.getRadiusAttack.contains(target.x, target.y)

    if (checkAttack) {
      this.body.reset(player.x, player.y)

      this.setDepth(10)
      this.setScale(0)
      this.setActive(true)
      this.setVisible(true)

      const summarySpeed = bulletSpeed * this.getSpeed

      this.scene.tweens.add({
        targets: this,
        scale: this.getDisplayScale,
        duration: summarySpeed,
        repeat: 0,
      })

      this.rotation = Phaser.Math.Angle.BetweenPoints(player, target)

      this.scene.physics.moveTo(this, target.x, target.y, summarySpeed)

      this.scene.cameras.main.worldView.contains(this.x, this.y)
    }
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta)

    if (!this.scene.cameras.main.worldView.contains(this.x, this.y)) {
      this.setActive(false)
      this.setVisible(false)
    }
  }

  protected setupConfig(config: WeaponConfig): void {
    this.setAmmoIndex = config.ammoIndex
    this.setAttackRate = config.attackRate
    this.setDamage = config.damage
    this.setSpeed = config.speed
    this.setDisplayScale = config.display?.scale || 1

    const radius = config.display.radius

    this.setCircle(
      radius,
      -radius + (0.5 * this.width) / this.scale,
      -radius + (0.5 * this.height) / this.scale
    )
  }

  public set setDamage(damage: number) {
    this.damage = damage
  }

  public get getDamage(): number {
    return this.damage
  }

  public set setSpeed(speed: number) {
    this.speed = speed
  }

  public get getSpeed(): number {
    return this.speed
  }

  public get getWeaponType(): WeaponType {
    return this.weaponType
  }

  public set setWeaponType(type: WeaponType) {
    this.weaponType = type
  }

  public set setAttackRate(attackRate: number) {
    this.attackRate = attackRate
  }

  public get getAttackRate(): number {
    return this.attackRate
  }

  public set setAmmoIndex(ammoIndex: number) {
    this.ammoIndex = ammoIndex
  }

  public get getAmmoIndex(): number {
    return this.ammoIndex
  }

  public get getDisplayScale(): number {
    return this.displayScale
  }

  public set setDisplayScale(scale: number) {
    this.displayScale = scale
  }
}
