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

    score;

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

        this.load.spritesheet("fire-bullet", "sprites/fire_bullet.png", {
            frameWidth: 16,
            frameHeight: 16
        })

        // load backgrounds + jewels
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


        this.score = 0;
        this.win = false;
        // function: coordinates, default string, courier font by default
        //this.scoreText = this.add.text(10, 270, 'score: 0', { fontSize: '128px', fill: '#ffffff' });


        // make platforms collideable
        this.map.setCollisionBetween(0, 9999);
        this.player = this.physics.add.sprite(128, 1280 - 128 * 3, "boy-run");
        //this.defaultspeed = this.player.setVelocity(20, 20)
        this.cameraScroll = this.cameras.main.startFollow(this.player, true, 0.05, 0.05); // small lag on last params for aesthetics

        this.scoreText = this.add.text(this.cameraScroll.x + 500, this.cameraScroll.y, 'score: 0', { fontSize: '128px', fill: '#ffffff' });


        //this.cameras.main.startFollow(this.scoreText, true, 0.05, 0.05)
        // this.events.on("postupdate", function() {
        //     Phaser.Display.Align.To.TopLeft(Scene1, this.scoreText)
        // });

        //this.scoreText.setScrollFactor(1)
        // new PathFollower(Scene1, )


        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platforms);

        // create pickups
        this.pickups = this.physics.add.group();
        this.powerpickups = this.physics.add.group();

        this.rainbowColours = [
            0xff0000, // red to pink
            0xff8c00,
            0xffe100,
            0x00ff00,
            0x0000ff,
            0xa200ff
        ]

        this.bullets = this.physics.add.group() // bullet physics group
        this.nextFire = 0;


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


        this.bullets.addMultiple()

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


        this.anims.create({
            key: "firepowerup",
            frames: this.anims.generateFrameNumbers("fire-bullet"),
            frameRate: 6,
            repeat: -1
        })

        // controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keysWASD = this.input.keyboard.addKeys("W,A,S,D");
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.keyPowerup = this.input.keyboard.addKey("P"); // powerup key -- unused

    }
    update() {
        /// update game elemtns each frame
        // negate player x force
        this.player.body.setVelocityX(0);
        if (this.cursors.left.isDown || this.keysWASD.A.isDown) {
            this.player.body.setVelocityX(-128 * 3)
            this.player.play("run", true)
            this.player.setFlipX(true);

            // if (this.keyPowerup === down && this.powerOn === true){

            // }
        }
        else if (this.cursors.right.isDown || this.keysWASD.D.isDown) {
            this.player.body.setVelocityX(128 * 3)
            this.player.play("run", true)
            this.player.setFlipX(false);
        } else {
            this.player.play("idle", true)
        }
        const isTouchingGround = this.player.body.touching.down || this.player.body.blocked.down;
        //const isTouchingAir = this.player.body.touching.down || this.player.body.blocked.down
        //if (this.spacebar.isDown || isTouchingGround) {
        if (Phaser.Input.Keyboard.JustDown(this.spacebar) && isTouchingGround) { // one trigger per key press
            this.player.body.setVelocityY(-128 * 9)
            this.player.play("jump", false)
        }
        if (!isTouchingGround) {
            this.player.play("jump", true)
        }

        //  const isTouchingGround = this.player.body.touching.down || this.player.body.blocked.down
        // if (!isTouchingGround && this.spacebar.down) { 
        //     this.player.body.setVelocityY(-128 * 3)
        //     this.player.play("jump", true)
        // }

        if (this.score >= 80 && !this.win) {
            this.win = true
            this.scoreText.setText("You win!")

            this.rainbowIndex = 0;
            this.loopWinColours = this.time.addEvent({
                delay: 300, callback: function () {
                    this.player.setTint(this.rainbowColours[this.rainbowIndex]);

                    this.rainbowIndex =
                        (this.rainbowIndex + 1) % this.rainbowColours.length; // ch
                }, callbackScope: this, loop: true
            }) // configuration object
        }
        //while (this.win === true) {

        this.scoreText.setPosition(this.cameras.main.scrollX + 20, this.cameras.main.scrollY + 20)

    }




    collectPickup(player, pickups) { // general blue crystals
        pickups.destroy();
        player.setTint(0x0000FF);

        this.score += 10;
        this.scoreText.setText("Score: " + this.score)




        //Creates a timer event, and adds it to the Clock at the start of the frame.
        this.pickupTimer = this.time.delayedCall(500, function () {
            this.powerOn = false;
            if (!this.win) {
                player.clearTint();
            }
            this.pickupTimer = null;
        }, [], this);
        //delay in ms, callback, arguments for function, .this keyword
    }


    collectPowerJewel(player, powerjewels) {
        //console.log("im here")
        this.powerOn = true;
        powerjewels.destroy();

        this.score += 50;
        this.scoreText.setText("Score: " + this.score);

        //this.powerUpTime = this.time.now
        player.body.setGravityY(100);


        if (!this.win) {
            player.setTint(0xFFA500);
        }

        this.powerUpTimer = this.time.delayedCall(500, function () {
            this.powerOn = false;

            if (!this.win) {
                player.clearTint();
            }


            //player.clearTint();
            player.body.setGravityY(0);
            this.powerUpTimer = null;
        }, [], this);
    } // delay in ms, callback, arguments for function, .this keyword
}

