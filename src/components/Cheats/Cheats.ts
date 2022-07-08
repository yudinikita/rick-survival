import Phaser from 'phaser'
import Player from '../Player'
import type { ControlsType } from '../../types'

export default class Cheats {
  private scene: Phaser.Scene
  private player: Player
  private enable = false
  private controls!: ControlsType

  constructor(scene: Phaser.Scene, player: Player) {
    this.scene = scene
    this.player = player

    this.addControls()
  }

  private addControls(): void {
    this.controls = this.scene.input.keyboard.addKeys({
      e: Phaser.Input.Keyboard.KeyCodes.E,
      one: Phaser.Input.Keyboard.KeyCodes.NUMPAD_ONE,
      two: Phaser.Input.Keyboard.KeyCodes.NUMPAD_TWO,
      three: Phaser.Input.Keyboard.KeyCodes.NUMPAD_THREE,
    }) as ControlsType
  }

  public enableCheat(value: boolean): void {
    this.enable = value
  }

  update() {
    if (!this.enable) {
      return
    }

    if (this.controls.e.isDown) {
      this.player.addExperience(5)
    }

    if (this.controls.one.isDown) {
      this.player.setSpeed = 300
    }

    if (this.controls.two.isDown) {
      this.player.setMaximumHitPoints = 10_000
      this.player.setCurrentHitPoints = 10_000
    }

    if (this.controls.three.isDown) {
      this.player.setBulletDamage = 5000
    }
  }
}
