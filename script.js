const dice1 = document.getElementById('dice1');
const dice2 = document.getElementById('dice2');
const rollButton = document.getElementById('rollButton');
const resultBox = document.getElementById('resultBox');
const resultText = document.getElementById('resultText');
let rolling = false;

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

function rollDie(die) {
    const tl = gsap.timeline();
    const throwForce = Math.random() * 500 + 300;
    const throwRotationX = Math.random() * 1440 - 720;
    const throwRotationY = Math.random() * 1440 - 720;
    const throwRotationZ = Math.random() * 1440 - 720;

    // Initial throw
    tl.to(die, {
        duration: 0.8,
        x: `random(100, 200)`,  // Move right
        y: -150,  // Arc upward
        z: 100,   // Slight forward movement
        rotationX: throwRotationX,
        rotationY: throwRotationY,
        rotationZ: throwRotationZ,
        ease: "power2.out"
    }).to(die, {
        duration: 0.4,
        y: 0,     // Fall back down
        ease: "power2.in"
    }, "-=0.2");  // Overlap slightly with the upward motion

    // Bounces
    const bounces = Math.floor(Math.random() * 2) + 3;
    for (let i = 0; i < bounces; i++) {
        const bounceDuration = 0.2 - (i * 0.03);
        const bounceHeight = 100 / (i + 1);
        tl.to(die, {
            duration: bounceDuration,
            y: `-=${bounceHeight}`,
            rotationX: `+=${Math.random() * 180 - 90}`,
            rotationY: `+=${Math.random() * 180 - 90}`,
            rotationZ: `+=${Math.random() * 180 - 90}`,
            ease: "power1.out"
        });
        tl.to(die, {
            duration: bounceDuration,
            y: 0,
            ease: "bounce.out"
        });
    }

    // Final settle
    tl.to(die, {
        duration: 0.5,
        x: 0,
        y: 0,
        rotationX: getRandomRotation(),
        rotationY: getRandomRotation(),
        rotationZ: getRandomRotation(),
        ease: "power3.out"
    });

    return tl;
}

function startRollingDice() {
    if (!rolling) {
        rolling = true;
        resultBox.classList.add('hidden');

        const masterTimeline = gsap.timeline({
            onComplete: () => {
                rolling = false;
                gsap.delayedCall(0.5, showResult);
            }
        });

        // Reset dice positions
        gsap.set([dice1, dice2], { x: -100, y: 0, z: 0, rotationX: 0, rotationY: 0, rotationZ: 0 });

        // Roll dice with a slight delay between them
        masterTimeline.add(rollDie(dice1), 0);
        masterTimeline.add(rollDie(dice2), 0.15);
    }
}

function showResult() {
    const randomSelection = selections[Math.floor(Math.random() * selections.length)];
    resultText.textContent = randomSelection;
    gsap.to(resultBox, {
        duration: 0.5,
        opacity: 1,
        y: 0,
        ease: "power2.out",
        onStart: () => resultBox.classList.remove('hidden')
    });
}

rollButton.addEventListener('click', startRollingDice);
