export default class Portal extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y)

    this.createPortal()
  }

  private createPortal(): void {
    for (let index = 1; index < 5; index++) {
      const portalTexture = this.scene.physics.add.image(0, 0, 'portal', index)

      const radius = portalTexture.width / 3.5
      portalTexture.body.setCircle(
        radius,
        -radius + 0.5 * portalTexture.width,
        -radius + 0.5 * portalTexture.height
      )

      this.scene.tweens.add({
        targets: portalTexture,
        rotation: 360,
        duration: Phaser.Math.Between(500_000, 1_000_000),
        ease: 'Linear',
        repeat: -1,
      })

      this.add(portalTexture)
    }
  }

  public addPortal(x: number, y: number): void {
    this.scale = 0
    this.setPosition(x, y)

    this.scene.add.existing(this)

    this.scene.tweens.add({
      targets: this,
      scale: 1,
      duration: 1500,
      ease: 'Linear',
    })
  }

  public destroyPortal(): void {
    this.scene.sound.play('portal-close', {
      volume: 0.2,
    })

    this.scene.tweens.add({
      targets: this,
      scale: 0,
      duration: 700,
      ease: 'Linear',
      onComplete: () => {
        this.destroy(true)
      },
    })
  }
}
