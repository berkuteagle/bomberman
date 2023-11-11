import { Input, Scene } from '../phaser.js';

import {
    createBombSystem,
    createExplosionSystem,
    createSapperSystem
} from '../ecs/system.js';

import { AnimationSceneFeature } from '../ecs/animation.js';
import { createKeyboardCursorSystem } from '../ecs/input.js';
import { MovementSceneFeature } from '../ecs/movement.js';
import { createPlayer, createPlayerSystem } from '../ecs/player.js';
import { SpriteSceneFeature } from '../ecs/sprite.js';


export class GameScene extends Scene {

    #spriteFeature;
    #animationFeature;
    #movementFeature;

    constructor() {
        super('Game');
    }

    preload() {
        this.#spriteFeature = new SpriteSceneFeature(this, {
            defaultConfig: {
                frameWidth: 16,
                frameHeight: 16
            },
            groups: ['Player', 'Objects', 'Bombs'],
            spritesheets: [
                {
                    key: 'GreenNinja',
                    path: 'assets/GreenNinja.png'
                }, {
                    key: 'DarkNinja',
                    path: 'assets/DarkNinja.png'
                }, {
                    key: 'Bomb',
                    path: 'assets/Bomb.png'
                }, {
                    key: 'Explosion',
                    path: 'assets/Explosion.png',
                    config: {
                        frameWidth: 48,
                        frameHeight: 48
                    }
                }
            ]
        });

        this.#animationFeature = new AnimationSceneFeature(this, {
            animations: [
                {
                    key: 'GreenNinja_walk_down',
                    texture: 'GreenNinja',
                    frames: [0, 4, 8, 12],
                    frameRate: 8,
                    repeat: -1
                }, {
                    key: 'GreenNinja_walk_up',
                    texture: 'GreenNinja',
                    frames: [1, 5, 9, 13],
                    frameRate: 8,
                    repeat: -1
                }, {
                    key: 'GreenNinja_walk_left',
                    texture: 'GreenNinja',
                    frames: [2, 6, 10, 14],
                    frameRate: 8,
                    repeat: -1
                }, {
                    key: 'GreenNinja_walk_right',
                    texture: 'GreenNinja',
                    frames: [3, 7, 11, 15],
                    frameRate: 8,
                    repeat: -1
                }, {
                    key: 'Bomb',
                    frameRate: 8,
                    repeat: -1
                }, {
                    key: 'Explosion',
                    frameRate: 12,
                    repeat: 1
                }
            ]
        });

        this.#movementFeature = new MovementSceneFeature(this);

        this.load.setBaseURL('game/');

        this.#spriteFeature.preload();
        this.#animationFeature.preload();

        this.load.image('TilesetInterior', 'assets/TilesetInterior.png');
        this.load.image('TilesetInteriorFloor', 'assets/TilesetInteriorFloor.png');
        this.load.image('TilesetDungeon', 'assets/TilesetDungeon.png');

        this.load.tilemapTiledJSON('map', 'assets/game.json');
    }

    create() {
        const static_group = this.physics.add.staticGroup();
        const group = this.physics.add.group();
        const bombs_group = this.physics.add.group();
        const damage_group = this.physics.add.group();

        group.defaults = {
            setCollideWorldBounds: true
        };

        bombs_group.defaults = {
            setImmovable: true
        };

        this.#spriteFeature.create();
        this.#animationFeature.create();
        this.#movementFeature.create();

        createPlayer(this, 64, 64);

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

        this.physics.add.collider(group, bombs_group);
        this.physics.add.collider(group, static_group);
        this.physics.add.collider(group, wallsLayer);
        this.physics.add.collider(group, stoneLayer);

        this.physics.add.overlap(group, damage_group, () => {
            this.scene.sleep('UI');
            this.scene.switch('GameOver');
        }, null, null);

        this.ecs.addSystem('player', createPlayerSystem());
        this.ecs.addSystem('sapper', createSapperSystem(this.input.keyboard.addKey(Input.Keyboard.KeyCodes.SPACE)));
        this.ecs.addSystem('bomb', createBombSystem());
        this.ecs.addSystem('explosion', createExplosionSystem());
        this.ecs.addSystem('cursor', createKeyboardCursorSystem(this));

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
