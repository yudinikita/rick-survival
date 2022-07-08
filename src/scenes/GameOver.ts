import Phaser from 'phaser'
import { Buttons } from 'phaser3-rex-plugins/templates/ui/ui-components.js'
import constants from '../config/constants'
import { selectButton, unselectButton } from '../utils/selectButton'
import type { ControlsType } from '../types'

export default class GameOver extends Phaser.Scene {
  private controls!: ControlsType
  private buttonSelector!: Phaser.GameObjects.Image

  private gameOverLabel!: Phaser.GameObjects.Text

  constructor() {
    super({
      key: constants.SCENES.GAME_OVER,
    })
  }

  init() {
    this.controls = this.input.keyboard.addKeys({
      esc: Phaser.Input.Keyboard.KeyCodes.ESC,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
      enter: Phaser.Input.Keyboard.KeyCodes.ENTER,
    }) as ControlsType
  }

  create() {
    this.sound.play('player-gameover', { volume: 0.1 })

    this.buttonSelector = this.add.image(0, 0, 'cursor-hand').setVisible(false)

    const background_0 = this.add
      .rectangle(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        this.cameras.main.width,
        this.cameras.main.height,
        0xff_ff_ff
      )
      .setAlpha(0)

    const background_1 = this.add
      .image(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        'background-1'
      )
      .setOrigin(0.5, 0.5)
      .setAlpha(0)

    const scaleX = this.cameras.main.width / background_1.width
    const scaleY = this.cameras.main.height / background_1.height

    const scale = Math.max(scaleX, scaleY)
    background_1.setScale(scale).setScrollFactor(0)

    const background_2 = this.add
      .image(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        'background-2'
      )
      .setOrigin(0.5, 0.5)
      .setAlpha(0)

    const scaleX_2 = this.cameras.main.width / background_2.width
    const scaleY_2 = this.cameras.main.height / background_2.height

    const scale_2 = Math.max(scaleX_2, scaleY_2)
    background_2.setScale(scale_2).setScrollFactor(0)

    this.gameOverLabel = this.add
      .text(constants.WIDTH / 2, 150, 'Игра закончена', {
        fontSize: '74px',
        fontFamily: constants.FONT.FAMILY,
        color: '#ffc804',
      })
      .setOrigin(0.5, 0.5)
      .setStroke('#000', 10)
      .setShadow(2, 2, '#bc0001', 0, true, false)
      .setAlpha(0)

    const nextButtonImage = this.add
      .image(constants.WIDTH / 2, constants.HEIGHT - 150, 'button-next')
      .setInteractive()
      .setAlpha(0)

    const nextButton = new Buttons(this, {
      buttons: [nextButtonImage],
    })

    nextButton.on('button.over', (button: Phaser.GameObjects.Image) => {
      selectButton(button, this.buttonSelector)
    })

    nextButton.on('button.out', (button: Phaser.GameObjects.Image) => {
      unselectButton(button, this.buttonSelector)
    })

    nextButton.on('button.click', this.nextScene, this)

    this.tweens.add({
      targets: background_0,
      delay: 0,
      duration: 2000,
      alpha: 0.4,
      ease: 'Linear',
    })

    this.tweens.add({
      targets: background_1,
      delay: 1000,
      duration: 1000,
      alpha: 1,
      ease: 'Sine.easeInOut',
    })

    this.tweens.add({
      targets: background_2,
      delay: 2500,
      duration: 1000,
      alpha: 1,
      ease: 'Sine.easeInOut',
    })

    this.tweens.add({
      targets: this.gameOverLabel,
      delay: 3500,
      duration: 500,
      alpha: 1,
      ease: 'Sine.easeInOut',
    })

    this.tweens.add({
      targets: nextButtonImage,
      delay: 4000,
      duration: 500,
      alpha: 1,
      ease: 'Sine.easeInOut',
    })
  }

  private nextScene() {
    this.events.emit(constants.EVENTS.GAME.EXIT)
  }

  update() {
    if (
      this.controls.esc.isDown ||
      this.controls.space.isDown ||
      this.controls.enter.isDown
    ) {
      this.nextScene()
    }
  }
}
