import Player from '../../Player'

export default class MoveLeftState {
  private player: Player

  constructor(player: Player) {
    this.player = player
  }

  enter() {
    !this.player.anims.isPlaying &&
      this.player.anims.play(this.player.getCurrentType + '_left', true)
    this.player.setVelocityX(-this.player.getSpeed)
    this.player.checkFlip()
  }
}
