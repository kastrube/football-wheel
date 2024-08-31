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
    "Los Angeles (r)", "Jacksonville", "Minnesota", "Kansas City", "New Orleans",
    "Las Vegas", "New York (g)", "Los Angeles (c)", "Philadelphia", "Miami",
    "San Francisco", "New England", "Seattle", "New York (j)", "Tampa Bay",
    "Pittsburgh", "Washington", "Tennessee"
];

function rollDie(die, startX) {
    const tl = gsap.timeline();
    const dieSize = 50;
    const rolls = Math.floor(Math.random() * 2) + 3;
    let currentX = startX;

    tl.to(die, {
        duration: 0.6,
        y: -450.0,
        ease: "power1.out"
    });

    for (let i = 0; i < rolls; i++) {
        tl.to(die, {
            duration: 0.2,
            x: currentX + dieSize,
            rotation: -10.0,
            ease: "power1.inOut"
        });
        currentX += dieSize;
    }

    const finalRotation = Math.floor(Math.random() * 4) * 90;
    tl.to(die, {
        duration: 0.1,
        rotation: finalRotation,
        y: 0,
        ease: "bounce.out"
    });

    return { timeline: tl, finalX: currentX };
}

function startRollingDice() {
    if (!rolling) {
        rolling = true;
        resultBox.classList.add('hidden');

        const spacing = 20;
        const die1StartX = 0;
        const die2StartX = die1StartX + 50 + spacing;

        gsap.set(dice1, { x: die1StartX, y: 0, rotation: 0 });
        gsap.set(dice2, { x: die2StartX, y: 0, rotation: 0 });

        const masterTimeline = gsap.timeline({
            onComplete: () => {
                rolling = false;
                // Add a delay before showing the result
                gsap.delayedCall(0.5, showResult);
            }
        });

        const roll1 = rollDie(dice1, die1StartX);
        const roll2 = rollDie(dice2, die2StartX);

        masterTimeline.add(roll1.timeline, 0);
        masterTimeline.add(roll2.timeline, 0.05);

        masterTimeline.add(() => {
            const finalSpacing = Math.max(roll1.finalX, roll2.finalX) + spacing;
            gsap.to(dice2, { x: finalSpacing, duration: 0.4, ease: "power1.inOut" });
        });
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