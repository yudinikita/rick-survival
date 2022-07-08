import Phaser from 'phaser'
import { Buttons } from 'phaser3-rex-plugins/templates/ui/ui-components'
import Anchor from 'phaser3-rex-plugins/plugins/anchor'
import constants from '../config/constants'
import { selectButton, unselectButton } from '../utils/selectButton'

export default class MainMenu extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private buttonSelector!: Phaser.GameObjects.Image
  private earth!: Phaser.GameObjects.Image

  constructor() {
    super(constants.SCENES.MAIN_MENU)
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  create() {
    this.addBackground()
    this.addEarth()
    this.addMoon()
    this.addSpaceRick()
    this.addStarsField()
    this.addLogo()
    this.addButtons()
    this.addBackgroundMusic()
    this.addEvents()
  }

  private handleStart(): void {
    this.scene.start(constants.SCENES.MAP_SELECT)
  }

  private handleShop(): void {
    this.scene.start(constants.SCENES.GAME_OVER)
  }

  private handleSettings(): void {
    this.scene.start(constants.SCENES.SETTINGS)
  }

  private addEvents(): void {
    this.events.on('shutdown', () => this.sound.stopByKey('main-theme'), this)
  }

  private addBackground(): void {
    const background = this.add.image(0, 0, 'background-7').setOrigin(0, 0)
    const scaleX = this.cameras.main.width / background.width
    const scaleY = this.cameras.main.height / background.height
    const scale = Math.max(scaleX, scaleY)
    background.setScale(scale).setScrollFactor(0)
  }

  private addEarth(): void {
    this.earth = this.add.image(0, 0, 'earth').setInteractive()
    this.input.setDraggable(this.earth)

    this.input.on(
      'drag',
      function (
        pointer: never,
        gameObject: Phaser.GameObjects.Image,
        dragX: number,
        dragY: number
      ) {
        gameObject.x = dragX
        gameObject.y = dragY
      }
    )

    new Anchor(this.earth, {
      centerX: 'center',
      centerY: 'bottom',
    })
  }

  private addSpaceRick(): void {
    const spaceRick = this.add.image(0, 0, 'space-rick').setScale(0.5)

    new Anchor(spaceRick, {
      centerX: 'left',
      centerY: 'bottom+300',
    })

    this.tweens.add({
      targets: spaceRick,
      x: this.cameras.main.width,
      duration: 50_000,
      yoyo: true,
      repeat: -1,
    })

    this.tweens.add({
      targets: spaceRick,
      y: -400,
      duration: 10_000,
      yoyo: true,
      repeat: -1,
    })

    this.tweens.add({
      targets: spaceRick,
      rotation: 180,
      duration: 1_000_000,
      yoyo: true,
      repeat: -1,
    })

    this.tweens.add({
      targets: spaceRick,
      scale: 0.2,
      duration: 10_000,
      yoyo: true,
      repeat: -1,
    })
  }

  private addStarsField(): void {
    const starsField = this.add.image(-300, -300, 'stars-field').setRotation(-1)

    this.tweens.add({
      targets: starsField,
      x: this.cameras.main.width + 300,
      duration: 2000,
      ease: 'Easy.easeInOut',
      delay: 2000,
      repeatDelay: 7000,
      repeat: -1,
    })

    this.tweens.add({
      targets: starsField,
      y: this.cameras.main.height + 300,
      duration: 2000,
      ease: 'Easy.easeInOut',
      delay: 2000,
      repeatDelay: 7000,
      repeat: -1,
    })
  }

  private addMoon(): void {
    const moon = this.add.image(0, 0, 'moon')

    new Anchor(moon, {
      centerX: 'right+300',
      centerY: 'bottom+300',
    })

    this.tweens.add({
      targets: moon,
      rotation: 180,
      duration: 500_000,
      yoyo: true,
      repeat: -1,
    })

    this.tweens.add({
      targets: moon,
      x: -this.cameras.main.width,
      duration: 100_000,
      yoyo: false,
      repeat: -1,
    })

    this.tweens.add({
      targets: moon,
      y: this.cameras.main.height / 2 - 300,
      duration: 30_000,
      yoyo: true,
      repeat: -1,
    })

    this.tweens.add({
      targets: moon,
      scale: 0.4,
      duration: 30_000,
      yoyo: true,
      repeat: -1,
    })
  }

  private animateBackground(): void {
    this.earth.rotation += 0.0009
  }

  private addLogo(): void {
    const logoRick = this.add.image(0, 0, 'logo-rick').setScale(0.8)
    const logoText = this.add.image(0, 0, 'logo-text').setScale(0.6)

    new Anchor(logoRick, {
      centerX: 'center',
      top: 'top+50',
    })

    new Anchor(logoText, {
      centerX: 'center',
      top: 'top+350',
    })
  }

  private addButtons(): void {
    const buttons = new Buttons(this, {
      x: 0,
      y: 0,
      anchor: {
        centerX: 'center',
        centerY: 'bottom-250',
      },
      orientation: 'y',
      space: { item: 30 },
      buttons: [
        this.add.image(0, 0, 'ui-main-menu', 'start'),
        this.add.image(0, 0, 'ui-main-menu', 'shop'),
        this.add.image(0, 0, 'ui-main-menu', 'settings'),
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
            this.handleStart()
            break
          case 1:
            this.handleShop()
            break
          case 2:
            this.handleSettings()
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

  private addBackgroundMusic(): void {
    this.sound.play('main-theme', {
      volume: 0.1,
      loop: true,
    })
  }

  update() {
    if (this.cursors.space.isDown) {
      this.handleStart()
    }

    this.animateBackground()
  }
}
