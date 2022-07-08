import Phaser from 'phaser'
import Anchor from 'phaser3-rex-plugins/plugins/anchor'
import constants from '../config/constants'
import textConfig from '../config/textConfig'
import PreloadProgressBar from '../components/ProgressBar/PreloadProgressBar'

export default class LoadingScene extends Phaser.Scene {
  private progressBar!: PreloadProgressBar
  private loadingText!: Phaser.GameObjects.Text
  private percentText!: Phaser.GameObjects.Text
  private assetText!: Phaser.GameObjects.Text

  constructor() {
    super(constants.SCENES.LOADING)
  }

  preload() {
    this.load.baseURL = constants.BASE_URL.ASSETS

    this.addLoader()
    this.addLoaderEvents()

    this.loadResources()
  }

  create() {
    this.input.setDefaultCursor(constants.CURSOR.DEFAULT)
  }

  private addLoader() {
    this.loadingText = this.add
      .text(0, 0, textConfig.LOADING, {
        fontFamily: constants.FONT.FAMILY,
        fontSize: '30px',
      })
      .setOrigin(0.5, 0.5)

    new Anchor(this.loadingText, {
      centerX: 'center',
      centerY: 'center-50',
    })

    this.progressBar = new PreloadProgressBar(this)

    this.percentText = this.add
      .text(0, 0, '0%', {
        fontFamily: constants.FONT.FAMILY,
        fontSize: '22px',
      })
      .setOrigin(0.5, 0.5)

    new Anchor(this.percentText, {
      centerX: 'center',
      centerY: 'center',
    })

    this.assetText = this.add
      .text(0, 0, '', {
        fontFamily: constants.FONT.FAMILY,
        fontSize: '16px',
        color: '#8B8B8B',
      })
      .setOrigin(0.5, 0.5)

    new Anchor(this.assetText, {
      centerX: 'center',
      centerY: 'center+50',
    })
  }

  private addLoaderEvents() {
    this.load.on(Phaser.Loader.Events.PROGRESS, (value: number) => {
      this.percentText.setText(Number.parseInt(String(value * 100)) + '%')
      this.progressBar.fill(value)
    })

    this.load.on(Phaser.Loader.Events.FILE_LOAD, (file: Phaser.Loader.File) => {
      this.assetText.setText(textConfig.LOADING_FILES + file.key)
    })

    this.load.on(Phaser.Loader.Events.COMPLETE, () => {
      this.progressBar.destroy()
      this.loadingText.destroy()
      this.percentText.destroy()
      this.assetText.destroy()

      this.scene.stop(constants.SCENES.LOADING)
      this.scene.switch(constants.SCENES.MAIN_MENU)
    })
  }

  private loadResources() {
    this.loadCommon()
    this.loadMainMenu()
    this.loadMapSelect()
    this.loadGameUI()
    this.loadGameField()
    this.loadWorlds()
    this.loadBullets()
    this.loadPlayersSkin()
    this.loadEnemies()
    this.loadAudio()
  }

  private loadCommon() {
    this.load.image('cursor-hand', 'image/cursor_hand.png')

    this.load.image('joystick-base', 'sprites/joyStick/base.png')
    this.load.image('joystick-thumb', 'sprites/joyStick/thumb.png')

    this.load.image('button-next', 'sprites/buttons/next.png')
    this.load.image('button-select', 'sprites/buttons/select.png')

    this.load.image('background-1', 'image/backgrounds/background_1.png')
    this.load.image('background-2', 'image/backgrounds/background_2.png')
    this.load.image('background-3', 'image/backgrounds/background_3.png')
    this.load.image('background-4', 'image/backgrounds/background_4.png')
    this.load.image('background-5', 'image/backgrounds/background_5.png')
    this.load.image('background-6', 'image/backgrounds/background_6.png')
    this.load.image('background-7', 'image/backgrounds/background_7.png')
    this.load.image('background-8', 'image/backgrounds/background_8.png')
  }

