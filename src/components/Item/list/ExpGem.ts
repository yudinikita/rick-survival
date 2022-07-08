import Item from '../Item'
import itemsConstants from '../../../config/itemsConstants'
import constants from '../../../config/constants'
import Player from '../../Player'

export default class ExpGem extends Item {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    const config = itemsConstants.ExpGem
    super(scene, x, y, constants.ITEMS.TEXTURE, config.keyFrame)
    this.setupConfig(config)
    this.addOverlap()
  }

  public runAction(player: Player): void {
    this.scene.sound.play('exp', { volume: 0.1 })
    player.addExperience(this.value)
  }
}
