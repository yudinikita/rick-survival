import { Label } from 'phaser3-rex-plugins/templates/ui/ui-components'
import { PlayerNameType } from '../../types/players'

const SPACE = 15
const BACKGROUND_TEXTURE = 'background-6'

export default class PlayerSelectItem extends Label {
  private readonly playerType: PlayerNameType

  constructor(scene: Phaser.Scene, playerType: PlayerNameType) {
    super(scene, {
      background: scene.add.image(0, 0, BACKGROUND_TEXTURE),
      icon: scene.add
        .image(0, 0, playerType, playerType + '_down_1')
        .setDisplaySize(135, 172)
        .setOrigin(0.5, 0.5),
      space: {
        left: SPACE,
        top: SPACE,
        bottom: SPACE,
        right: SPACE,
      },
    })

    this.playerType = playerType

    this.unselectCurrent()
  }

  public getBackground(): Phaser.GameObjects.Image {
    return this.getElement('background') as Phaser.GameObjects.Image
  }

  public getIcon(): Phaser.GameObjects.Image {
    return this.getElement('icon') as Phaser.GameObjects.Image
  }

  public selectCurrent(): void {
    this.getBackground().clearTint()
    this.getIcon().clearTint()
  }

  public unselectCurrent(): void {
    this.getBackground().setTint(0xc0_c0_c0)
    this.getIcon().setTint(0xc0_c0_c0)
  }

  public get getPlayerType(): PlayerNameType {
    return this.playerType
  }
}