  private loadMainMenu() {
    this.load.image('logo-rick', 'image/logo_rick.png')
    this.load.image('logo-text', 'image/logo_text.png')

    this.load.image('space-rick', 'image/space_rick.png')
    this.load.image('stars-field', 'image/stars_field.png')
    this.load.image('moon', 'image/moon.png')
    this.load.image('earth', 'image/earth.png')

    this.load.atlas(
      'ui-main-menu',
      'spritesheets/ui/ui_main_menu.png',
      'spritesheets/ui/ui_main_menu_atlas.json'
    )
  }

  private loadMapSelect() {
    this.load.image('tunnel', 'image/tunnel.png')

    this.load.atlas(
      'deepzoom',
      'spritesheets/other/deepzoom.png',
      'spritesheets/other/deepzoom_atlas.json'
    )

    this.load.atlas(
      'ui-map-select',
      'spritesheets/ui/ui_map_select.png',
      'spritesheets/ui/ui_map_select_atlas.json'
    )
  }

  private loadGameUI() {
    this.load.atlas(
      'ui-game',
      'spritesheets/ui/ui_game.png',
      'spritesheets/ui/ui_game_atlas.json'
    )

    this.load.atlas(
      'ui-pause',
      'spritesheets/ui/ui_pause.png',
      'spritesheets/ui/ui_pause_atlas.json'
    )

    this.load.atlas(
      'ui-player-level',
      'spritesheets/ui/ui_player_level.png',
      'spritesheets/ui/ui_player_level_atlas.json'
    )

    this.load.atlas(
      'ui-skillup',
      'spritesheets/ui/ui_skillup.png',
      'spritesheets/ui/ui_skillup_atlas.json'
    )
  }

  private loadGameField() {
    this.load.image(
      'left-cap',
      'image/progress_bar/health_bar/barHorizontal_green_left.png'
    )
    this.load.image(
      'middle',
      'image/progress_bar/health_bar/barHorizontal_green_mid.png'
    )
    this.load.image(
      'right-cap',
      'image/progress_bar/health_bar/barHorizontal_green_right.png'
    )

    this.load.image(
      'left-cap-shadow',
      'image/progress_bar/barHorizontal_shadow_left.png'
    )
    this.load.image(
      'middle-shadow',
      'image/progress_bar/barHorizontal_shadow_mid.png'
    )
    this.load.image(
      'right-cap-shadow',
      'image/progress_bar/barHorizontal_shadow_right.png'
    )

    this.load.atlas(
      'game-items',
      'spritesheets/other/game_items.png',
      'spritesheets/other/game_items_atlas.json'
    )

    this.load.atlas(
      'portal',
      'spritesheets/other/portal.png',
      'spritesheets/other/portal_atlas.json'
    )

    this.load.atlas(
      'anim-blood-1',
      'spritesheets/anims/anim_blood_1.png',
      'spritesheets/anims/anim_blood_1_atlas.json'
    )

    this.load.atlas(
      'anim-blood-2',
      'spritesheets/anims/anim_blood_2.png',
      'spritesheets/anims/anim_blood_2_atlas.json'
    )

    this.load.atlas(
      'anim-blood-3',
      'spritesheets/anims/anim_blood_3.png',
      'spritesheets/anims/anim_blood_3_atlas.json'
    )

    this.load.atlas(
      'anim-blood-4',
      'spritesheets/anims/anim_blood_4.png',
      'spritesheets/anims/anim_blood_4_atlas.json'
    )

    this.load.atlas(
      'anim-blood-5',
      'spritesheets/anims/anim_blood_5.png',
      'spritesheets/anims/anim_blood_5_atlas.json'
    )
  }

