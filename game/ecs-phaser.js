export { default as ScenePlugin } from './ecs-phaser/scene-plugin.js';

export {
    AnimationFeature,
    AnimationTag,
    hasAnimationTag,
    hasMovementAnimationTag,
    withAnimation,
    withAnimationTag,
    withMovementAnimation,
    withMovementAnimationTag,
    withPlayAnimationRequest,
    withStopAnimationRequest
} from './ecs-phaser/animation.js';

export { InputFeature } from './ecs-phaser/input.js';

export {
    default as Sprite,
    SpriteDepth,
    SpriteTag,
    hasSpriteDepth,
    hasSpriteTag,
    withSpriteDepth,
    withSpriteTag
} from './ecs-phaser/sprite.js';
