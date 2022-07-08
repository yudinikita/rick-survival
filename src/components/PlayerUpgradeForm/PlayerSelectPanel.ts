import RoundRectangleCanvas from 'phaser3-rex-plugins/plugins/roundrectanglecanvas'
import {
  GridSizer,
  ScrollablePanel,
} from 'phaser3-rex-plugins/templates/ui/ui-components'
import PlayerSelectItem from './PlayerSelectItem'
import type { PlayerNameType } from '../../types/players'

export default class PlayerSelectPanel extends Phaser.GameObjects.Container {
  private panel!: ScrollablePanel
  private grid!: GridSizer
  private selectCallback!: (selectItem: PlayerSelectItem) => void

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    evolutions: PlayerNameType[],
    selectCallback: (selectItem: PlayerSelectItem) => void
  ) {
    super(scene, x, y)
    this.scene.add.existing(this)

    this.selectCallback = selectCallback

    this.addBackground()
    this.addPanel(evolutions)
  }

  private addBackground(): void {
    const background = new RoundRectangleCanvas(
      this.scene,
      0,
      0,
      400,
      670,
      { radius: 30 },
      0x0b_7f_db,
      0x00_00_00,
      4
    ).setOrigin(0.5, 0.5)

    this.add(background)
  }

  private addPlayerItem(playerType: PlayerNameType): void {
    const item = new PlayerSelectItem(this.scene, playerType)
    this.grid.add(item)
  }

  private createGrid(evolutions: PlayerNameType[]): GridSizer {
    this.grid = new GridSizer(this.scene, {
      x: 0,
      y: 0,
      column: 2,
      row: 10,
      rowProportions: 0,
      space: {
        row: 20,
        column: 20,
      },
      name: 'players',
    })

    for (const evolution of evolutions) {
      this.addPlayerItem(evolution)
    }

    this.grid.setInteractive()

    return this.grid
  }

  private addPanel(evolutions: PlayerNameType[]): void {
    this.panel = new ScrollablePanel(this.scene, {
      x: 0,
      y: 0,
      width: 400,
      height: 670,

      anchor: {
        centerX: 'left+290',
        centerY: 'center-100',
      },

      scrollMode: 0,

      panel: {
        child: this.createGrid(evolutions),
        mask: {
          padding: 1,
        },
      },

      mouseWheelScroller: {
        focus: false,
        speed: 0.3,
      },

      space: {
        left: 30,
        right: 30,
        top: 30,
        bottom: 30,
        panel: 30,
      },
    })

    this.panel.layout()

    this.panel.setChildrenInteractive({
      targets: [this.panel.getByName('players', true)],
    })

    this.add(this.panel)

    this.panel.on('child.click', (selectItem: PlayerSelectItem) => {
      const allPlayers = this.grid.getChildren()

      for (const player of allPlayers) {
        ;(player as PlayerSelectItem).unselectCurrent()
      }

      this.selectCallback(selectItem)
    })
  }
}
