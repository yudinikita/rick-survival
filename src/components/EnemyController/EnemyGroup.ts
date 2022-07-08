import Phaser from 'phaser'
import enemyConstants from '../../config/enemyConstants'
import getRandomPointAround from '../../utils/getRandomPointAround'
import Player from '../Player'
import constants from '../../config/constants'
import TargetBot from './list/TargetBot'
import Shnyuk from './list/Shnyuk'
import Enemy from './Enemy'
import AntsInMyEyesJohnson from './list/AntsInMyEyesJohnson'
import Concerto from './list/Concerto'
import FloopyDoops from './list/FloopyDoops'
import Froopy5 from './list/Froopy5'
import Froopy14 from './list/Froopy14'
import FroopyTommy from './list/FroopyTommy'
import GeneralGromflamite from './list/GeneralGromflamite'
import Gobo from './list/Gobo'
import GromflamiteSoldier from './list/GromflamiteSoldier'
import Hamurai from './list/Hamurai'
import Hemorrhage from './list/Hemorrhage'
import Jaguar from './list/Jaguar'
import Kiara from './list/Kiara'
import MrNimbus from './list/MrNimbus'
import NoobNoob from './list/NoobNoob'
import PrincessPoneta from './list/PrincessPoneta'
import RisottoGroupon from './list/RisottoGroupon'
import ScaryTerry from './list/ScaryTerry'
import Schleemypants from './list/Schleemypants'
import ShonoopyBloopers from './list/ShonoopyBloopers'
import Squanchy from './list/Squanchy'
import Terryfold from './list/Terryfold'
import type { EnemyType } from '../../types/enemies'

export default class EnemyGroup extends Phaser.Physics.Arcade.Group {
  private keyFrame = ''

  constructor(scene: Phaser.Scene, type: EnemyType, count?: number) {
    super(scene.physics.world, scene)
    this.loadEnemy(type, count)
    this.setDepth(10)

    this.scene.physics.add.collider(this, this)

    scene.events.on(constants.EVENTS.UI.UPDATE_KILL_COUNT, (enemy: Enemy) => {
      this.removeEnemy(enemy)
    })
  }

  public spawn(player: Player): void {
    const randomPoint = getRandomPointAround(player.x, player.y)

    const enemy = this.getFirstDead(true, randomPoint.x, randomPoint.y) as Enemy

    if (enemy) {
      enemy.setTarget = player
      enemy.spawn(randomPoint.x, randomPoint.y)
    }
  }

  public removeEnemy(enemy: Enemy): void {
    this.killAndHide(enemy)
    enemy.enableBody(
      true,
      constants.DEFAULT_SPAWN.ENEMIES.X,
      constants.DEFAULT_SPAWN.ENEMIES.Y,
      false,
      false
    )
  }

  public loadEnemy(type: EnemyType, count = 0) {
    this.clear()
    this.setupEnemy(type)

    this.createMultiple({
      classType: this.classType,
      frameQuantity: count,
      active: false,
      visible: false,
      key: this.keyFrame,
      setScale: { x: 0.6, y: 0.6 },
      setXY: {
        x: constants.DEFAULT_SPAWN.ENEMIES.X,
        y: constants.DEFAULT_SPAWN.ENEMIES.Y,
      },
    })

    return this
  }

  public update(time: number, delta: number): void {
    for (const enemy of this.getMatching('active', true)) {
      const enemyActor = enemy as Enemy
      enemyActor.update(time, delta)
    }
  }

  private setupEnemy(type: EnemyType): void {
    switch (type) {
      case enemyConstants.AntsInMyEyesJohnson.type:
        this.classType = AntsInMyEyesJohnson
        this.keyFrame = enemyConstants.AntsInMyEyesJohnson.keyFrame
        break
      case enemyConstants.Concerto.type:
        this.classType = Concerto
        this.keyFrame = enemyConstants.Concerto.keyFrame
        break
      case enemyConstants.FloopyDoops.type:
        this.classType = FloopyDoops
        this.keyFrame = enemyConstants.FloopyDoops.keyFrame
        break
      case enemyConstants.Froopy5.type:
        this.classType = Froopy5
        this.keyFrame = enemyConstants.Froopy5.keyFrame
        break
      case enemyConstants.Froopy14.type:
        this.classType = Froopy14
        this.keyFrame = enemyConstants.Froopy14.keyFrame
        break
      case enemyConstants.FroopyTommy.type:
        this.classType = FroopyTommy
        this.keyFrame = enemyConstants.FroopyTommy.keyFrame
        break
      case enemyConstants.GeneralGromflamite.type:
        this.classType = GeneralGromflamite
        this.keyFrame = enemyConstants.GeneralGromflamite.keyFrame
        break
      case enemyConstants.Gobo.type:
        this.classType = Gobo
        this.keyFrame = enemyConstants.Gobo.keyFrame
        break
      case enemyConstants.GromflamiteSoldier.type:
        this.classType = GromflamiteSoldier
        this.keyFrame = enemyConstants.GromflamiteSoldier.keyFrame
        break
      case enemyConstants.Hamurai.type:
        this.classType = Hamurai
        this.keyFrame = enemyConstants.Hamurai.keyFrame
        break
      case enemyConstants.Hemorrhage.type:
        this.classType = Hemorrhage
        this.keyFrame = enemyConstants.Hemorrhage.keyFrame
        break
      case enemyConstants.Jaguar.type:
        this.classType = Jaguar
        this.keyFrame = enemyConstants.Jaguar.keyFrame
        break
      case enemyConstants.Kiara.type:
        this.classType = Kiara
        this.keyFrame = enemyConstants.Kiara.keyFrame
        break
      case enemyConstants.MrNimbus.type:
        this.classType = MrNimbus
        this.keyFrame = enemyConstants.MrNimbus.keyFrame
        break
      case enemyConstants.NoobNoob.type:
        this.classType = NoobNoob
        this.keyFrame = enemyConstants.NoobNoob.keyFrame
        break
      case enemyConstants.PrincessPoneta.type:
        this.classType = PrincessPoneta
        this.keyFrame = enemyConstants.PrincessPoneta.keyFrame
        break
      case enemyConstants.RisottoGroupon.type:
        this.classType = RisottoGroupon
        this.keyFrame = enemyConstants.RisottoGroupon.keyFrame
        break
      case enemyConstants.ScaryTerry.type:
        this.classType = ScaryTerry
        this.keyFrame = enemyConstants.ScaryTerry.keyFrame
        break
      case enemyConstants.Schleemypants.type:
        this.classType = Schleemypants
        this.keyFrame = enemyConstants.Schleemypants.keyFrame
        break
      case enemyConstants.Shnyuk.type:
        this.classType = Shnyuk
        this.keyFrame = enemyConstants.Shnyuk.keyFrame
        break
      case enemyConstants.ShonoopyBloopers.type:
        this.classType = ShonoopyBloopers
        this.keyFrame = enemyConstants.ShonoopyBloopers.keyFrame
        break
      case enemyConstants.Squanchy.type:
        this.classType = Squanchy
        this.keyFrame = enemyConstants.Squanchy.keyFrame
        break
      case enemyConstants.TargetBot.type:
        this.classType = TargetBot
        this.keyFrame = enemyConstants.TargetBot.keyFrame
        break
      case enemyConstants.Terryfold.type:
        this.classType = Terryfold
        this.keyFrame = enemyConstants.Terryfold.keyFrame
        break
    }
  }
}
