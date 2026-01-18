// All 16 apps configuration
const allApps = [
    { id: 'phone', name: 'Phone', icon: 'phone', color: '#34C759', file: 'phone.html', page: 1, description: 'Make calls, view contacts, and check recent calls' },
    { id: 'messages', name: 'Messages', icon: 'comment', color: '#32ADE6', file: 'messages.html', page: 1, description: 'Send and receive text messages with contacts' },
    { id: 'mail', name: 'Mail', icon: 'envelope', color: '#007AFF', file: 'mail.html', page: 1, description: 'Send and receive emails with multiple accounts' },
    { id: 'safari', name: 'Safari', icon: 'compass', color: '#1D7CF2', file: 'safari.html', page: 1, description: 'Browse the web with tabs and bookmarks' },
    { id: 'music', name: 'Music', icon: 'music', color: '#FF2D55', file: 'music.html', page: 1, description: 'Listen to your music library with playlists' },
    { id: 'photos', name: 'Photos', icon: 'images', color: '#FFD60A', file: 'photos.html', page: 1, description: 'View your photos and videos in albums' },
    { id: 'camera', name: 'Camera', icon: 'camera', color: '#5856D6', file: 'camera.html', page: 2, description: 'Take photos and record videos with effects' },
    { id: 'weather', name: 'Weather', icon: 'cloud-sun', color: '#5AC8FA', file: 'weather.html', page: 2, description: 'Check weather forecasts and conditions' },
    { id: 'maps', name: 'Maps', icon: 'map', color: '#7ED321', file: 'maps.html', page: 2, description: 'Get directions and explore locations' },
    { id: 'calendar', name: 'Calendar', icon: 'calendar', color: '#FF3B30', file: 'calendar.html', page: 2, description: 'Manage your schedule and events' },
    { id: 'clock', name: 'Clock', icon: 'clock', color: '#1D1D1F', file: 'clock.html', page: 2, description: 'World clock, alarms, timer, and stopwatch' },
    { id: 'settings', name: 'Settings', icon: 'cog', color: '#8E8E93', file: 'settings.html', page: 3, description: 'System and app settings configuration' },
    { id: 'appstore', name: 'App Store', icon: 'shopping-bag', color: '#0D84FF', file: 'appstore.html', page: 3, description: 'Discover and download new applications' },
    { id: 'calculator', name: 'Calculator', icon: 'calculator', color: '#98989D', file: 'calculator.html', page: 3, description: 'Basic and scientific calculations' },
    { id: 'notes', name: 'Notes', icon: 'sticky-note', color: '#FFCC00', file: 'notes.html', page: 3, description: 'Take notes and make lists with formatting' },
    { id: 'health', name: 'Health', icon: 'heartbeat', color: '#FF3B30', file: 'health.html', page: 3, description: 'Track health and fitness data with charts' }
];

// Icon mapping
const iconMap = {
    'phone': 'fas fa-phone',
    'comment': 'fas fa-comment',
    'envelope': 'fas fa-envelope',
    'compass': 'fas fa-compass',
    'music': 'fas fa-music',
    'images': 'fas fa-images',
    'camera': 'fas fa-camera',
    'cloud-sun': 'fas fa-cloud-sun',
    'map': 'fas fa-map',
    'calendar': 'fas fa-calendar',
    'clock': 'fas fa-clock',
    'cog': 'fas fa-cog',
    'shopping-bag': 'fas fa-shopping-bag',
    'calculator': 'fas fa-calculator',
    'sticky-note': 'fas fa-sticky-note',
    'heartbeat': 'fas fa-heartbeat'
};

// App state
let currentScreen = 1;
let currentApp = null;
let apps = [...allApps];
let installedApps = [...allApps]; // Start with all apps installed
let runningApps = [];
let isLocked = false;
let batteryLevel = 78;
let isDarkMode = false;
let isSilentMode = false;
let isWifiOn = true;

