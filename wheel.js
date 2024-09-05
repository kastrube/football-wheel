// wheel.js

// Constants for wheel spin logic
const MIN_FULL_ROTATIONS = 7;
const MAX_EXTRA_ROTATION = 360;
const SPIN_DURATION = 3; // In seconds

// DOM elements for wheel game
const spinButton = document.getElementById('spinButton');
const wheelSVG = document.getElementById('wheelSVG');
const wheelResultBox = document.getElementById('wheelResultBox');
const wheelResultText = document.getElementById('wheelResultText');

// Wheel options
import { selections } from './dice.js';

// Initialize wheel game
export function initializeWheelGame() {
    if (!wheelSVG || !spinButton || !wheelResultBox || !wheelResultText) {
        console.error("Missing wheel elements in DOM.");
        return;
    }

    spinButton.addEventListener('click', spinWheel);
}

// Spin the wheel when button is clicked
function spinWheel() {
    if (document.getElementById('wheelContainer').classList.contains('active')) {
        resetWheelRotation();

        const fullRotations = Math.floor(Math.random() * 10) + MIN_FULL_ROTATIONS; 
        const randomRotation = Math.floor(Math.random() * MAX_EXTRA_ROTATION); 
        const totalRotation = (fullRotations * 360) + randomRotation;

        // Animate wheel spin
        wheelSVG.style.transition = `transform ${SPIN_DURATION}s cubic-bezier(0.25, 0.1, 0.25, 1)`;
        wheelSVG.style.transform = `rotate(${totalRotation}deg)`;

        // Disable spin button during the spin
        spinButton.disabled = true;

        // After spin completes, show result and re-enable the button
        setTimeout(() => {
            const finalRotation = totalRotation % 360;
            console.log(`Wheel stopped at ${finalRotation} degrees`);
            showWheelResult();
            spinButton.disabled = false; // Re-enable the button after the spin completes
        }, SPIN_DURATION * 1000); // Spin duration in milliseconds
    }
}

// Reset wheel to default position
function resetWheelRotation() {
    wheelSVG.style.transition = 'none';
    wheelSVG.style.transform = 'rotate(0deg)';
    wheelSVG.offsetHeight; // Force browser reflow
}

let wheelRollCount = 0; // Keep track of how many times the wheel has been spun

// Show the wheel result
function showWheelResult() {
    const randomSelection = selections[Math.floor(Math.random() * selections.length)];
    
    // Increment the roll count
    wheelRollCount++;

    if (wheelRollCount <= 3) {
        // Show results in the first three result boxes
        document.getElementById(`previousResult${wheelRollCount}`).textContent = randomSelection;
    } else {
        // On the fourth roll, show the result in the final result box
        const finalResultText = document.getElementById('finalResultText');
        const finalResultBox = document.getElementById('finalResultBox');
        finalResultText.textContent = randomSelection;
        finalResultBox.classList.remove('hidden');
        finalResultBox.classList.add('active');

        // Animate the final result box
        gsap.fromTo(finalResultBox, 
            { opacity: 0, y: 20 }, 
            { duration: 0.5, opacity: 1, y: 0, ease: "power2.out" }
        );
    }
    
    // Update the main result box
    wheelResultBox.classList.remove('hidden');
    wheelResultBox.classList.add('active');
    gsap.fromTo(wheelResultBox, 
        { opacity: 0, y: 20 }, 
        { duration: 0.5, opacity: 1, y: 0, ease: "power2.out" }
    );
}

