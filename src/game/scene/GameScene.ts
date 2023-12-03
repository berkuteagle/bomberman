// import {
//     AnimationFeature,
//     InputFeature,
// } from '../ecs-phaser.js';

// import {
//     ControlFeature,
//     DirectionFeature,
//     PositionFeature,
//     VelocityFeature
// } from '../ecs.js';

import {
    GameObjects,
    Math,
    // Input,
    Scene,
    Time
} from 'phaser';

import { ScenePlugin as ECSScenePlugin, position, sprite, velocity, withData } from '../ecs';
import { GamePlugin as PeerjsGamePlugin } from '../peerjs';

// import { BombFeature } from '../bomberman/bomb.js';
// import { PlayerFeature } from '../bomberman/player.js';
// import { RivalFeature } from '../bomberman/rival.js';

export default class GameScene extends Scene {

    ecs!: ECSScenePlugin;
    player!: GameObjects.Sprite;
    rival!: GameObjects.Sprite;
    timer!: Time.TimerEvent;
    peerjs!: PeerjsGamePlugin;

    constructor() {
        super('Game');
    }

    create({ mode, green, red }: { mode: 'vs' | 'single'; green: string; red: string; }) {

        this.scene.launch('UI');

        this.data.set({
            level: 0,
            lives: 3
        });

        this.ecs.addSystem('position-request', new position.RequestSystem());
        this.ecs.addSystem('velocity-request', new velocity.RequestSystem());
        this.ecs.addSystem('position-limits', new position.LimitsSystem());
        this.ecs.addSystem('velocity', new velocity.System());
        this.ecs.addSystem('sprite', new sprite.System());

        this.player = this.add.sprite(64, 64, 'GreenNinja');

        const playerEntry = this.ecs.addEntity(
            sprite.withSprite(10),
            position.withPosition(this.player.x, this.player.y),
            position.withPositionLimits(64, 64, 416, 416),
            withData('sprite', this.player),
            velocity.withVelocity(0, 0, 100)
        );

        if (mode === 'vs') {
            this.rival = this.add.sprite(416, 416, 'RedNinja');

            const rivalEntry = this.ecs.addEntity(
                sprite.withSprite(10),
                position.withPosition(this.rival.x, this.rival.y),
                position.withPositionLimits(64, 64, 416, 416),
                withData('sprite', this.rival),
                velocity.withVelocity(0, 0, 100)
            );

            console.log(rivalEntry);
            console.log(red);

            if (green === this.peerjs.id) {
                this.timer = this.time.addEvent({
                    delay: 2000,
                    callback: () => {
                        this.ecs.request(
                            velocity.setRequest(
                                green === this.peerjs.id ? playerEntry : rivalEntry,
                                Math.FloatBetween(-30, 30),
                                Math.FloatBetween(-30, 30)
                            )
                        );
                    },
                    loop: true
                });
            }

            this.outSync();
            this.inSync();
        }

        // this.timer = this.time.addEvent({
        //     delay: 2000,
        //     callback: () => {
        //         this.ecs.request(
        //             velocity.setRequest(
        //                 playerEntry,
        //                 Math.FloatBetween(-30, 30),
        //                 Math.FloatBetween(-30, 30)
        //             )
        //         );
        //     },
        //     loop: true
        // });

        // this.outSync();

        // this.ecs.addFeature('position', PositionFeature);
        // this.ecs.addFeature('velocity', VelocityFeature);
        // this.ecs.addFeature('direction', DirectionFeature);
        // this.ecs.addFeature('control', ControlFeature);

        // this.ecs.addFeature('animation', AnimationFeature);
        // this.ecs.addFeature('input', InputFeature, {
        //     inputType: 'keyboard',
        //     keyboardConfig: {
        //         upKeyCode: Input.Keyboard.KeyCodes.UP,
        //         downKeyCode: Input.Keyboard.KeyCodes.DOWN,
        //         leftKeyCode: Input.Keyboard.KeyCodes.LEFT,
        //         rightKeyCode: Input.Keyboard.KeyCodes.RIGHT,
        //         aKeyCode: Input.Keyboard.KeyCodes.SPACE
        //     }
        // });

        // this.ecs.addFeature('bomb', BombFeature);
        // this.ecs.addFeature('player', PlayerFeature);
        // this.ecs.addFeature('rival', RivalFeature);

        const map = this.make.tilemap({ key: 'map' });
        const tilesInterior = map.addTilesetImage('TilesetInterior', 'TilesetInterior');
        const tilesInteriorFloor = map.addTilesetImage('TilesetInteriorFloor', 'TilesetInteriorFloor');
        const tilesDungeon = map.addTilesetImage('TilesetDungeon', 'TilesetDungeon');

        map.createLayer('Floor', [tilesInteriorFloor!], 40, 40);

        const wallsLayer = map.createLayer('Walls', [tilesInterior!], 40, 40);
        const stoneLayer = map.createLayer('Stones', [tilesDungeon!], 40, 40);

        wallsLayer!.setCollision([162, 166, 163, 184, 210, 244, 215, 179, 291, 262, 279, 195, 245, 276, 273, 274, 246, 278, 198, 280, 275, 261, 193, 310, 307, 311]);
        stoneLayer!.setCollision(739);

        this.sys.events.on('wake', this.wake, this);
    }

    async outSync() {
        for await (const sync of this.ecs.outSync()) {
            if (sync.byteLength) {
                this.peerjs.outSync(sync);
            }
        }
    }

    async inSync() {
        for await (const sync of this.peerjs.inSync()) {
            if (sync.byteLength) {
                this.ecs.inSync(sync);
            }
        }
    }

    openMenu() {
        this.scene.sleep('UI');
        this.scene.switch('Menu');
    }

    wake() {
        this.scene.run('UI');
    }
}
