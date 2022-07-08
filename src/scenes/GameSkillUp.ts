import constants from '../config/constants'
import SkillUpForm from '../components/SkillUpForm/SkillUpForm'

export default class GameSkillUp extends Phaser.Scene {
  private background!: Phaser.GameObjects.TileSprite
  private skillUpForm!: SkillUpForm

  constructor() {
    super({ key: constants.SCENES.GAME_SKILL_UP })
  }

  create(): void {
    this.addBackground()
    this.skillUpForm = new SkillUpForm(this, 0, 0)
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
    this.background.tilePositionX += 0.5
    this.background.tilePositionY += 0.5
  }

  public update(): void {
    this.animateBackground()
  }
}