  private loadWorlds() {
    this.load.atlas(
      'world_tiles_0',
      'spritesheets/worlds/world_tile_0.png',
      'spritesheets/worlds/world_tile_0_atlas.json'
    )

    this.load.atlas(
      'world_tiles_1',
      'spritesheets/worlds/world_tile_1.png',
      'spritesheets/worlds/world_tile_1_atlas.json'
    )

    this.load.atlas(
      'world_tiles_2',
      'spritesheets/worlds/world_tile_2.png',
      'spritesheets/worlds/world_tile_2_atlas.json'
    )

    this.load.atlas(
      'world_tiles_3',
      'spritesheets/worlds/world_tile_3.png',
      'spritesheets/worlds/world_tile_3_atlas.json'
    )

    this.load.atlas(
      'world_tiles_4',
      'spritesheets/worlds/world_tile_4.png',
      'spritesheets/worlds/world_tile_4_atlas.json'
    )

    this.load.atlas(
      'world_tiles_5',
      'spritesheets/worlds/world_tile_5.png',
      'spritesheets/worlds/world_tile_5_atlas.json'
    )

    this.load.atlas(
      'world_tiles_6',
      'spritesheets/worlds/world_tile_6.png',
      'spritesheets/worlds/world_tile_6_atlas.json'
    )

    this.load.atlas(
      'world_tiles_7',
      'spritesheets/worlds/world_tile_7.png',
      'spritesheets/worlds/world_tile_7_atlas.json'
    )

    this.load.atlas(
      'world_tiles_8',
      'spritesheets/worlds/world_tile_8.png',
      'spritesheets/worlds/world_tile_8_atlas.json'
    )

    this.load.atlas(
      'world_tiles_9',
      'spritesheets/worlds/world_tile_9.png',
      'spritesheets/worlds/world_tile_9_atlas.json'
    )

    this.load.atlas(
      'world_tiles_10',
      'spritesheets/worlds/world_tile_10.png',
      'spritesheets/worlds/world_tile_10_atlas.json'
    )

    this.load.image({
      key: 'level01_tiles',
      url: 'tilemaps/tiles/SummerTex.png',
    })
    this.load.tilemapTiledJSON('level01_json', 'tilemaps/json/level01.json')

    this.load.image({
      key: 'world_01_tiles',
      url: 'tilemaps/tiles/SummerTex.png',
    })
    this.load.tilemapTiledJSON('world_01_json', 'tilemaps/json/world_01.json')

    this.load.image('world_0_cover', 'image/cover/world_0_cover.png')
    this.load.image('world_1_cover', 'image/cover/world_1_cover.png')
    this.load.image('world_2_cover', 'image/cover/world_2_cover.png')
    this.load.image('world_3_cover', 'image/cover/world_3_cover.png')
    this.load.image('world_4_cover', 'image/cover/world_4_cover.png')
    this.load.image('world_5_cover', 'image/cover/world_5_cover.png')
    this.load.image('world_6_cover', 'image/cover/world_6_cover.png')
    this.load.image('world_7_cover', 'image/cover/world_7_cover.png')
    this.load.image('world_8_cover', 'image/cover/world_8_cover.png')
    this.load.image('world_9_cover', 'image/cover/world_9_cover.png')
    this.load.image('world_10_cover', 'image/cover/world_10_cover.png')
  }

  private loadBullets() {
    this.load.atlas(
      'bullets',
      'spritesheets/bullets/Bullets.png',
      'spritesheets/bullets/Bullets.json'
    )
  }

