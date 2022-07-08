import Wave from '../Waves/Wave'
import constants from '../../config/constants'
import WaveAction, { WaveActionFunction } from '../Waves/WaveAction'
import Player from '../Player'
import EnemyGroup from '../EnemyController/EnemyGroup'
import type { WorldConfig } from '../../config/worldsConfig'
import type { EnemyType } from '../../types/enemies'

export default class WavesController {
  private readonly scene: Phaser.Scene
  private readonly player: Player
  private readonly allEnemies: EnemyGroup[]
  private readonly enemyAction: WaveActionFunction

  constructor(scene: Phaser.Scene, player: Player) {
    this.scene = scene
    this.player = player
    this.allEnemies = []

    this.enemyAction = (enemyGroup) => {
      enemyGroup.spawn(this.player)
    }
  }

  private createAction(
    enemyType: EnemyType,
    count: number,
    interval = 1
  ): WaveAction {
    const countInGroup = Math.min(constants.ENEMY.MAXIMUM_IN_GROUP, count)

    const group = new EnemyGroup(this.scene, enemyType, countInGroup)
    this.allEnemies.push(group)

    const actionName = `Spawn ${enemyType} [${count}]`
    return new WaveAction(actionName, group, count, this.enemyAction, interval)
  }

  private createWavesWorld0(): Wave[] {
    const waveActions1 = [this.createAction('TargetBot', 60, 1)]
    const wave1 = new Wave('Wave 1', waveActions1)

    const waveActions2 = [
      this.createAction('FloopyDoops', 25, 1),
      this.createAction('Froopy5', 25, 1),
      this.createAction('RisottoGroupon', 1, 1),
    ]
    const wave2 = new Wave('Wave 2', waveActions2)

    const waveActions3 = [
      this.createAction('FloopyDoops', 50, 0.5),
      this.createAction('TargetBot', 50, 0.5),
    ]
    const wave3 = new Wave('Wave 3', waveActions3)

    const waveActions4 = [
      this.createAction('NoobNoob', 40, 0.25),
      this.createAction('RisottoGroupon', 1, 1),
    ]
    const wave4 = new Wave('Wave 4', waveActions4)

    const waveActions5 = [
      this.createAction('NoobNoob', 30, 1),
      this.createAction('AntsInMyEyesJohnson', 30, 1),
    ]
    const wave5 = new Wave('Wave 5', waveActions5)

    const waveActions6 = [
      this.createAction('Shnyuk', 10, 1),
      this.createAction('Hemorrhage', 1, 1),
    ]
    const wave6 = new Wave('Wave 6', waveActions6)

    const waveActions7 = [
      this.createAction('Shnyuk', 20, 0.5),
      this.createAction('Froopy5', 20, 0.5),
    ]
    const wave7 = new Wave('Wave 7', waveActions7)

    const waveActions8 = [
      this.createAction('TargetBot', 45, 0.5),
      this.createAction('ShonoopyBloopers', 45, 0.5),
      this.createAction('RisottoGroupon', 1, 1),
    ]
    const wave8 = new Wave('Wave 8', waveActions8)

    const waveActions9 = [
      this.createAction('Froopy5', 30, 1.5),
      this.createAction('Froopy14', 1, 1),
    ]
    const wave9 = new Wave('Wave 9', waveActions9)

    const waveActions10 = [
      this.createAction('Froopy14', 10, 0.5),
      this.createAction('Froopy5', 25, 0.5),
      this.createAction('RisottoGroupon', 1, 1),
    ]
    const wave10 = new Wave('Wave 10', waveActions10)

    const waveActions11 = [
      this.createAction('ShonoopyBloopers', 25, 0.5),
      this.createAction('Shnyuk', 25, 0.5),
      this.createAction('Hemorrhage', 1, 1),
    ]
    const wave11 = new Wave('Wave 11', waveActions11)

    const waveActions12 = [this.createAction('NoobNoob', 300, 0.1)]
    const wave12 = new Wave('Wave 12', waveActions12)

    const waveActions13 = [
      this.createAction('AntsInMyEyesJohnson', 20, 0.25),
      this.createAction('Squanchy', 20, 0.25),
      this.createAction('NoobNoob', 20, 0.25),
      this.createAction('Concerto', 1, 1),
    ]
    const wave13 = new Wave('Wave 13', waveActions13)

    const waveActions14 = [
      this.createAction('AntsInMyEyesJohnson', 30, 0.5),
      this.createAction('Squanchy', 30, 0.5),
    ]
    const wave14 = new Wave('Wave 14', waveActions14)

    const waveActions15 = [
      this.createAction('Froopy14', 20, 0.1),
      this.createAction('Squanchy', 20, 0.1),
      this.createAction('RisottoGroupon', 1, 1),
    ]
    const wave15 = new Wave('Wave 15', waveActions15)

    const waveActions16 = [
      this.createAction('Squanchy', 100, 0.1),
      this.createAction('Froopy14', 100, 0.1),
      this.createAction('Shnyuk', 100, 0.1),
      this.createAction('Hamurai', 1, 1),
    ]
    const wave16 = new Wave('Wave 16', waveActions16)

    const waveActions17 = [
      this.createAction('Hemorrhage', 100, 0.1),
      this.createAction('Shnyuk', 100, 0.1),
      this.createAction('ShonoopyBloopers', 100, 0.1),
      this.createAction('RisottoGroupon', 1, 1),
    ]
    const wave17 = new Wave('Wave 17', waveActions17)

    const waveActions18 = [this.createAction('ScaryTerry', 20, 1)]
    const wave18 = new Wave('Wave 18', waveActions18)

    const waveActions19 = [
      this.createAction('ShonoopyBloopers', 25, 0.5),
      this.createAction('ScaryTerry', 25, 0.5),
      this.createAction('RisottoGroupon', 1, 1),
    ]
    const wave19 = new Wave('Wave 19', waveActions19)

    const waveActions20 = [
      this.createAction('ShonoopyBloopers', 30, 0.5),
      this.createAction('PrincessPoneta', 30, 0.5),
    ]
    const wave20 = new Wave('Wave 20', waveActions20)

    const waveActions21 = [
      this.createAction('Shnyuk', 100, 0.1),
      this.createAction('Froopy14', 100, 0.1),
      this.createAction('ScaryTerry', 100, 0.1),
      this.createAction('Jaguar', 1, 1),
    ]
    const wave21 = new Wave('Wave 21', waveActions21)

    const waveActions22 = [
      this.createAction('Gobo', 300, 0.1),
      this.createAction('MrNimbus', 1, 1),
      this.createAction('RisottoGroupon', 1, 1),
    ]
    const wave22 = new Wave('Wave 22', waveActions22)

    const waveActions23 = [
      this.createAction('Gobo', 200, 0.1),
      this.createAction('ScaryTerry', 200, 0.1),
      this.createAction('Concerto', 1, 1),
    ]
    const wave23 = new Wave('Wave 23', waveActions23)

    const waveActions24 = [
      this.createAction('Terryfold', 300, 0.1),
      this.createAction('PrincessPoneta', 300, 0.1),
      this.createAction('Jaguar', 1, 1),
    ]
    const wave24 = new Wave('Wave 24', waveActions24)

    const waveActions25 = [
      this.createAction('FroopyTommy', 300, 0.1),
      this.createAction('ScaryTerry', 300, 0.1),
      this.createAction('MrNimbus', 1, 1),
    ]
    const wave25 = new Wave('Wave 25', waveActions25)

    const waveActions26 = [
      this.createAction('MrNimbus', 100, 0.1),
      this.createAction('Kiara', 1, 1),
    ]
    const wave26 = new Wave('Wave 26', waveActions26)

    const waveActions27 = [
      this.createAction('Concerto', 300, 0.1),
      this.createAction('MrNimbus', 300, 0.1),
    ]
    const wave27 = new Wave('Wave 27', waveActions27)

    const waveActions28 = [
      this.createAction('Froopy14', 300, 0.1),
      this.createAction('Shnyuk', 300, 0.1),
      this.createAction('ScaryTerry', 300, 0.1),
      this.createAction('GromflamiteSoldier', 1, 1),
    ]
    const wave28 = new Wave('Wave 28', waveActions28)

    const waveActions29 = [
      this.createAction('RisottoGroupon', 300, 0.1),
      this.createAction('Froopy14', 300, 0.1),
    ]
    const wave29 = new Wave('Wave 29', waveActions29)

    const waveActions30 = [
      this.createAction('GromflamiteSoldier', 300, 0.1),
      this.createAction('GeneralGromflamite', 300, 0.1),
    ]
    const wave30 = new Wave('Wave 30', waveActions30)

    const waveActions31 = [this.createAction('Schleemypants', 4, 14)]
    const wave31 = new Wave('Wave 31', waveActions31)

    return [
      wave1,
      wave2,
      wave3,
      wave4,
      wave5,
      wave6,
      wave7,
      wave8,
      wave9,
      wave10,
      wave11,
      wave12,
      wave13,
      wave14,
      wave15,
      wave16,
      wave17,
      wave18,
      wave19,
      wave20,
      wave21,
      wave22,
      wave23,
      wave24,
      wave25,
      wave26,
      wave27,
      wave28,
      wave29,
      wave30,
      wave31,
    ]
  }

  private createWavesWorld1(): Wave[] {
    const wave1 = new Wave('Wave 1', [
      this.createAction('TargetBot', 30, 0.1),
      this.createAction('FroopyTommy', 15, 0.1),
      this.createAction('Schleemypants', 4, 0.1),
      //this.createAction('Schleemypants', 1, 0.1),
    ])

    return [wave1]
  }

  public getWaves(world: WorldConfig): Wave[] {
    switch (world.id) {
      default:
        return this.createWavesWorld0()
    }
  }

  public get getAllEnemies(): EnemyGroup[] {
    return this.allEnemies
  }
}
