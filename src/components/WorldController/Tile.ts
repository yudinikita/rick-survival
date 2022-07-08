import Phaser from 'phaser'
import { CellKeyType } from './index'

export default class Tile extends Phaser.GameObjects.Sprite {
  private tileType: CellKeyType | null = null

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame)
    this.scene = scene
    this.scene.add.existing(this)
    this.setOrigin(0)
  }

  public get getTileType(): CellKeyType | null {
    return this.tileType
  }

  public set setTileType(tileType: CellKeyType) {
    this.tileType = tileType
  }
}
