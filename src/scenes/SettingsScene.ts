import Phaser from 'phaser'
import Anchor from 'phaser3-rex-plugins/plugins/anchor'
import constants from '../config/constants'
import SettingsForm from '../components/SettingsForm/SettingsForm'
import type { ControlsType } from '../types'

export default class SettingsScene extends Phaser.Scene {
  private controls!: ControlsType
  private background!: Phaser.GameObjects.TileSprite
  private settingsForm!: SettingsForm

  constructor() {
    super(constants.SCENES.SETTINGS)
  }

  public init(): void {
    this.controls = this.input.keyboard.addKeys({
      esc: Phaser.Input.Keyboard.KeyCodes.ESC,
    }) as ControlsType
  }

  public create(): void {
    this.sound.play('elevator-music', { volume: 0.2, loop: true })
    this.addBackground()
    this.addVersion()
    this.addAuthor()
    this.addSettingsForm()
    this.addEvents()
  }

  private addEvents(): void {
    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.sound.stopByKey('elevator-music')
    })
  }

  private addBackground(): void {
    const { width, height } = this.sys.game.canvas

    this.background = this.add
      .tileSprite(0, 0, width, height, 'background-4')
      .setOrigin(0, 0)
      .setTileScale(0.8, 0.8)

    this.add.rectangle(0, 0, width, height, 0x12_49_be, 0.5).setOrigin(0, 0)
  }

  private animateBackground(): void {
    this.background.tilePositionX -= 0.5
    this.background.tilePositionY -= 0.5
  }

  private addVersion(): void {
    const version = this.add.text(0, 0, `v${this.game.config.gameVersion}`, {
      fontFamily: constants.FONT.FAMILY,
      fontSize: '24px',
      color: '#ffffff',
      align: 'center',
      stroke: '#000000',
      strokeThickness: 2,
    })
    version.setOrigin(0.5)

    new Anchor(version, {
      left: 'left+20',
      bottom: 'bottom-20',
    })
  }

  private addAuthor(): void {
    const version = this.add.text(0, 0, constants.AUTHOR, {
      fontFamily: constants.FONT.FAMILY,
      fontSize: '24px',
      color: '#ffffff',
      align: 'center',
      stroke: '#000000',
      strokeThickness: 2,
    })
    version.setOrigin(0.5)

    new Anchor(version, {
      right: 'right-20',
      bottom: 'bottom-20',
    })
  }

  private addSettingsForm(): void {
    this.settingsForm = new SettingsForm(this, 0, 0)
  }

  public update(): void {
    if (this.controls.esc.isDown) {
      this.scene.start(constants.SCENES.MAIN_MENU)
    }

    this.animateBackground()
  }
}
