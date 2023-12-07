import {
  Sprite,
  withAnimation,
  withSpriteDepth,
} from '../../ecs-phaser.js'
import { withBombTag } from './utils.js'

export default class BombSprite extends Sprite {
  constructor(scene, x, y) {
    super(
      scene,
      x,
      y,
      'Bomb',
      withBombTag(),
      withAnimation('Bomb'),
      withSpriteDepth(5),
    )
  }
}
