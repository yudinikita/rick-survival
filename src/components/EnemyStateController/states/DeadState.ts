import Enemy from '../../EnemyController/Enemy'

export default class DeadState {
  private enemy: Enemy

  constructor(enemy: Enemy) {
    this.enemy = enemy
  }

  enter() {
    const bloods = this.enemy.getBloods

    const randomIndex = Math.floor(Math.random() * bloods.length)
    const blood = bloods[randomIndex]

    blood.setVisible(true)
    blood.setPosition(this.enemy.x, this.enemy.y)
    blood.play('dead').on('animationcomplete', () => {
      blood.setVisible(false)
    })
  }
}
