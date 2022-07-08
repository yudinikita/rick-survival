import Phaser from 'phaser'
import constants from '../../config/constants'
import ProgressBar from './ProgressBar'

export default class HealthBar extends ProgressBar {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, constants.HEALTH_BAR.WIDTH)

    return new ProgressBar(scene, x, y, constants.HEALTH_BAR.WIDTH)
      .withLeftShadowCap(scene.add.image(0, 0, 'left-cap-shadow'))
      .withMiddleShadow(scene.add.image(0, 0, 'middle-shadow'))
      .withRightShadowCap(scene.add.image(0, 0, 'right-cap-shadow'))
      .withLeftCap(scene.add.image(0, 0, 'left-cap'))
      .withMiddle(scene.add.image(0, 0, 'middle'))
      .withRightCap(scene.add.image(0, 0, 'right-cap'))
      .setHeight(constants.HEALTH_BAR.HEIGHT)
      .setPosition(x, y)
      .setDepth(10)
      .layout()
  }
}
