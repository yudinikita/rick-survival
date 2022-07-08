import Phaser from 'phaser'
import weaponConstants from '../../../config/weaponConstants'
import Bullet from '../Bullet'
import constants from '../../../config/constants'

export default class Shuriken2 extends Bullet {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    const config = weaponConstants.Shuriken2
    super(scene, x, y, constants.BULLETS.TEXTURE, config.frameKey)

    this.setupConfig(config)
  }

  public attack(): void {
    this.scene.tweens.add({
      targets: this,
      angle: -360 * 5,
      duration: 1000 * 5,
      repeat: -1,
      ease: 'Linear',
    })

    this.fire()
  }
}
