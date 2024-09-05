// dice.js

// Constants
const DICE_ROTATION_DURATION = 1.2;
const DICE_BOUNCE_DURATION = 0.2;
const MIN_BOUNCES = 3;
const MAX_BOUNCES = 5;

// Random selection array for dice result
export const selections = [
    "Arizona", "Atlanta", "Baltimore", "Buffalo",
    "Carolina", "Cincinnati", "Chicago", "Cleveland", "Dallas",
    "Denver", "Detroit", "Houston", "Green Bay", "Indianapolis",
    "Los Angeles (R)", "Jacksonville", "Minnesota", "Kansas City", "New Orleans",
    "Las Vegas", "New York (G)", "Los Angeles (C)", "Philadelphia", "Miami",
    "San Francisco", "New England", "Seattle", "New York (J)", "Tampa Bay",
    "Pittsburgh", "Washington", "Tennessee"
];

// DOM elements for dice game
const dice1 = document.getElementById('dice1');
const dice2 = document.getElementById('dice2');
const rollButton = document.getElementById('rollButton');

let rolling = false; // State flag

// Roll the dice when the button is clicked
export function initializeDiceGame() {
    if (!dice1 || !dice2 || !rollButton) {
        console.error("Missing dice elements in DOM.");
        return;
    }

    rollButton.addEventListener('click', startRollingDice);
    initializeDice();
}

// Random angle for dice rotation
function getRandomRotation() {
    return Math.floor(Math.random() * 4) * 90;
}

// Dice rolling animation
function rollDie(die, index) {
    const tl = gsap.timeline();
    const throwRotationX = Math.random() * 1440 - 720;
    const throwRotationY = Math.random() * 1440 - 720;
    const throwRotationZ = Math.random() * 1440 - 720;

    tl.to(die, {
        duration: DICE_ROTATION_DURATION,
        x: index * 120,
        y: 0,
        ease: "power2.out"
    });

    tl.to(die, {
        duration: DICE_ROTATION_DURATION,
        rotationX: throwRotationX,
        rotationY: throwRotationY,
        rotationZ: throwRotationZ,
        ease: "power1.inOut"
    }, "-=0.4");

    const bounces = Math.floor(Math.random() * (MAX_BOUNCES - MIN_BOUNCES)) + MIN_BOUNCES;
    for (let i = 0; i < bounces; i++) {
        const bounceDuration = DICE_BOUNCE_DURATION - (i * 0.03);
        tl.to(die, {
            duration: bounceDuration,
            rotationX: `+=${Math.random() * 180 - 90}`,
            rotationY: `+=${Math.random() * 180 - 90}`,
            rotationZ: `+=${Math.random() * 180 - 90}`,
            ease: "power1.out"
        });
    }

    tl.to(die, {
        duration: 0.5,
        rotationX: getRandomRotation(),
        rotationY: getRandomRotation(),
        rotationZ: getRandomRotation(),
        ease: "power3.out"
    });

    return tl;
}

// Start rolling dice
function startRollingDice() {
    // Reset the game after the 4th roll when "Roll Again" is clicked
    if (rollCount === 0) {
        // Clear the previous results
        for (let i = 1; i <= 3; i++) {
            document.getElementById(`previousResult${i}`).textContent = '';
            document.getElementById(`previousResult${i}`).style.display = 'block';  // Make the result boxes visible again
        }

        // Hide the final result box
        const finalResultBox = document.getElementById('finalResultBox');
        finalResultBox.classList.remove('active');
        finalResultBox.classList.add('hidden');
    }

    if (!rolling && document.getElementById('diceContainer').classList.contains('active')) {
        rolling = true;

        // Hide the roll button while rolling
        rollButton.style.display = 'none';

        // Reset the dice positions before rolling
        gsap.set([dice1, dice2], {
            x: -150,
            y: -150,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0
        });

        const masterTimeline = gsap.timeline({
            onComplete: () => {
                rolling = false;
                showResult();  // Show the result after dice roll completes
            }
        });

        // Start the dice rolling animation
        masterTimeline.add(rollDie(dice1, 0), 0);
        masterTimeline.add(rollDie(dice2, 1), 0.2);
    }
}



// Show the result after dice roll




// Initialize dice positions
function initializeDice() {
    gsap.set([dice1, dice2], {
        x: 0,
        y: 0,
        rotationX: 15,
        rotationY: 30,
        rotationZ: 0,
        transformPerspective: 600
    });
}

let lastThreeResults = [];

// Show the result after dice roll
let rollCount = 0; // Track the number of rolls

function showResult() {
    const randomSelection = selections[Math.floor(Math.random() * selections.length)];
    
    // Increment the roll count
    rollCount++;

    // Show the results for the first three rolls
    if (rollCount <= 3) {
        document.getElementById(`previousResult${rollCount}`).textContent = randomSelection;
    } 
    
    // On the 4th roll, show the final result and hide the previous results
    else {
        const finalResultText = document.getElementById('finalResultText');
        const finalResultBox = document.getElementById('finalResultBox');
        finalResultText.textContent = randomSelection;
        finalResultBox.classList.remove('hidden');
        finalResultBox.classList.add('active');

        // Hide the first three result boxes
        for (let i = 1; i <= 3; i++) {
            document.getElementById(`previousResult${i}`).style.display = 'none';
        }

        // Reset roll count for the next round
        rollCount = 0;
    }

    // Show the roll button again for the next roll
    rollButton.textContent = "Roll Again";
    rollButton.style.display = 'block';
}


