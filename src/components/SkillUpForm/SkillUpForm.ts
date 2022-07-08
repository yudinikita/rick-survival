import RoundRectangleCanvas from 'phaser3-rex-plugins/plugins/roundrectanglecanvas'
import Anchor from 'phaser3-rex-plugins/plugins/anchor'
import { GridSizer } from 'phaser3-rex-plugins/templates/ui/ui-components'
import constants from '../../config/constants'
import { PlayerSkillType } from '../PlayerLevelController'
import SkillUpItem from './SkillUpItem'

export default class SkillUpForm extends Phaser.GameObjects.Container {
  private background!: RoundRectangleCanvas
  private grid!: GridSizer

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y)
    this.scene.add.existing(this)

    this.addBackground()
    this.addGrid()
  }

  private addBackground(): void {
    this.background = new RoundRectangleCanvas(
      this.scene,
      0,
      0,
      612,
      943,
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

  private addItem(
    title: string,
    color: string,
    skillType: PlayerSkillType
  ): void {
    const item = new SkillUpItem(this.scene, 0, 0, {
      title: title,
      titleColor: color,
      skillType,
    })

    this.grid.add(item, {
      row: true,
    })
  }

  private addGrid(): void {
    this.grid = new GridSizer(this.scene, {
      x: 300,
      y: 100,
      column: 1,
      row: 7,
      rowProportions: 0,
      space: {
        row: 125,
      },
    })

    const skills = constants.PLAYER.SKILLS

    this.addItem(skills.REGEN.NAME, skills.REGEN.COLOR, skills.REGEN.TYPE)
    this.addItem(skills.HEALTH.NAME, skills.HEALTH.COLOR, skills.HEALTH.TYPE)
    this.addItem(skills.BODY.NAME, skills.BODY.COLOR, skills.BODY.TYPE)
    this.addItem(skills.BULLET.NAME, skills.BULLET.COLOR, skills.BULLET.TYPE)
    this.addItem(skills.DAMAGE.NAME, skills.DAMAGE.COLOR, skills.DAMAGE.TYPE)
    this.addItem(skills.RELOAD.NAME, skills.RELOAD.COLOR, skills.RELOAD.TYPE)
    this.addItem(skills.SPEED.NAME, skills.SPEED.COLOR, skills.SPEED.TYPE)

    this.grid.layout()

    new Anchor(this.grid, {
      centerX: '50%-250',
      centerY: '50%-15',
    })

    this.add(this.grid)
  }
}
