export { default as VelocityFeature } from './velocity/VelocityFeature.js';

export {
    ChangeVelocityRequest,
    SetVelocityRequest, Velocity,
    VelocityLimit
} from './velocity/components.js';

export {
    addChangeVelocityRequest,
    addSetVelocityRequest,
    addVelocity,
    addVelocityLimit,
    createChangeVelocityRequest,
    createSetVelocityRequest,
    hasVelocity,
    hasVelocityLimit
} from './velocity/utils.js';
