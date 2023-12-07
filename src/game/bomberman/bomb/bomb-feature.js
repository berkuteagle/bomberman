import { Feature } from '../../ecs.js'

import BombRequestsSystem from './bomb-requests-system.js'

export default class BombFeature extends Feature {
  /** @override */
  init() {
    this.addSystem('bomb-requests', new BombRequestsSystem(this.ecs))
  }
}
