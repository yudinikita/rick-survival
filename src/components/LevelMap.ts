import Phaser from 'phaser'
import Noise from 'phaser3-rex-plugins/plugins/utils/math/noise/Perlin'
import Player from './Player'

export default class LevelMap {
  public width!: number
  public height!: number

  private chunks: Chunk[] = []
  private chunkSize: number
  private tileSize: number
  public cameraSpeed: number
  public followPoint: Phaser.Math.Vector2

  public map!: Phaser.Tilemaps.Tilemap
  public wallsLayer!: Phaser.Tilemaps.TilemapLayer
  public groundLayer!: Phaser.Tilemaps.TilemapLayer
  public reliefLayer!: Phaser.Tilemaps.TilemapLayer
  public objectsLayer!: Phaser.Tilemaps.TilemapLayer

  private scene!: Phaser.Scene
  private tileset!: Phaser.Tilemaps.Tileset

  constructor(scene: Phaser.Scene) {
    this.scene = scene

    this.chunkSize = 16
    this.tileSize = 64
    this.cameraSpeed = 10

    this.followPoint = new Phaser.Math.Vector2(
      this.scene.cameras.main.worldView.x +
        this.scene.cameras.main.worldView.width * 0.5,
      this.scene.cameras.main.worldView.y +
        this.scene.cameras.main.worldView.height * 0.5
    )
  }

  public showDebugWalls(): void {
    const debugGraphics = this.scene.add.graphics().setAlpha(0.7)
    this.wallsLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
    })
  }

  public loadMap(index: number): void {
    if (index === 0) {
      this.loadWorld01()
    } else {
      this.loadWorld02()
    }
  }

  public loadWorld01(): void {
    this.map = this.scene.make.tilemap({
      key: 'level01_json',
      tileWidth: 64,
      tileHeight: 64,
    })

    this.tileset = this.map.addTilesetImage('level01', 'level01_tiles')

    this.groundLayer = this.map.createLayer('Ground', this.tileset, 0, 0)
    this.wallsLayer = this.map.createLayer('Walls', this.tileset, 0, 0)
    this.objectsLayer = this.map.createLayer('Objects', this.tileset, 0, 0)

    this.scene.physics.world.setBounds(
      0,
      0,
      this.wallsLayer.width,
      this.wallsLayer.height
    )

    this.width = this.wallsLayer.width || 0
    this.height = this.wallsLayer.height || 0

    this.wallsLayer.setCollisionByProperty({ collides: true })
  }

  public loadWorld02(): void {
    this.map = this.scene.make.tilemap({
      key: 'world_01_json',
      tileWidth: 64,
      tileHeight: 64,
    })

    this.tileset = this.map.addTilesetImage('SummerTex', 'world_01_tiles')

    this.groundLayer = this.map.createLayer('Ground', this.tileset, 0, 0)
    this.wallsLayer = this.map.createLayer('Walls', this.tileset, 0, 0)
    this.reliefLayer = this.map.createLayer('Relief', this.tileset, 0, 0)
    this.objectsLayer = this.map.createLayer('Objects', this.tileset, 0, 0)

    this.scene.physics.world.setBounds(
      0,
      0,
      this.wallsLayer.width,
      this.wallsLayer.height
    )

    this.width = this.wallsLayer.width || 0
    this.height = this.wallsLayer.height || 0

    this.wallsLayer.setCollisionByProperty({ collides: true })
    this.reliefLayer.setCollisionByProperty({ collides: true })
  }

  public setCollision(player: Player): void {
    this.scene.physics.add.collider(player, this.reliefLayer)
  }

  private getChunk(x: number, y: number) {
    let chunk = null

    for (let index = 0; index < this.chunks.length; index++) {
      if (this.chunks[index].x == x && this.chunks[index].y == y) {
        chunk = this.chunks[index]
      }
    }

    return chunk
  }

  update() {
    let snappedChunkX =
      this.chunkSize *
      this.tileSize *
      Math.round(this.followPoint.x / (this.chunkSize * this.tileSize))
    let snappedChunkY =
      this.chunkSize *
      this.tileSize *
      Math.round(this.followPoint.y / (this.chunkSize * this.tileSize))

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
}

class Tile extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, key)
    this.scene = scene
    this.scene.add.existing(this)
    this.setOrigin(0)
  }
}

class Chunk {
  private scene: Phaser.Scene
  public x: number
  public y: number
  private tiles: Phaser.GameObjects.Group
  private isLoaded: boolean

  private chunkSize!: number
  private tileSize!: number
  private cameraSpeed!: number

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene
    this.x = x
    this.y = y
    this.tiles = this.scene.add.group()
    this.isLoaded = false
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
    const noise = new Noise()

    if (!this.isLoaded) {
      for (let x = 0; x < this.chunkSize; x++) {
        for (let y = 0; y < this.chunkSize; y++) {
          const tileX =
            this.x * (this.chunkSize * this.tileSize) + x * this.tileSize
          const tileY =
            this.y * (this.chunkSize * this.tileSize) + y * this.tileSize

          const perlinValue = noise.perlin2(tileX / 100, tileY / 100)

          let key = ''
          const animationKey = ''

          if (perlinValue < 0.2) {
            key = 'sprWater'
          } else if (perlinValue >= 0.2 && perlinValue < 0.3) {
            key = 'sprSand'
          } else if (perlinValue >= 0.3) {
            key = 'sprGrass'
          }

          const tile = new Tile(this.scene, tileX, tileY, key).setDepth(0)

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
