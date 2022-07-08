import Enemy from '../../EnemyController/Enemy'

export default class MoveRightState {
  private enemy: Enemy

  constructor(enemy: Enemy) {
    this.enemy = enemy
  }

  enter() {
    this.enemy.anims.play(this.enemy.typeEnemy + '_right', true)
    this.enemy.checkFlip()
  }
}
