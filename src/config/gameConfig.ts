import Phaser from 'phaser'
import constants from '../config/constants'
import SceneList from './sceneList'
import { plugins } from './pluginsConfig'

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Rick Survival',
  version: '1.0.0',
  type: Phaser.WEBGL,
  parent: 'game-wrapper',
  backgroundColor: '#38393D',
  width: constants.WIDTH,
  height: constants.HEIGHT,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    zoom: constants.SCALE,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: constants.DEBUG,
      fps: 61,
    },
  },
  render: {
    pixelArt: false,
  },
  autoFocus: true,
  scene: SceneList,
  plugins,
}

export default gameConfig
