export class FloatingNumbersPlugin {
  constructor(scene, pluginManager) {
    /**
     * A handy reference to the Plugin Manager that is responsible for this plugin.
     * Can be used as a route to gain access to game systems and  events.
     *
     * @name Phaser.Plugins.BasePlugin#pluginManager
     * @type {Phaser.Plugins.PluginManager}
     * @protected
     * @since 3.8.0
     */
    this.pluginManager = pluginManager

    /**
     * A reference to the Game instance this plugin is running under.
     *
     * @name Phaser.Plugins.BasePlugin#game
     * @type {Phaser.Game}
     * @protected
     * @since 3.8.0
     */
    this.game = pluginManager.game

    /**
     * A reference to the Scene that has installed this plugin.
     * Only set if it's a Scene Plugin, otherwise `null`.
     * This property is only set when the plugin is instantiated and added to the Scene, not before.
     * You cannot use it during the `init` method, but you can during the `boot` method.
     *
     * @name Phaser.Plugins.BasePlugin#scene
     * @type {?Phaser.Scene}
     * @protected
     * @since 3.8.0
     */
    this.scene = scene

    /**
     * A reference to the Scene Systems of the Scene that has installed this plugin.
     * Only set if it's a Scene Plugin, otherwise `null`.
     * This property is only set when the plugin is instantiated and added to the Scene, not before.
     * You cannot use it during the `init` method, but you can during the `boot` method.
     *
     * @name Phaser.Plugins.BasePlugin#systems
     * @type {?Phaser.Scenes.Systems}
     * @protected
     * @since 3.8.0
     */
    this.systems = scene.sys

    /**
     * The Sticks that this plugin is responsible for.
     * @type {Set}
     */
    this.sticks = null

    /**
     * The Buttons that this plugin is responsible for.
     * @type {Set}
     */
    this.buttons = null

    /**
     * Internal var to track the Input pointer total.
     * @type {integer}
     * @private
     */
    this._pointerTotal = 0

    scene.sys.events.once('boot', this.boot, this)

    this.tooltipCollection = {}

    this.configObj = {
      align: 'center', //left, right, center
      textOptions: {},
      offsetX: 0,
      offsetY: 0,
      animation: 'up', // explode, smoke, custom, directional: up, down, left, right, fade, physics
      timeToLive: 400,
      animationDistance: 50,
      animationEase: 'Sine.easeOut',
      fixedToCamera: false,
      text: '',
      store: false,
      textType: 'normal', // normal, bitmaptext
      parentObject: null,
      target: this.scene,
      pointX: [],
      pointY: [],
    }
  }

  /**
   *
   *
   * @param {*} config
   * @memberof FloatingNumbersPlugin
   */
  createFloatingText(config) {
    let _config = Object.assign(this.configObj, config)
    let textObject = {}
    // check text type //
    if (_config.textType === 'normal') {
      textObject = this.scene.add.text(0, 0, _config.text, _config.textOptions)

      if (_config.parentObject !== null) {
        // check alignment //
        switch (_config.align) {
          case 'center': {
            Phaser.Display.Align.In.Center(
              textObject,
              _config.parentObject,
              _config.offsetX,
              _config.offsetY
            )
            break
          }
          case 'left': {
            Phaser.Display.Align.In.LeftCenter(
              textObject,
              _config.parentObject,
              _config.offsetX,
              _config.offsetY
            )
            break
          }
          case 'right': {
            Phaser.Display.Align.In.RightCenter(
              textObject,
              _config.parentObject,
              _config.offsetX,
              _config.offsetY
            )
            break
          }
          case 'top-center': {
            Phaser.Display.Align.In.TopCenter(
              textObject,
              _config.parentObject,
              _config.offsetX,
              _config.offsetY
            )
            break
          }
          // No default
        }
      }

      textObject.isAnimating = false

      if (_config.store === false) {
        this.scene.children.bringToTop(textObject)
        this.animateText(_config, textObject)
      } else {
        return textObject
      }
    }
  }

