import Phaser from 'phaser'
import Anchor from 'phaser3-rex-plugins/plugins/anchor'
import { Buttons } from 'phaser3-rex-plugins/templates/ui/ui-components'
import constants from '../config/constants'
import { ControlsType } from '../types'
import { selectButton, unselectButton } from '../utils/selectButton'
import worldsConfig, { WorldConfig, WorldName } from '../config/worldsConfig'

export default class MapSelect extends Phaser.Scene {
  private controls!: ControlsType
  private background!: Phaser.GameObjects.TileSprite
  private tunnel!: Phaser.GameObjects.TileSprite
  private deepZoom!: Phaser.GameObjects.Sprite
  private title!: Phaser.GameObjects.Text
  private mapCover!: Phaser.GameObjects.Image
  private worlds: WorldConfig[] = []
  private selectedWorld!: WorldConfig

  constructor() {
    super(constants.SCENES.MAP_SELECT)
  }

  public init(): void {
    this.controls = this.input.keyboard.addKeys({
      esc: Phaser.Input.Keyboard.KeyCodes.ESC,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
      enter: Phaser.Input.Keyboard.KeyCodes.ENTER,
    }) as ControlsType
  }

  public create(): void {
    this.sound.play('elevator-music', { volume: 0.2, loop: true })

    this.addWorlds()
    this.addBackground()
    this.addTunnel()
    this.addCirclePortal()
    this.addDeepZoom()
    this.addTitleBackground()
    this.addTitle('')
    this.addButtons()
    this.selectWorld(0)
    this.addEvents()
  }

  private addEvents(): void {
    this.events.on(
      Phaser.Scenes.Events.SHUTDOWN,
      () => this.sound.stopByKey('elevator-music'),
      this
    )
  }

  private addWorlds(): void {
    for (const woldsConfigKey in worldsConfig) {
      const world = worldsConfig[woldsConfigKey as WorldName]
      this.worlds.push(world)
    }
  }

  private addBackground(): void {
    const { width, height } = this.sys.game.canvas

    this.background = this.add
      .tileSprite(0, 0, width, height, 'background-8')
      .setOrigin(0, 0)
  }

  private animateBackground(): void {
    this.background.tilePositionX += 0.4
  }

  private addTunnel(): void {
    const { width, height } = this.sys.game.canvas

    this.tunnel = this.add
      .tileSprite(0, 0, width, height, 'tunnel')
      .setOrigin(0, 0)
  }

  private animateTunnel(): void {
    this.tunnel.tilePositionX -= 0.5
  }

  private addCirclePortal(): void {
    const circle = this.add.circle(0, 0, 200, 0x6c_fc_f9).setOrigin(0.5, 0.5)

    new Anchor(circle, {
      centerX: 'right-500',
      centerY: 'center',
    })
  }

  private addDeepZoom(): void {
    this.deepZoom = this.add.sprite(0, 0, 'deepzoom', 'deepzoom0028')

    this.deepZoom.setDepth(10)

    this.deepZoom.anims.create({
      key: 'start',
      frames: this.anims.generateFrameNames('deepzoom', {
        prefix: 'deepzoom',
        start: 1,
        end: 28,
        zeroPad: 4,
      }),
      frameRate: 10,
      repeat: -1,
    })

    this.deepZoom.play('start')

    new Anchor(this.deepZoom, {
      centerX: 'right-500',
      centerY: 'center',
    })
  }

  private addTitleBackground(): void {
    const titleBackground = this.add
      .image(0, 0, 'ui-map-select', 'title')
      .setOrigin(0, 0)
      .setDepth(10)

    new Anchor(titleBackground, {
      centerX: 'left+200',
      centerY: 'top+150',
    })
  }

  private addTitle(text: string): void {
    this.title = this.add
      .text(0, 0, text, {
        fontSize: '46px',
        fontFamily: constants.FONT.FAMILY,
        color: '#ffffff',
        align: 'center',
        stroke: '#000000',
        strokeThickness: 8,
      })
      .setOrigin(0.5, 0.5)
      .setDepth(10)

    new Anchor(this.title, {
      centerX: 'left+250',
      centerY: 'top+150',
    })
  }

  private addButtons(): void {
    const buttons = new Buttons(this, {
      x: 0,
      y: 0,
      anchor: {
        centerX: 'center',
        centerY: 'bottom-150',
      },
      orientation: 'x',
      space: { item: 150 },
      buttons: [
        this.add.image(0, 0, 'ui-map-select', 'button_arrow').setFlipX(true),
        this.add.image(0, 0, 'ui-map-select', 'button_start'),
        this.add.image(0, 0, 'ui-map-select', 'button_arrow'),
      ],
      click: {
        mode: 'pointerup',
        clickInterval: 300,
      },
    })
      .layout()
      .setDepth(10)

    this.add.existing(buttons)

    buttons.on(
      'button.click',
      (button: Phaser.GameObjects.Image, index: number) => {
        switch (index) {
          case 0:
            this.sound.play('select', { volume: 0.2 })
            this.handleButtonLeft()
            break
          case 1:
            this.sound.play('button', { volume: 0.2 })
            this.handleButtonStart()
            break
          case 2:
            this.sound.play('select', { volume: 0.2 })
            this.handleButtonRight()
            break
        }
      }
    )

    buttons.on('button.over', (button: Phaser.GameObjects.Image) => {
      selectButton(button)
    })

    buttons.on('button.out', (button: Phaser.GameObjects.Image) => {
      unselectButton(button)
    })
  }

  private handleButtonLeft(): void {
    const previousIndex = this.selectedWorld.id - 1
    if (previousIndex >= 0) {
      this.selectWorld(previousIndex)
    }
  }

  private handleButtonStart(): void {
    this.scene.start(constants.SCENES.GAME_MAIN, {
      world: this.selectedWorld,
    })
  }

  private handleButtonRight(): void {
    const nextIndex = this.selectedWorld.id + 1
    if (nextIndex < this.worlds.length) {
      this.selectWorld(nextIndex)
    }
  }

  private addMapCover(texture: string): void {
    if (this.mapCover) this.mapCover.destroy(true)

    const { width, height } = this.sys.game.canvas

    this.mapCover = this.add
      .image(0, 0, texture)
      .setOrigin(0, 0)
      .setAlpha(1, 0, 1, 0)
      .setDepth(5)

    this.mapCover.displayWidth = width
    this.mapCover.displayHeight = height

    new Anchor(this.mapCover, {
      left: 'left',
      centerY: 'center',
    })
  }

  private selectWorld(index: number): void {
    const world = this.worlds[index]
    this.selectedWorld = world
    this.addMapCover(world.cover)
    this.title.setText(world.title)
  }

  public update(): void {
    if (this.controls.esc.isDown) {
      this.scene.start(constants.SCENES.MAIN_MENU)
    }

    this.animateBackground()
    this.animateTunnel()
  }
}
