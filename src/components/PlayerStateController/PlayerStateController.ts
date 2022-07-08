import Player from '../Player'
import IdleState from './states/IdleState'
import MoveLeftState from './states/MoveLeftState'
import MoveRightState from './states/MoveRightState'
import MoveDownState from './states/MoveDownState'
import MoveUpState from './states/MoveUpState'

export type PlayerStateType =
  | 'idle'
  | 'moveLeft'
  | 'moveRight'
  | 'moveDown'
  | 'moveUp'

export default class PlayerStateController {
  private states: { [key: string]: { enter: () => void } }

  private currentState = { enter: () => {} }

  constructor(player: Player) {
    this.states = {
      idle: new IdleState(player),
      moveLeft: new MoveLeftState(player),
      moveRight: new MoveRightState(player),
      moveDown: new MoveDownState(player),
      moveUp: new MoveUpState(player),
    }
  }

  setState(name: PlayerStateType) {
    if (this.currentState === this.states[name]) {
      return
    }

    this.currentState = this.states[name]
    this.currentState.enter()
  }
}