  private loadPlayersSkin() {
    this.load.atlas(
      'RickDefault',
      'spritesheets/players/RickDefault.png',
      'spritesheets/players/RickDefault.json'
    )

    this.load.atlas(
      'CommanderRick',
      'spritesheets/players/CommanderRick.png',
      'spritesheets/players/CommanderRick.json'
    )

    this.load.atlas(
      'CopRick',
      'spritesheets/players/CopRick.png',
      'spritesheets/players/CopRick.json'
    )

    this.load.atlas(
      'CrowRick',
      'spritesheets/players/CrowRick.png',
      'spritesheets/players/CrowRick.json'
    )

    this.load.atlas(
      'D99Rick',
      'spritesheets/players/D99Rick.png',
      'spritesheets/players/D99Rick.json'
    )

    this.load.atlas(
      'DeepthroatRick',
      'spritesheets/players/DeepthroatRick.png',
      'spritesheets/players/DeepthroatRick.json'
    )

    this.load.atlas(
      'FederationPrisonRick',
      'spritesheets/players/FederationPrisonRick.png',
      'spritesheets/players/FederationPrisonRick.json'
    )

    this.load.atlas(
      'GeneralRick',
      'spritesheets/players/GeneralRick.png',
      'spritesheets/players/GeneralRick.json'
    )

    this.load.atlas(
      'GhostcatcherRick',
      'spritesheets/players/GhostcatcherRick.png',
      'spritesheets/players/GhostcatcherRick.json'
    )

    this.load.atlas(
      'MemoryRick',
      'spritesheets/players/MemoryRick.png',
      'spritesheets/players/MemoryRick.json'
    )

    this.load.atlas(
      'PickleRick',
      'spritesheets/players/PickleRick.png',
      'spritesheets/players/PickleRick.json'
    )

    this.load.atlas(
      'RaderRick',
      'spritesheets/players/RaderRick.png',
      'spritesheets/players/RaderRick.json'
    )

    this.load.atlas(
      'RatSuitPickleRick',
      'spritesheets/players/RatSuitPickleRick.png',
      'spritesheets/players/RatSuitPickleRick.json'
    )

    this.load.atlas(
      'Rick800',
      'spritesheets/players/Rick800.png',
      'spritesheets/players/Rick800.json'
    )

    this.load.atlas(
      'RickBald',
      'spritesheets/players/RickBald.png',
      'spritesheets/players/RickBald.json'
    )

    this.load.atlas(
      'RickBeefcake',
      'spritesheets/players/RickBeefcake.png',
      'spritesheets/players/RickBeefcake.json'
    )

    this.load.atlas(
      'RickDoofus',
      'spritesheets/players/RickDoofus.png',
      'spritesheets/players/RickDoofus.json'
    )

    this.load.atlas(
      'RickDude',
      'spritesheets/players/RickDude.png',
      'spritesheets/players/RickDude.json'
    )

    this.load.atlas(
      'RickEvil',
      'spritesheets/players/RickEvil.png',
      'spritesheets/players/RickEvil.json'
    )

    this.load.atlas(
      'RickFlatTop',
      'spritesheets/players/RickFlatTop.png',
      'spritesheets/players/RickFlatTop.json'
    )

    this.load.atlas(
      'RickGreaser',
      'spritesheets/players/RickGreaser.png',
      'spritesheets/players/RickGreaser.json'
    )

    this.load.atlas(
      'RickGuard',
      'spritesheets/players/RickGuard.png',
      'spritesheets/players/RickGuard.json'
    )

    this.load.atlas(
      'RickJohnRick',
      'spritesheets/players/RickJohnRick.png',
      'spritesheets/players/RickJohnRick.json'
    )

    this.load.atlas(
      'RickJunkYard',
      'spritesheets/players/RickJunkYard.png',
      'spritesheets/players/RickJunkYard.json'
    )

    this.load.atlas(
      'RickKarate',
      'spritesheets/players/RickKarate.png',
      'spritesheets/players/RickKarate.json'
    )

    this.load.atlas(
      'RickMiami',
      'spritesheets/players/RickMiami.png',
      'spritesheets/players/RickMiami.json'
    )

    this.load.atlas(
      'RickMurderPatrol',
      'spritesheets/players/RickMurderPatrol.png',
      'spritesheets/players/RickMurderPatrol.json'
    )

    this.load.atlas(
      'RickNinja',
      'spritesheets/players/RickNinja.png',
      'spritesheets/players/RickNinja.json'
    )

    this.load.atlas(
      'RickRobot',
      'spritesheets/players/RickRobot.png',
      'spritesheets/players/RickRobot.json'
    )

    this.load.atlas(
      'RickShibuya',
      'spritesheets/players/RickShibuya.png',
      'spritesheets/players/RickShibuya.json'
    )

    this.load.atlas(
      'RickSmooth',
      'spritesheets/players/RickSmooth.png',
      'spritesheets/players/RickSmooth.json'
    )

    this.load.atlas(
      'RickSpaceSuit',
      'spritesheets/players/RickSpaceSuit.png',
      'spritesheets/players/RickSpaceSuit.json'
    )

    this.load.atlas(
      'RickSupremeGuard',
      'spritesheets/players/RickSupremeGuard.png',
      'spritesheets/players/RickSupremeGuard.json'
    )

    this.load.atlas(
      'RickSurvivor',
      'spritesheets/players/RickSurvivor.png',
      'spritesheets/players/RickSurvivor.json'
    )

    this.load.atlas(
      'RickTurberlent',
      'spritesheets/players/RickTurberlent.png',
      'spritesheets/players/RickTurberlent.json'
    )

    this.load.atlas(
      'RickValentinesDay',
      'spritesheets/players/RickValentinesDay.png',
      'spritesheets/players/RickValentinesDay.json'
    )

    this.load.atlas(
      'RickVapourWave',
      'spritesheets/players/RickVapourWave.png',
      'spritesheets/players/RickVapourWave.json'
    )

    this.load.atlas(
      'RickWarrior',
      'spritesheets/players/RickWarrior.png',
      'spritesheets/players/RickWarrior.json'
    )

    this.load.atlas(
      'RickZarchez',
      'spritesheets/players/RickZarchez.png',
      'spritesheets/players/RickZarchez.json'
    )

    this.load.atlas(
      'SherlockRick',
      'spritesheets/players/SherlockRick.png',
      'spritesheets/players/SherlockRick.json'
    )

    this.load.atlas(
      'SpaceTrooperRick',
      'spritesheets/players/SpaceTrooperRick.png',
      'spritesheets/players/SpaceTrooperRick.json'
    )

    this.load.atlas(
      'SpiritualLeaderRick',
      'spritesheets/players/SpiritualLeaderRick.png',
      'spritesheets/players/SpiritualLeaderRick.json'
    )

    this.load.atlas(
      'TinyRick',
      'spritesheets/players/TinyRick.png',
      'spritesheets/players/TinyRick.json'
    )

    this.load.atlas(
      'WastelandRick',
      'spritesheets/players/WastelandRick.png',
      'spritesheets/players/WastelandRick.json'
    )

    this.load.atlas(
      'WeirdRick',
      'spritesheets/players/WeirdRick.png',
      'spritesheets/players/WeirdRick.json'
    )
  }

