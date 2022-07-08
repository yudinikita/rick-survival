import Enemy from '../../EnemyController/Enemy'

export default class MoveUpState {
  private enemy: Enemy

  constructor(enemy: Enemy) {
    this.enemy = enemy
  }

  enter() {
    this.enemy.anims.play(this.enemy.typeEnemy + '_up', true)
  }
}
