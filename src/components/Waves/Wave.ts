import WaveAction from './WaveAction'

export default class Wave {
  public name: string
  public actions: WaveAction[]

  constructor(name: string, actions: WaveAction[]) {
    this.name = name
    this.actions = actions
  }
}
