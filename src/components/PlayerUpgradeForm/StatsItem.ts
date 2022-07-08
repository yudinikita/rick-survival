import Anchor from 'phaser3-rex-plugins/plugins/anchor'
import RoundRectangleCanvas from 'phaser3-rex-plugins/plugins/roundrectanglecanvas'
import constants from '../../config/constants'
import type { PlayerSkillType } from '../PlayerLevelController'

export type StatsItemConfig = {
  title: string
  titleColor: string
  skillType: PlayerSkillType
  value: string
}

export default class StatsItem extends Phaser.GameObjects.Container {
  private background!: RoundRectangleCanvas
  private title!: Phaser.GameObjects.Text

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    config: StatsItemConfig
  ) {
    super(scene, x, y)
    this.scene.add.existing(this)

    this.addBackground()
    this.addTitle(config.title, config.titleColor)
    this.addIcon(config.skillType)
    this.addProperty(config.value)
  }

  private addBackground(): void {
    this.background = new RoundRectangleCanvas(
      this.scene,
      0,
      0,
      416,
      62,
      {
        radius: 15,
      },
      0x02_2d_4e
    ).setOrigin(0, 0)

    this.add(this.background)
  }

  private addTitle(text: string, color: string): void {
    this.title = this.scene.add.text(0, 0, text, {
      fontFamily: constants.FONT.FAMILY,
      fontSize: '32px',
      color,
      stroke: '#000000',
      strokeThickness: 4,
    })

    new Anchor(this.title, {
      top: 'top-37',
      left: 'left+80',
    })

    this.add(this.title)
  }

  private addIcon(name: string): void {
    const icon = this.scene.add.image(0, 0, 'ui-skillup', 'icon-' + name)

    new Anchor(icon, {
      top: 'top-10',
      left: 'left+3',
    })

    this.add(icon)
  }

  private addProperty(value: string): void {
    const property = this.scene.add.text(0, 0, value, {
      fontFamily: constants.FONT.FAMILY,
      fontSize: '36px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4,
    })

    new Anchor(property, {
      top: 'top+8',
      left: 'left+80',
    })

    this.add(property)
  }
}
