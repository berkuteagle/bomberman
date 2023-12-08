import type {
  Time,
} from 'phaser'
import {
  Math,
  Scene,
} from 'phaser'

import type { ScenePlugin as ECSScenePlugin } from '../ecs'
import { animation, position, sprite, velocity, withSync } from '../ecs'
import type { GamePlugin as PeerjsGamePlugin } from '../peerjs'

enum TEXTURES {
  GreenNinja = 0,
  RedNinja,
  Bomb,
  Explosion,
}

enum ANIMATIONS {
  GreenNinjaWalkUp = 0,
  GreenNinjaWalkDown,
  GreenNinjaWalkLeft,
  GreenNinjaWalkRight,
  RedNinjaWalkUp,
  RedNinjaWalkDown,
  RedNinjaWalkLeft,
  RedNinjaWalkRight,
  Bomb,
  Explosion,
}

const ANIMATIONS_LIST = [
  ANIMATIONS[ANIMATIONS.GreenNinjaWalkUp],
  ANIMATIONS[ANIMATIONS.GreenNinjaWalkDown],
  ANIMATIONS[ANIMATIONS.GreenNinjaWalkLeft],
  ANIMATIONS[ANIMATIONS.GreenNinjaWalkRight],
  ANIMATIONS[ANIMATIONS.RedNinjaWalkUp],
  ANIMATIONS[ANIMATIONS.RedNinjaWalkDown],
  ANIMATIONS[ANIMATIONS.RedNinjaWalkLeft],
  ANIMATIONS[ANIMATIONS.RedNinjaWalkRight],
  ANIMATIONS[ANIMATIONS.Bomb],
  ANIMATIONS[ANIMATIONS.Explosion],
]

const TEXTURES_LIST = [
  TEXTURES[TEXTURES.GreenNinja],
  TEXTURES[TEXTURES.RedNinja],
  TEXTURES[TEXTURES.Bomb],
  TEXTURES[TEXTURES.Explosion],
]

export default class GameScene extends Scene {
  ecs!: ECSScenePlugin
  timer!: Time.TimerEvent
  peerjs!: PeerjsGamePlugin

  constructor() {
    super('Game')
  }

  create({ mode, green }: { mode: 'vs' | 'single', green: string, red: string }) {
    this.scene.launch('UI')

    this.data.set({
      level: 0,
      lives: 3,
    })

    this.ecs.definePreSystems(
      velocity.requestsSystem(),
      position.requestsSystem(new Float32Array([64, 64, 416, 416])),
      animation.requestsSystem(),
      position.limitsPreSystem(),
      sprite.preSystem(TEXTURES_LIST),
      animation.preSystem(ANIMATIONS_LIST),
    )

    this.ecs.defineUpdateSystems(
      velocity.updateSystem(),
      sprite.updateSystem(),
    )

    this.ecs.definePostSystems(
      position.limitsPostSystem(),
      sprite.postSystem(),
    )

    const playerEntry = green === this.peerjs.id || mode === 'single'
      ? this.ecs.addEntity(
        withSync(),
        sprite.withSprite(10, TEXTURES.GreenNinja),
        animation.withAnimation(ANIMATIONS.GreenNinjaWalkDown, animation.AnimationState.Play),
        position.withPosition(64, 64),
        velocity.withVelocity(0, 0, 100),
      )
      : this.ecs.addEntity(
        withSync(),
        sprite.withSprite(10, TEXTURES.RedNinja),
        position.withPosition(416, 416),
        velocity.withVelocity(0, 0, 100),
      )

    if (mode === 'vs') {
      this.timer = this.time.addEvent({
        delay: 2000,
        callback: () => {
          this.ecs.request(
            velocity.setRequest(
              playerEntry,
              Math.FloatBetween(-30, 30),
              Math.FloatBetween(-30, 30),
            ),
          )
        },
        loop: true,
      })

      this.outSync()
      this.inSync()
    }

    const map = this.make.tilemap({ key: 'map' })
    const tilesInterior = map.addTilesetImage('TilesetInterior', 'TilesetInterior')
    const tilesInteriorFloor = map.addTilesetImage('TilesetInteriorFloor', 'TilesetInteriorFloor')
    const tilesDungeon = map.addTilesetImage('TilesetDungeon', 'TilesetDungeon')

    map.createLayer('Floor', [tilesInteriorFloor!], 40, 40)

    const wallsLayer = map.createLayer('Walls', [tilesInterior!], 40, 40)
    const stoneLayer = map.createLayer('Stones', [tilesDungeon!], 40, 40)

    wallsLayer!.setCollision([162, 166, 163, 184, 210, 244, 215, 179, 291, 262, 279, 195, 245, 276, 273, 274, 246, 278, 198, 280, 275, 261, 193, 310, 307, 311])
    stoneLayer!.setCollision(739)

    this.sys.events.on('wake', this.wake, this)
  }

  async outSync() {
    for await (const packet of this.ecs.outSync()) {
      if (packet.sync?.byteLength || packet.requests?.byteLength)
        this.peerjs.outSync(packet)
    }
  }

  async inSync() {
    for await (const packet of this.peerjs.inSync()) {
      if (packet.sync?.byteLength || packet.requests?.byteLength)
        this.ecs.inSync(packet)
    }
  }

  openMenu() {
    this.scene.sleep('UI')
    this.scene.switch('Menu')
  }

  wake() {
    this.scene.run('UI')
  }
}
