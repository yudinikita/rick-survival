import Phaser from 'phaser'
import constants from '../config/constants'
import Cheats from '../components/Cheats/Cheats'
import Player from '../components/Player'
import SceneCamera from '../components/SceneCamera'
import Bullet from '../components/Weapon/Bullet'
import Enemy from '../components/EnemyController/Enemy'
import WaveGenerator from '../components/Waves/WaveGenerator'
import EnemyGroup from '../components/EnemyController/EnemyGroup'
import WorldController from '../components/WorldController/WorldController'
import { WorldConfig } from '../config/worldsConfig'
import WavesController from '../components/WavesController/WavesController'
import type { ControlsType } from '../types'

export default class GameField extends Phaser.Scene {
  private controls!: ControlsType
  private cheats!: Cheats
  private player!: Player
  private sceneCamera!: SceneCamera
  private waveGenerator!: WaveGenerator
  private allEnemies!: EnemyGroup[]
  private gameTime!: number
  private world!: WorldConfig
  private worldController!: WorldController
  private wavesController!: WavesController

  constructor() {
    super(constants.SCENES.GAME_FIELD)
  }

  init(data: { world: WorldConfig }): void {
    this.world = data.world

    this.controls = this.input.keyboard.addKeys({
      pause: Phaser.Input.Keyboard.KeyCodes.ESC,
      w: Phaser.Input.Keyboard.KeyCodes.W,
      a: Phaser.Input.Keyboard.KeyCodes.A,
      s: Phaser.Input.Keyboard.KeyCodes.S,
      d: Phaser.Input.Keyboard.KeyCodes.D,
    }) as ControlsType
  }

  create() {
    this.physics.world.setBounds(
      0,
      0,
      constants.LEVEL.WIDTH * constants.LEVEL.TILE_SIZE,
      constants.LEVEL.HEIGHT * constants.LEVEL.TILE_SIZE
    )

    this.player = new Player(
      this,
      (constants.LEVEL.WIDTH * constants.LEVEL.TILE_SIZE) / 2,
      (constants.LEVEL.HEIGHT * constants.LEVEL.TILE_SIZE) / 2,
      constants.PLAYER.DEFAULT.TYPE,
      constants.PLAYER.DEFAULT.FRAME
    )

    this.cheats = new Cheats(this, this.player)
    this.cheats.enableCheat(constants.CHEATS)

    this.worldController = new WorldController(this, this.player)
    this.worldController.load(this.world.id)

    this.data.set('player', this.player)

    this.sceneCamera = new SceneCamera(this, this.player)
    this.sceneCamera.addMinimap()

    this.wavesController = new WavesController(this, this.player)
    const waves = this.wavesController.getWaves(this.world)
    this.allEnemies = this.wavesController.getAllEnemies

    this.physics.add.collider(
      this.player,
      this.allEnemies,
      (playerObject, enemyObject) => {
        const player = playerObject as Player
        const enemy = enemyObject as Enemy

        if (this.gameTime > enemy.getLastBodyDamage) {
          enemy.takeDamage(player.getBodyDamage)
          enemy.setLastBodyDamage = this.gameTime + player.getBodyAttackTime
        }

        if (this.gameTime > player.getLastBodyDamage) {
          player.setLastBodyDamage = this.gameTime + enemy.getBodyAttackTime
          player.takeDamage(enemy.getBodyDamage)
        }
      },
      undefined,
      this
    )

    this.physics.add.overlap(
      this.player.getWeapon.ammoGroup,
      this.allEnemies,
      (bulletObject, enemyObject) => {
        const bullet = bulletObject as Bullet
        const enemy = enemyObject as Enemy

        const summaryDamage = bullet.getDamage * this.player.getBulletDamage

        enemy.takeDamage(summaryDamage)
        this.player.getWeapon.ammoGroup.removeBullet(bullet)
      },
      undefined,
      this
    )

    this.waveGenerator = new WaveGenerator(this, waves)

    this.data.set('enemiesCount', 0)

    this.addSound()
    this.addEvents()
  }

  private addSound(): void {
    this.sound.play(this.world.music, {
      volume: 0.1,
      loop: true,
    })
  }

  private addEvents(): void {
    this.events.on(constants.EVENTS.UI.UPDATE_KILL_COUNT, (enemy: Enemy) => {
      this.player.addExperience(enemy.getExperience)
    })

    this.events.on(
      Phaser.Scenes.Events.SHUTDOWN,
      () => this.sound.stopByKey(this.world.music),
      this
    )

    this.events.on(
      Phaser.Scenes.Events.PAUSE,
      () => this.sound.stopByKey(this.world.music),
      this
    )

    this.events.on(
      Phaser.Scenes.Events.RESUME,
      () =>
        this.sound.play(this.world.music, {
          volume: 0.1,
          loop: true,
        }),
      this
    )

    this.events.on(
      'changedata-enemiesCount',
      (gameObject: Phaser.GameObjects.GameObject, value: number) => {
        console.log('Enemies:', value)
      }
    )
  }

  update(time: number, delta: number) {
    this.gameTime = time

    if (this.controls.pause.isDown) {
      this.events.emit(constants.EVENTS.GAME.PAUSE)
    }

    this.player.setClosestEnemy =
      (this.player.findClosestEnemy(this.allEnemies) as Enemy) || null

    this.player.update(time, delta)

    this.worldController.update()

    this.cheats.update()
  }
}
