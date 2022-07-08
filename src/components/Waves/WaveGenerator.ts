import waveConstants from '../../config/waveConstants'
import Wave from './Wave'
import WaveAction from './WaveAction'

export default class WaveGenerator {
  public waves: Wave[]

  private scene: Phaser.Scene

  private currentWave: Wave | null
  private currentAction: WaveAction | null
  private spawnCount = 0

  private currentSpawnRate = 1

  private timerNextWave!: Phaser.Time.TimerEvent
  private timerRelease!: Phaser.Time.TimerEvent
  private timerTick!: Phaser.Time.TimerEvent

  constructor(scene: Phaser.Scene, waves: Wave[]) {
    this.scene = scene
    this.waves = waves

    this.currentWave = null
    this.currentAction = null

    this.initTimers()
    this.nextWave()
  }

  private initTimers() {
    this.timerNextWave = this.scene.time.addEvent({
      delay: waveConstants.DELAY.NEXT_WAVE,
      callback: () => this.nextWave(),
      callbackScope: this,
      loop: true,
    })

    this.timerRelease = this.scene.time.addEvent({
      delay: waveConstants.DELAY.RELEASE,
      callback: () => this.release(),
      callbackScope: this,
      loop: true,
    })

    this.timerTick = this.scene.time.addEvent({
      delay: waveConstants.DELAY.TICK * this.currentSpawnRate,
      callback: () => this.tick(),
      callbackScope: this,
      loop: true,
    })
  }

  private updateTickRate(newSpawnRate: number) {
    this.timerTick.reset({
      delay: waveConstants.DELAY.TICK * newSpawnRate,
      callback: () => this.tick(),
      callbackScope: this,
      loop: true,
    })
  }

  public nextWave() {
    this.currentWave = this.waves.shift() || null
  }

  public release() {
    if (this.currentWave && this.currentWave.actions && !this.currentAction) {
      this.currentAction = this.currentWave.actions.shift() || null

      this.spawnCount = this.currentAction?.spawnCount || 0
      const spawnRate = this.currentAction?.interval || 1

      this.updateTickRate(spawnRate)
    }
  }

  public tick() {
    if (this.spawnCount > 0) {
      const action = this.currentAction
      action?.actionFunction(action?.enemyGroup)
      this.spawnCount--
      if (this.spawnCount === 0) {
        this.currentAction = null
      }
    }
  }
}
