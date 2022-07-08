import Phaser from 'phaser'
import { Map } from 'rot-js'
import constants from '../../config/constants'
import worldGeneratorConfig from '../../config/worldGeneratorConfig'
import WeightedRandomBag from '../WeightedRandomBag'
import Chunk from './Chunk'
import Tile from './Tile'
import type { CellKeyType, CellType } from './index'

export default class WorldGenerator extends Phaser.GameObjects.Container {
  private chunks: Chunk[] = []
  private readonly chunkSize: number
  private readonly tileSize: number
  private readonly cameraSpeed: number
  private textureKey: string
  private map: CellKeyType[][] = []
  private mapTiles: Phaser.GameObjects.Group
  private randomBag: WeightedRandomBag<CellType>

  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0)

    this.chunkSize = 16
    this.tileSize = constants.LEVEL.TILE_SIZE
    this.cameraSpeed = 200
    this.mapTiles = this.scene.add.group()
    this.textureKey = ''
    this.randomBag = new WeightedRandomBag()
    this.addCellsInRandomBag()
  }

  public addCellsInRandomBag(): void {
    this.randomBag.add(
      worldGeneratorConfig.cells.grass,
      worldGeneratorConfig.cells.grass.weight
    )

    this.randomBag.add(
      worldGeneratorConfig.cells.flower,
      worldGeneratorConfig.cells.flower.weight
    )

    this.randomBag.add(
      worldGeneratorConfig.cells.stone,
      worldGeneratorConfig.cells.stone.weight
    )

    this.randomBag.add(
      worldGeneratorConfig.cells.stoneTile,
      worldGeneratorConfig.cells.stoneTile.weight
    )
  }

  public addBackgroundUnderWorld(): void {
    const { width, height } = this.scene.cameras.main

    this.scene.add
      .tileSprite(
        -width,
        -height,
        constants.LEVEL.WIDTH * this.tileSize + width * 2,
        constants.LEVEL.HEIGHT * this.tileSize + height * 2,
        this.textureKey,
        worldGeneratorConfig.cells.water.frame
      )
      .setOrigin(0, 0)
      .setTileScale(0.8, 0.8)
      .setScrollFactor(1)
  }

  public autoGenerate(followPointX: number, followPointY: number) {
    let snappedChunkX =
      this.chunkSize *
      this.tileSize *
      Math.round(followPointX / (this.chunkSize * this.tileSize))
    let snappedChunkY =
      this.chunkSize *
      this.tileSize *
      Math.round(followPointY / (this.chunkSize * this.tileSize))

    snappedChunkX = snappedChunkX / this.chunkSize / this.tileSize
    snappedChunkY = snappedChunkY / this.chunkSize / this.tileSize

    for (let x = snappedChunkX - 2; x < snappedChunkX + 2; x++) {
      for (let y = snappedChunkY - 2; y < snappedChunkY + 2; y++) {
        const existingChunk = this.getChunk(x, y)

        if (existingChunk == null) {
          const newChunk = new Chunk(this.scene, x, y)

          newChunk.setChunkSize = this.chunkSize
          newChunk.setTileSize = this.tileSize
          newChunk.setCameraSpeed = this.cameraSpeed

          this.chunks.push(newChunk)
        }
      }
    }

    for (let index = 0; index < this.chunks.length; index++) {
      const chunk = this.chunks[index]

      if (
        Phaser.Math.Distance.Between(
          snappedChunkX,
          snappedChunkY,
          chunk.x,
          chunk.y
        ) < 3
      ) {
        if (chunk !== null) {
          chunk.load()
        }
      } else {
        if (chunk !== null) {
          chunk.unload()
        }
      }
    }
  }

  public staticGenerate() {
    for (let index = 0; index < worldGeneratorConfig.width; index++) {
      this.map[index] = []
      for (let index_ = 0; index_ < worldGeneratorConfig.height; index_++) {
        this.map[index][index_] = worldGeneratorConfig.cells.water.key
      }
    }

    const digger = new Map.Cellular(
      worldGeneratorConfig.width - 2,
      worldGeneratorConfig.height - 2
    )

    digger.randomize(worldGeneratorConfig.probability)

    digger.create((x, y, value) => {
      if (value) {
        this.map[x + 1][y + 1] = worldGeneratorConfig.cells.sand.key
      } else {
        const randomCell = this.randomBag.getRandom()
        this.map[x + 1][y + 1] = randomCell.key
      }
    })
  }

  public draw(): void {
    for (let x = 0; x < this.map.length; x++) {
      const element = this.map[x]

      for (const [y, newChunk] of element.entries()) {
        const tileX = x * this.tileSize
        const tileY = y * this.tileSize

        const currentChunk = worldGeneratorConfig.cells[newChunk]

        const tile = new Tile(
          this.scene,
          tileX,
          tileY,
          this.getTextureKey,
          currentChunk.frame
        )

        tile.setTileType = currentChunk.key

        this.mapTiles.add(tile)
      }
    }
  }

  private getChunk(x: number, y: number): Chunk | null {
    let chunk = null

    for (let index = 0; index < this.chunks.length; index++) {
      if (this.chunks[index].x == x && this.chunks[index].y == y) {
        chunk = this.chunks[index]
      }
    }

    return chunk
  }

  public set setTextureKey(textureKey: string) {
    this.textureKey = textureKey
  }

  public get getTextureKey() {
    return this.textureKey
  }

  public get getMapTiles() {
    return this.mapTiles
  }
}
