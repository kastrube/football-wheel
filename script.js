const dice1 = document.getElementById('dice1');
const dice2 = document.getElementById('dice2');
const rollButton = document.getElementById('rollButton');
const resultBox = document.getElementById('resultBox');
const resultText = document.getElementById('resultText');
let rolling = false;

const tabButton = document.getElementById('tabButton');
const sidebar = document.getElementById('sidebar');

// Get references to the tabs and containers
const diceTab = document.getElementById('diceTab');
const wheelTab = document.getElementById('wheelTab');
const diceContainer = document.getElementById('diceContainer');
const wheelContainer = document.getElementById('wheelContainer');

tabButton.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('hidden');
    } else {
        sidebar.classList.add('hidden');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // On page load, ensure only the diceContainer is visible
    wheelContainer.style.display = 'none';
    diceContainer.style.display = 'flex';
});

function switchContent(containerToShow, containerToHide) {
    containerToShow.style.display = 'flex';
    containerToHide.style.display = 'none';
    
    if (containerToShow === wheelContainer) {
        centerWheel();
    } else if (containerToShow === diceContainer) {
        initializeDice();
    }
}

function centerWheel() {
    const wheelSVG = document.getElementById('wheelSVG');
    if (wheelSVG) {
        wheelSVG.style.transform = 'translateZ(0)';
    }
}

// Event listeners for switching between tabs
diceTab.addEventListener('click', function(event) {
    event.preventDefault();
    switchContent(diceContainer, wheelContainer);
});

wheelTab.addEventListener('click', function(event) {
    event.preventDefault();
    switchContent(wheelContainer, diceContainer);
});

// Attach event listeners after defining your containers
rollButton.addEventListener('click', startRollingDice);

const selections = [
    "Arizona", "Atlanta", "Baltimore", "Buffalo",
    "Carolina", "Cincinnati", "Chicago", "Cleveland", "Dallas",
    "Denver", "Detroit", "Houston", "Green Bay", "Indianapolis",
    "Los Angeles (R)", "Jacksonville", "Minnesota", "Kansas City", "New Orleans",
    "Las Vegas", "New York (G)", "Los Angeles (C)", "Philadelphia", "Miami",
    "San Francisco", "New England", "Seattle", "New York (J)", "Tampa Bay",
    "Pittsburgh", "Washington", "Tennessee"
];

function getRandomRotation() {
    return Math.floor(Math.random() * 4) * 90;
}

function rollDie(die, index) {
    const tl = gsap.timeline();
    const throwRotationX = Math.random() * 1440 - 720;
    const throwRotationY = Math.random() * 1440 - 720;
    const throwRotationZ = Math.random() * 1440 - 720;
    
    tl.to(die, {
        duration: 0.8,
        x: index * 120,
        y: 0,
        ease: "power2.out"
    });

    tl.to(die, {
        duration: 1.2,
        rotationX: throwRotationX,
        rotationY: throwRotationY,
        rotationZ: throwRotationZ,
        ease: "power1.inOut"
    }, "-=0.4");

    const bounces = Math.floor(Math.random() * 2) + 3;
    for (let i = 0; i < bounces; i++) {
        const bounceDuration = 0.2 - (i * 0.03);
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

function startRollingDice() {
    if (!rolling && diceContainer.style.display !== 'none') {
        rolling = true;
        rollButton.style.display = 'none';
        resultBox.style.display = 'none';

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
                showResult();
            }
        });

        masterTimeline.add(rollDie(dice1, 0), 0);
        masterTimeline.add(rollDie(dice2, 1), 0.2);
    }
}

function showResult() {
    const randomSelection = selections[Math.floor(Math.random() * selections.length)];
    resultText.textContent = randomSelection;
    resultBox.style.display = 'block';
    gsap.fromTo(resultBox, 
        {opacity: 0, y: 20},
        {duration: 0.5, opacity: 1, y: 0, ease: "power2.out"}
    );
    
    rollButton.textContent = "Roll Again";
    rollButton.style.display = 'block';
}

function resetGame() {
    gsap.to(resultBox, {
        duration: 0.3,
        opacity: 0,
        y: -50,
        ease: "power2.in",
        onComplete: () => {
            resultBox.style.display = 'none';
            rollButton.textContent = "Roll the Dice";
            rollButton.style.display = 'block';
        }
    });
}

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

initializeDice();

const spinButton = document.getElementById('spinButton');
const wheelSVG = document.getElementById('wheelSVG');

function spinWheel() {
    if (wheelContainer.style.display !== 'none') {
        const rotation = Math.floor(Math.random() * 360) + 720; // Spin at least 2 full rotations
        wheelSVG.style.transition = 'transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)';
        wheelSVG.style.transform = `rotate(${rotation}deg)`;
        
        setTimeout(() => {
            const finalRotation = rotation % 360;
            console.log(`Wheel stopped at ${finalRotation} degrees`);
            // Here you can add logic to determine the winning segment based on the finalRotation
        }, 5000);
    }
}

spinButton.addEventListener('click', spinWheel);

// Add this new function to center the wheel
function centerWheel() {
    const gameContainer = document.querySelector('.game-container');
    const wheelContainer = document.getElementById('wheelContainer');
    
    if (gameContainer && wheelContainer) {
        const containerHeight = gameContainer.clientHeight;
        const wheelHeight = wheelContainer.clientHeight;
        const topMargin = (containerHeight - wheelHeight) / 2;
        
        wheelContainer.style.marginTop = `${topMargin}px`;
    }
}

// Modify the switchContent function
function switchContent(containerToShow, containerToHide) {
    containerToShow.style.display = 'flex';
    containerToHide.style.display = 'none';
    
    if (containerToShow === wheelContainer) {
        centerWheel();
    }
}

// Call centerWheel on window resize
window.addEventListener('resize', centerWheel);

// Call centerWheel on page load
document.addEventListener('DOMContentLoaded', () => {
    wheelContainer.style.display = 'none';
    diceContainer.style.display = 'flex';
    initializeDice();
    centerWheel();
});