  /**
   *
   *
   * @param {*} config
   * @param textObject
   * @memberof FloatingNumbersPlugin
   */
  animateText(config, textObject) {
    let startPoint
    let controlPoint1
    let controlPoint2
    let endPoint
    let curve
    const path = { t: 0, vec: new Phaser.Math.Vector2() }

    /////
    if (textObject.isAnimating === false) {
      textObject.isAnimating = true
      switch (config.animation) {
        case 'physics': {
          break
        }
        case 'custom': {
          if (config.pointX.length > 0 && config.pointY.length > 0) {
            startPoint = new Phaser.Math.Vector2(
              config.pointX[0],
              config.pointY[0]
            )
            controlPoint1 = new Phaser.Math.Vector2(
              config.pointX[1],
              config.pointY[1]
            )
            controlPoint2 = new Phaser.Math.Vector2(
              config.pointX[2],
              config.pointY[2]
            )
            endPoint = new Phaser.Math.Vector2(
              config.pointX[3],
              config.pointY[3]
            )
            curve = new Phaser.Curves.CubicBezier(
              startPoint,
              controlPoint1,
              controlPoint2,
              endPoint
            )

            this.scene.tweens.add({
              targets: path,
              t: 1,
              ease: config.animationEase,
              duration: config.timeToLive,
              yoyo: false,
              callbackScope: this,
              onUpdate: function () {
                let position = curve.getPoint(path.t, path.vec)
                textObject.x = position.x
                textObject.y = position.y
              },
            })
          }
          break
        }
        case 'explode': {
          this.scene.tweens.add({
            targets: textObject,
            scale: config.animationDistance,
            ease: config.animationEase,
            duration: config.timeToLive,
            yoyo: false,
            callbackScope: this,
            onComplete: function () {
              this.scene.tweens.add({
                targets: textObject,
                alpha: 0,
                ease: config.animationEase,
                duration: config.timeToLive,
                yoyo: false,
                callbackScope: this,
                onComplete: function () {
                  textObject.destroy()
                },
              })
            },
          })
          break
        }
        case 'fade': {
          textObject.alpha = 0
          this.scene.tweens.add({
            targets: textObject,
            alpha: 1,
            ease: config.animationEase,
            duration: config.timeToLive,
            yoyo: false,
            callbackScope: this,
            onComplete: function () {
              this.scene.tweens.add({
                targets: textObject,
                alpha: 0,
                ease: config.animationEase,
                duration: config.timeToLive,
                yoyo: false,
                callbackScope: this,
                onComplete: function () {
                  textObject.destroy()
                },
              })
            },
          })
          break
        }
        case 'smoke': {
          let invert = Math.round(Math.random() * 10)
          let invertOffset = 1

          if (invert > 5) {
            invertOffset = invertOffset * -1
          }

          startPoint = new Phaser.Math.Vector2(
            textObject.x + 25 * invertOffset,
            textObject.y - 25
          )
          controlPoint1 = new Phaser.Math.Vector2(
            textObject.x - 50 * invertOffset,
            textObject.y - 50
          )
          controlPoint2 = new Phaser.Math.Vector2(
            textObject.x + 75 * invertOffset,
            textObject.y - 75
          )
          endPoint = new Phaser.Math.Vector2(
            textObject.x - 25 * invertOffset,
            textObject.y - 100
          )
          curve = new Phaser.Curves.CubicBezier(
            startPoint,
            controlPoint1,
            controlPoint2,
            endPoint
          )

          this.scene.tweens.add({
            targets: path,
            t: 1,
            ease: config.animationEase,
            duration: config.timeToLive,
            yoyo: false,
            callbackScope: this,
            onComplete: function () {
              this.scene.tweens.add({
                targets: textObject,
                alpha: 0,
                ease: config.animationEase,
                duration: config.timeToLive,
                yoyo: false,
                callbackScope: this,
                onComplete: function () {
                  textObject.destroy()
                },
              })
            },
            onUpdate: function () {
              let position = curve.getPoint(path.t, path.vec)
              textObject.x = position.x
              textObject.y = position.y
            },
          })

          break
        }
        case 'left': {
          this.scene.tweens.add({
            targets: textObject,
            y: textObject.x - config.animationDistance,
            ease: config.animationEase,
            duration: config.timeToLive,
            yoyo: false,
            callbackScope: this,
            onComplete: function () {
              this.scene.tweens.add({
                targets: textObject,
                alpha: 0,
                ease: config.animationEase,
                duration: config.timeToLive,
                yoyo: false,
                callbackScope: this,
                onComplete: function () {
                  textObject.destroy()
                },
              })
            },
          })

          break
        }
        case 'right': {
          this.scene.tweens.add({
            targets: textObject,
            y: textObject.x + config.animationDistance,
            ease: config.animationEase,
            duration: config.timeToLive,
            yoyo: false,
            callbackScope: this,
            onComplete: function () {
              this.scene.tweens.add({
                targets: textObject,
                alpha: 0,
                ease: config.animationEase,
                duration: config.timeToLive,
                yoyo: false,
                callbackScope: this,
                onComplete: function () {
                  textObject.destroy()
                },
              })
            },
          })

          break
        }
        case 'up': {
          this.scene.tweens.add({
            targets: textObject,
            y: textObject.y - config.animationDistance,
            ease: config.animationEase,
            duration: config.timeToLive,
            yoyo: false,
            callbackScope: this,
            onComplete: function () {
              this.scene.tweens.add({
                targets: textObject,
                alpha: 0,
                ease: config.animationEase,
                duration: config.timeToLive,
                yoyo: false,
                callbackScope: this,
                onComplete: function () {
                  textObject.destroy()
                },
              })
            },
          })

          break
        }
        case 'down': {
          this.scene.tweens.add({
            targets: textObject,
            y: textObject.y + config.animationDistance,
            ease: config.animationEase,
            duration: config.timeToLive,
            yoyo: false,
            callbackScope: this,
            onComplete: function () {
              this.scene.tweens.add({
                targets: textObject,
                alpha: 0,
                ease: config.animationEase,
                duration: config.timeToLive,
                yoyo: false,
                callbackScope: this,
                onComplete: function () {
                  textObject.destroy()
                },
              })
            },
          })

          break
        }
        // No default
      }
    }
  }

