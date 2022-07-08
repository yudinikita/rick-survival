import Phaser from 'phaser'

export default class ProgressBar {
  private scene: Phaser.Scene
  private x: number
  private y: number
  readonly width: number

  private leftCap?: Phaser.GameObjects.Image
  private middle?: Phaser.GameObjects.Image
  private rightCap?: Phaser.GameObjects.Image

  private leftShadowCap?: Phaser.GameObjects.Image
  private middleShadow?: Phaser.GameObjects.Image
  private rightShadowCap?: Phaser.GameObjects.Image

  constructor(scene: Phaser.Scene, x: number, y: number, width: number) {
    this.scene = scene
    this.x = x
    this.y = y
    this.width = width
  }

  public setPosition(x: number, y?: number): ProgressBar {
    this.x = x

    if (y) {
      this.y = y
    }

    this.layoutSegments()
    this.layoutShadow()

    return this
  }

  public setDepth(x: number): ProgressBar {
    this.leftCap?.setDepth(x)
    this.middle?.setDepth(x)
    this.rightCap?.setDepth(x)
    this.leftShadowCap?.setDepth(x)
    this.middleShadow?.setDepth(x)
    this.rightShadowCap?.setDepth(x)

    return this
  }

  public withLeftCap(cap: Phaser.GameObjects.Image): ProgressBar {
    this.leftCap = cap.setOrigin(0, 0.5)
    return this
  }

  public withMiddle(middle: Phaser.GameObjects.Image): ProgressBar {
    this.middle = middle.setOrigin(0, 0.5)
    return this
  }

  public withRightCap(cap: Phaser.GameObjects.Image): ProgressBar {
    this.rightCap = cap.setOrigin(0, 0.5)
    return this
  }

  public withLeftShadowCap(cap: Phaser.GameObjects.Image): ProgressBar {
    this.leftShadowCap = cap.setOrigin(0, 0.5)
    return this
  }

  public withMiddleShadow(middle: Phaser.GameObjects.Image): ProgressBar {
    this.middleShadow = middle.setOrigin(0, 0.5)
    return this
  }

  public withRightShadowCap(cap: Phaser.GameObjects.Image): ProgressBar {
    this.rightShadowCap = cap.setOrigin(0, 0.5)
    return this
  }

  public layout(): ProgressBar {
    if (this.middleShadow) {
      this.middleShadow.displayWidth = this.width
    }

    this.layoutShadow()

    if (this.middle) {
      this.middle.displayWidth = this.width
    }

    this.layoutSegments()

    return this
  }

  public setHeight(height: number): ProgressBar {
    if (this.leftCap) {
      this.leftCap.displayHeight = height
    }

    if (this.middle) {
      this.middle.displayHeight = height
    }

    if (this.rightCap) {
      this.rightCap.displayHeight = height
    }

    if (this.leftShadowCap) {
      this.leftShadowCap.displayHeight = height
    }

    if (this.middleShadow) {
      this.middleShadow.displayHeight = height
    }

    if (this.rightShadowCap) {
      this.rightShadowCap.displayHeight = height
    }

    this.layoutSegments()
    this.layoutShadow()

    return this
  }

  public animateToFill(fill: number, duration = 100): void {
    if (!this.middle) {
      return
    }

    const percent = Math.max(0, Math.min(1, fill))

    this.scene.tweens.add({
      targets: this.middle,
      displayWidth: this.width * percent,
      duration,
      ease: Phaser.Math.Easing.Sine.Out,
      onUpdate: () => {
        this.layoutSegments()
        this.layoutShadow()
        this.clearSegments()
      },
    })
  }

  private clearSegments(): ProgressBar {
    if (!this.leftCap || !this.middle || !this.rightCap) {
      return this
    }

    if (this.middle.displayWidth < 1) {
      this.leftCap.visible = false
      this.middle.visible = false
      this.rightCap.visible = false
    }

    return this
  }

  private layoutSegments(): ProgressBar {
    if (!this.leftCap || !this.middle || !this.rightCap) {
      return this
    }

    this.leftCap.x = this.x
    this.leftCap.y = this.y

    this.middle.x = this.leftCap.x + this.leftCap.width
    this.middle.y = this.leftCap.y

    this.rightCap.x = this.middle.x + this.middle.displayWidth
    this.rightCap.y = this.middle.y

    return this
  }

  private layoutShadow(): ProgressBar {
    if (!this.leftShadowCap || !this.middleShadow || !this.rightShadowCap) {
      return this
    }

    this.leftShadowCap.x = this.x
    this.leftShadowCap.y = this.y

    this.middleShadow.x = this.leftShadowCap.x + this.leftShadowCap.width
    this.middleShadow.y = this.leftShadowCap.y

    this.rightShadowCap.x = this.middleShadow.x + this.middleShadow.displayWidth
    this.rightShadowCap.y = this.middleShadow.y

    return this
  }
}