// DOM elements
const appGrid = document.getElementById('app-grid');
const homeScreen = document.getElementById('home-screen');
const appScreen = document.getElementById('app-screen');
const lockScreen = document.getElementById('lock-screen');
const allAppsScreen = document.getElementById('all-apps-screen');
const currentScreenSpan = document.getElementById('current-screen');
const currentAppNameSpan = document.getElementById('current-app-name');
const batteryLevelSpan = document.getElementById('battery-level');
const batteryLevelBar = document.getElementById('battery-level-bar');
const screenDots = document.querySelectorAll('.dot');
const screenIndicatorDots = document.querySelectorAll('.screen-dot');
const currentTimeElement = document.getElementById('current-time');
const lockTimeElement = document.getElementById('lock-time');
const lockDateElement = document.getElementById('lock-date');
const dockApps = document.getElementById('dock-apps');
const controlsAppsGrid = document.getElementById('controls-apps-grid');
const modalAppsGrid = document.getElementById('modal-apps-grid');
const allAppsGrid = document.getElementById('all-apps-grid');
const appIconSelect = document.getElementById('app-icon');
const wifiIcon = document.getElementById('wifi-icon');

// Initialize the simulator
function init() {
    updateTime();
    updateDate();
    setInterval(updateTime, 60000);
    setInterval(updateDate, 60000);
    setInterval(updateBattery, 30000); // Update battery every 30 seconds
    
    renderApps();
    renderDock();
    renderControlsApps();
    renderModalApps();
    renderAllApps();
    setupEventListeners();
    updateScreenIndicator();
    updateBatteryDisplay();
    
    // Populate app icon select
    populateAppSelect();
}

// Update time
function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    
    currentTimeElement.textContent = timeString;
    lockTimeElement.textContent = timeString;
}

// Update date
function updateDate() {
    const now = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', options);
    lockDateElement.textContent = dateString;
}

// Update battery
function updateBattery() {
    // Simulate battery drain/charge
    batteryLevel -= Math.random() * 2; // Drain slowly
    if (batteryLevel < 5) batteryLevel = 100; // Reset when too low
    updateBatteryDisplay();
}

function updateBatteryDisplay() {
    batteryLevel = Math.max(0, Math.min(100, batteryLevel));
    batteryLevelSpan.textContent = `${Math.round(batteryLevel)}%`;
    batteryLevelBar.style.width = `${batteryLevel}%`;
    
    // Change color based on level
    if (batteryLevel < 20) {
        batteryLevelBar.style.background = '#FF3B30';
    } else if (batteryLevel < 50) {
        batteryLevelBar.style.background = '#FF9500';
    } else {
        batteryLevelBar.style.background = '#34C759';
    }
}

// Render apps to home screen
function renderApps() {
    appGrid.innerHTML = '';
    
    // Filter apps for current screen
    const screenApps = installedApps.filter(app => app.page === currentScreen);
    
    if (screenApps.length === 0) {
        appGrid.innerHTML = `
            <div class="no-apps" style="grid-column: 1 / -1; text-align: center; padding: 40px; color: rgba(255,255,255,0.7);">
                <i class="fas fa-plus-circle" style="font-size: 3rem; margin-bottom: 15px;"></i>
                <h3>No Apps Here</h3>
                <p>Add apps using the controls panel</p>
            </div>
        `;
        return;
    }
    
    // Create app elements
    screenApps.forEach(app => {
        const appElement = document.createElement('div');
        appElement.className = 'app-icon';
        appElement.dataset.appId = app.id;
        appElement.title = app.description;
        
        appElement.innerHTML = `
            <i class="${iconMap[app.icon]}" style="background-color: ${app.color};"></i>
            <span class="app-name">${app.name}</span>
        `;
        
        appElement.addEventListener('click', () => openApp(app));
        appGrid.appendChild(appElement);
    });
    
    // Update current screen text
    currentScreenSpan.textContent = `Home (Page ${currentScreen})`;
}

