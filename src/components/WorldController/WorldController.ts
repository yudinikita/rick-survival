import Phaser from 'phaser'
import Player from '../Player'
import WorldGenerator from './WorldGenerator'

export default class WorldController {
  private readonly scene: Phaser.Scene
  private player: Player
  private worldGenerator: WorldGenerator
  private followPoint: Phaser.Math.Vector2

  constructor(scene: Phaser.Scene, player: Player) {
    this.scene = scene
    this.player = player

    this.worldGenerator = new WorldGenerator(this.scene)

    this.followPoint = new Phaser.Math.Vector2(player.x, player.y)

    this.worldGenerator.staticGenerate()
  }

  public load(worldId: number) {
    this.worldGenerator.setTextureKey = 'world_tiles_' + worldId
    this.worldGenerator.addBackgroundUnderWorld()
    this.worldGenerator.draw()
  }

  public update() {
    // this.followPoint.x = this.player.x
    // this.followPoint.y = this.player.y
    //this.worldGenerator.autoGenerate(this.followPoint.x, this.followPoint.y)
  }
}
