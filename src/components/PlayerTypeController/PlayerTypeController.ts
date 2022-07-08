import Player from '../Player'
import playerConfig from '../../config/playerConfig'
import type { WeaponType } from '../../types/weapons'
import type { PlayerNameType } from '../../types/players'

export default class PlayerTypeController {
  protected nameType: PlayerNameType = 'RickDefault'
  protected title = ''
  protected regeneration = 0
  protected maximumHitPoints = 0
  protected bodyDamage = 0
  protected bulletSpeed = 0
  protected bulletDamage = 0
  protected attackRate = 0
  protected speed = 0
  protected weapon!: WeaponType
  protected evolutions: PlayerNameType[] = []

  private player: Player

  constructor(player: Player, type: PlayerNameType) {
    this.player = player
    this.nameType = type
    this.chooseType(type)
  }

  public chooseType(type: PlayerNameType) {
    const config = playerConfig[type]

    this.setNameType = config.type
    this.setTitle = config.title
    this.setRegeneration = config.regeneration
    this.setMaximumHitPoints = config.maximumHitPoints
    this.setBodyDamage = config.bodyDamage
    this.setBulletSpeed = config.bulletSpeed
    this.setBulletDamage = config.bulletDamage
    this.setAttackRate = config.attackRate
    this.setSpeed = config.speed
    this.setWeapon = config.weapon
    this.setEvolutions = config.evolutions
  }

  public get getNameType(): PlayerNameType {
    return this.nameType
  }

  public set setNameType(nameType: PlayerNameType) {
    this.nameType = nameType
  }

  public get getTitle(): string {
    return this.title
  }

  public set setTitle(value: string) {
    this.title = value
  }

  public get getRegeneration(): number {
    return this.regeneration
  }

  public set setRegeneration(value: number) {
    this.regeneration = value
  }

  public get getMaximumHitPoints(): number {
    return this.maximumHitPoints
  }

  public set setMaximumHitPoints(value: number) {
    this.maximumHitPoints = value
  }

  public get getBodyDamage(): number {
    return this.bodyDamage
  }

  public set setBodyDamage(damage: number) {
    this.bodyDamage = damage
  }

  public get getBulletSpeed(): number {
    return this.bulletSpeed
  }

  public set setBulletSpeed(value: number) {
    this.bulletSpeed = value
  }

  public get getBulletDamage(): number {
    return this.bulletDamage
  }

  public set setBulletDamage(value: number) {
    this.bulletDamage = value
  }

  public get getAttackRate(): number {
    return this.attackRate
  }

  public set setAttackRate(value: number) {
    this.attackRate = value
  }

  public get getSpeed(): number {
    return this.speed
  }

  public set setSpeed(value: number) {
    this.speed = value
  }

  public get getWeapon(): WeaponType {
    return this.weapon
  }

  public set setWeapon(value: WeaponType) {
    this.weapon = value
  }

  public get getEvolutions(): PlayerNameType[] {
    return this.evolutions
  }

  public set setEvolutions(evolution: PlayerNameType[]) {
    this.evolutions = evolution
  }
}
