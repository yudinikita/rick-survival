import Phaser from 'phaser'
import Anchor from 'phaser3-rex-plugins/plugins/anchor'
import Clock from 'phaser3-rex-plugins/plugins/clock'
import RoundRectangleCanvas from 'phaser3-rex-plugins/plugins/roundrectanglecanvas'
import constants from '../config/constants'
import convertMsToTime from '../utils/convertMsToTime'
import { selectButton, unselectButton } from '../utils/selectButton'
import Score, { ScoreOperations } from '../components/Score'
import PlayerLevelBar from '../components/PlayerLevelBar/PlayerLevelBar'

export default class GameUI extends Phaser.Scene {
  private gameStartClock!: Clock
  private gameStartClockText!: Phaser.GameObjects.Text
  private killCountScore!: Score
  private moneyScore!: Score
  private playerLevelBar!: PlayerLevelBar

  constructor() {
    super(constants.SCENES.GAME_UI)
  }

  create() {
    this.addGameStartTimer()
    this.addPauseButton()
    this.addKillCountScore()
    this.addPlayerLevelBar()
    this.addMoney()
    this.initEvents()
  }

  private initEvents(): void {
    const gameFieldScene = this.scene.get(constants.SCENES.GAME_FIELD)

    gameFieldScene.events.on(
      constants.EVENTS.UI.UPDATE_PLAYER_LEVEL,
      this.updatePlayerLevel,
      this
    )

    gameFieldScene.events.on(
      constants.EVENTS.UI.UPDATE_KILL_COUNT,
      this.updateKillCount,
      this
    )

    gameFieldScene.events.on(
      constants.EVENTS.UI.UPDATE_EXP_LEVEL,
      this.updateExpLevel,
      this
    )

    gameFieldScene.events.on(
      constants.EVENTS.UI.UPDATE_MONEY,
      this.updateMoney,
      this
    )
  }

  private updateKillCount(): void {
    this.killCountScore.changeValue(1, ScoreOperations.INCREASE)
  }

  private addKillCountScore(): void {
    const killCountIcon = this.add.image(0, 0, 'ui-game', 'kill-count')

    new Anchor(killCountIcon, {
      top: 'top+50',
      left: 'left+50',
    })

    this.killCountScore = new Score(this, 100, 50, 0)

    new Anchor(this.killCountScore, {
      top: 'top+50',
      left: 'left+105',
    })
  }

  private addPauseButton(): void {
    const pauseButton = this.add
      .image(0, 0, 'ui-game', 'tablet')
      .setInteractive()

    new Anchor(pauseButton, {
      top: 'top+50',
      right: 'right-50',
    })

    pauseButton.on(
      'pointerover',
      () => {
        selectButton(pauseButton)
      },
      this
    )

    pauseButton.on(
      'pointerout',
      () => {
        unselectButton(pauseButton)
      },
      this
    )

    pauseButton.on(
      'pointerdown',
      () => {
        this.sound.play('button', { volume: 0.2 })
        this.events.emit(constants.EVENTS.GAME.PAUSE)
      },
      this
    )
  }

  private addGameStartTimer(): void {
    this.gameStartClockText = this.add
      .text(0, 0, '00:00', {
        fontFamily: constants.FONT.FAMILY,
        fontSize: '36px',
        stroke: '#000000',
        strokeThickness: 6,
      })
      .setScrollFactor(0)
      .setOrigin(0.5, 0.5)

    new Anchor(this.gameStartClockText, {
      top: 'top+50',
      centerX: 'center',
    })

    this.gameStartClock = new Clock(this).start()
  }

  private addPlayerLevelBar(): void {
    this.playerLevelBar = new PlayerLevelBar(this, 0, 0)

    new Anchor(this.playerLevelBar, {
      bottom: 'bottom-75',
      centerX: 'center',
    })
  }

  private updateExpLevel(exp: number, requiredExp: number): void {
    this.playerLevelBar.fill(exp / requiredExp)
  }

  private updatePlayerLevel(newLevel: string): void {
    this.playerLevelBar.updateLevel(newLevel)
  }

  private addMoney(): void {
    const moneyContainer = this.add.container(0, 0)

    const moneyIcon = this.add
      .image(0, 0, 'game-items', 'GoldCoin')
      .setScale(1.6)

    this.moneyScore = new Score(this, 50, -1, 0, {
      fontSize: '28px',
      strokeThickness: 3,
    }).setOrigin(0.5, 0.5)

    const moneyBackground = new RoundRectangleCanvas(
      this,
      50,
      0,
      125,
      40,
      25,
      '#0E68C3',
      '#000000',
      4
    )
      .setOrigin(0.5, 0.5)
      .setAlpha(0.7)

    moneyContainer.add(moneyBackground)
    moneyContainer.add(moneyIcon)
    moneyContainer.add(this.moneyScore)

    new Anchor(moneyContainer, {
      top: 'top+85',
      left: 'right-320',
    })
  }

  private updateMoney(value: number): void {
    this.moneyScore.changeValue(value, ScoreOperations.INCREASE)
  }

  public update(): void {
    this.gameStartClockText.setText(convertMsToTime(this.gameStartClock.now))
  }
}
