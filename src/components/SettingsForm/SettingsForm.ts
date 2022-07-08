import Anchor from 'phaser3-rex-plugins/plugins/anchor'
import Phaser from 'phaser'
import RoundRectangleCanvas from 'phaser3-rex-plugins/plugins/roundrectanglecanvas'
import { Buttons, Label } from 'phaser3-rex-plugins/templates/ui/ui-components'
import constants from '../../config/constants'

export default class SettingsForm extends Phaser.GameObjects.Container {
  private background!: RoundRectangleCanvas

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y)
    this.scene.add.existing(this)

    this.addBackground()
    this.addTitle()
    this.addButtons()
  }

  private addBackground(): void {
    this.background = new RoundRectangleCanvas(
      this.scene,
      0,
      0,
      700,
      700,
      {
        radius: 30,
      },
      0x0b_7f_db,
      0x23_97_f3,
      4
    ).setOrigin(0, 0)

    new Anchor(this.background, {
      centerX: 'center',
      centerY: 'center',
    })

    this.add(this.background)
  }

  private addTitle(): void {
    const title = this.scene.add.text(0, 0, 'Настройки', {
      fontFamily: constants.FONT.FAMILY,
      fontSize: '48px',
      color: '#ffffff',
      align: 'center',
      stroke: '#000000',
      strokeThickness: 6,
    })
    title.setOrigin(0, 0)

    new Anchor(title, {
      centerX: 'center',
      top: 'top+160',
    })

    this.add(title)
  }

  private addButtons(): void {
    const buttons = new Buttons(this.scene, {
      x: 0,
      y: 0,
      anchor: {
        centerX: 'center',
        centerY: 'top+300',
      },
      orientation: 'y',
      type: 'checkboxes',
      buttons: [this.createCheckbox('Музыка', 'music')],
      setValueCallback: (button, value) => {
        const label = button as Label
        const icon = label.getElement('icon') as Phaser.GameObjects.Rectangle
        icon.setFillStyle(value ? 0xff_c8_04 : undefined)
        if (!value) {
          this.scene.sound.stopAll()
        } else {
          this.scene.sound.play('elevator-music', {
            loop: true,
            volume: 0.1,
          })
        }
      },
      setValueCallbackScope: this,
    }).layout()

    this.add(buttons)
  }

  private createCheckbox(text: string, name: string): Label {
    if (name === undefined) {
      name = text
    }

    return new Label(this.scene, {
      x: 0,
      y: 0,
      orientation: 0,

      text: this.scene.add.text(0, 0, text, {
        fontFamily: constants.FONT.FAMILY,
        fontSize: '36px',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 4,
      }),

      icon: this.scene.add.circle(0, 0, 16).setStrokeStyle(4, 0x00_00_00),

      space: {
        left: 10,
        right: 10,
        icon: 20,
      },

      name: name,
    })
  }
}
