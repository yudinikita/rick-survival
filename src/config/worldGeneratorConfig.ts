import constants from './constants'
import type { CellsType } from '../components/WorldController'

const cells: CellsType = {
  grass: {
    key: 'grass',
    frame: 'tile000',
    weight: 500,
  },
  flower: {
    key: 'flower',
    frame: 'tile001',
    weight: 50,
  },
  sand: {
    key: 'sand',
    frame: 'tile002',
    weight: 1,
  },
  stone: {
    key: 'stone',
    frame: 'tile003',
    weight: 25,
  },
  stoneTile: {
    key: 'stoneTile',
    frame: 'tile004',
    weight: 10,
  },
  water: {
    key: 'water',
    frame: 'tile005',
    weight: 1,
  },
}

const worldGeneratorConfig = {
  width: constants.LEVEL.WIDTH,
  height: constants.LEVEL.HEIGHT,
  probability: constants.LEVEL.PROBABILITY,
  cells,
}

export default worldGeneratorConfig
