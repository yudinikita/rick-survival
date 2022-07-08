import RoundRectangleCanvas from 'phaser3-rex-plugins/plugins/roundrectanglecanvas'
import Anchor from 'phaser3-rex-plugins/plugins/anchor'
import { Buttons } from 'phaser3-rex-plugins/templates/ui/ui-components'
import constants from '../../config/constants'
import { selectButton, unselectButton } from '../../utils/selectButton'
import { PlayerSkillType } from '../PlayerLevelController'

type SkillUpItemConfig = {
  title: string
  titleColor: string
  skillType: PlayerSkillType
}

export enum ProgressOperations {
  INCREASE,
  DECREASE,
  SET_VALUE,
}

export default class SkillUpItem extends Phaser.GameObjects.Container {
  private background!: RoundRectangleCanvas
  private title!: Phaser.GameObjects.Text
  private button!: Buttons
  private progressBar!: Phaser.GameObjects.Container
  private progressValue = 0
  private skillType!: PlayerSkillType

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    config: SkillUpItemConfig
  ) {
    super(scene, x, y)
    this.scene.add.existing(this)

    this.skillType = config.skillType

    this.addBackground()
    this.addTitle(config.title, config.titleColor)
    this.addIcon(config.skillType)
    this.addButton(config.skillType)
    this.addProgressBar(config.skillType)
  }

  public get getProgressValue(): number {
    return this.progressValue
  }

  private addBackground(): void {
    this.background = new RoundRectangleCanvas(
      this.scene,
      0,
      0,
      492,
      62,
      {
        radius: 15,
      },
      0x02_2d_4e
    ).setOrigin(0, 0)

    this.add(this.background)
  }

  private addTitle(text: string, color: string): void {
    this.title = this.scene.add.text(0, 0, text, {
      fontFamily: constants.FONT.FAMILY,
      fontSize: '32px',
      color,
      stroke: '#000000',
      strokeThickness: 4,
    })

    new Anchor(this.title, {
      top: 'top-37',
      left: 'left+80',
    })

    this.add(this.title)
  }

  private addIcon(name: string): void {
    const icon = this.scene.add.image(0, 0, 'ui-skillup', 'icon-' + name)

    new Anchor(icon, {
      top: 'top-10',
      left: 'left+3',
    })

    this.add(icon)
  }

  private addButton(name: string): void {
    const button = this.scene.add.image(0, 0, 'ui-skillup', 'btn-' + name)

    new Anchor(button, {
      top: 'top+7',
      left: 'left+428',
    })

    this.button = new Buttons(this.scene, {
      buttons: [button],
    })

    this.button.on(
      'button.over',
      (button: Phaser.GameObjects.Image) => {
        selectButton(button)
      },
      this
    )

    this.button.on(
      'button.out',
      (button: Phaser.GameObjects.Image) => {
        unselectButton(button)
      },
      this
    )

    this.button.on(
      'button.click',
      (button: Phaser.GameObjects.Image) => {
        this.handleButtonClick()
      },
      this
    )

    this.button.on(
      'button.disable',
      (button: Phaser.GameObjects.Image) => {
        button.disableInteractive()
        button.setTint(0x8c_8c_8c)
      },
      this
    )

    this.button.on(
      'button.enable',
      (button: Phaser.GameObjects.Image) => {
        button.setInteractive()
        button.clearTint()
      },
      this
    )

    this.add(button)
  }

  private addProgressBar(name: string): void {
    this.progressBar = this.scene.add.container(0, 0)

    const progressBarBg = this.scene.add
      .image(0, 0, 'ui-skillup', 'progress-bg')
      .setOrigin(0, 0)

    new Anchor(progressBarBg, {
      top: 'top+10',
      left: 'left+85',
    })

    this.progressBar.add([progressBarBg, ...this.fillProgressBar(name, 10)])
    this.add(this.progressBar)
  }

  private changeProgress(value: number, operation: ProgressOperations): void {
    switch (operation) {
      case ProgressOperations.INCREASE:
        if (this.progressValue < 10) {
          this.progressValue += value
        }
        break
      case ProgressOperations.DECREASE:
        if (this.progressValue > 0) {
          this.progressValue -= value
        }
        break
      case ProgressOperations.SET_VALUE:
        this.progressValue = value
        break
      default:
        break
    }

    this.changeProgressBar(this.progressValue)
  }

  private changeProgressBar(count: number): void {
    for (let index = 1; index < this.progressBar.length; index++) {
      const progress = this.progressBar.getAt(index) as Phaser.GameObjects.Image
      progress.visible = index < count + 1
    }
  }

  private fillProgressBar(name: string, count = 0): Phaser.GameObjects.Image[] {
    const progressBarFill = [] as Phaser.GameObjects.Image[]
    const leftRate = 29.3
    const leftStart = 94

    if (count > 0) {
      for (let index = 0; index < count; index++) {
        const progress = this.scene.add.image(
          0,
          0,
          'ui-skillup',
          'arrow-' + name
        )

        new Anchor(progress, {
          top: 'top+13',
          left: 'left+' + (leftStart + leftRate * index),
        })

        progress.visible = false

        progressBarFill.push(progress)
      }
    }

    return progressBarFill
  }

  public handleButtonClick(): void {
    this.changeProgress(1, ProgressOperations.INCREASE)

    if (this.progressValue === 10) {
      this.button.setButtonEnable(false)
    }

    const gameUiScene = this.scene.scene.get(constants.SCENES.GAME_UI)

    gameUiScene.events.emit(
      constants.EVENTS.PLAYER.SKILL_UP,
      this.skillType,
      this.progressValue
    )
  }
}
