// script.js

import { initializeDiceGame } from './dice.js';
import { initializeWheelGame } from './wheel.js';

// Sidebar toggle
const tabButton = document.getElementById('tabButton');
const sidebar = document.getElementById('sidebar');
const tabs = new Tabby('[data-tabs]');

if (tabButton && sidebar) {
    tabButton.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        sidebar.classList.toggle('hidden');
    });
}

// Update content visibility on tab change
function updateContentVisibility(tabId) {
    const diceContainer = document.getElementById('diceContainer');
    const wheelContainer = document.getElementById('wheelContainer');

    if (diceContainer && wheelContainer) {
        if (tabId === 'diceContainer') {
            diceContainer.style.display = 'flex';
            diceContainer.classList.add('active');
            wheelContainer.style.display = 'none';
            wheelContainer.classList.remove('active');
        } else if (tabId === 'wheelContainer') {
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
