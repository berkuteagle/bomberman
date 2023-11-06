import { createWorld } from 'https://cdn.jsdelivr.net/npm/bitecs/+esm';
import { Scene } from 'https://cdn.jsdelivr.net/npm/phaser/+esm';


import { createArcadeSpriteSystem } from '../system/ArcadeSprite.js';
import { createBombSystem } from '../system/Bomb.js';
import { createPlayerSystem } from '../system/Player.js';

import { createBomb } from '../entity/Bomb.js';
import { createPlayer } from '../entity/Player.js';

// import Player from '../player.js';
// import { KeyboardPlayerControl } from '../player_control.js';

const TEXTURES = [
    'GreenNinja',
    'Bomb'
];

export default class GameScene extends Scene {

    #world = null;
    #bombSystem = null;
    #spriteSystem = null;
    #playerSystem = null;
    #cursors = null;

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
            'assets/GreenNinjaSpriteSheet.png',
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

        this.load.tilemapTiledJSON('map', 'game.json');
    }

    init() {
        this.#cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        this.#world = createWorld();

        createPlayer(this.#world, 64, 64);
        createBomb(this.#world, 64, 80);

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

        this.#spriteSystem = createArcadeSpriteSystem(group, staticGroup, TEXTURES);
        this.#playerSystem = createPlayerSystem(this.#cursors);
        this.#bombSystem = createBombSystem();

        this.sys.events.on('wake', this.wake, this);
    }

    update() {

        if (this.#world) {
            this.#playerSystem(this.#world);
            this.#spriteSystem(this.#world);
            this.#bombSystem(this.#world);
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
