import Phaser from 'phaser'
import weaponConstants from '../../config/weaponConstants'
import constants from '../../config/constants'
import Bullet from './Bullet'
import Pistol from './list/Pistol'
import Pistol1 from './list/Pistol1'
import Pistol2 from './list/Pistol2'
import Pistol3 from './list/Pistol3'
import Blaster1 from './list/Blaster1'
import Blaster2 from './list/Blaster2'
import Blaster3 from './list/Blaster3'
import Revolver1 from './list/Revolver1'
import Revolver2 from './list/Revolver2'
import Revolver3 from './list/Revolver3'
import Rifle from './list/Rifle'
import Rifle1 from './list/Rifle1'
import Rifle2 from './list/Rifle2'
import Rifle3 from './list/Rifle3'
import GaussGun1 from './list/GaussGun1'
import GaussGun2 from './list/GaussGun2'
import GaussGun3 from './list/GaussGun3'
import SubmachineGun from './list/SubmachineGun'
import SubmachineGun1 from './list/SubmachineGun1'
import SubmachineGun2 from './list/SubmachineGun2'
import MachineGun3 from './list/MachineGun3'
import Machine1 from './list/Machine1'
import Machine2 from './list/Machine2'
import Machine3 from './list/Machine3'
import Shuriken1 from './list/Shuriken1'
import Shuriken2 from './list/Shuriken2'
import Shuriken3 from './list/Shuriken3'
import RocketGun3 from './list/RocketGun3'
import Hand from './list/Hand'
import PlasmoGun2 from './list/PlasmoGun2'
import PlasmoGun3 from './list/PlasmoGun3'

export default class AmmoGroup extends Phaser.Physics.Arcade.Group {
  private frameKey = ''

  constructor(scene: Phaser.Scene, ammoIndex: number) {
    super(scene.physics.world, scene)
    this.loadAmmo(ammoIndex)
  }

  public attack(): void {
    const bullet = this.getFirstDead(false) as Bullet

    if (bullet) {
      //this.scene.sound.play('fire', { volume: 0.05 })
      bullet.attack()
    }
  }

  public removeBullet(bullet: Bullet) {
    this.killAndHide(bullet)
    bullet.setVelocity(0, 0)
    bullet.setPosition(
      constants.DEFAULT_SPAWN.BULLETS.X,
      constants.DEFAULT_SPAWN.BULLETS.Y
    )
  }

  public loadAmmo(ammoIndex: number) {
    this.clear()
    this.setupAmmo(ammoIndex)

    this.createMultiple({
      classType: this.classType,
      frameQuantity: 10,
      active: false,
      visible: false,
      key: this.frameKey,
      setXY: {
        x: constants.DEFAULT_SPAWN.BULLETS.X,
        y: constants.DEFAULT_SPAWN.BULLETS.Y,
      },
    })

    return this
  }

