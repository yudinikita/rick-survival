import { PlayerSkillType } from '../components/PlayerLevelController'
import EVENTS from './events'
import type { PlayerNameType } from '../types/players'
import type { WeaponType } from '../types/weapons'

const DEBUG = false
const CHEATS = false

const SCALE = 1

const width =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth

const height =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight

export default {
  WIDTH: width * SCALE,
  HEIGHT: height * SCALE,
  SCALE,
  CHEATS,
  AUTHOR: 'Created by: Nikita Yudin | nikitayudin782@gmail.com',
  DEBUG,
  CURSOR: {
    DEFAULT: 'url(assets/cursors/default.cur), pointer',
    POINTER: 'url(assets/cursors/pointer.cur), pointer',
  },
  HEALTH_BAR: {
    WIDTH: 70,
    HEIGHT: 10,
  },
  FONT: {
    FAMILY: 'Ubuntu, sans-serif',
  },
  BASE_URL: {
    ASSETS: 'assets/',
  },
  SCENES: {
    LOADING: 'loading-scene',
    MAIN_MENU: 'main-menu-scene',
    GAME_MAIN: 'game-main-scene',
    GAME_FIELD: 'game-scene',
    GAME_PAUSE: 'game-pause-scene',
    GAME_OVER: 'game-over-scene',
    GAME_UI: 'game-ui-scene',
    GAME_SKILL_UP: 'game-skill-up-scene',
    PLAYER_UPGRADE: 'player-upgrade-scene',
    MAP_SELECT: 'map-select-scene',
    SETTINGS: 'settings-scene',
    AUDIO: 'audio-scene',
  },
  LEVEL: {
    WIDTH: 50,
    HEIGHT: 50,
    PROBABILITY: 0.33,
    TILE_SIZE: 64,
    CAMERA: {
      NAME: 'base-camera',
    },
  },
  EVENTS,
  DIFFICULTY: {
    RATE: 0.2,
  },
  PLAYER: {
    DEFAULT: {
      TYPE: 'RickDefault' as PlayerNameType,
      FRAME: 'RickDefault_down_1',
      WEAPON: 'Pistol' as WeaponType,
      REGENERATION: 1,
      REGENERATION_TIME: 1000,
      MAX_HEALTH: 100,
      BODY_DAMAGE: 0.5,
      BODY_ATTACK_TIME: 1000,
      BULLET_SPEED: 350,
      BULLET_DAMAGE: 5,
      ATTACK_RATE: 100,
      SPEED: 200,
      RADIUS_ATTACK: 700,
    },
    LEVEL_RATE: {
      DEFAULT: 5,
      EARLY: 10,
      MIDDLE: 13,
      LATE: 16,
    },
    SKILLS: {
      REGEN: {
        NAME: 'Восст. здоровья',
        TYPE: 'regen' as PlayerSkillType,
        COLOR: '#EC5092',
        RATE: 1,
      },
      HEALTH: {
        NAME: 'Макс. здоровья',
        TYPE: 'health' as PlayerSkillType,
        COLOR: '#E23C4B',
        RATE: 1,
      },
      BODY: {
        NAME: 'Урон телом',
        TYPE: 'body' as PlayerSkillType,
        COLOR: '#CE34CD',
        RATE: 1,
      },
      BULLET: {
        NAME: 'Скорость пули',
        TYPE: 'bullet' as PlayerSkillType,
        COLOR: '#E1B035',
        RATE: 1,
      },
      DAMAGE: {
        NAME: 'Урон оружия',
        TYPE: 'damage' as PlayerSkillType,
        COLOR: '#E26034',
        RATE: 1,
      },
      RELOAD: {
        NAME: 'Перезарядка',
        TYPE: 'reload' as PlayerSkillType,
        COLOR: '#4EBA28',
        RATE: 1,
      },
      SPEED: {
        NAME: 'Скорость движения',
        TYPE: 'speed' as PlayerSkillType,
        COLOR: '#34ACE2',
        RATE: 1,
      },
    },
  },
  ENEMY: {
    SHOW_FLOAT_DAMAGE: true,
    DROP_ITEM_RATE: 0.7,
    MAXIMUM_IN_GROUP: 1,
  },
  DEFAULT_SPAWN: {
    ENEMIES: { X: -1000, Y: -1000 },
    BULLETS: { X: -500, Y: -500 },
  },
  ITEMS: {
    TEXTURE: 'game-items',
  },
  BULLETS: {
    TEXTURE: 'bullets',
  },
}
