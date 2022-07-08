import Phaser from 'phaser'
import weaponConstants from '../../../config/weaponConstants'
import Bullet from '../Bullet'
import constants from '../../../config/constants'
import Player from '../../Player'

export default class Revolver3 extends Bullet {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    const config = weaponConstants.Revolver3
    super(scene, x, y, constants.BULLETS.TEXTURE, config.frameKey)

    this.setupConfig(config)
  }

  public attack(): void {
    const player = this.scene.data.get('player') as Player
    const target = player.getClosestEnemy
    const bulletSpeed = player.getBulletSpeed

    const checkAttack =
      target && player.getRadiusAttack.contains(target.x, target.y)

    if (checkAttack) {
      this.body.reset(player.x, player.y)

      this.setDepth(10)
      this.setScale(0)
      this.setActive(true)
      this.setVisible(true)

      const summarySpeed = bulletSpeed * this.getSpeed

      this.scene.tweens.add({
        targets: this,
        scale: this.getDisplayScale,
        duration: summarySpeed,
        repeat: 0,
      })

      const rotationOffset = Phaser.Math.DegToRad(90)
      this.rotation =
        Phaser.Math.Angle.BetweenPoints(player, target) + rotationOffset

      this.scene.physics.moveTo(this, target.x, target.y, summarySpeed)

      this.scene.cameras.main.worldView.contains(this.x, this.y)
    }
  }
}