// Render dock apps
function renderDock() {
    dockApps.innerHTML = '';
    
    // Dock apps (first 4 apps)
    const dockAppList = installedApps.slice(0, 4);
    
    dockAppList.forEach(app => {
        const dockApp = document.createElement('div');
        dockApp.className = 'dock-app';
        dockApp.dataset.appId = app.id;
        dockApp.title = app.description;
        
        dockApp.innerHTML = `
            <i class="${iconMap[app.icon]}" style="background-color: ${app.color};"></i>
            <span class="app-name">${app.name}</span>
        `;
        
        dockApp.addEventListener('click', () => openApp(app));
        dockApps.appendChild(dockApp);
    });
}

// Render apps in controls panel
function renderControlsApps() {
    controlsAppsGrid.innerHTML = '';
    
    allApps.forEach(app => {
        const appPreview = document.createElement('div');
        appPreview.className = 'app-preview';
        appPreview.dataset.appId = app.id;
        appPreview.title = `${app.name} - ${app.file}`;
        
        appPreview.innerHTML = `
            <i class="${iconMap[app.icon]}" style="color: ${app.color};"></i>
            <span>${app.name}</span>
        `;
        
        appPreview.addEventListener('click', () => openApp(app));
        controlsAppsGrid.appendChild(appPreview);
    });
}

// Render apps in modal
function renderModalApps() {
    modalAppsGrid.innerHTML = '';
    
    allApps.forEach(app => {
        const modalApp = document.createElement('div');
        modalApp.className = 'modal-app-item';
        modalApp.dataset.appId = app.id;
        
        modalApp.innerHTML = `
            <i class="${iconMap[app.icon]}" style="color: ${app.color};"></i>
            <div class="app-name">${app.name}</div>
            <div class="app-file">${app.file}</div>
            <div class="app-desc">${app.description}</div>
        `;
        
        modalApp.addEventListener('click', () => {
            openApp(app);
            closeModal('app-list-modal');
        });
        
        modalAppsGrid.appendChild(modalApp);
    });
}

// Render all apps screen
function renderAllApps() {
    allAppsGrid.innerHTML = '';
    
    allApps.forEach(app => {
        const allAppsItem = document.createElement('div');
        allAppsItem.className = 'all-apps-item';
        allAppsItem.dataset.appId = app.id;
        
        allAppsItem.innerHTML = `
            <i class="${iconMap[app.icon]}" style="color: ${app.color};"></i>
            <span>${app.name}</span>
        `;
        
        allAppsItem.addEventListener('click', () => openApp(app));
        allAppsGrid.appendChild(allAppsItem);
    });
}

// Populate app select dropdown
function populateAppSelect() {
    appIconSelect.innerHTML = '';
    
    allApps.forEach(app => {
        const option = document.createElement('option');
        option.value = app.id;
        option.textContent = app.name;
        appIconSelect.appendChild(option);
    });
}

// Open app
async function openApp(app) {
    if (isLocked) {
        alert('Unlock iPhone first');
        return;
    }
    
    currentApp = app;
    currentAppNameSpan.textContent = app.name;
    
    // Show loading overlay
    showLoading(app.name, app.file);
    
    try {
        // Load app HTML
        const appHTML = await loadAppHTML(app.file);
        
        // Hide home screen, show app screen
        homeScreen.classList.remove('active');
        appScreen.classList.add('active');
        appScreen.innerHTML = appHTML;
        
        // Add to running apps if not already there
        if (!runningApps.find(a => a.id === app.id)) {
            runningApps.push(app);
            updateAppSwitcher();
        }
        
        // Setup app event listeners
        setupAppEventListeners(app);
        
        // Hide loading overlay
        hideLoading();
        
    } catch (error) {
        console.error('Error loading app:', error);
        hideLoading();
        showAppError(app.name, app.file, error.message);
    }
}

