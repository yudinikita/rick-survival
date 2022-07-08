import constants from '../config/constants'
import PlayerUpgradeForm from '../components/PlayerUpgradeForm/PlayerUpgradeForm'
import Player from '../components/Player'

export default class PlayerUpgrade extends Phaser.Scene {
  private background!: Phaser.GameObjects.TileSprite
  private playerUpgradeForm!: PlayerUpgradeForm
  private player!: Player

  constructor() {
    super({ key: constants.SCENES.PLAYER_UPGRADE })
  }

  init(data: { player: Player }): void {
    this.player = data.player
  }

  create(): void {
    this.addBackground()
    this.addPlayerUpgradeForm()
  }

  private addBackground(): void {
    const { width, height } = this.sys.game.canvas

    this.background = this.add
      .tileSprite(0, 0, width, height, 'background-5')
      .setOrigin(0, 0)
      .setTileScale(0.8, 0.8)

    this.add.rectangle(0, 0, width, height, 0x12_49_be, 0.5).setOrigin(0, 0)
  }

  private animateBackground(): void {
    this.background.tilePositionY += 0.5
  }

  private addPlayerUpgradeForm(): void {
    this.playerUpgradeForm = new PlayerUpgradeForm(this, 0, 0, this.player)
  }

  public update(): void {
    this.animateBackground()
  }
}
