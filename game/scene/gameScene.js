import Player from '../player.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        });
    }

    preload() {
        this.load.setBaseURL('game/');

        this.load.image('TilesetInterior', 'assets/TilesetInterior.png');
        this.load.image('TilesetInteriorFloor', 'assets/TilesetInteriorFloor.png');
        this.load.image('TilesetDungeon', 'assets/TilesetDungeon.png');

        this.load.image('GreenNinjaSprite', 'assets/GreenNinjaSpriteSheet.png');
        this.load.spritesheet(
            'GreenNinja',
            'assets/GreenNinjaSpriteSheet.png',
            {
                frameWidth: 16,
                frameHeight: 16
            }
        );

        this.load.tilemapTiledJSON('map', 'game.json');
    }

    create() {
        const map = this.make.tilemap({ key: 'map' });
        const tilesInterior = map.addTilesetImage('TilesetInterior', 'TilesetInterior');
        const tilesInteriorFloor = map.addTilesetImage('TilesetInteriorFloor', 'TilesetInteriorFloor');
        const tilesDungeon = map.addTilesetImage('TilesetDungeon', 'TilesetDungeon');

        map.createLayer('Floor', [tilesInteriorFloor], 40, 40);

        const wallsLayer = map.createLayer('Walls', [tilesInterior], 40, 40);
        const stoneLayer = map.createLayer('Stones', [tilesDungeon], 40, 40);

        map.setCollision([162, 166, 163, 184, 210, 244, 215, 179, 291, 262, 279, 195, 245, 276, 273, 274, 246, 278, 198, 280, 275, 261, 193, 310, 307, 311, 739]);

        this.player = new Player(this, 0, 0);
        this.physics.add.collider(this.player, wallsLayer);
        this.physics.add.collider(this.player, stoneLayer);
    }

    update() {
        this.player.update();
    }
}
