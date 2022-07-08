import Phaser from 'phaser'

export type ControlsType = { [key: string]: Phaser.Input.Keyboard.Key }

export type JoyStickCursors = {
  up: Phaser.Input.Keyboard.Key
  down: Phaser.Input.Keyboard.Key
  left: Phaser.Input.Keyboard.Key
  right: Phaser.Input.Keyboard.Key
}
