const EVENTS = {
  GAME: {
    PAUSE: 'game.pause',
    RESUME: 'game.resume',
    EXIT: 'game.exit',
    GAME_OVER: 'game.game-over',
  },
  UI: {
    UPDATE_KILL_COUNT: 'ui.update-kill-count',
    UPDATE_EXP_LEVEL: 'ui.update-exp-level',
    UPDATE_PLAYER_LEVEL: 'ui.update-player-level',
    UPDATE_MONEY: 'ui.update-money',
  },
  ENEMY: {
    KILLED: 'enemy.killed',
    TAKE_DAMAGE: 'enemy.take-damage',
  },
  PLAYER: {
    ADD_EXP: 'player.add-exp',
    LEVEL_UP: 'player.level-up',
    SKILL_UP: 'player.skill-up',
    EVOLUTION: {
      SELECT: 'player.evolution.select',
      CHANGE_TITLE: 'player.evolution.change-title',
      CHANGE_FRONT: 'player.evolution.change-front',
      CHANGE_STATS: 'player.evolution.change-stats',
    },
  },
}

export default EVENTS
