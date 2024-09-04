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

// Show the wheel result
function showWheelResult() {
    const randomSelection = selections[Math.floor(Math.random() * selections.length)];
    wheelResultText.textContent = randomSelection;
    wheelResultBox.style.display = 'block';
    gsap.fromTo(wheelResultBox,
        { opacity: 0, y: 20 },
        { duration: 0.5, opacity: 1, y: 0, ease: "power2.out" }
    );
}

