import Feature from '../feature.js'

import MovementAnimationSystem from './MovementAnimationSystem.js'

export default class MovementFeature extends Feature {
  /**
   * @override
   */
  init() {
    if (this.config.animation)
      this.addSystem('movement-animation', new MovementAnimationSystem(this.ecs))
  }

  static defaultConfig() {
    return { animation: true }
  }
}
