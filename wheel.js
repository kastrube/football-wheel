let wheelRollCount = 0; // Track the number of wheel spins

// DOM elements for wheel game
const spinButton = document.getElementById('spinButton');
const wheelSVG = document.getElementById('wheelSVG');
const wheelResultBox = document.getElementById('wheelResultBox');
const wheelResultText = document.getElementById('wheelResultText');

// Wheel options (assuming a similar array like in the dice game)
const selections = ["Result 1", "Result 2", "Result 3", "Result 4", "Result 5", "Result 6", "Result 7", "Result 8"];

// Initialize wheel game
export function initializeWheelGame() {
    if (!wheelSVG || !spinButton || !wheelResultBox || !wheelResultText) {
        console.error("Missing wheel elements in DOM.");
        return;
    }

    spinButton.addEventListener('click', spinWheel);
}

// Show the wheel result after spinning
function showWheelResult() {
    const randomSelection = selections[Math.floor(Math.random() * selections.length)];

    // Increment the roll count
    wheelRollCount++;

    // Show results for the first three spins
    if (wheelRollCount <= 3) {
        document.getElementById(`previousResult${wheelRollCount}`).textContent = randomSelection;
    } 
    
    // On the 4th spin, show the final result and hide the previous results
    else {
        const finalResultText = document.getElementById('finalResultText');
        const finalResultBox = document.getElementById('finalResultBox');
        finalResultText.textContent = randomSelection;
        finalResultBox.classList.remove('hidden');
        finalResultBox.classList.add('active');

        // Hide the first three result boxes after the 4th spin
        for (let i = 1; i <= 3; i++) {
            document.getElementById(`previousResult${i}`).style.display = 'none';
        }

        // Reset the roll count for the next round
        wheelRollCount = 0;
    }

    // Show the spin button again for the next spin
    spinButton.textContent = "Spin Again";
    spinButton.disabled = false; // Re-enable the button after the spin completes
}

// Spin the wheel when the button is clicked
function spinWheel() {
    // Reset the game after the 4th spin when "Spin Again" is clicked
    if (wheelRollCount === 0) {
        // Clear the previous results
        for (let i = 1; i <= 3; i++) {
            document.getElementById(`previousResult${i}`).textContent = '';
            document.getElementById(`previousResult${i}`).style.display = 'block'; // Make the result boxes visible again
        }

        // Hide the final result box
        const finalResultBox = document.getElementById('finalResultBox');
        finalResultBox.classList.remove('active');
        finalResultBox.classList.add('hidden');
    }

    if (document.getElementById('wheelContainer').classList.contains('active')) {
        resetWheelRotation();

        const fullRotations = Math.floor(Math.random() * 10) + 7; 
        const randomRotation = Math.floor(Math.random() * 360); 
        const totalRotation = (fullRotations * 360) + randomRotation;

        // Animate the wheel spin
        wheelSVG.style.transition = `transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)`;
        wheelSVG.style.transform = `rotate(${totalRotation}deg)`;

        // Disable spin button during the spin
        spinButton.disabled = true;

        // After spin completes, show result and re-enable the button
        setTimeout(() => {
            showWheelResult();
        }, 3000); // Spin duration in milliseconds
    }
}

// Reset wheel to default position
function resetWheelRotation() {
    wheelSVG.style.transition = 'none';
    wheelSVG.style.transform = 'rotate(0deg)';
    wheelSVG.offsetHeight; // Force browser reflow
}
