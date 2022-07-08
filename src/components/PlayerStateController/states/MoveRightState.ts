import Player from '../../Player'

export default class MoveRightState {
  private player: Player

  constructor(player: Player) {
    this.player = player
  }

  enter() {
    !this.player.anims.isPlaying &&
      this.player.anims.play(this.player.getCurrentType + '_right', true)
    this.player.setVelocityX(this.player.getSpeed)
    this.player.checkFlip()
  }
}
