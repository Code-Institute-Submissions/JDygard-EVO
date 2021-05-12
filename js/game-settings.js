const config = {
    type: Phaser.AUTO, // Lets the game select the graphics engine based on the device automatically
    width: 1600,
    height: 900,
    backgroundColor: '#00676C', // Sets the color of the background
    pixelArt: false, // Tell the graphics engine not to blur or anti-alias, in order to preserve the pixel art effect
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    plugins: {      //Declare plugins
        global: [
            { key: 'BackgroundPlugin', plugin: BackgroundPlugin, start: true },
        ],
    },
    physics: { // Selects a physics engine
        default: 'matter', // A physics engine with collisions and complex material interaction
        matter: { 
            
            debug: {

                showAxes: false,
                showAngleIndicator: true,
                angleColor: 0xe81153,

                showBroadphase: false,
                broadphaseColor: 0xffb400,

                showBounds: false,
                boundsColor: 0xffffff,

                showVelocity: true,
                velocityColor: 0x00aeef,

                showCollisions: true,
                collisionColor: 0xf5950c,
    
                showSeparations: false,
                separationColor: 0xffa500,

                showBody: true,
                showStaticBody: true,
                showInternalEdges: true,

                renderFill: false,
                renderLine: true,
    
                fillColor: 0x106909,
                fillOpacity: 1,
                lineColor: 0x28de19,
                lineOpacity: 1,
                lineThickness: 1,
    
                staticFillColor: 0x0d177b,
                staticLineColor: 0x1327e4,

                showSleeping: true,
                staticBodySleepOpacity: 1,
                sleepFillColor: 0x464646,
                sleepLineColor: 0x999a99,
    
                showSensors: true,
                sensorFillColor: 0x0d177b,
                sensorLineColor: 0x1327e4,
    
                showPositions: true,
                positionSize: 4,
                positionColor: 0xe042da,
    
                showJoint: true,
                jointColor: 0xe0e042,
                jointLineOpacity: 1,
                jointLineThickness: 2,
    
                pinSize: 4,
                pinColor: 0x42e0e0,
    
                springColor: 0xe042e0,
    
                anchorColor: 0xefefef,
                anchorSize: 4,
    
                showConvexHulls: true,
                hullColor: 0xd703d0
            },
            
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ // Declaring the key names for scenes
        Preloader,
        Gameplay,
        MenuScreen,
    ]
    
};


// ==================================== Game variables ====================================
// ===This is where all of the constants for game elements can be adjusted in one place.===

// ==Debug mode : Turns off touch controls and menu scene for rapid testing
var debugMode = false

// ==Rotation speed
// Unupgraded speed
var baseRotation = 0.055
var tailRotation = 0.069
var flagellumRotation = 0.06

// ==Acceleration
// Unupgraded speed
var baseSpeed = 0.03
var tailSpeed = 0.04
var flagellumSpeed = 0.06

// ==Fluid friction
// Probably a constant
var baseFriction = 0.1

// ==Player mass
// Probably a constant
var baseMass = 30

// ================================= Global Variables ====================================
// =========This is where the global variables for the game are being declared ===========

// General variables
var player;
var enemy1;
var foodBit = 0;
var food = [];
var foodRemaining;
var evoPoints = 0;
var cursors;
var healthBar; // The gameObject that displays the UI for the healthbar, evo points and dropdown evolution menu. Also stores most game values.
var healthBarScale = 1.5 //
var startGame = false // Keeps the listener for any key presses in the menu screen separate from the function that starts the game
var healthContainer; // A container that holds all of the graphics for the UI
var pointText; // The text displaying the current points value
var garbage; // A variable for temporarily storing gameObjects queued for deletion to avoid removing them from the game in the middle of functions
var enemyGroup = []  // An array for storing the actual instance of each enemy gameObject
var enemies = [   // An array for storing the current evolution stage of each enemy. The value of each being the name of the relevant animation for that stage
    "base-enemy-move",
    "base-enemy-move",
    "base-enemy-move",
];
console.log(enemies)
var posX = [0,0];
var posY = [0,0];
var moving = false;//Variable for testing if the player is in motion
var currentIdleAnimation = 'spike-player-idle';
var currentMoveAnimation = 'spike-player-move';
var spike = false; // Variable for testing whether the player has the spike part
var playerCompoundBody; //Object holding static body parts for the player
var enemyCompoundBody;
var debris = []; //Empty array for holding all the background debris

// Variables with useful screen size values
var viewX = this.window.devicePixelRatio * this.window.innerWidth * .99;
var viewY = this.window.devicePixelRatio * this.window.innerHeight * .99;
var centerX = (this.window.devicePixelRatio * this.window.innerWidth * .99) / 2;
var centerY = (this.window.devicePixelRatio * this.window.innerHeight * .99) / 2;

// Virtual joystick objects
var touch;
var joystickControls;
var joyStickKeys;
var joyStick;

// Variables for joyStick states
var leftKeyDown;
var rightKeyDown;
var upKeyDown;
var downKeyDown;

var spaceKey;

// Uses the config object keys to set the start conditions for the game
var game = new Phaser.Game(config);