  /**
   * The boot method.
   *
   * @private
   */
  boot() {
    this.systems.events.once('destroy', this.destroy, this)

    if (this.systems.settings.active) {
      this.start()
    } else {
      this.systems.events.on('start', this.start, this)
    }
  }

  start() {
    this.systems.events.on('update', this.update, this)
    this.systems.events.once('shutdown', this.shutdown, this)
  }

  /**
   * Called automatically by the Phaser Plugin Manager.
   *
   * Updates all Stick and Button objects.
   *
   * @param {integer} time - The current game timestep.
   */
  update(time) {}

  /**
   * Shuts down the event listeners for this plugin.
   */
  shutdown() {
    const eventEmitter = this.systems.events

    eventEmitter.off('update', this.update, this)
    eventEmitter.off('shutdown', this.shutdown, this)
  }

  /**
   * Removes and calls `destroy` on all Stick and Button objects in this plugin.
   */
  destroy() {
    this.shutdown()
  }

  hideTooltip(id, animate) {
    if (animate) {
      let isTweening = this.scene.tweens.isTweening(this.tooltipCollection[id])
      if (isTweening) {
        this.scene.tweens.killTweensOf(this.tooltipCollection[id])
      }

      this.tween = this.scene.tweens.add({
        targets: this.tooltipCollection[id],
        alpha: 0,
        ease: 'Power1',
        duration: 250,
        delay: 0,
        onComplete: (o) => {},
      })
    } else {
      this.tooltipCollection[id].visible = false
    }
  }

  showTooltip(id, animate) {
    if (animate) {
      this.tooltipCollection[id].alpha = 0
      this.tooltipCollection[id].visible = true
      this.scene.children.bringToTop(this.tooltipCollection[id])

      let isTweening = this.scene.tweens.isTweening(this.tooltipCollection[id])
      if (isTweening) {
        this.scene.tweens.killTweensOf(this.tooltipCollection[id])
      }

      this.tween = this.scene.tweens.add({
        targets: this.tooltipCollection[id],
        alpha: 1,
        ease: 'Power1',
        duration: 500,
        delay: 0,
        onComplete: (o) => {
          //this.tween = null;
        },
      })
    } else {
      this.tooltipCollection[id].visible = true
      this.scene.children.bringToTop(this.tooltipCollection[id])
    }
  }

  /**
   *
   *
   * @param {*} options
   * @memberof FloatingTextUI
   */
  createTooltip(options) {
    let background

    let container = this.scene.add.container(options.x, options.y)
    let content = this.createLabel(container, options.x, options.y, options)

    if (options.hasBackground) {
      background = this.createBackground(
        container,
        content,
        options.x,
        options.y,
        options.background.width,
        options.background.height,
        options
      )

      content.x = background.rect.centerX - content.displayWidth * 0.5
      content.y = background.rect.centerY - content.displayHeight * 0.5
    }

    container.add(content)

    container.x = options.x
    container.y = options.y

    this.tooltipCollection[options.id] = container

    return container
  }

  /**
   *
   *
   * @param container
   * @param {*} x
   * @param {*} y
   * @param {*} options
   * @memberof FloatingTextUI
   */
  createLabel(container, x, y, options) {
    let text = this.scene.add.text(x, y, options.text.text, {
      fontFamily: options.text.fontFamily || 'new_rockerregular',
      fontSize: options.text.fontSize || 19,
      color: options.text.textColor || '#ffffff',
      fontStyle: options.text.fontStyle || '',
      align: options.text.align || 'center',
    })

    if (options.hasShadow) {
      let shadowColor = options.text.shadowColor || '#1e1e1e'
      let blur = options.text.blur || 1
      let shadowStroke = options.text.shadowStroke || false
      let shadowFill = options.text.shadowFill || true
      text.setShadow(0, 0, shadowColor, blur, shadowStroke, shadowFill)
    }

    return text
  }
}

//module.exports = FloatingNumbersPlugin
