import Player from '../Player'

export default class HealthBar extends Phaser.GameObjects.Graphics {
  private value: number
  private percentage: number
  private player: Player

  constructor(scene: Phaser.Scene, player: Player) {
    super(scene)

    this.player = player

    this.x = player.displayWidth / -4
    this.y = player.displayHeight / 4 + 3

    this.value = player.displayWidth
    this.percentage = (this.player.displayWidth - 4) / this.value

    this.draw()

    scene.add.existing(this)
  }

  private draw(): void {
    this.clear()

    //  BG
    this.fillStyle(0x00_00_00)
    this.fillRect(this.x, this.y, this.value, 14)

    //  Health
    this.fillStyle(0xff_ff_ff)
    this.fillRect(this.x + 2, this.y + 2, this.value - 4, 10)

    if (this.value < 30) {
      this.fillStyle(0xff_00_00)
    } else {
      this.fillStyle(0x04_cd_00)
    }

    const d = Math.floor(this.percentage * this.value)

    this.fillRect(this.x + 2, this.y + 2, d, 10)
  }

  public decrease(amount: number): void {
    //const percent = Math.max(0, Math.min(1, amount))

    this.percentage -= amount

    if (this.value < 0) {
      this.value = 0
    }

    this.draw()
  }

  update() {}
}
