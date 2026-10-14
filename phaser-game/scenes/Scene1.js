class Scene1 extends Phaser.Scene {
    map;
    tiled;
    platforms;
    player;
    cursors;
    keysWASD;
    spacebar;
    pickups;
    powerjewels;

    constructor() {
        // register scene with the game engine
        super("Scene1"); // call the parent scene
    }
    preload() {
        // preload all assets

        // load tile assets - 1st param = Phaser "key", 2nd param = path to file
        this.load.image("platform-tiles", "Tiles/tiles_1024_128x128.png")
        // load json map, params as above
        this.load.tilemapTiledJSON("scene1map", "Tiled/scene1_map.tmj")
        // load spritesheet. 3rd is frames
        this.load.spritesheet("boy-run", "sprites/boy_run.png", {
            frameWidth: 100,
            frameHeight: 160
        })
        this.load.spritesheet("boy-jump", "sprites/boy_jump.png", {
            frameWidth: 100,
            frameHeight: 160
        })

        // load backgrounds :3
        this.load.image("blue-jewel", "pickups/Jewel_Blue.png")
        this.load.image("yellow-jewel", "pickups/Jewel_Yellow.png")
        this.load.image("background1", "Background_1/Background1_Layer_1.png")
        this.load.image("background2", "Background_1/Background1_Layer_2.png")
        this.load.image("background3", "Background_1/Background1_Layer_3.png")
    }
    create() {
        this.cameras.main.setBounds(0, 0, 2816, 1280)
        // place items on screen etc
        this.physics.world.setBounds(0, 0, 2816, 1280) // where it starts and extends to
        // create backgrounds
        this.add.image(1440, 500, "background1");
        this.add.image(1440, 600, "background2");
        this.add.image(1440, 700, "background3");

        // create map based on tiled json file
        this.map = this.make.tilemap({ key: "scene1map" })
        console.log("Map object layers:", this.map.objects.map(function (layer) {
            return layer.name;
        }));

        console.log("Map tile layers:", this.map.layers.map(function (layer) {
            return layer.name;
        }));
        // add tileset image, 1st parameter = name of tileset in Tiled, 2nd = Phaser key
        this.tiles = this.map.addTilesetImage("platforms", "platform-tiles")
        // create layer, 1st param = name of *layer* in Tile, 2nd = Phaser map
        this.platforms = this.map.createLayer("platforms", this.tiles)

        // make platforms collideable
        this.map.setCollisionBetween(0, 9999);
        this.player = this.physics.add.sprite(128, 1280 - 128 * 3, "boy-run");
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05); // small lag on last params for aesthetics
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platforms);

        // create pickups
        this.pickups = this.physics.add.group();
        this.powerpickups = this.physics.add.group();

        const jewels = this.map.createFromObjects("pickups", {
            key: "blue-jewel",
        })
        const powerjewels = this.map.createFromObjects("fire-powerup", {
            key: "yellow-jewel", // i accidentally used powerjewel first param which needs to be changed
        }) // powerjewel x, fire-powerup yes

        this.pickups.addMultiple(jewels); // add jewels to pickup group
        this.physics.add.collider(this.pickups, this.platforms) // adds collider between pickup group and the platform
        this.physics.add.overlap(this.player, this.pickups, this.collectPickup, null, this);

        this.powerpickups.addMultiple(powerjewels); // adds powerjewels to the group
        this.physics.add.collider(this.powerpickups, this.platforms) // its named after the layer in titled (??????????)
        this.physics.add.overlap(this.player, this.powerpickups, this.collectPowerJewel, null, this); // 

        // animations
        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("boy-run", { start: 0, end: 49 }),
            frameRate: 60,
            repeat: -1 // infinite repeat
        })


        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("boy-run", { start: 13, end: 13 }),
            frameRate: 60,
            repeat: -1 // infinite repeat
        })

        this.anims.create({
            key: "jump",
            frames: this.anims.generateFrameNumbers("boy-jump", { start: 0, end: 14 }),
            frameRate: 60,
            repeat: -1
        })

        // controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keysWASD = this.input.keyboard.addKeys("W,A,S,D")
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    }
    update() {
        /// update game elemtns each frame
        // negate player x force
        this.player.body.setVelocityX(0);
        if (this.cursors.left.isDown || this.keysWASD.A.isDown) {
            this.player.body.setVelocityX(-128 * 3)
            this.player.play("run", true)
            this.player.setFlipX(true);
        }
        else if (this.cursors.right.isDown || this.keysWASD.D.isDown) {
            this.player.body.setVelocityX(128 * 3)
            this.player.play("run", true)
            this.player.setFlipX(false);
        } else {
            this.player.play("idle", true)
        }
        const isTouchingGround = this.player.body.touching.down || this.player.body.blocked.down
        if (this.spacebar.isDown && isTouchingGround) {
            this.player.body.setVelocityY(-128 * 9)
            this.player.play("jump", true)

        }
    }
    collectPickup(player, pickups) { // general blue crystals
        pickups.destroy();
        Phaser.TintModes.HARD_LIGHT
        player.setTint(0x0000FF);
        //    if (player.isTint === true){
        //     this.player.body.setVelocityY(-128*12)
        //    }
    }

    collectPowerJewel(player, powerjewels) { // powerup "fire" yellow crystals 
        //console.log("im here")
        powerjewels.destroy();
        Phaser.TintModes.HARD_LIGHT
        player.setTint(0xFFA500);
        //    if (player.isTint === true){
        //     this.player.body.setGravityY(-128*12)


        //    }
    }
}