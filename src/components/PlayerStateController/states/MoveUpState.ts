import Player from '../../Player'

export default class MoveUpState {
  private player: Player

  constructor(player: Player) {
    this.player = player
  }

  enter() {
    !this.player.anims.isPlaying &&
      this.player.anims.play(this.player.getCurrentType + '_up', true)
    this.player.setVelocityY(-this.player.getSpeed)
  }
}
