import { GridSizer } from 'phaser3-rex-plugins/templates/ui/ui-components'
import RoundRectangleCanvas from 'phaser3-rex-plugins/plugins/roundrectanglecanvas'
import Anchor from 'phaser3-rex-plugins/plugins/anchor'
import constants from '../../config/constants'
import { PlayerSkillType } from '../PlayerLevelController'
import playerConfig from '../../config/playerConfig'
import StatsItem from './StatsItem'
import type { PlayerNameType } from '../../types/players'

export default class PlayerStatsPanel extends Phaser.GameObjects.Container {
  private background!: RoundRectangleCanvas
  private grid!: GridSizer

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y)
    this.scene.add.existing(this)

    this.addBackground()
    this.addGrid()
  }

  public changeStats(playerName: PlayerNameType): void {
    this.grid.clear()
    this.addGrid(playerName)
  }

  private addBackground(): void {
    this.background = new RoundRectangleCanvas(
      this.scene,
      0,
      25,
      500,
      910,
      {
        radius: 30,
      },
      0x0b_7f_db,
      0x00_00_00,
      4
    ).setOrigin(0, 0)

    this.add(this.background)
  }

  private addItem(
    title: string,
    titleColor: string,
    skillType: PlayerSkillType,
    value: string
  ): void {
    const item = new StatsItem(this.scene, 0, 0, {
      title,
      titleColor,
      skillType,
      value,
    })

    this.grid.add(item, {
      row: true,
    })

    this.add(item)
  }

  private fillGrid(playerName: PlayerNameType): void {
    const skills = constants.PLAYER.SKILLS
    const playerData = playerConfig[playerName]

    this.addItem(
      skills.REGEN.NAME,
      skills.REGEN.COLOR,
      skills.REGEN.TYPE,
      playerData.regeneration.toString()
    )

    this.addItem(
      skills.HEALTH.NAME,
      skills.HEALTH.COLOR,
      skills.HEALTH.TYPE,
      playerData.maximumHitPoints.toString()
    )

    this.addItem(
      skills.BODY.NAME,
      skills.BODY.COLOR,
      skills.BODY.TYPE,
      playerData.bodyDamage.toString()
    )

    this.addItem(
      skills.BULLET.NAME,
      skills.BULLET.COLOR,
      skills.BULLET.TYPE,
      playerData.bulletSpeed.toString()
    )

    this.addItem(
      skills.DAMAGE.NAME,
      skills.DAMAGE.COLOR,
      skills.DAMAGE.TYPE,
      playerData.bulletDamage.toString()
    )

    this.addItem(
      skills.RELOAD.NAME,
      skills.RELOAD.COLOR,
      skills.RELOAD.TYPE,
      playerData.attackRate.toString()
    )

    this.addItem(
      skills.SPEED.NAME,
      skills.SPEED.COLOR,
      skills.SPEED.TYPE,
      playerData.speed.toString()
    )
  }

  private addGrid(playerName?: PlayerNameType): void {
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

    if (playerName) {
      this.fillGrid(playerName)
    }

    this.grid.layout()

    new Anchor(this.grid, {
      centerX: 'left+40',
      centerY: 'center-20',
    })

    this.add(this.grid)
  }
}