  private setupAmmo(ammoIndex: number): void {
    switch (ammoIndex) {
      case weaponConstants.Pistol.ammoIndex:
        this.classType = Pistol
        this.frameKey = weaponConstants.Pistol.frameKey
        break
      case weaponConstants.Pistol1.ammoIndex:
        this.classType = Pistol1
        this.frameKey = weaponConstants.Pistol1.frameKey
        break
      case weaponConstants.Pistol2.ammoIndex:
        this.classType = Pistol2
        this.frameKey = weaponConstants.Pistol2.frameKey
        break
      case weaponConstants.Pistol3.ammoIndex:
        this.classType = Pistol3
        this.frameKey = weaponConstants.Pistol3.frameKey
        break
      case weaponConstants.Blaster1.ammoIndex:
        this.classType = Blaster1
        this.frameKey = weaponConstants.Blaster1.frameKey
        break
      case weaponConstants.Blaster2.ammoIndex:
        this.classType = Blaster2
        this.frameKey = weaponConstants.Blaster2.frameKey
        break
      case weaponConstants.Blaster3.ammoIndex:
        this.classType = Blaster3
        this.frameKey = weaponConstants.Blaster3.frameKey
        break
      case weaponConstants.Revolver1.ammoIndex:
        this.classType = Revolver1
        this.frameKey = weaponConstants.Revolver1.frameKey
        break
      case weaponConstants.Revolver2.ammoIndex:
        this.classType = Revolver2
        this.frameKey = weaponConstants.Revolver2.frameKey
        break
      case weaponConstants.Revolver3.ammoIndex:
        this.classType = Revolver3
        this.frameKey = weaponConstants.Revolver3.frameKey
        break
      case weaponConstants.Rifle.ammoIndex:
        this.classType = Rifle
        this.frameKey = weaponConstants.Rifle.frameKey
        break
      case weaponConstants.Rifle1.ammoIndex:
        this.classType = Rifle1
        this.frameKey = weaponConstants.Rifle1.frameKey
        break
      case weaponConstants.Rifle2.ammoIndex:
        this.classType = Rifle2
        this.frameKey = weaponConstants.Rifle2.frameKey
        break
      case weaponConstants.Rifle3.ammoIndex:
        this.classType = Rifle3
        this.frameKey = weaponConstants.Rifle3.frameKey
        break
      case weaponConstants.GaussGun1.ammoIndex:
        this.classType = GaussGun1
        this.frameKey = weaponConstants.GaussGun1.frameKey
        break
      case weaponConstants.GaussGun2.ammoIndex:
        this.classType = GaussGun2
        this.frameKey = weaponConstants.GaussGun2.frameKey
        break
      case weaponConstants.GaussGun3.ammoIndex:
        this.classType = GaussGun3
        this.frameKey = weaponConstants.GaussGun3.frameKey
        break
      case weaponConstants.SubmachineGun.ammoIndex:
        this.classType = SubmachineGun
        this.frameKey = weaponConstants.SubmachineGun.frameKey
        break
      case weaponConstants.SubmachineGun1.ammoIndex:
        this.classType = SubmachineGun1
        this.frameKey = weaponConstants.SubmachineGun1.frameKey
        break
      case weaponConstants.SubmachineGun2.ammoIndex:
        this.classType = SubmachineGun2
        this.frameKey = weaponConstants.SubmachineGun2.frameKey
        break
      case weaponConstants.MachineGun3.ammoIndex:
        this.classType = MachineGun3
        this.frameKey = weaponConstants.MachineGun3.frameKey
        break
      case weaponConstants.Machine1.ammoIndex:
        this.classType = Machine1
        this.frameKey = weaponConstants.Machine1.frameKey
        break
      case weaponConstants.Machine2.ammoIndex:
        this.classType = Machine2
        this.frameKey = weaponConstants.Machine2.frameKey
        break
      case weaponConstants.Machine3.ammoIndex:
        this.classType = Machine3
        this.frameKey = weaponConstants.Machine3.frameKey
        break
      case weaponConstants.Shuriken1.ammoIndex:
        this.classType = Shuriken1
        this.frameKey = weaponConstants.Shuriken1.frameKey
        break
      case weaponConstants.Shuriken2.ammoIndex:
        this.classType = Shuriken2
        this.frameKey = weaponConstants.Shuriken2.frameKey
        break
      case weaponConstants.Shuriken3.ammoIndex:
        this.classType = Shuriken3
        this.frameKey = weaponConstants.Shuriken3.frameKey
        break
      case weaponConstants.RocketGun3.ammoIndex:
        this.classType = RocketGun3
        this.frameKey = weaponConstants.RocketGun3.frameKey
        break
      case weaponConstants.PlasmoGun2.ammoIndex:
        this.classType = PlasmoGun2
        this.frameKey = weaponConstants.PlasmoGun2.frameKey
        break
      case weaponConstants.PlasmoGun3.ammoIndex:
        this.classType = PlasmoGun3
        this.frameKey = weaponConstants.PlasmoGun3.frameKey
        break
      case weaponConstants.Hand.ammoIndex:
        this.classType = Hand
        this.frameKey = weaponConstants.Hand.frameKey
        break
    }
  }
}