// Load app HTML from file
async function loadAppHTML(filename) {
    try {
        const response = await fetch(filename);
        if (!response.ok) {
            throw new Error(`Failed to load ${filename} (Status: ${response.status})`);
        }
        return await response.text();
    } catch (error) {
        // Try to load fallback content
        const app = allApps.find(a => a.file === filename);
        if (app) {
            return getFallbackAppHTML(app);
        }
        throw error;
    }
}

// Fallback app HTML
function getFallbackAppHTML(app) {
    return `
        <div class="app-header">
            <button class="back-button" id="app-back-btn">
                <i class="fas fa-chevron-left"></i>
            </button>
            <h2 class="app-title">${app.name}</h2>
            <button class="app-header-btn"><i class="fas fa-ellipsis-v"></i></button>
        </div>
        <div class="app-content">
            <div style="padding: 40px 20px; text-align: center;">
                <i class="${iconMap[app.icon]}" style="font-size: 4rem; color: ${app.color}; margin-bottom: 20px;"></i>
                <h3>${app.name}</h3>
                <p>${app.description}</p>
                <div style="margin-top: 30px; padding: 20px; background: rgba(0,0,0,0.05); border-radius: 10px;">
                    <p><strong>File:</strong> ${app.file}</p>
                    <p><strong>Status:</strong> Fallback Mode</p>
                    <p style="margin-top: 15px; color: #8e8e93; font-size: 0.9rem;">
                        <i class="fas fa-info-circle"></i>
                        The app HTML file couldn't be loaded. This is a fallback view.
                    </p>
                </div>
            </div>
        </div>
    `;
}

// Setup app event listeners
function setupAppEventListeners(app) {
    // Add back button functionality
    const backButton = appScreen.querySelector('.back-button, #app-back-btn');
    if (backButton) {
        backButton.addEventListener('click', goHome);
    }
    
    // Add any app-specific event listeners
    switch(app.id) {
        case 'phone':
            setupPhoneApp();
            break;
        case 'messages':
            setupMessagesApp();
            break;
        case 'music':
            setupMusicApp();
            break;
        case 'camera':
            setupCameraApp();
            break;
        case 'calculator':
            setupCalculatorApp();
            break;
        // Add more app setups as needed
    }
    
    // Setup any buttons with data-action attributes
    const actionButtons = appScreen.querySelectorAll('[data-action]');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.dataset.action;
            handleAppAction(app.id, action, this);
        });
    });
    
    // Setup any input fields with special functionality
    const inputs = appScreen.querySelectorAll('input[type="text"], input[type="number"], textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.outline = '2px solid #007AFF';
        });
        
        input.addEventListener('blur', function() {
            this.style.outline = '';
        });
    });
}

// Handle app-specific actions
function handleAppAction(appId, action, element) {
    switch(appId) {
        case 'phone':
            if (action === 'call') {
                const number = document.querySelector('#phone-number')?.textContent || 'Unknown';
                alert(`Calling ${number}...`);
            } else if (action === 'delete') {
                alert('Delete last digit');
            }
            break;
            
        case 'messages':
            if (action === 'new-message') {
                alert('Start new conversation');
            }
            break;
            
        case 'music':
            if (action === 'play') {
                const isPlaying = element.querySelector('i').classList.contains('fa-play');
                element.querySelector('i').className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
                alert(isPlaying ? 'Playing music' : 'Pausing music');
            }
            break;
            
        case 'calculator':
            // Calculator actions are handled in the calculator app itself
            break;
            
        default:
            console.log(`Action ${action} for app ${appId}`);
    }
}

