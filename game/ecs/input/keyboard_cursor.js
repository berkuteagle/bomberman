import { addComponent, addEntity, defineQuery, defineSystem, removeEntity, } from '../../bitecs.js';

import { CURSOR_MASK, Cursor } from './cursor.js';

function getCursorState(cursors) {
    let result = 0;

    if (cursors.up.isDown) {
        result |= CURSOR_MASK.UP;
    }

    if (cursors.down.isDown) {
        result |= CURSOR_MASK.DOWN;
    }

    if (cursors.left.isDown) {
        result |= CURSOR_MASK.LEFT;
    }

    if (cursors.right.isDown) {
        result |= CURSOR_MASK.RIGHT;
    }

    return result;
}

export const createKeyboardCursorSystem = (scene) => {

    const cursors = scene.input.keyboard.createCursorKeys();
    const cursorQuery = defineQuery([Cursor]);

    return defineSystem(world => {

        const cursorEntities = cursorQuery(world);
        const cursorState = getCursorState(cursors);

        if (cursorEntities.length) {
            cursorEntities.forEach((entity, idx) => {
                if (idx || !cursorState) {
                    removeEntity(world, entity);
                } else {
                    Cursor.state[entity] = cursorState;
                }
            });
        } else if (cursorState) {
            const cursorEntity = addEntity(world);

            addComponent(world, Cursor, cursorEntity);

            Cursor.state[cursorEntity] = cursorState;
        }

    });
}
