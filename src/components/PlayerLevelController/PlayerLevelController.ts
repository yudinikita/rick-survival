import Phaser from 'phaser'
import Player from '../Player'
import constants from '../../config/constants'
import Portal from '../Portal/Portal'
import { PlayerSkill, PlayerSkills, PlayerSkillType } from './index'

export default class PlayerLevelController {
  private scene: Phaser.Scene
  private readonly player: Player
  private skills!: PlayerSkills

  constructor(scene: Phaser.Scene, player: Player) {
    this.scene = scene
    this.player = player

    this.initSkills()
    this.initEvents()
  }

  private initSkills(): void {
    this.skills = {
      regen: {
        type: 'regen',
        level: 0,
      },
      health: {
        type: 'health',
        level: 0,
      },
      body: {
        type: 'body',
        level: 0,
      },
      bullet: {
        type: 'bullet',
        level: 0,
      },
      damage: {
        type: 'damage',
        level: 0,
      },
      reload: {
        type: 'reload',
        level: 0,
      },
      speed: {
        type: 'speed',
        level: 0,
      },
    }
  }

  public rebuildSkills(): void {
    const skills = this.skills

    for (const skillKey in skills) {
      if (Object.prototype.hasOwnProperty.call(skills, skillKey)) {
        const skill = skills[skillKey as PlayerSkillType] as PlayerSkill
        this.buildSkillUp(skill.type, skill.level)
      }
    }
  }

  private initEvents(): void {
    this.scene.events.on(
      constants.EVENTS.PLAYER.SKILL_UP,
      (skillType: PlayerSkillType, value: number) => {
        this.buildSkillUp(skillType, value)

        this.scene.scene.pause(constants.SCENES.GAME_SKILL_UP)
        this.scene.scene.setVisible(false, constants.SCENES.GAME_SKILL_UP)

        this.scene.scene.resume(constants.SCENES.GAME_FIELD)
        this.scene.scene.resume(constants.SCENES.GAME_UI)
      },
      this
    )
  }

  private static calcExpRequired(level: number): number {
    const baseExperience = constants.PLAYER.LEVEL_RATE.DEFAULT
    let levelRate = 0

    if (level <= 20) {
      levelRate = constants.PLAYER.LEVEL_RATE.EARLY * (level - 1)
    } else if (level >= 21 && level <= 40) {
      levelRate = constants.PLAYER.LEVEL_RATE.MIDDLE * (level - 1)
    } else if (level >= 41) {
      levelRate = constants.PLAYER.LEVEL_RATE.LATE * (level - 1)
    }

    return baseExperience + levelRate
  }

  private levelUp(): void {
    this.player.addLevel(1)

    this.player.setExperienceRequired = PlayerLevelController.calcExpRequired(
      this.player.getLevel
    )

    if (
      this.player.getLevel === 15 ||
      this.player.getLevel === 20 ||
      this.player.getLevel === 25 ||
      this.player.getLevel === 30
    ) {
      this.player.addUpgradePoints(1)
      this.addPortal()
    } else {
      this.scene.sound.play('levelup', {
        volume: 0.2,
      })
      this.player.addSkillUpPoints(1)
      this.handleSkillUp()
    }
  }

  private handleSkillUp(): void {
    if (this.player.getSkillUpPoints > 0) {
      this.scene.scene.pause(constants.SCENES.GAME_FIELD)
      this.scene.scene.pause(constants.SCENES.GAME_UI)

      this.scene.scene.run(constants.SCENES.GAME_SKILL_UP)
      this.scene.scene.setVisible(true, constants.SCENES.GAME_SKILL_UP)
    }
  }

  private handleUpgrade(): void {
    const evolutions = this.player.getTypeController.getEvolutions

    if (evolutions.length > 0) {
      this.openSceneUpgrade()
    } else {
      this.player.addSkillUpPoints(1)
      this.handleSkillUp()
    }
  }

  private openSceneUpgrade(): void {
    this.scene.scene.pause(constants.SCENES.GAME_FIELD)
    this.scene.scene.pause(constants.SCENES.GAME_UI)

    this.scene.scene.launch(constants.SCENES.PLAYER_UPGRADE, {
      player: this.player,
    })
    //this.scene.scene.setVisible(true, constants.SCENES.PLAYER_UPGRADE)
  }

