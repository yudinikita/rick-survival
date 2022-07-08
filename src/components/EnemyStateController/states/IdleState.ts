import Enemy from '../../EnemyController/Enemy'

export default class IdleState {
  private enemy: Enemy

  constructor(enemy: Enemy) {
    this.enemy = enemy
  }

  enter() {
    !this.enemy.anims.isPlaying &&
      this.enemy.setFrame(this.enemy.typeEnemy + '_down_1')
  }
}