  private loadEnemies() {
    this.load.atlas(
      'AntsInMyEyesJohnson',
      'spritesheets/enemies/AntsInMyEyesJohnson.png',
      'spritesheets/enemies/AntsInMyEyesJohnson.json'
    )

    this.load.atlas(
      'Concerto',
      'spritesheets/enemies/Concerto.png',
      'spritesheets/enemies/Concerto.json'
    )

    this.load.atlas(
      'FloopyDoops',
      'spritesheets/enemies/FloopyDoops.png',
      'spritesheets/enemies/FloopyDoops.json'
    )

    this.load.atlas(
      'Froopy5',
      'spritesheets/enemies/Froopy5.png',
      'spritesheets/enemies/Froopy5.json'
    )

    this.load.atlas(
      'Froopy14',
      'spritesheets/enemies/Froopy14.png',
      'spritesheets/enemies/Froopy14.json'
    )

    this.load.atlas(
      'FroopyTommy',
      'spritesheets/enemies/FroopyTommy.png',
      'spritesheets/enemies/FroopyTommy.json'
    )

    this.load.atlas(
      'GeneralGromflamite',
      'spritesheets/enemies/GeneralGromflamite.png',
      'spritesheets/enemies/GeneralGromflamite.json'
    )

    this.load.atlas(
      'Gobo',
      'spritesheets/enemies/Gobo.png',
      'spritesheets/enemies/Gobo.json'
    )

    this.load.atlas(
      'GromflamiteSoldier',
      'spritesheets/enemies/GromflamiteSoldier.png',
      'spritesheets/enemies/GromflamiteSoldier.json'
    )

    this.load.atlas(
      'Hamurai',
      'spritesheets/enemies/Hamurai.png',
      'spritesheets/enemies/Hamurai.json'
    )

    this.load.atlas(
      'Hemorrhage',
      'spritesheets/enemies/Hemorrhage.png',
      'spritesheets/enemies/Hemorrhage.json'
    )

    this.load.atlas(
      'Jaguar',
      'spritesheets/enemies/Jaguar.png',
      'spritesheets/enemies/Jaguar.json'
    )

    this.load.atlas(
      'Kiara',
      'spritesheets/enemies/Kiara.png',
      'spritesheets/enemies/Kiara.json'
    )

    this.load.atlas(
      'MrNimbus',
      'spritesheets/enemies/MrNimbus.png',
      'spritesheets/enemies/MrNimbus.json'
    )

    this.load.atlas(
      'NoobNoob',
      'spritesheets/enemies/NoobNoob.png',
      'spritesheets/enemies/NoobNoob.json'
    )

    this.load.atlas(
      'PrincessPoneta',
      'spritesheets/enemies/PrincessPoneta.png',
      'spritesheets/enemies/PrincessPoneta.json'
    )

    this.load.atlas(
      'RisottoGroupon',
      'spritesheets/enemies/RisottoGroupon.png',
      'spritesheets/enemies/RisottoGroupon.json'
    )

    this.load.atlas(
      'ScaryTerry',
      'spritesheets/enemies/ScaryTerry.png',
      'spritesheets/enemies/ScaryTerry.json'
    )

    this.load.atlas(
      'Schleemypants',
      'spritesheets/enemies/Schleemypants.png',
      'spritesheets/enemies/Schleemypants.json'
    )

    this.load.atlas(
      'Shnyuk',
      'spritesheets/enemies/Shnyuk.png',
      'spritesheets/enemies/Shnyuk.json'
    )

    this.load.atlas(
      'ShonoopyBloopers',
      'spritesheets/enemies/ShonoopyBloopers.png',
      'spritesheets/enemies/ShonoopyBloopers.json'
    )

    this.load.atlas(
      'Squanchy',
      'spritesheets/enemies/Squanchy.png',
      'spritesheets/enemies/Squanchy.json'
    )

    this.load.atlas(
      'TargetBot',
      'spritesheets/enemies/TargetBot.png',
      'spritesheets/enemies/TargetBot.json'
    )

    this.load.atlas(
      'Terryfold',
      'spritesheets/enemies/Terryfold.png',
      'spritesheets/enemies/Terryfold.json'
    )
  }

