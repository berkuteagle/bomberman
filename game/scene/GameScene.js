import {
    InputFeature,
    withMovementAnimation,
    withSpriteDepth
} from '../ecs-phaser.js';

import {
    ControlFeature,
    DirectionFeature,
    VelocityFeature,
    withControlTag,
    withDirection,
    withPositionLimits,
    withVelocity,
    withVelocityLimit
} from '../ecs.js';

import {
    Input,
    Scene
} from '../phaser.js';

export class GameScene extends Scene {

    constructor() {
        super('Game');
    }

    init() {

    }

    create() {

        this.scene.launch('UI');

        this.data.set({
            level: 0,
            lives: 3
        });

        this.ecs.addFeature('velocity', VelocityFeature);
        this.ecs.addFeature('direction', DirectionFeature);
        this.ecs.addFeature('control', ControlFeature);
        this.ecs.addFeature('input', InputFeature, {
            inputType: 'keyboard',
            keyboardConfig: {
                upKeyCode: Input.Keyboard.KeyCodes.UP,
                downKeyCode: Input.Keyboard.KeyCodes.DOWN,
                leftKeyCode: Input.Keyboard.KeyCodes.LEFT,
                rightKeyCode: Input.Keyboard.KeyCodes.RIGHT,
                actionKeyCode: Input.Keyboard.KeyCodes.SPACE
            }
        });

        this.player = this.ecs.sprite.create(
            64, 64, 'GreenNinja',
            withControlTag(),
            withVelocity(0, 0),
            withVelocityLimit(70),
            withSpriteDepth(10),
            withPositionLimits(64, 416, 64, 416),
            withDirection(),
            withMovementAnimation({
                up: 'GreenNinja_walk_up',
                down: 'GreenNinja_walk_down',
                left: 'GreenNinja_walk_left',
                right: 'GreenNinja_walk_right'
            })
        );

        const map = this.make.tilemap({ key: 'map' });
        const tilesInterior = map.addTilesetImage('TilesetInterior', 'TilesetInterior');
        const tilesInteriorFloor = map.addTilesetImage('TilesetInteriorFloor', 'TilesetInteriorFloor');
        const tilesDungeon = map.addTilesetImage('TilesetDungeon', 'TilesetDungeon');

        map.createLayer('Floor', [tilesInteriorFloor], 40, 40);

        const wallsLayer = map.createLayer('Walls', [tilesInterior], 40, 40);
        const stoneLayer = map.createLayer('Stones', [tilesDungeon], 40, 40);

        wallsLayer.setCollision([162, 166, 163, 184, 210, 244, 215, 179, 291, 262, 279, 195, 245, 276, 273, 274, 246, 278, 198, 280, 275, 261, 193, 310, 307, 311]);
        stoneLayer.setCollision(739);

        this.sys.events.on('wake', this.wake, this);
    }

    openMenu() {
        this.scene.sleep('UI');
        this.scene.switch('Menu');
    }

    wake() {
        this.scene.run('UI');
    }
}
