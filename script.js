// script.js

import { initializeDiceGame } from './dice.js';
import { initializeWheelGame } from './wheel.js';

// Sidebar toggle
const tabButton = document.getElementById('tabButton');
const sidebar = document.getElementById('sidebar');
const tabs = new Tabby('[data-tabs]');
if (!tabButton) {
    console.error('Tab button not found');
}

if (!sidebar) {
    console.error('Sidebar not found');
}
if (tabButton && sidebar) {
    tabButton.addEventListener('click', () => {
        console.log('Sidebar toggle clicked'); // Log when button is clicked
        sidebar.classList.toggle('open');
        sidebar.classList.toggle('hidden');
    });
} else {
    console.error('Tab button or sidebar element is missing');
}


// Update content visibility on tab change
function updateContentVisibility(tabId) {
    const diceContainer = document.getElementById('diceContainer');
    const wheelContainer = document.getElementById('wheelContainer');
    console.log('Tab ID:', tabId); // Check which tab is being selected

    if (diceContainer && wheelContainer) {
        if (tabId === 'diceContainer') {
            console.log('Displaying dice container');
            diceContainer.style.display = 'flex';
            diceContainer.classList.add('active');
            wheelContainer.style.display = 'none';
            wheelContainer.classList.remove('active');
        } else if (tabId === 'wheelContainer') {
            console.log('Displaying wheel container');
            wheelContainer.style.display = 'flex';
            wheelContainer.classList.add('active');
            diceContainer.style.display = 'none';
            diceContainer.classList.remove('active');
        }
    }
}



// Listen for tab changes
document.addEventListener('tabby', (event) => {
    if (event.detail.tab) {
        updateContentVisibility(event.detail.tab.getAttribute('href').substring(1));
    }
});

// DOM loaded event
document.addEventListener('DOMContentLoaded', () => {
    const defaultTab = document.querySelector('[data-tabby-default]');
    if (defaultTab) {
        updateContentVisibility(defaultTab.getAttribute('href').substring(1));
    }
    initializeDiceGame(); // Initialize dice game
    initializeWheelGame(); // Initialize wheel game
});
