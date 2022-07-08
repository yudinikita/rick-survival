import Phaser from 'phaser'
import constants from '../../config/constants'

export default class PreloadProgressBar {
  private progressBox: Phaser.GameObjects.Graphics
  private progressBar: Phaser.GameObjects.Graphics

  private centerX: number
  private centerY: number

  progressWidth = 320
  progressHeight = 40
  progressPadding = 10

  constructor(scene: Phaser.Scene) {
    this.centerX = constants.WIDTH / 2 - this.progressWidth / 2
    this.centerY = constants.HEIGHT / 2 - this.progressHeight / 2

    this.progressBox = scene.add.graphics()
    this.progressBar = scene.add.graphics()

    this.progressBox.fillStyle(0x2a_2b_2f, 0.8)
    this.progressBox.fillRoundedRect(
      this.centerX,
      this.centerY,
      this.progressWidth,
      this.progressHeight,
      10
    )
  }

  fill(value: number) {
    this.progressBar.clear()
    this.progressBar.fillStyle(0x16_b0_c8, 1)
    this.progressBar.fillRoundedRect(
      this.centerX + this.progressPadding,
      this.centerY + this.progressPadding,
      (this.progressWidth - this.progressPadding * 2) * value,
      20,
      5
    )
  }

  destroy() {
    if (this.progressBar && this.progressBox) {
      this.progressBar.destroy()
      this.progressBox.destroy()
    }
  }
}