// App-specific setup functions
function setupPhoneApp() {
    // Phone app specific setup
    const keypadKeys = document.querySelectorAll('.keypad-key');
    const callBtn = document.querySelector('#call-btn');
    const deleteBtn = document.querySelector('#delete-btn');
    
    if (keypadKeys) {
        keypadKeys.forEach(key => {
            key.addEventListener('click', function() {
                const number = this.dataset.number;
                const display = document.querySelector('#phone-number');
                if (display) {
                    display.textContent += number;
                }
            });
        });
    }
    
    if (callBtn) {
        callBtn.addEventListener('click', function() {
            const number = document.querySelector('#phone-number')?.textContent || 'Unknown';
            alert(`Calling ${number}...`);
        });
    }
    
    if (deleteBtn) {
        deleteBtn.addEventListener('click', function() {
            const display = document.querySelector('#phone-number');
            if (display && display.textContent.length > 0) {
                display.textContent = display.textContent.slice(0, -1);
            }
        });
    }
}

function setupMessagesApp() {
    // Messages app specific setup
    const conversationItems = document.querySelectorAll('.conversation-item');
    const newMessageBtn = document.querySelector('#new-message-btn');
    
    if (conversationItems) {
        conversationItems.forEach(item => {
            item.addEventListener('click', function() {
                const contactName = this.querySelector('.contact-name')?.textContent || 'Unknown';
                alert(`Opening conversation with ${contactName}`);
            });
        });
    }
    
    if (newMessageBtn) {
        newMessageBtn.addEventListener('click', function() {
            alert('Starting new message...');
        });
    }
}

function setupMusicApp() {
    // Music app specific setup
    const playBtn = document.querySelector('.play-btn');
    const playlistItems = document.querySelectorAll('.playlist-item');
    
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const isPlaying = icon.classList.contains('fa-play');
            icon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
            alert(isPlaying ? 'Now playing' : 'Paused');
        });
    }
    
    if (playlistItems) {
        playlistItems.forEach(item => {
            item.addEventListener('click', function() {
                const song = this.querySelector('.playlist-song')?.textContent || 'Unknown song';
                alert(`Playing: ${song}`);
            });
        });
    }
}

function setupCameraApp() {
    // Camera app specific setup
    const shutterBtn = document.querySelector('#shutter-btn');
    const switchCameraBtn = document.querySelector('#switch-camera');
    
    if (shutterBtn) {
        shutterBtn.addEventListener('click', function() {
            alert('Photo taken! 📸');
            // Add animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    }
    
    if (switchCameraBtn) {
        switchCameraBtn.addEventListener('click', function() {
            alert('Switching camera...');
        });
    }
}

function setupCalculatorApp() {
    // Calculator app already has its own JS, so minimal setup here
    const calcButtons = document.querySelectorAll('.calc-btn');
    
    if (calcButtons) {
        calcButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Add click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 100);
            });
        });
    }
}

// Go home
function goHome() {
    homeScreen.classList.add('active');
    appScreen.classList.remove('active');
    allAppsScreen.classList.remove('active');
    appSwitcher.classList.remove('active');
    currentApp = null;
    currentAppNameSpan.textContent = 'None';
}

// Lock/unlock phone
function toggleLock() {
    isLocked = !isLocked;
    
    if (isLocked) {
        // Show lock screen
        homeScreen.classList.remove('active');
        appScreen.classList.remove('active');
        allAppsScreen.classList.remove('active');
        appSwitcher.classList.remove('active');
        lockScreen.style.display = 'flex';
        currentAppNameSpan.textContent = 'Locked';
    } else {
        // Show home screen
        lockScreen.style.display = 'none';
        homeScreen.classList.add('active');
        currentAppNameSpan.textContent = currentApp ? currentApp.name : 'None';
    }
}