  private loadAudio() {
    this.load.audio('main-theme', 'audio/main_theme.mp3')
    this.load.audio('elevator-music', 'audio/elevator_music.mp3')

    this.load.audio('world_0', 'audio/world/world_0.mp3')
    this.load.audio('world_1', 'audio/world/world_1.mp3')
    this.load.audio('world_2', 'audio/world/world_2.mp3')
    this.load.audio('world_3', 'audio/world/world_3.mp3')
    this.load.audio('world_4', 'audio/world/world_4.mp3')
    this.load.audio('world_5', 'audio/world/world_5.mp3')
    this.load.audio('world_6', 'audio/world/world_6.mp3')
    this.load.audio('world_7', 'audio/world/world_7.mp3')
    this.load.audio('world_8', 'audio/world/world_8.mp3')
    this.load.audio('world_9', 'audio/world/world_9.mp3')
    this.load.audio('world_10', 'audio/world/world_10.mp3')

    this.load.audio('portal-open', 'sfx/portal_open.mp3')
    this.load.audio('portal-close', 'sfx/portal_close.mp3')
    this.load.audio('levelup', 'sfx/levelup.mp3')
    this.load.audio('button', 'sfx/button.mp3')
    this.load.audio('select', 'sfx/select.mp3')
    this.load.audio('coins', 'sfx/coins.mp3')
    this.load.audio('fire', 'sfx/fire.mp3')
    this.load.audio('exp', 'sfx/exp.mp3')
    this.load.audio('enemy-hit', 'sfx/enemy_hit.mp3')
    this.load.audio('player-hit', 'sfx/player_hit.mp3')
    this.load.audio('player-gameover', 'sfx/player_gameover.mp3')
  }
}
