import { Input, Scene } from '../phaser.js';

import {
    createBombSystem,
    createExplosionSystem,
    createSapperSystem
} from '../ecs/system.js';

import { AnimationFeature } from '../ecs/animation.js';
import { createKeyboardCursorSystem } from '../ecs/input.js';
import { MovementFeature } from '../ecs/movement.js';
import { PhyFeature } from '../ecs/phy.js';
import { createPlayer, createPlayerSystem } from '../ecs/player.js';
import { PositionFeature } from '../ecs/position.js';
import { SpriteFeature } from '../ecs/sprite.js';


export class GameScene extends Scene {

    constructor() {
        super('Game');
    }

    init() {
        this.ecs.addFeature('phy', PhyFeature);
        this.ecs.addFeature('position', PositionFeature);
        this.ecs.addFeature('movement', MovementFeature);
        this.ecs.addFeature('sprite', SpriteFeature);
        this.ecs.addFeature('animation', AnimationFeature);
    }

    create() {

        const static_group = this.physics.add.staticGroup();
        const group = this.ecs.groups.get(this.ecs.groups.getIndex('Player'));
        const bombs_group = this.ecs.groups.get(this.ecs.groups.getIndex('Bombs'));
        const damage_group = this.ecs.groups.get(this.ecs.groups.getIndex('Explosion'));

        group.defaults = {
            setCollideWorldBounds: true
        };

        bombs_group.defaults = {
            setImmovable: true
        };

        createPlayer(64, 64)(this.ecs.world);

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
