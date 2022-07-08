import Enemy from '../../EnemyController/Enemy'

export default class MoveDownState {
  private enemy: Enemy

  constructor(enemy: Enemy) {
    this.enemy = enemy
  }

  enter() {
    this.enemy.anims.play(this.enemy.typeEnemy + '_down', true)
  }
}
