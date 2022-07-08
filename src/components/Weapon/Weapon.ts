import weaponConstants, { WeaponConfig } from '../../config/weaponConstants'
import AmmoGroup from './AmmoGroup'
import type { WeaponType } from '../../types/weapons'

export default class Weapon {
  public ammoGroup: AmmoGroup
  public attackRate: number
  public attackRange: number

  private readonly scene: Phaser.Scene
  private weaponConfig!: WeaponConfig

  constructor(scene: Phaser.Scene, type: WeaponType) {
    this.scene = scene
    this.attackRate = 0
    this.attackRange = 0
    this.ammoGroup = new AmmoGroup(this.scene, 0)
    this.chooseWeapon(type)
  }

  public chooseWeapon(type: WeaponType): void {
    this.weaponConfig = weaponConstants[type]
    this.attackRate = this.weaponConfig.attackRate
    this.ammoGroup.loadAmmo(this.weaponConfig.ammoIndex)
  }

  public attack(): void {
    this.ammoGroup.attack()
  }
}
