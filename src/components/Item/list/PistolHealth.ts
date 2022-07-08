import Item from '../Item'
import itemsConstants from '../../../config/itemsConstants'
import constants from '../../../config/constants'
import Player from '../../Player'

export default class PistolHealth extends Item {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    const config = itemsConstants.PistolHealth
    super(scene, x, y, constants.ITEMS.TEXTURE, config.keyFrame)
    this.setupConfig(config)
    this.addOverlap()
  }

  public runAction(player: Player): void {
    player.addCurrentHitPoints(this.getValue)
  }
}
