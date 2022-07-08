import Phaser from 'phaser'
import gameConfig from './config/gameConfig'

const game = new Phaser.Game(gameConfig)

window.addEventListener(
  'resize',
  (event) => {
    if (game.scale.isFullscreen) {
      if (game.scale.autoCenter != Phaser.Scale.Center.CENTER_BOTH) {
        game.scale.scaleMode = Phaser.Scale.ScaleModes.ENVELOP // scalemode in fullscreen does nothing
        game.scale.autoCenter = Phaser.Scale.Center.CENTER_BOTH // centering in fullscreen
        game.scale.refresh()
      }
    } else {
      if (game.scale.autoCenter != Phaser.Scale.Center.CENTER_HORIZONTALLY) {
        game.scale.autoCenter = Phaser.Scale.Center.CENTER_HORIZONTALLY // initial centering
        game.scale.scaleMode = Phaser.Scale.ScaleModes.WIDTH_CONTROLS_HEIGHT // initial scalemode
        game.scale.refresh()
      }
    }
  },
  false
)

export default game
