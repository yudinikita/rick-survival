import constants from '../config/constants'

export enum ScoreOperations {
  INCREASE,
  DECREASE,
  SET_VALUE,
}

export default class Score extends Phaser.GameObjects.Text {
  private scoreValue = 0

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    initScore = 0,
    style?: Phaser.Types.GameObjects.Text.TextStyle
  ) {
    super(scene, x, y, initScore.toString(), {
      fontFamily: constants.FONT.FAMILY,
      fontSize: '32px',
      stroke: '#000000',
      strokeThickness: 6,
      ...style,
    })
    this.setOrigin(0, 0)
    scene.add.existing(this)
    this.scoreValue = initScore
  }

  public getValue(): number {
    return this.scoreValue
  }

  public changeValue(value: number, operation: ScoreOperations): void {
    switch (operation) {
      case ScoreOperations.INCREASE:
        this.scoreValue += value
        break
      case ScoreOperations.DECREASE:
        this.scoreValue -= value
        break
      case ScoreOperations.SET_VALUE:
        this.scoreValue = value
        break
      default:
        break
    }
    this.setText(this.scoreValue.toString())
  }
}