// Update screen indicator
function updateScreenIndicator() {
    screenDots.forEach((dot, index) => {
        if (index === currentScreen - 1) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
    
    screenIndicatorDots.forEach((dot, index) => {
        if (index === currentScreen - 1) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Navigate to screen
function navigateToScreen(screenNumber) {
    if (screenNumber < 1) screenNumber = 3;
    if (screenNumber > 3) screenNumber = 1;
    
    currentScreen = screenNumber;
    renderApps();
    updateScreenIndicator();
}

// Show all apps screen
function showAllApps() {
    homeScreen.classList.remove('active');
    allAppsScreen.classList.add('active');
}

// Show app switcher
function showAppSwitcher() {
    updateAppSwitcher();
    homeScreen.classList.remove('active');
    appSwitcher.classList.add('active');
}

// Update app switcher
function updateAppSwitcher() {
    const switcherApps = document.getElementById('switcher-apps');
    switcherApps.innerHTML = '';
    
    runningApps.forEach(app => {
        const switcherApp = document.createElement('div');
        switcherApp.className = 'switcher-app';
        switcherApp.dataset.appId = app.id;
        
        switcherApp.innerHTML = `
            <div style="width: 100%; height: 120px; background: ${app.color}; display: flex; align-items: center; justify-content: center;">
                <i class="${iconMap[app.icon]}" style="font-size: 3rem; color: white;"></i>
            </div>
            <div class="app-title">${app.name}</div>
        `;
        
        switcherApp.addEventListener('click', () => {
            openApp(app);
            appSwitcher.classList.remove('active');
        });
        
        switcherApps.appendChild(switcherApp);
    });
}

// Close all apps
function closeAllApps() {
    runningApps = [];
    updateAppSwitcher();
    goHome();
}

// Add custom app
function addCustomApp() {
    const name = document.getElementById('app-name').value.trim();
    const iconId = document.getElementById('app-icon').value;
    
    if (!name) {
        alert('Please enter an app name');
        return;
    }
    
    const baseApp = allApps.find(app => app.id === iconId);
    if (!baseApp) return;
    
    const colors = ['#FF3B30', '#FF9500', '#FFCC00', '#34C759', '#5AC8FA', '#007AFF', '#5856D6', '#AF52DE'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const customApp = {
        id: `custom_${Date.now()}`,
        name: name.substring(0, 12),
        icon: baseApp.icon,
        color: randomColor,
        file: baseApp.file, // Use same HTML file
        page: installedApps.length % 3 + 1,
        description: 'Custom app'
    };
    
    installedApps.push(customApp);
    renderApps();
    renderDock();
    
    document.getElementById('app-name').value = '';
    alert(`App "${name}" added!`);
}

// Remove last app
function removeLastApp() {
    if (installedApps.length <= allApps.length) {
        alert('Cannot remove default apps');
        return;
    }
    
    const removed = installedApps.pop();
    renderApps();
    renderDock();
    alert(`Removed "${removed.name}"`);
}

// Toggle dark mode
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    
    if (isDarkMode) {
        document.body.style.background = 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)';
        document.querySelector('.controls-panel').style.background = 'rgba(0, 0, 0, 0.2)';
    } else {
        document.body.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
        document.querySelector('.controls-panel').style.background = 'rgba(255, 255, 255, 0.05)';
    }
}

// Toggle silent mode
function toggleSilentMode() {
    isSilentMode = !isSilentMode;
    document.getElementById('silent-switch').classList.toggle('active', isSilentMode);
}

// Toggle WiFi
function toggleWifi() {
    isWifiOn = !isWifiOn;
    wifiIcon.style.opacity = isWifiOn ? '1' : '0.3';
}

// Take screenshot
function takeScreenshot() {
    const iphoneFrame = document.querySelector('.iphone-frame');
    
    // Check if html2canvas is available
    if (typeof html2canvas === 'undefined') {
        alert('html2canvas library is required for screenshots. Please add it to your project.');
        return;
    }
    
    html2canvas(iphoneFrame).then(canvas => {
        const screenshotPreview = document.getElementById('screenshot-preview');
        const screenshotImage = document.getElementById('screenshot-image');
        
        screenshotImage.innerHTML = '';
        screenshotImage.appendChild(canvas);
        
        screenshotPreview.classList.add('active');
    }).catch(error => {
        console.error('Screenshot error:', error);
        alert('Failed to take screenshot. Using fallback method.');
        // Fallback: Show message instead of canvas
        const screenshotPreview = document.getElementById('screenshot-preview');
        const screenshotImage = document.getElementById('screenshot-image');
        
        screenshotImage.innerHTML = `
            <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #f2f2f7; color: #8e8e93;">
                <div style="text-align: center;">
                    <i class="fas fa-camera" style="font-size: 3rem; margin-bottom: 20px;"></i>
                    <h3>Screenshot Preview</h3>
                    <p>Screenshot would appear here</p>
                </div>
            </div>
        `;
        
        screenshotPreview.classList.add('active');
    });
}

// Show loading overlay
function showLoading(appName, fileName) {
    document.getElementById('loading-app-name').textContent = appName;
    document.getElementById('loading-app-file').textContent = `Loading: ${fileName}`;
    document.getElementById('loading-overlay').classList.add('active');
}

// Hide loading overlay
function hideLoading() {
    document.getElementById('loading-overlay').classList.remove('active');
}

// Show app error
function showAppError(appName, fileName, error) {
    document.getElementById('error-message').textContent = `Failed to load ${appName} (${fileName}): ${error}`;
    
    // Check which apps are missing
    const missingApps = allApps.filter(app => {
        // Try to check if file exists (simplified check)
        return false; // We can't actually check without trying to fetch
    });
    
    if (missingApps.length > 0) {
        const missingAppsList = document.getElementById('missing-apps-list');
        missingAppsList.innerHTML = `
            <h4>Missing App Files:</h4>
            <ul>
                ${missingApps.map(app => `<li>${app.file} (${app.name})</li>`).join('')}
            </ul>
        `;
    }
    
    document.getElementById('app-error-modal').classList.add('active');
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Setup event listeners
function setupEventListeners() {
    // Screen navigation
    document.getElementById('prev-screen').addEventListener('click', () => navigateToScreen(currentScreen - 1));
    document.getElementById('next-screen').addEventListener('click', () => navigateToScreen(currentScreen + 1));
    
    // Screen dots
    screenDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const page = parseInt(dot.dataset.page);
            navigateToScreen(page);
        });
    });
    
    screenIndicatorDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const page = parseInt(dot.dataset.page);
            navigateToScreen(page);
        });
    });
    
    // Control buttons
    document.getElementById('go-home').addEventListener('click', goHome);
    document.getElementById('lock-phone').addEventListener('click', toggleLock);
    document.getElementById('reset-simulator').addEventListener('click', () => {
        if (confirm('Reset simulator to default?')) {
            installedApps = [...allApps];
            runningApps = [];
            currentScreen = 1;
            renderApps();
            renderDock();
            goHome();
            alert('Simulator reset!');
        }
    });
    
    // App management
    document.getElementById('add-app').addEventListener('click', addCustomApp);
    document.getElementById('remove-app').addEventListener('click', removeLastApp);
    
    // System toggles
    document.getElementById('toggle-dark').addEventListener('change', toggleDarkMode);
    document.getElementById('toggle-silent').addEventListener('change', toggleSilentMode);
    document.getElementById('toggle-wifi').addEventListener('change', toggleWifi);
    
    // Quick actions
    document.getElementById('app-switcher-btn').addEventListener('click', showAppSwitcher);
    document.getElementById('shake-phone').addEventListener('click', () => {
        alert('iPhone shook!');
    });
    
    // Action buttons
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.dataset.action;
            switch(action) {
                case 'screenshot':
                    takeScreenshot();
                    break;
                case 'volume-up':
                    alert('Volume increased');
                    break;
                case 'volume-down':
                    alert('Volume decreased');
                    break;
                case 'rotate':
                    alert('Screen rotated');
                    break;
            }
        });
    });
    
    // Modals
    document.getElementById('toggle-help').addEventListener('click', () => {
        document.getElementById('help-modal').classList.add('active');
    });
    
    document.getElementById('show-app-list').addEventListener('click', () => {
        document.getElementById('app-list-modal').classList.add('active');
    });
    
    document.getElementById('close-help').addEventListener('click', () => {
        closeModal('help-modal');
    });
    
    document.getElementById('close-app-list').addEventListener('click', () => {
        closeModal('app-list-modal');
    });
    
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').classList.remove('active');
        });
    });
    
    // Screenshot
    const saveScreenshotBtn = document.getElementById('save-screenshot');
    const shareScreenshotBtn = document.getElementById('share-screenshot');
    const closeScreenshotBtn = document.querySelector('.close-screenshot');
    
    if (saveScreenshotBtn) {
        saveScreenshotBtn.addEventListener('click', () => {
            alert('Screenshot saved!');
            closeModal('screenshot-preview');
        });
    }
    
    if (shareScreenshotBtn) {
        shareScreenshotBtn.addEventListener('click', () => {
            alert('Screenshot shared!');
            closeModal('screenshot-preview');
        });
    }
    
    if (closeScreenshotBtn) {
        closeScreenshotBtn.addEventListener('click', () => {
            closeModal('screenshot-preview');
        });
    }
    
    // App error modal
    document.getElementById('retry-app').addEventListener('click', () => {
        if (currentApp) {
            openApp(currentApp);
        }
        closeModal('app-error-modal');
    });
    
    document.getElementById('cancel-app').addEventListener('click', () => {
        closeModal('app-error-modal');
        goHome();
    });
    
    // Lock screen buttons
    const lockCameraBtn = document.getElementById('lock-camera-btn');
    const lockFlashlightBtn = document.getElementById('lock-flashlight-btn');
    
    if (lockCameraBtn) {
        lockCameraBtn.addEventListener('click', () => {
            const cameraApp = allApps.find(app => app.id === 'camera');
            if (cameraApp) {
                toggleLock();
                openApp(cameraApp);
            }
        });
    }
    
    if (lockFlashlightBtn) {
        lockFlashlightBtn.addEventListener('click', () => {
            alert('Flashlight toggled');
        });
    }
    
    // All apps screen
    document.getElementById('all-apps-back-btn').addEventListener('click', goHome);
    document.getElementById('all-apps-search-btn').addEventListener('click', () => {
        alert('Search all apps');
    });
    
    // App switcher
    document.getElementById('close-all-apps').addEventListener('click', closeAllApps);
    
    // Home indicator
    document.getElementById('home-indicator').addEventListener('click', goHome);
    
    // Power button
    document.getElementById('power-button').addEventListener('click', toggleLock);
    
    // Volume buttons
    document.getElementById('volume-up').addEventListener('click', () => alert('Volume up'));
    document.getElementById('volume-down').addEventListener('click', () => alert('Volume down'));
    
    // Footer links
    document.getElementById('view-source').addEventListener('click', (e) => {
        e.preventDefault();
        alert('View source on GitHub');
    });
    
    document.getElementById('report-issue').addEventListener('click', (e) => {
        e.preventDefault();
        alert('Report an issue');
    });
    
    document.getElementById('share-simulator').addEventListener('click', (e) => {
        e.preventDefault();
        alert('Share simulator');
    });
    
    // Fullscreen
    document.getElementById('toggle-fullscreen').addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });
    
    // Handle messages from app windows
    window.addEventListener('message', function(event) {
        if (event.data && event.data.action === 'goHome') {
            goHome();
        }
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', init);

// Global function to handle going home from apps
window.goHomeFromApp = goHome;

// Make sure apps can communicate with parent
window.addEventListener('load', function() {
    // If we're inside an iframe or similar, setup communication
    if (window !== window.parent) {
        const backButton = document.getElementById('app-back-btn');
        if (backButton) {
            backButton.addEventListener('click', function() {
                window.parent.postMessage({ action: 'goHome' }, '*');
            });
        }
    }
});