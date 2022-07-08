import Phaser from 'phaser'
import { Buttons } from 'phaser3-rex-plugins/templates/ui/ui-components'
import constants from '../config/constants'
import { selectButton, unselectButton } from '../utils/selectButton'
import type { ControlsType } from '../types'

export default class GamePause extends Phaser.Scene {
  private controls!: ControlsType

  private buttonSelector!: Phaser.GameObjects.Image

  constructor() {
    super({
      key: constants.SCENES.GAME_PAUSE,
    })
  }

  init() {
    this.controls = this.input.keyboard.addKeys({
      resume: Phaser.Input.Keyboard.KeyCodes.ESC,
    }) as ControlsType
  }

  create() {
    const background = this.add
      .rectangle(0, 0, constants.WIDTH, constants.HEIGHT, 0x00_00_00, 0.5)
      .setScrollFactor(0)
      .setScale(5)

    const tablet = this.add
      .image(constants.WIDTH / 2 - 15, constants.HEIGHT / 2, 'background-3')
      .setScale(0.6)

    const buttons = new Buttons(this, {
      x: constants.WIDTH / 2,
      y: constants.HEIGHT / 2 + 15,
      orientation: 'y',
      space: { item: 30 },
      buttons: [
        this.add.image(0, 0, 'ui-pause', 'back'),
        this.add.image(0, 0, 'ui-pause', 'settings'),
        this.add.image(0, 0, 'ui-pause', 'exit'),
      ],
      click: {
        mode: 'pointerup',
        clickInterval: 300,
      },
    }).layout()
    this.add.existing(buttons)

    this.buttonSelector = this.add.image(0, 0, 'cursor-hand').setVisible(false)

    buttons.on(
      'button.click',
      (button: Phaser.GameObjects.Image, index: number) => {
        this.sound.play('button', { volume: 0.2 })
        switch (index) {
          case 0:
            this.handleBack()
            break
          case 1:
            this.handleSettings()
            break
          case 2:
            this.handleExit()
            break
        }
      }
    )

    buttons.on('button.over', (button: Phaser.GameObjects.Image) => {
      selectButton(button, this.buttonSelector)
    })

    buttons.on('button.out', (button: Phaser.GameObjects.Image) => {
      unselectButton(button, this.buttonSelector)
    })
  }

  private handleBack() {
    this.events.emit('game.resume')
  }

  private handleSettings() {
    this.events.emit('game.resume')
  }

  private handleExit() {
    this.events.emit('game.exit')
  }

  update() {
    if (this.controls.resume.isDown) {
      this.handleBack()
    }
  }
}
