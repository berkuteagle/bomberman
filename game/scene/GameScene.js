import { ControlFeature } from '../ecs-phaser.js';
import { VelocityFeature } from '../ecs.js';
import { Input, Scene } from '../phaser.js';

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

        this.ecs.addFeature(
            'control',
            ControlFeature,
            {
                controlType: 'keyboard',
                keyboardConfig: {
                    upKeyCode: Input.Keyboard.KeyCodes.UP,
                    downKeyCode: Input.Keyboard.KeyCodes.DOWN,
                    leftKeyCode: Input.Keyboard.KeyCodes.LEFT,
                    rightKeyCode: Input.Keyboard.KeyCodes.RIGHT,
                    actionKeyCode: Input.Keyboard.KeyCodes.SPACE
                }
            }
        );
        this.ecs.addFeature('velocity', VelocityFeature);

        this.player = this.ecs.sprite.create(
            64, 64, 'GreenNinja',
            this.ecs.animation.addAnimationTag(),
            this.ecs.getFeature('velocity').addVelocity()
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
