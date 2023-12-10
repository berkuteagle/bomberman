import type {
  Time,
} from 'phaser'
import {
  Input,
  Scene,
} from 'phaser'

import type { ScenePlugin as ECSScenePlugin } from '../ecs'
import { animation, collision, direction, joypad, player, position, sprite, velocity, walking, withSync } from '../ecs'
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
      velocity.preUpdate(),
      position.requestsSystem(Float32Array.from([64, 64, 416, 416])),
      animation.requestsSystem(),
      position.limitsPreSystem(),
      sprite.preSystem(TEXTURES_LIST),
      animation.preSystem(ANIMATIONS_LIST),
      collision.preUpdate(),
    )

    this.ecs.defineUpdateSystems(
      joypad.keyboardSystem({
        up: this.input.keyboard!.addKey(Input.Keyboard.KeyCodes.UP),
        down: this.input.keyboard!.addKey(Input.Keyboard.KeyCodes.DOWN),
        left: this.input.keyboard!.addKey(Input.Keyboard.KeyCodes.LEFT),
        right: this.input.keyboard!.addKey(Input.Keyboard.KeyCodes.RIGHT),
      }),
      sprite.updateSystem(),
      collision.update(),
    )

    this.ecs.definePostSystems(
      position.limitsPostSystem(),
      sprite.postSystem(),
      player.joypadControlSystem(),
      velocity.postUpdate(),
      collision.postUpdate(),
    )

    this.ecs.addEntity(joypad.withJoyPadState({
      buttons: 0,
      dPad: 0,
      extraButtons: 0,
      leftStick: Float32Array.from([0, 0]),
      rightStick: Float32Array.from([0, 0]),
    }))

    if (green === this.peerjs.id || mode === 'single') {
      this.ecs.addEntity(
        withSync(),
        player.withPlayerTag(),
        animation.withAnimationTag(),
        walking.withWalkingAnimation({
          up: ANIMATIONS.GreenNinjaWalkUp,
          down: ANIMATIONS.GreenNinjaWalkDown,
          left: ANIMATIONS.GreenNinjaWalkLeft,
          right: ANIMATIONS.GreenNinjaWalkRight,
        }),
        sprite.withSprite(10, TEXTURES.GreenNinja),
        position.withPosition(64, 64),
        collision.withCollisionTag(),
        collision.withCollisionBox(16, 16),
        velocity.withVelocity(0, 0, 100),
        direction.withDirection(direction.DirectionValue.Down),
      )
    }
    else {
      this.ecs.addEntity(
        withSync(),
        player.withPlayerTag(),
        animation.withAnimationTag(),
        walking.withWalkingAnimation({
          up: ANIMATIONS.RedNinjaWalkUp,
          down: ANIMATIONS.RedNinjaWalkDown,
          left: ANIMATIONS.RedNinjaWalkLeft,
          right: ANIMATIONS.RedNinjaWalkRight,
        }),
        sprite.withSprite(10, TEXTURES.RedNinja),
        position.withPosition(416, 416),
        collision.withCollisionTag(),
        collision.withCollisionBox(16, 16),
        velocity.withVelocity(0, 0, 100),
        direction.withDirection(direction.DirectionValue.Down),
      )
    }

    this.ecs.addEntity(
      withSync(),
      animation.withAnimationTag(),
      animation.withAnimation(ANIMATIONS.Bomb, animation.AnimationState.Play),
      sprite.withSprite(10, TEXTURES.Bomb),
      position.withPosition(128, 128),
      collision.withCollisionTag(),
      collision.withCollisionBox(16, 16),
    )

    if (mode === 'vs') {
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
      if (packet.sync?.byteLength)
        this.peerjs.outSync(packet)
    }
  }

  async inSync() {
    for await (const packet of this.peerjs.inSync()) {
      if (packet.sync?.byteLength)
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
