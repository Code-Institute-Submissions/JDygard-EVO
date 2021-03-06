class MenuScreen extends Phaser.Scene { // Creating a Preloader class as an extension of the scene.
    constructor (){                   // Calling the constructor to build it.  
        super('MenuScreen');           // And the super to call functions from the parent class. 
    }
    create(){
        playerDead = false; // Resetting the game if the menu was reached through death
        deathScreen = false; // Resetting the game if the menu was reached through death
        var textureSizeTest = this.game.renderer.getMaxTextureSize(); // Collect the maximum allowed texture size to adjust for low tolerance

        //======================================= Adding music  ======================================
        music = this.sound.add('menu-music');                                   // Add the music we will play later

        //======================================= Adding images ======================================
        //===== There's a lot of moving pieces in this animation. We are adding them all in a    =====
        //=====                                   big chunk here.                                =====
        let sky = this.add.image(800, 160, "menu-sky");                         // Sky image
        let water = this.add.image(800, 435, "menu-water");                     // Water surface
        let underwater = this.add.sprite(800, 970, "menu-underwater");          // Underwater
        let title = this.add.image(800, 300, "menu-title").setAlpha(0);         // Title text, alpha set to 0 to make it invisible
        let evolve = this.add.image(1240, 550, "menu-evolve").setAlpha(0);      // Evolve text, alpha set to 0 to make it invisible
        let consume = this.add.image(350, 550, "menu-consume").setAlpha(0);     // Consume text, alpha set to 0 to make it invisible
        let survive = this.add.image(800, 650, "menu-survive").setAlpha(0);     // Survive text, alpha set to 0 to make it invisible
        pressKey = this.add.image(800, 750, "menu-press").setAlpha(0);          // Press any key text, alpha set to 0 to make it invisible
        pressKey.setInteractive();                                              // Make presskey interactive
        let rulesRight = this.add.image(1290, 750, "rulesRight").setAlpha(0);   // Right side instructions, alpha set to 0 to make it invisible
        let rulesLeft = this.add.image(310, 750, "rulesLeft").setAlpha(0);      // Left side instructions, alpha set to 0 to make it invisible
        let muteButton = this.add.image(1500, 100, "mute-icon");                // Mute button
        let muteButtonOff = this.add.image(1500, 100, "mute-icon-off");         // Mute button
        muteButton                                                              // Edit the muteButton
            .setInteractive()                                                   // Make it listen for clicks on the object itself
            .setDepth(5)                                                        // Put it on top of all other objects
            .setScrollFactor(0)                                                 // It shouldn't move around
            .setScale(0.8)                                                     // Make it a little smaller
            .setAlpha(0.1);
        muteButtonOff
            .setDepth(4)
            .setScrollFactor(0)
            .setScale(0.8)
        let scene = this;                                                       // Save some context
        muteButton.on('pointerdown', function(){                                // Listen for a click
            if (soundMute == false){                                            // If the sound is not already muted
                scene.sound.stopAll();                                          // Halt all sound
                soundMute = true;                                               // Make all sounds silent
                muteButton.setAlpha(1)                                    // Make the X visible
                music.pause();                                                  // Stop the music
            } else {                                        
                muteButton.setAlpha(0.1)                                    // Make the X invisible again
                soundMute = false;                                              // Set the variable to false
                music.play();                                                   // Strike up the band
            }
        });

        //=============================== Menu intro ==============================
        if (textureSizeTest >= 4800){                                           // Compare to the texture size read above
            this.anims.create({                                                 // Creating our water animation
                key: "animated-water",                                          // Declaring the key to which it will be referred
                frames: this.anims.generateFrameNumbers("animatedWater", { start: 0, end: 5 }), // Getting the spritesheet and numbering the frames for the array
                frameRate: 3,                                                   // Speed at which the frames are cycled
            });
            underwater.anims.play({     // Start playing the underwater animation
                key: "animated-water",  // Call on the key declared above in the this.anims.create() method
                repeat: -1,             // "repeat: -1" means to repeat it ad infinitum
            });
        }
        music.play({                    // Start the music
            mute: soundMute,            // Set it to the saved mute variable
            loop: true,                 // And loop it
        });
        this.cameras.main.fadeIn(300);  // A short fade into the background
        this.tweens.add({               // Start a tween
            targets: title,             // Targeting the title image
            alpha: {                    // Set the alpha target
                value:1,                // Going from 0 to 1
                duration: 700,          // in 700ms
                delay: 300              // 300ms after scene load
            }
        });
        this.tweens.add({               // Start a tween           
            targets: sky,               // Targeting the sky image
            scaleY: {                   // Set the Y scale
                value: 0.7,             // From 1 to 0.7
                duration: 2000,         // for 2000ms
            },
            y: {                        // Move in the y axis
                value: -50,             // to -50 pixels
                duration: 2000,         // over 2000ms
            },
            ease: "Sine.easeInOut",     // Nice and easy
            delay: 1000,                // 1000ms after scene load
        });
        this.tweens.add({               // Start a tween
            targets: water,             // Targeting the water image
            scaleY: {                   // Set the Y scale
                value: 0.2              // From 1 to 0.2
            },
            y: {                        // Move in the y axis
                value: 40,              // to 0, 40
            },
            duration: 2000,             // Over 2000ms
            ease: "Sine.easeInOut",     // Nice and easy
            delay: 1000,                // 1000ms
        });
        this.tweens.add({               // Start a tween
            targets: underwater,        // Targeting the underwater animation
            scaleY: {                   // Set the Y scale 
                value: 0.8,             // Go from 1 to 0.8
                duration: 2000,         // over 2000ms
            },
            y: {                        // Move in the y axis
                value:800,              // to 800 pixels
                duration: 2000,         // over 2000ms
            },
            ease: "Sine.easeInOut",     // Do it dramatically
            delay: 1000,                // 2000ms after scene load
        });
        this.tweens.add({               // Start a tween
            targets: consume,           // Target the consume image
            alpha: 1,                   // Go from 0 to 1 alpha
            delay: 1700,                // 1.7 seconds after scene load
            duration: 600               // Over 600ms
        });
        this.tweens.add({               // Start a tween
            targets: evolve,            // Targeting the evolve image
            alpha: 1,                   // Go from 0 to 1 alpha
            delay: 2200,                // 2.2 seconds after scene load
            duration: 600               // Over 600ms
        });
        this.tweens.add({               // Start a tween
            targets: survive,           // Targeting the survive image
            alpha: 1,                   // Go from 0 to 1 alpha
            delay: 2700,                // 2.7 seconds after scene load
            duration: 1000              // over 1 second
        });
        this.tweens.add({               // Start a tween
            targets: pressKey,          // Targeting the pressKey text
            alpha: 1,                   // From 0 to 1 alpha
            delay: 3500,                // 3.5 seconds after scene load
            duration: 500,              // Lasts .5 seconds
            y: 765                      // Transition to 765 (just 15 pixels)
        });
        this.tweens.add({               // Start a tween
            targets: rulesRight,        // Targeting the pressKey text
            alpha: 1,                   // From 0 to 1 alpha
            delay: 3500,                // 3.5 seconds after scene load
            duration: 500,              // Lasts .5 seconds
            scale: 1.05                 // Expand scale slightly
        });
        this.tweens.add({               // Start a tween
            targets: rulesLeft,         // Targeting the pressKey text
            alpha: 1,                   // From 0 to 1 alpha
            delay: 3500,                // 3.5 seconds after scene load
            duration: 500,              // Lasts .5 seconds
            scale: 1.05                 // Expand scale slightly
        });
    }
    update(){
        //================= Conditions for starting the game with/without touch controls ================
        pressKey.on('pointerdown', function() {            // Did someone tap or click on the screen?
            touch = true;                                  // Then activate touch controls
            startGame = true;                              // And start the show
        });
        this.input.keyboard.on('keydown', function(event){ // Did someone press a key on a keyboard?
            touch = false;                                 // Then no touch controls
            startGame = true;                              // And set the startgame var to true
        });
        if (startGame == true){                            // Is the startgame var true?
            music.stop();                                  // Stop the music from this scene
            this.scene.start('Gameplay');                  // Then start the show.
        }
    }
}