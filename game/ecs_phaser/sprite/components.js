import { Types, defineComponent } from '../../bitecs.js';

export const SpriteTag = defineComponent();

export const SpriteDepth = defineComponent({
    depth: Types.ui16
});

export const SpriteGroup = defineComponent({
    key: Types.ui16
});
