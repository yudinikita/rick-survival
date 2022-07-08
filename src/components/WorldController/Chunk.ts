import Phaser from 'phaser'
import Noise from 'phaser3-rex-plugins/plugins/utils/math/noise/Perlin'
import Tile from './Tile'

export default class Chunk {
  public x: number
  public y: number

  private scene: Phaser.Scene
  private tiles: Phaser.GameObjects.Group
  private isLoaded: boolean

  private chunkSize!: number
  private tileSize!: number
  private cameraSpeed!: number

  private noise!: Noise

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene
    this.x = x
    this.y = y
    this.tiles = this.scene.add.group()
    this.isLoaded = false
    this.noise = new Noise()
  }

  public set setChunkSize(chunkSize: number) {
    this.chunkSize = chunkSize
  }

  public set setTileSize(tileSize: number) {
    this.tileSize = tileSize
  }

  public set setCameraSpeed(cameraSpeed: number) {
    this.cameraSpeed = cameraSpeed
  }

  unload() {
    if (this.isLoaded) {
      this.tiles.clear(true, true)

      this.isLoaded = false
    }
  }

  load() {
    if (!this.isLoaded) {
      for (let x = 0; x < this.chunkSize; x++) {
        for (let y = 0; y < this.chunkSize; y++) {
          const tileX =
            this.x * (this.chunkSize * this.tileSize) + x * this.tileSize
          const tileY =
            this.y * (this.chunkSize * this.tileSize) + y * this.tileSize

          const perlinValue = this.noise.perlin2(tileX / 100, tileY / 100)

          let key = ''
          const animationKey = ''

          if (perlinValue < 0.2) {
            key = 'sprGrass'
          } else if (perlinValue >= 0.2 && perlinValue < 0.3) {
            key = 'sprSand'
          } else if (perlinValue >= 0.3) {
            key = 'sprWater'
          }

          const tile = new Tile(this.scene, tileX, tileY, key)

          if (animationKey !== '') {
            tile.play(animationKey)
          }

          this.tiles.add(tile)
        }
      }

      this.isLoaded = true
    }
  }
}
