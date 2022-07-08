import Player from '../../Player'

export default class IdleState {
  private player: Player

  constructor(player: Player) {
    this.player = player
  }

  enter() {
    !this.player.anims.isPlaying &&
      this.player.setFrame(this.player.getCurrentType + '_down_1')
    this.player.setVelocity(0, 0)
  }
}
