export { default as VelocityFeature } from './velocity/velocity-feature.js';

export {
    ChangeVelocityRequest,
    SetVelocityRequest, Velocity,
    VelocityLimit
} from './velocity/components.js';

export {
    createChangeVelocityRequest,
    createSetVelocityRequest,
    hasVelocity,
    hasVelocityLimit,
    withChangeVelocityRequest,
    withSetVelocityRequest,
    withVelocity,
    withVelocityLimit
} from './velocity/utils.js';
