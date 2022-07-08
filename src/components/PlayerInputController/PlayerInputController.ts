import Phaser from 'phaser'
import VirtualJoystick from 'phaser3-rex-plugins/plugins/virtualjoystick'
import Player from '../Player'
import type { ControlsType, JoyStickCursors } from '../../types'

export default class PlayerInputController {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private controls!: ControlsType

  private joyStick!: VirtualJoystick
  private joyCursors!: JoyStickCursors

  private player!: Player

  constructor(scene: Phaser.Scene, player: Player) {
    this.player = player
    this.cursors = scene.input.keyboard.createCursorKeys()
    this.controls = scene.input.keyboard.addKeys('W,A,S,D') as ControlsType
  }

  private movement() {
    this.player.stateController.setState('idle')

    if (
      this.cursors.left.isDown ||
      this.controls.A.isDown ||
      this.joyCursors?.left.isDown
    ) {
      this.player.stateController.setState('moveLeft')
    } else if (
      this.cursors.right.isDown ||
      this.controls.D.isDown ||
      this.joyCursors?.right.isDown
    ) {
      this.player.stateController.setState('moveRight')
    }

    if (
      this.cursors.up.isDown ||
      this.controls.W.isDown ||
      this.joyCursors?.up.isDown
    ) {
      this.player.stateController.setState('moveUp')
    } else if (
      this.cursors.down.isDown ||
      this.controls.S.isDown ||
      this.joyCursors?.down.isDown
    ) {
      this.player.stateController.setState('moveDown')
    }

    this.player.body.velocity.normalize().scale(this.player.getSpeed)
  }

  public addJoystick(scene: Phaser.Scene) {
    this.joyStick = new VirtualJoystick(scene, {
      radius: 70,
      base: scene.add.image(0, 0, 'joystick-base'),
      thumb: scene.add.image(0, 0, 'joystick-thumb'),
      dir: '8dir',
    })
    this.joyStick.visible = false
    this.joyCursors = this.joyStick.createCursorKeys()

    scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      this.joyStick.setPosition(pointer.x, pointer.y)
      this.joyStick.visible = true
    })

    scene.input.on('pointerup', () => {
      this.joyStick.visible = false
    })
  }

  public update() {
    this.movement()
  }
}
