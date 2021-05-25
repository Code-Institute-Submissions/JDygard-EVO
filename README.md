# EVO: Evolution
![alt text](assets/images/readme/gameplan.png "Evo gameplan")

## Table of contents
***
1. [Description](#Description)
2. [Known Issues](#Known-issues)
3. [Bugs](#Bugs)
4. [Code credits](#Code-credits)


# Description
Evo is a game about evolution. Each round represents a stage in the evolution of a lifeform, and through garnering evolution points by eating food or killing the competition and eating their food, the player can select new evolutions to advance to the next round. The goal is to get to round 4 and evolve the 'size' upgrade.

[Back to top](#Table-of-contents)
# The Game Plan
We're going to start with core features, creating a framework upon which the rest of the game can be built. 
The phases are arranged such that each phase rounds out a gameplay loop, and is thus a "complete game." This will allow us to turn in a complete project no matter which phase is completed, even the first.

[Back to top](#Table-of-contents)

## Development Planes
## Phase 1, the framework
1. Rotating player

    i. Controls for rotation

    ii. Controls for locomotion

    iii. Physics for locomotion

2. Scrolling scene
3. Obstacles with bumping physics

    i. Floating obstacles, i.e. rocks

    ii. Static obstacles, i.e. rocks, environment boundary

4. Collectible plant food
5. EVO point tally
6. Other organisms
7. Ability to attack other organisms
8. Other organism behavior 

    i. Competitive gathering, i.e. herbivore/omnivore attempting to gather before the player

    ii. Aggressive behavior, i.e. carnivore/omnivore deciding whether to attack, and harming the player

    iii. Dropping collectibles

9. Graphics:

    i. Sprites

    ii. Animations

    iii. Environment

***
[Back to top](#Table-of-contents)
## Phase 2, Evolution

1. Proper UX

    i. EVO point tally
    
    ii. Health bar

    iii. Spending EVO points and menu

2. Upgrades

    i. Movement upgrades, stats and graphic representation

        a. Cilia (Small appendages on the sides that propel the organism. Moderate speed, moderate rotation)
        b. Flagellum (Long hairlike filament like on a sperm, high speed, poor rotation)
        c. Cytoplasmic flow (Rotation-independent free movement. Moderate speed.)
        d. Streamlined body (Requires size increase, gives more momentum to locomotion)
        e. Pseudofin (Requires size increase, high speed, high rotation)
        f. Swim bladder (Requires size increase, very high speed in bursts, poor rotation)

    ii. Defenses upgrades, stats and graphic representation

        a. Stiffened flanks (Incompatible with cilia and cytoplasmic flow, immunity to small sized creatures without jaws or spikes.)
        b. Chitinous shell (Requires size increase. Incompatible with cilia and cytoplasmic flow, immunity to similarly sized creatures without spikes, very reduced movement speed)
        c. Scales

    iii. Attack upgrades, stats and graphic representation

        a. Spike
        b. Poisoned spike (Requires size increase)
        c. Pseudoteeth
        d. Jaw (Requires size increase)
        e. Slime (Leaves a path of reduced movement speed behind, requires cytoplasmic flow or cilia)

    iv. Size upgrade

[Back to top](#Table-of-contents)
***
## Known issues
### Game logic breaks down on slow processors
Because the logic is frame independant, but the physics are frame-bound, when the framerate goes down certain aspects of the game become less consistent. One of the most important aspects is the enemy pathing. An enemy will select a target and start moving toward it at its maximum thrust setting between frame cycles, while adjusting its path every update cycle. When the update cycle is significantly shorter than the framerate, the enemies will simply fly by their intended target and begin circling it. This can't really be resolved in a reasonable timeframe.

We considered adding a warning that framerate/update cycle ratio was becoming unplayable, but that would require a significantly larger pool of data to implement intelligently.
***

### Game speed is very high on high refresh-rate displays
Unfortunately, MatterJS physics is coupled very closely to the framerate of the display being used. This is an issue that has to be accounted for when initially coding how things interact within the canvas.

Having discovered this issue when well into the project, it is beyond the project scope to completely rebuild elements of the game from the ground up at this time.

Resolving this would involve creating a standardized step-timer, and use these ticks to apply force based on time rather than frames.
***
### "Red Food" dropped by enemies is sometimes not able to be eaten
We've tracked this issue down to an issue with the food array.
When the level is generated, 30 food is placed into an array and managed from there. When an enemy dies, two food pieces are generated after the death animation ends, and as part of their generation they are pushed into the same food array.

The issue is that sometimes, one of the two food dropped by the enemy is not edible. Given the time frame of this project, this was considered too minor an issue to look into further.

### Game does not pause when menu is open
This is another example of "if only," because if I'd built the game with this in mind, it would be relatively easy to do. Same with that if I had built the menu as a separate scene (as I had planned) then I could have paused the
gameplay scene while the menu was open. Unfortunately, at this point, the time investment involved with adding this feature is... too much.

[Back to top](#Table-of-contents)
## Bugs
***
### Mouth sensor contact with world boundary causes crash (Solved)
When the mouth sensor on the Player object makes contact with the world boundary, it assigns assigns a null value to one of the temporary variables within the querying function associated with the sensor. This crashes the game.
This bug has been tenacious as the sensor functions become more complex. We've had to implement a test before each if statement involving encountered variables. Another option would have been to give a value to the world boundary to eliminate
the problem of null values clogging up functions.
***

### Food target .destroy() bug crashes game. (Solved)
This one was a doozy! After adding an enemy and giving them the ability to seek out food, I started getting a repetitive crash from the phaser library. I was destroying something the game was using. I assumed it had to do with the
code I had just added (the pairs loop .on('collisionstart' ) and had a difficult time figuring it out. I tried:
- Moving the foodSprite.destroy() function to the end of, and out of the for loop.
- Updating the entire Enemy class to differentiate it from the player
- Resetting the isSensor objects to differentiate them

### Resolution:
It was only when I noticed that it was only the food being TARGETED by the enemy sprite that I realized the issue. When the targeted sprite was destroyed, the data object on the enemy became null. The game crashed because the control mechanism for the Enemy couldn't target null.

This was fixed by separating the destruction of the sprite into the update method, and forcing all enemy sprites to decide on a new target each time the garbage would empty. This is effective because the eaten food is removed from the targeting array as part of the collision process and thus cannot be retargeted.
***
### Adding the possibility to delete defeated enemies crashes the game (Solved)
When a function discovers that an item has been eaten or that its 'hp' data point has been recuced to 0, it is flagged for garbage cleanup and removed from its object group/array, and assigning it to the garbage variable. Every frame tests the garbage variable for content and destroys it. In the case of eaten food, the garbage emptying function runs the findFood() method to prevent enemies from seeking destroyed food items. When adding the functionality to destroy enemy creatures, many methods started crashing the game. I tried:
- The lazy way out: adding a test to each crashing method to make sure nothing undefined got in

- Rearranging how the object arrays are written to
- Reorganizing the if statements that declare garbage

### Resolution:
In the end, the issue was that even though the garbage variable destroyed its gameObject, it remained assigned to it, and would randomly destroy other objects as part of its functionality, because of how the statement tested the variable. A simple fix solved everything: Once the garbage is destroyed, reset the garbage variable == undefined.
***

### Crash in round 3 (Probably solved)
This may be the most tenacious bug I've yet discovered. Always in round 3, after two rounds have elapsed error-free, the game crashes. It happens when the moveToTarget() method is interrupted in trying to find the angle between the enemy and the target (food). It's almost certainly because it is targeting a food bit that doesn't exist, but I absolutely cannot find where the phantom food is coming from.

1. The food array is cleaned and replaced every round.
2. Food that is eaten is removed from the array before being removed from the game.
3. The targeting mechanic targets food using the array

### Conclusion:

I've put a check at the beginning of all loops that triggered the crash that tests that the food array has some length before going through the loop. This has stopped instances of the crash, but as I never found a reliable way to recreate the crash, I don't know if it is completely fixed.
***

### Enemy pathing results in driving loops (Solved)
Occasionally when the enemy is pathing toward their target, they'll decide to perform an entire loop rather than go directly to their target. This is due to the simplicity of the target acquisition mechanism. It compares the angle between the enemy object and the target, to the angle of the enemy itself. Since the result can be negative, when the target is down and left of the enemy, it will loop around instead of aiming straight toward the target. Fixing this will require testing for the bug condition.

### Resolution:
After logging the values involved in the turning calculations, I realized there are dead zones where the values fall out of the expected range, forcing the enemies to do a full loop and find an acceptable range again. In certain situations, this would result in a repeating loop as the values would never fall within the range again. This was fixed with the help of a [stackoverflow](https://stackoverflow.com/questions/1878907/how-can-i-find-the-difference-between-two-angles) question and answer.
***

### WebGL MAX_TEXTURE_SIZE (Solved)
After converting my myriad textures into a master spritesheet, my sprites stopped rendering properly, appearing as small black boxes instead. I discovered that this is due to specific browser/hardware combinations having very low texture size limitations.

### Resolution:
For accessibility, I added an if statement that makes sure the max permitted texture size is enough to accommodate the size of the intro menu animation. If it doesn't, a static version of the menu graphic is shown.
I also discovered that textures are treated like the next largest squared integer, i.e. a 5x2 px image is treated as 8x8, a 126x12 is 128x128 etc. By packing my master spritesheets into as square a version as possible, I was able to squeeze it down to the lowest possible WebGL maximum texture size (Chrome on mobile.)
***

[Back to top](#Table-of-contents)

## Code credits
1. [Samme's Rotate to Cursor](https://codepen.io/samme/pen/JBwWLN?editors=0010) found in gameplay.js, lines 419-429 and lines 809-820

    To my credit I did have a system in place for this exact process.

    `(Math.2atan(Math.sin(player.location - target.location), Math.cos(player.location - target.location)))`

    However, the arctangent is very processor heavy and I found that my tablet had a hard time running the game after I involved this in a process that updates ~60 times a second. I found this example that did the exact same thing, but much more elegantly and - more importantly - less taxing on the hardware.

2. [Michael Hadley's code example](https://codesandbox.io/s/5vlzl8j9vp?file=/js/player.js) found in objects.js, lines 20-69.

    This example was coded with a deprecated code simplifying library, and for an older version of the Phaser engine. However, much of the structure and entity interactions are carefully commented and helped immensely in learning about those systems.

3. [Rex's UI plugin](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/ui-overview/) found in rexuiplugin.min.js and game-settings.js lines 132-198.

    Rex's UI plugin was used to build the "Evolve" menu. This made the code lighter, and eased the process of making a complex build menu.

4. [Emanuele Feranto's simple mask tutorial](https://www.emanueleferonato.com/2019/04/24/add-a-nice-time-bar-energy-bar-mana-bar-whatever-bar-to-your-html5-games-using-phaser-3-masks/) found in gameplay.js lines 523-535.

    This was a simple tutorial on using masks. I almost wouldn't have credited it, but I did lift the concept of stepWidth directly from the tutorial.
***
[Back to top](#Table-of-contents)

## Visuals credits

1. Jess Vide's [Blue Ocean Blue Sky](https://www.pexels.com/photo/blue-ocean-under-blue-sky-and-white-clouds-4611748/). 

This image was disassembled and used for the menu screen animation.
***

[Back to top](#Table-of-contents)
## Sound Credits

All game sounds used were found on [Open Game Art](https://opengameart.org/). They are used here under Creative Commons free licensing.

1. Menu music: [Lurid Delusion](https://opengameart.org/content/lurid-delusion) by Matthew Pablo.
2. Game music: [Caves of Sorrow](https://opengameart.org/content/caves-of-sorrow) by Alexander Zhelanov.
3. Menu denial sound: [Bad Sound](https://opengameart.org/content/bad-sound-1) by remaxim.
4. Hit sound effect: [Hit Sound Bitcrush](https://opengameart.org/content/hit-sound-bitcrush) by DaGameKnower.
5. New round sound: [Epic Amulet Item](https://opengameart.org/content/epic-amulet-item) by CosmicD.
6. Game over: [Game Over Music Box II](https://opengameart.org/content/music-box-game-over-ii) by Kim Light Year.
7. Victory: [Win Jingle](https://opengameart.org/content/win-jingle) by Fupi.
8. Eating: [7 Eating Crunches](https://opengameart.org/content/7-eating-crunches) by StarNinjas.
***
[Back to top](#Table-of-contents)

## Acknowledgements

1. Richard Davey, aka Photonstorm, creator of the Phaser 3 library used extensively in this project. He, personally, tirelessly fielded my questions as an active member of his Discord community, and deserves much more than my humble thanks for all of his help.

2. My friends and family for tirelessly enduring every iteration of my game.

3. My mentor Seun Owanikoko for her brusque demeanor and encouragement.

[Back to top](#Table-of-contents)