  private addPortal(): void {
    if (this.player.getUpgradePoints > 0) {
      this.scene.sound.play('portal-open', {
        volume: 0.2,
      })

      const place = new Phaser.Geom.Circle(this.player.x, this.player.y, 600)
      const randomPoint = place.getRandomPoint()

      const portal = new Portal(this.player.scene, 0, 0)
      portal.addPortal(randomPoint.x, randomPoint.y)

      this.player.scene.physics.add.overlap(
        portal.getAt(0),
        this.player,
        (portalObject) => {
          const portalImage = portalObject as Phaser.GameObjects.Image
          const portalImageBody = portalImage.body as Phaser.Physics.Arcade.Body
          portalImageBody.enable = false
          portal.destroyPortal()
          this.handleUpgrade()
        },
        undefined,
        this
      )
    }
  }

  private static getSkillRate(level: number, customRate?: number): number {
    const rate = customRate || constants.DIFFICULTY.RATE
    return rate * (level - 1) + 1
  }

  private buildSkillUp(skillType: PlayerSkillType, level: number): void {
    switch (skillType) {
      case 'regen':
        this.player.setRegeneration = this.getSkillRegeneration(level)
        this.skills.regen.level = level
        break
      case 'health':
        this.player.setMaximumHitPoints = this.getSkillMaximumHitPoints(level)
        this.skills.health.level = level
        break
      case 'body':
        this.player.setBodyDamage = this.getSkillBodyDamage(level)
        this.skills.body.level = level
        break
      case 'bullet':
        this.player.setBulletSpeed = this.getSkillBulletSpeed(level)
        this.skills.bullet.level = level
        break
      case 'damage':
        this.player.setBulletDamage = this.getSkillBulletDamage(level)
        this.skills.damage.level = level
        break
      case 'reload':
        this.player.setAttackRate = this.getSkillAttackRate(level)
        this.skills.reload.level = level
        break
      case 'speed':
        this.player.setSpeed = this.getSkillSpeed(level)
        this.skills.speed.level = level
        break
    }
  }

  private getSkillMaximumHitPoints(level: number): number {
    const base = constants.PLAYER.DEFAULT.MAX_HEALTH
    const characterBonus = this.player.getTypeController.getMaximumHitPoints
    const difficulty = PlayerLevelController.getSkillRate(level)
    const rate = constants.PLAYER.SKILLS.HEALTH.RATE

    return (base + characterBonus) * difficulty * rate
  }

  private getSkillRegeneration(level: number): number {
    const base = constants.PLAYER.DEFAULT.REGENERATION
    const characterBonus = this.player.getTypeController.getRegeneration
    const difficulty = PlayerLevelController.getSkillRate(level)
    const rate = constants.PLAYER.SKILLS.REGEN.RATE

    return (base + characterBonus) * difficulty * rate
  }

  private getSkillBodyDamage(level: number): number {
    const base = constants.PLAYER.DEFAULT.BODY_DAMAGE
    const characterBonus = this.player.getTypeController.getBodyDamage
    const difficulty = PlayerLevelController.getSkillRate(level, 1)
    const rate = constants.PLAYER.SKILLS.BODY.RATE

    return (base + characterBonus) * difficulty * rate
  }

  private getSkillBulletSpeed(level: number): number {
    const base = constants.PLAYER.DEFAULT.BULLET_SPEED
    const characterBonus = this.player.getTypeController.getBulletSpeed
    const difficulty = PlayerLevelController.getSkillRate(level)
    const rate = constants.PLAYER.SKILLS.BULLET.RATE

    return (base + characterBonus) * difficulty * rate
  }

  private getSkillBulletDamage(level: number): number {
    const base = constants.PLAYER.DEFAULT.BULLET_DAMAGE
    const characterBonus = this.player.getTypeController.getBulletDamage
    const difficulty = PlayerLevelController.getSkillRate(level)
    const rate = constants.PLAYER.SKILLS.DAMAGE.RATE

    return (base + characterBonus) * difficulty * rate
  }

  private getSkillAttackRate(level: number): number {
    const base = constants.PLAYER.DEFAULT.ATTACK_RATE
    const characterBonus = this.player.getTypeController.getAttackRate
    const difficulty = PlayerLevelController.getSkillRate(level)
    const rate = constants.PLAYER.SKILLS.RELOAD.RATE

    return (base + characterBonus) * difficulty * rate
  }

  private getSkillSpeed(level: number): number {
    const base = constants.PLAYER.DEFAULT.SPEED
    const characterBonus = this.player.getTypeController.getSpeed
    const difficulty = PlayerLevelController.getSkillRate(level)
    const rate = constants.PLAYER.SKILLS.SPEED.RATE

    return (base + characterBonus) * difficulty * rate
  }

  public update(): void {
    if (this.player.getExperience >= this.player.getExperienceRequired) {
      this.levelUp()
    }
  }
}
