import Anchor from 'phaser3-rex-plugins/plugins/anchor'
import { Buttons } from 'phaser3-rex-plugins/templates/ui/ui-components.js'
import constants from '../../config/constants'
import { selectButton, unselectButton } from '../../utils/selectButton'
import playerConfig from '../../config/playerConfig'
import Player from '../Player'
import PlayerStatsPanel from './PlayerStatsPanel'
import PlayerSelectPanel from './PlayerSelectPanel'
import PlayerSelectItem from './PlayerSelectItem'
import type { PlayerNameType } from '../../types/players'

export default class PlayerUpgradeForm extends Phaser.GameObjects.Container {
  private readonly player: Player
  private title!: Phaser.GameObjects.Text
  private frontPlayer!: Phaser.GameObjects.Image
  private playerStatsPanel!: PlayerStatsPanel
  private playerSelectPanel!: PlayerSelectPanel
  private selectedPlayer: PlayerNameType | null

  constructor(scene: Phaser.Scene, x: number, y: number, player: Player) {
    super(scene, x, y)
    this.scene.add.existing(this)

    this.player = player
    this.selectedPlayer = null

    this.addPlayerSelectPanel(player.getTypeController.getEvolutions)
    this.addTitle('')
    this.addFrontPlayer(constants.PLAYER.DEFAULT.TYPE)
    this.addStatsPanel()
    this.addButtonSelect()
  }

  private addTitle(text: string): void {
    this.title = this.scene.add
      .text(0, 0, text, {
        fontFamily: constants.FONT.FAMILY,
        fontSize: '48px',
        color: '#FBD140',
        stroke: '#000000',
        strokeThickness: 6,
        align: 'center',
        wordWrap: { width: 400 },
        maxLines: 3,
      })
      .setOrigin(0.5, 0.5)

    new Anchor(this.title, {
      centerX: 'center',
      centerY: 'top+150',
    })

    this.add(this.title)
  }

  private addFrontPlayer(playerName: string): void {
    this.frontPlayer = this.scene.add
      .image(0, 0, playerName, playerName + '_front')
      .setOrigin(0.5, 1)
      .setVisible(false)

    new Anchor(this.frontPlayer, {
      centerX: 'center',
      bottom: 'bottom',
    })

    this.add(this.frontPlayer)
  }

  private selectPlayer(selectItem: PlayerSelectItem): void {
    selectItem.selectCurrent()

    const playerData = playerConfig[selectItem.getPlayerType]

    this.title.setText(playerData.title)

    this.frontPlayer
      .setTexture(playerData.type, playerData.type + '_front')
      .setVisible(true)

    this.selectedPlayer = playerData.type

    this.playerStatsPanel.changeStats(playerData.type)
  }

  private addPlayerSelectPanel(evolutions: PlayerNameType[]): void {
    this.playerSelectPanel = new PlayerSelectPanel(
      this.scene,
      0,
      0,
      evolutions,
      this.selectPlayer.bind(this)
    )

    new Anchor(this.playerSelectPanel, {
      centerY: 'center-100',
      centerX: 'left+290',
    })

    this.add(this.playerSelectPanel)
  }

  private addStatsPanel(): void {
    this.playerStatsPanel = new PlayerStatsPanel(this.scene, 0, 0)

    new Anchor(this.playerStatsPanel, {
      top: 'top+15',
      centerX: 'center+390',
    })

    this.add(this.playerStatsPanel)
  }

  private addButtonSelect(): void {
    const button = this.scene.add.image(0, 0, 'button-select')

    const buttons = new Buttons(this.scene, {
      buttons: [button],
      anchor: {
        centerX: 'left+280',
        centerY: 'bottom-125',
      },
    })

    buttons.layout()

    this.add(buttons)

    buttons.on(
      'button.click',
      () => {
        if (this.selectedPlayer) {
          this.handleClickSelect()
        }
      },
      this
    )

    buttons.on('button.over', (button: Phaser.GameObjects.Image) => {
      if (this.selectedPlayer) {
        selectButton(button)
      }
    })

    buttons.on('button.out', (button: Phaser.GameObjects.Image) => {
      unselectButton(button)
    })
  }

  private handleClickSelect(): void {
    if (this.selectedPlayer) {
      this.player.chooseType(this.selectedPlayer)

      this.scene.scene.resume(constants.SCENES.GAME_FIELD)
      this.scene.scene.resume(constants.SCENES.GAME_UI)

      this.scene.scene.stop(constants.SCENES.PLAYER_UPGRADE)
    }
  }
}
