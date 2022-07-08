import Phaser from 'phaser'
import Player from '../Player'
import type { ItemType } from '../../config/itemsConstants'

export default class Item extends Phaser.Physics.Arcade.Image {
  protected title!: string
  protected typeName!: string
  protected keyFrame!: string
  protected rarity!: number
  protected value!: number

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame)

    this.setTitle = ''
    this.setTypeName = ''
    this.setTypeName = ''
    this.setRarity = 0
    this.setValue = 0

    this.addOverlap()
  }

  protected runAction(player: Player): void {}

  protected addOverlap(): void {
    const player = this.scene.data.get('player') as Player

    this.scene.physics.add.overlap(
      player,
      this,
      (playerObject, itemObject) => {
        const player = playerObject as Player
        const item = itemObject as Item

        item.runAction(player)
        item.killItem()
      },
      undefined,
      this
    )
  }

  private killItem(): void {
    this.destroy(true)
  }

  protected setupConfig(config: ItemType): void {
    this.setTitle = config.title
    this.setTypeName = config.typeName
    this.setKeyFrame = config.keyFrame
    this.setRarity = config.rarity
    this.setValue = config.value
  }

  protected getBody(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body
  }

  public set setTitle(title: string) {
    this.title = title
  }

  public get getTitle(): string {
    return this.title
  }

  public set setTypeName(typeName: string) {
    this.typeName = typeName
  }

  public get getTypeName(): string {
    return this.typeName
  }

  public set setKeyFrame(keyFrame: string) {
    this.keyFrame = keyFrame
  }

  public get getKeyFrame(): string {
    return this.keyFrame
  }

  public set setRarity(rarity: number) {
    this.rarity = rarity
  }

  public get getRarity(): number {
    return this.rarity
  }

  public set setValue(value: number) {
    this.value = value
  }

  public get getValue(): number {
    return this.value
  }
}
