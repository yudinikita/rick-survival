import EnemyGroup from '../EnemyController/EnemyGroup'

export type WaveActionFunction = (enemyGroup: EnemyGroup) => void

export default class WaveAction {
  public name: string
  public enemyGroup: EnemyGroup
  public spawnCount: number
  public actionFunction: WaveActionFunction
  public interval?: number

  constructor(
    name: string,
    enemyGroup: EnemyGroup,
    spawnCount: number,
    actionFunction: WaveActionFunction,
    interval?: number
  ) {
    this.name = name
    this.enemyGroup = enemyGroup
    this.spawnCount = spawnCount
    this.actionFunction = actionFunction
    this.interval = interval
  }
}
