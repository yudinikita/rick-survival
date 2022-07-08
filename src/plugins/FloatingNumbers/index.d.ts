export as namespace FloatingNumbersType
export = FloatingNumbersType

declare namespace FloatingNumbersType {
  export type FloatingNumbersConfig = {
    align?: 'left' | 'right' | 'center' | 'top-center'
    textOptions?: Phaser.Types.GameObjects.Text.TextStyle
    offsetX?: number
    offsetY?: number
    animation?:
      | 'explode'
      | 'smoke'
      | 'custom'
      | 'up'
      | 'down'
      | 'left'
      | 'right'
      | 'fade'
      | 'physics'
    timeToLive?: number
    animationDistance?: number
    animationEase?: string
    fixedToCamera?: boolean
    text?: string
    store?: boolean
    textType?: 'normal' | 'bitmaptext'
    parentObject?: Phaser.GameObjects.GameObject | null
    targetObject?: Phaser.Scene | Phaser.GameObjects.GameObject | null
    pointX?: number
    pointY?: number
  }

  export class FloatingNumbersPlugin {
    protected pluginManager: Phaser.Plugins.PluginManager
    protected game: Phaser.Game
    protected scene: Phaser.Scene
    protected systems: Phaser.Scenes.Systems

    private _pointerTotal: number

    public sticks: Phaser.GameObjects.Group | null
    public buttons: Phaser.GameObjects.Group | null
    public tooltipCollection: { [key: string]: Phaser.GameObjects.Container }
    public configObj: FloatingNumbersConfig

    constructor(
      scene: Phaser.Scene,
      pluginManager: Phaser.Plugins.PluginManager
    )

    public createFloatingText(
      config: FloatingNumbersConfig
    ): Phaser.GameObjects.Text | void

    public animateText(
      config: FloatingNumbersConfig,
      textObject: Phaser.GameObjects.Text
    ): void

    private boot(): void

    public start(): void

    public update(time: number): void
    public shutdown(): void
    public destroy(): void

    public hideTooltip(id: string, animate: boolean): void
    public showTooltip(id: string, animate: boolean): void
    public createTooltip(options: FloatingNumbersConfig): void

    public createLabel(
      container: Phaser.GameObjects.Container,
      x: number,
      y: number,
      options: FloatingNumbersConfig
    ): void
  }
}
