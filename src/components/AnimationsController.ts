import Phaser from 'phaser'

export default class AnimationsController {
  private scene: Phaser.Scene
  private gameObject: Phaser.GameObjects.GameObject

  constructor(scene: Phaser.Scene, gameObject: Phaser.GameObjects.GameObject) {
    this.scene = scene
    this.gameObject = gameObject
  }

  public initPlayerAnimations(): void {
    const framesKey = 'player'
    const frameRate = 7

    this.scene.anims.create({
      key: framesKey + '-run-front',
      frames: this.scene.anims.generateFrameNames(framesKey, {
        prefix: 'run-front-',
        start: 4,
        end: 1,
      }),
      frameRate: frameRate,
    })

    this.scene.anims.create({
      key: framesKey + '-run-left',
      frames: this.scene.anims.generateFrameNames(framesKey, {
        prefix: 'run-left-',
        start: 4,
        end: 1,
      }),
      frameRate: frameRate,
    })

    this.scene.anims.create({
      key: framesKey + '-run-right',
      frames: this.scene.anims.generateFrameNames(framesKey, {
        prefix: 'run-left-',
        start: 4,
        end: 1,
      }),
      frameRate: frameRate,
    })

    this.scene.anims.create({
      key: framesKey + '-run-back',
      frames: this.scene.anims.generateFrameNames(framesKey, {
        prefix: 'run-back-',
        start: 4,
        end: 1,
      }),
      frameRate: frameRate,
    })
  }

  public initEnemyAnimations(): void {
    const framesKey = 'enemy'
    const frameRate = 7

    this.scene.anims.create({
      key: framesKey + '-run-front',
      frames: this.scene.anims.generateFrameNames(framesKey, {
        prefix: 'run-front-',
        start: 4,
        end: 1,
      }),
      frameRate: frameRate,
    })

    this.scene.anims.create({
      key: framesKey + '-run-left',
      frames: this.scene.anims.generateFrameNames(framesKey, {
        prefix: 'run-left-',
        start: 4,
        end: 1,
      }),
      frameRate: frameRate,
      showOnStart: true,
    })

    this.scene.anims.create({
      key: framesKey + '-run-right',
      frames: this.scene.anims.generateFrameNames(framesKey, {
        prefix: 'run-left-',
        start: 4,
        end: 1,
      }),
      frameRate: frameRate,
      showOnStart: true,
    })

    this.scene.anims.create({
      key: framesKey + '-run-back',
      frames: this.scene.anims.generateFrameNames(framesKey, {
        prefix: 'run-back-',
        start: 4,
        end: 1,
      }),
      frameRate: frameRate,
      showOnStart: true,
    })
  }

  public addAnimations(
    name: string,
    frameRate = 7,
    config?: Phaser.Types.Animations.Animation
  ): void {
    const framesKey = name

    this.scene.anims.create({
      key: name + '_up',
      frames: this.scene.anims.generateFrameNames(framesKey, {
        prefix: name + '_up_',
        start: 4,
        end: 1,
      }),
      frameRate: frameRate,
      repeat: -1,
      ...config,
    })

    this.scene.anims.create({
      key: name + '_left',
      frames: this.scene.anims.generateFrameNames(framesKey, {
        prefix: name + '_side_',
        start: 4,
        end: 1,
      }),
      frameRate: frameRate,
      repeat: -1,
      ...config,
    })

    this.scene.anims.create({
      key: name + '_right',
      frames: this.scene.anims.generateFrameNames(framesKey, {
        prefix: name + '_side_',
        start: 4,
        end: 1,
      }),
      frameRate: frameRate,
      repeat: -1,
      ...config,
    })

    this.scene.anims.create({
      key: name + '_down',
      frames: this.scene.anims.generateFrameNames(framesKey, {
        prefix: name + '_down_',
        start: 4,
        end: 1,
      }),
      frameRate: frameRate,
      repeat: -1,
      ...config,
    })
  }
}
