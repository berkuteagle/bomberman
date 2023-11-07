import { createWorld } from 'https://cdn.jsdelivr.net/npm/bitecs/+esm';
import { Input, Scene } from 'https://cdn.jsdelivr.net/npm/phaser/+esm';

import {
    createArcadeSpriteSystem,
    createBombSystem,
    createExplosionSystem,
    createPlayerSystem,
    createSapperSystem
} from '../system.js';

import {
    createPlayer
} from '../entity.js';

const TEXTURES = [
    'GreenNinja',
    'Bomb'
];

const ANIMATIONS = [
    'Dummy', //0
    'GreenNinja_walk_down', //1
    'GreenNinja_walk_up', //2
    'GreenNinja_walk_left', //3
    'GreenNinja_walk_right', //4
    'Bomb' //5
];

export class GameScene extends Scene {

    #world = null;
    #bombSystem = null;
    #explosionSystem = null;
    #spriteSystem = null;
    #playerSystem = null;
    #sapperSystem = null;
    #cursors = null;
    #shooterKey = null;

    constructor() {
        super('Game');
    }

    preload() {
        this.load.setBaseURL('game/');

        this.load.image('TilesetInterior', 'assets/TilesetInterior.png');
        this.load.image('TilesetInteriorFloor', 'assets/TilesetInteriorFloor.png');
        this.load.image('TilesetDungeon', 'assets/TilesetDungeon.png');

        this.load.spritesheet(
            'GreenNinja',
            'assets/GreenNinja.png',
            {
                frameWidth: 16,
                frameHeight: 16
            }
        );

        this.load.spritesheet(
            'Bomb',
            'assets/Bomb.png',
            {
                frameWidth: 16,
                frameHeight: 16
            }
        );

        this.load.tilemapTiledJSON('map', 'assets/game.json');
    }

    init() {
        this.#cursors = this.input.keyboard.createCursorKeys();
        this.#shooterKey = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.SPACE);
    }

    create() {
        this.#world = createWorld();

        this.anims.create({
            key: 'GreenNinja_walk_down',
            frames: this.anims.generateFrameNumbers('GreenNinja', { frames: [0, 4, 8, 12] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'GreenNinja_walk_up',
            frames: this.anims.generateFrameNumbers('GreenNinja', { frames: [1, 5, 9, 13] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'GreenNinja_walk_left',
            frames: this.anims.generateFrameNumbers('GreenNinja', { frames: [2, 6, 10, 14] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'GreenNinja_walk_right',
            frames: this.anims.generateFrameNumbers('GreenNinja', { frames: [3, 7, 11, 15] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'Bomb',
            frames: this.anims.generateFrameNumbers('Bomb'),
            frameRate: 8,
            repeat: -1
        });

        createPlayer(this.#world, 64, 64);

        this.scene.launch('UI');

        this.data.set({
            level: 0,
            lives: 3
        });

        const map = this.make.tilemap({ key: 'map' });
        const tilesInterior = map.addTilesetImage('TilesetInterior', 'TilesetInterior');
        const tilesInteriorFloor = map.addTilesetImage('TilesetInteriorFloor', 'TilesetInteriorFloor');
        const tilesDungeon = map.addTilesetImage('TilesetDungeon', 'TilesetDungeon');

        map.createLayer('Floor', [tilesInteriorFloor], 40, 40);

        const wallsLayer = map.createLayer('Walls', [tilesInterior], 40, 40);
        const stoneLayer = map.createLayer('Stones', [tilesDungeon], 40, 40);

        wallsLayer.setCollision([162, 166, 163, 184, 210, 244, 215, 179, 291, 262, 279, 195, 245, 276, 273, 274, 246, 278, 198, 280, 275, 261, 193, 310, 307, 311]);
        stoneLayer.setCollision(739);

        const staticGroup = this.physics.add.staticGroup();
        const group = this.physics.add.group({ collideWorldBounds: true });

        this.physics.add.collider(group, group);
        this.physics.add.collider(group, staticGroup);
        this.physics.add.collider(group, wallsLayer);
        this.physics.add.collider(group, stoneLayer);

        this.#spriteSystem = createArcadeSpriteSystem(group, staticGroup, TEXTURES, ANIMATIONS);
        this.#playerSystem = createPlayerSystem(this.#cursors);
        this.#sapperSystem = createSapperSystem(this.#shooterKey);
        this.#bombSystem = createBombSystem(this.time);
        this.#explosionSystem = createExplosionSystem();

        this.sys.events.on('wake', this.wake, this);
    }

    update() {

        if (this.#world) {
            this.#playerSystem(this.#world);
            this.#spriteSystem(this.#world);
            this.#sapperSystem(this.#world);
            this.#bombSystem(this.#world);
            this.#explosionSystem(this.#world);
        }

        super.update();
    }

    openMenu() {
        this.scene.sleep('UI');
        this.scene.switch('Menu');
    }

    wake() {
        this.scene.run('UI');
    }
}
