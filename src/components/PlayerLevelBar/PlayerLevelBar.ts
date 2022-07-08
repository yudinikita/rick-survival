import Phaser from 'phaser'
import Anchor from 'phaser3-rex-plugins/plugins/anchor'
import constants from '../../config/constants'

export default class PlayerLevelBar extends Phaser.GameObjects.Container {
  private shadow!: Phaser.GameObjects.Image
  private progress!: Phaser.GameObjects.TileSprite
  private holder!: Phaser.GameObjects.Image
  private levelBackground!: Phaser.GameObjects.Image

  private level!: Phaser.GameObjects.Text

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y)

    this.addShadow()
    this.addProgress()
    this.addHolder()
    this.addLevelBackground()
    this.addLevelText()

    this.scene.add.existing(this)
  }

  private addShadow(): void {
    this.shadow = this.scene.add.image(0, 0, 'ui-player-level', 'shadow')

    new Anchor(this.shadow, {
      left: 'left-183',
    })

    this.add(this.shadow)
  }

  private addProgress(): void {
    this.progress = this.scene.add
      .tileSprite(0, 0, 0, 0, 'ui-player-level', 'progress')
      .setOrigin(0, 0.5)

    new Anchor(this.progress, {
      left: 'left-183',
    })

    this.progress.width = 326
    this.fill(0, 0)

    this.add(this.progress)
  }

  private addHolder(): void {
    this.holder = this.scene.add.image(0, 0, 'ui-player-level', 'holder')

    this.add(this.holder)
  }

  private addLevelBackground(): void {
    this.levelBackground = this.scene.add.image(
      0,
      0,
      'ui-player-level',
      'level'
    )

    new Anchor(this.levelBackground, {
      left: 'left-230',
      top: 'top-50',
    })

    this.add(this.levelBackground)
  }

  private addLevelText() {
    this.level = this.scene.add.text(0, 0, '1', {
      fontFamily: constants.FONT.FAMILY,
      fontSize: '24px',
      color: '#fff',
      align: 'center',
      fixedWidth: 32,
    })

    new Anchor(this.level, {
      left: 'left-206',
      top: 'top-23',
    })

    this.add(this.level)
  }

  public fill(fill: number, duration = 1500): void {
    const percent = Math.max(0, Math.min(1, fill))
    const progressMaxWidth = 362

    this.scene.tweens.add({
      targets: this.progress,
      tilePositionX: progressMaxWidth * Math.abs(percent) * -1,
      duration: duration * 2,
      ease: Phaser.Math.Easing.Sine.Out,
    })

    this.scene.tweens.add({
      targets: this.progress,
      width: progressMaxWidth * percent,
      duration,
      ease: Phaser.Math.Easing.Sine.Out,
    })
  }

  public updateLevel(newLevel: string) {
    this.level.setText(newLevel)
  }
}
