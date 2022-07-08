import Item from '../Item'
import itemsConstants from '../../../config/itemsConstants'
import constants from '../../../config/constants'
import Player from '../../Player'

export default class GoldCoin extends Item {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    const config = itemsConstants.GoldCoin
    super(scene, x, y, constants.ITEMS.TEXTURE, config.keyFrame)
    this.setupConfig(config)
    this.addOverlap()
  }

  public runAction(player: Player): void {
    this.scene.sound.play('coins', { volume: 0.2 })
    player.addGold(this.value)
  }
}
