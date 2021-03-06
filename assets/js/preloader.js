class Preloader extends Phaser.Scene{ // Creating a Preloader class as an extension of the scene.
    constructor() {                   // Calling the constructor to build it.  
        super('Preloader');           // And the super to call functions from the parent class. 
    }                 

    //======================== The preload method is used by the library once at the loading of the scene. ==================
    //===== We are loading our sprites and images here. Since images are handled by the textureManager, they            =====
    //===== can be loaded anywhere within Phaser.Scene and still be used elsewhere.                                     =====
    preload(){                                                                                    
        this.load.image('mute-icon', 'assets/images/sprites/mute_icon.png');                            // Mute button image    
        this.load.image('mute-icon-off', 'assets/images/sprites/mute_icon_off.png');                            // Mute button image                   
        this.load.image('menu-sky', 'assets/images/menuscreen/menu-sky.png');                           // Menu sky image  
        this.load.image('menu-underwater', 'assets/images/menuscreen/menu-underwater.png');             // Menu underwater image
        this.load.image('menu-water', 'assets/images/menuscreen/menu-water.png');                       // Menu water image             
        this.load.image('menu-title', 'assets/images/menuscreen/menu-title.png');                       // EVO title text
        this.load.image('menu-consume', 'assets/images/menuscreen/menu-consume.png');                   // Menu consume text image
        this.load.image('menu-evolve', 'assets/images/menuscreen/menu-evolve.png');                     // Menu evolve text
        this.load.image('menu-survive', 'assets/images/menuscreen/menu-survive.png');                   // Menu survive text
        this.load.image('menu-press', 'assets/images/menuscreen/menu-press-any-key.png');               // Menu "Press any key" text
        this.load.image('rulesRight', 'assets/images/menuscreen/menu-rules-right.png');                 // Instructions on the right
        this.load.image('rulesLeft', 'assets/images/menuscreen/menu-rules-left.png');                   // Instructions on the left
        this.load.image('evo-menu-bg', 'assets/images/evolvemenu/evo-menu-background.png');             // Evo menu scene background
        this.load.image('background', 'assets/images/BG.jpg');                                          // Background image    
        this.load.image('food', 'assets/images/sprites/food_green.png');                                // Food image
        this.load.image('meat', 'assets/images/sprites/food_red.png');                                  // Meat image
        this.load.image('healthbar', 'assets/images/sprites/healthbar.png');                            // Healthbar image
        this.load.image('energybar', 'assets/images/sprites/energybar.png');                            // The hitpoint bar
        for (let i = 0; i < 16; i++){                                                                   // A loop to load all 16 debris images
            debris[i] = this.load.image('debris' + i, 'assets/images/bg_debris/debris' + i + '.png');   // because doing it one-by-one is so pedestrian.
        }
        //========================================== Audio preloads ===================================================
        this.load.audio('menu-music', 'assets/sounds/menu-music.mp3'); // The intro music
        this.load.audio('game-music', 'assets/sounds/game-music.ogg'); // The game music
        this.load.audio('denied', 'assets/sounds/denied.wav');         // Denied sound effect
        this.load.audio('new-round', 'assets/sounds/new-round.wav');   // New round/evolving sound effect
        this.load.audio('game-over', 'assets/sounds/game-over.mp3');   // Jingle played on game over
        this.load.audio('victory', 'assets/sounds/victory.ogg');       // Jingle played on victory
        this.load.audio('hit', 'assets/sounds/hit.wav');               // Sound played on hit
        this.load.audio('crunch', 'assets/sounds/eat.ogg');            // Sound played when eating

        //========================================== Animations spritesheet generation ==========================================
        //============= Player animations =================
        this.load.spritesheet(                                      // Load the spritesheet into the texture manager
            "player-master-spritesheet",                            // This is the master player spritesheet, with 42 animations at 4 frames per
            "assets/images/sprites/player_master_spritesheet.png",  // Load from assets directories
            {
                frameWidth: 126,                                    // Defining the size of the individual frames in
                frameHeight: 126                                    // the spritesheet.
            }
        );

        //============= Enemy animations ==================
        this.load.spritesheet(                                          // Method to load spritesheets
            "enemy-master-spritesheet",                                 // "Key" to refer to this sheet later
            "assets/images/sprites/enemy_master_spritesheet.png",       // Path to the spritesheet
            {
                frameWidth: 126,                                        // Size of the frames' width in the sheet in pixels
                frameHeight: 126                                        // Size of the frames' height in the sheet in pixels
            }
        );

        //============ Menu water animation =============
        this.load.spritesheet(                              // Method to load spritesheets
            "animatedWater",                                // "Key" to refer to this sheet later
            "assets/images/menuscreen/animated-water.png",  // Path to the spritesheet
            {
                frameWidth: 1600,                           // Size of the frames' width in the sheet in pixels
                frameHeight: 630                            // Size of the frames' height in the sheet in pixels
            }
        );
    }                                                                   
    //========================================== End spritesheet generation ==============================================

    //========================================== Game launch stuff ===================================================
    create(){   // Create method is run after the scene and preloader loads. We're just using it here to launch the game.
        if (debugMode == true){                                         // Test for debug mode
            this.scene.start('Gameplay');                                // Skip menu screen because debug mode.
        } 
        else {
            this.scene.start('MenuScreen');                              // Launch the game.
        }
    }
}