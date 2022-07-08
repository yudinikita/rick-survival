import Phaser from 'phaser'

export default class Actor extends Phaser.Physics.Arcade.Sprite {
  protected maximumHitPoints = 0
  protected currentHitPoints = 0
  protected level = 1
  protected speed = 1
  protected bodyDamage = 0
  protected experience = 0
  protected bodyAttackTime = 0

  private lastBodyDamage = 0

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame)

    // scene.add.existing(this)
    // scene.physics.add.existing(this)

    //this.getBody().setCollideWorldBounds(false)
  }

  public set setMaximumHitPoints(value: number) {
    this.maximumHitPoints = value
  }

  public get getMaximumHitPoints() {
    return this.maximumHitPoints
  }

  public set setCurrentHitPoints(value: number) {
    this.currentHitPoints = value
  }

  public get getCurrentHitPoints() {
    return this.currentHitPoints
  }

  public set setLevel(value: number) {
    this.level = value
  }

  public get getLevel() {
    return this.level
  }

  public set setSpeed(value: number) {
    this.speed = value
  }

  public get getSpeed() {
    return this.speed
  }

  public set setBodyDamage(value: number) {
    this.bodyDamage = value
  }

  public get getBodyDamage() {
    return this.bodyDamage
  }

  public set setExperience(value: number) {
    this.experience = value
  }

  public get getExperience() {
    return this.experience
  }

  public set setLastBodyDamage(value: number) {
    this.lastBodyDamage = value
  }

  public get getLastBodyDamage() {
    return this.lastBodyDamage
  }

  public set setBodyAttackTime(value: number) {
    this.bodyAttackTime = value
  }

  public get getBodyAttackTime() {
    return this.bodyAttackTime
  }

  public checkFlip(): void {
    this.flipX = this.body.velocity.x >= 0
  }

  public reduceHealth(value?: number) {
    if (value) {
      this.currentHitPoints -= value
    }
  }

  public getBody(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body
  }
}
