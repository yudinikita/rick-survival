import Player from '../../Player'

export default class MoveDownState {
  private player: Player

  constructor(player: Player) {
    this.player = player
  }

  enter() {
    !this.player.anims.isPlaying &&
      this.player.anims.play(this.player.getCurrentType + '_down', true)
    this.player.setVelocityY(this.player.getSpeed)
  }
}
