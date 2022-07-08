import Phaser from 'phaser'
import constants from '../config/constants'

export default class SceneCamera extends Phaser.Cameras.Scene2D.CameraManager {
  private target: Phaser.GameObjects.GameObject
  private minimap?: Phaser.Cameras.Scene2D.Camera

  constructor(scene: Phaser.Scene, target: Phaser.GameObjects.GameObject) {
    super(scene)
    this.target = target

    scene.cameras.main.name = constants.LEVEL.CAMERA.NAME
    scene.cameras.main.startFollow(target, true, 0.1, 0.1)
  }

  public addMinimap(): void {
    this.addBorderMinimap()

    this.minimap = this.scene.cameras
      .add(constants.WIDTH - 230, constants.HEIGHT - 230, 180, 180)
      .setName('minimap')
      .setZoom(0.1)
      .setBackgroundColor(0x3d_3d_3d)

    this.minimap.startFollow(this.target, false, 0.1, 0.1)
  }

  private addBorderMinimap() {
    const graphics = this.scene.add.graphics()

    graphics.lineStyle(6, 0x49_49_49, 1)

    graphics
      .strokeRect(constants.WIDTH - 230, constants.HEIGHT - 230, 180, 180)
      .setScrollFactor(0)
      .setDepth(10)
  }
}
