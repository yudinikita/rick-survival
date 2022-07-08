import itemsConstants from '../../config/itemsConstants'
import Item from '../Item/Item'
import ExpGem from '../Item/list/ExpGem'
import GoldCoin from '../Item/list/GoldCoin'
import PistolHealth from '../Item/list/PistolHealth'
import WeightedRandomBag from '../WeightedRandomBag'
import type { ItemTypeName } from '../../config/itemsConstants'

export default class ItemController {
  private readonly scene: Phaser.Scene
  private randomBag: WeightedRandomBag<ItemTypeName>

  constructor(scene: Phaser.Scene) {
    this.scene = scene
    this.randomBag = new WeightedRandomBag()
  }

  public setItems(items: ItemTypeName[]): void {
    for (const item of items) {
      this.addItem(item)
    }
  }

  public addItem(item: ItemTypeName): void {
    const weight = itemsConstants[item].rarity
    this.randomBag.add(item, weight)
  }

  public getRandom(): Item | null {
    const randomItemName = this.randomBag.getRandom()

    switch (randomItemName) {
      case 'ExpGem':
        return new ExpGem(this.scene, 0, 0)
      case 'GoldCoin':
        return new GoldCoin(this.scene, 0, 0)
      case 'PistolHealth':
        return new PistolHealth(this.scene, 0, 0)
      default:
        return null
    }
  }
}
