import Enemy from '../../EnemyController/Enemy'

export default class MoveLeftState {
  private enemy: Enemy

  constructor(enemy: Enemy) {
    this.enemy = enemy
  }

  enter() {
    this.enemy.anims.play(this.enemy.typeEnemy + '_left', true)
    this.enemy.checkFlip()
  }
}
