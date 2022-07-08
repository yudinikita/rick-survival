import Phaser from 'phaser'
import enemyConstants from '../../../config/enemyConstants'
import AnimationsController from '../../AnimationsController'
import Enemy from '../Enemy'

const baseSettings = enemyConstants.AntsInMyEyesJohnson

export default class AntsInMyEyesJohnson extends Enemy {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, baseSettings.type, baseSettings.type + '_down_1')

    this.setupConfig(baseSettings)
    new AnimationsController(scene, this).addAnimations(baseSettings.type)
  }
}
