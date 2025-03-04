// Add title and styles to the document head
document.head.innerHTML += `
    <title>Very Useful Website</title>
    <style>
        @keyframes slideInFromLeft { 
            0% { left: -100%; } 
            100% { left: 50%; } 
        }
        body {
            height: 500vh;
            background-color: black;
            color: white;
            margin: 0;
        }
        #myDiv {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            font-size: 50px;
            font-weight: bold;
            font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif;
            padding: 20px;
        }
        .content {
            opacity: 0;
            transition: opacity 0.5s;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        .content.active {
            opacity: 1;
        }
    </style>
`;

// Add main container and content divs
document.body.innerHTML += `
    <div id="myDiv">
        <div class="content" id="timeDiv"></div>
        <div class="content" id="dateDiv"></div>
        <div class="content" id="ipDiv">Loading IP...</div>
        <div class="content" id="locationDiv">Loading location...</div>
        <div class="content" id="dimensionsDiv"></div>
    </div>
`;

// Function to display the current time and date
function displayTime() {
    const now = new Date();
    document.getElementById('timeDiv').textContent = `Time: ${now.toLocaleTimeString()}`;
    document.getElementById('dateDiv').textContent = `Date: ${now.toLocaleDateString()}`;
}

// Function to get and display IP address
async function displayIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        document.getElementById('ipDiv').textContent = `IP: ${data.ip}`;
    } catch (error) {
        document.getElementById('ipDiv').textContent = 'Failed to get IP';
    }
}

// Function to get and display location
async function displayLocation() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        document.getElementById('locationDiv').textContent = `Location: ${data.city}, ${data.region}, ${data.country_name}`;
    } catch (error) {
        document.getElementById('locationDiv').textContent = 'Failed to get location';
    }
}

// Function to display browser dimensions
function displayDimensions() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    document.getElementById('dimensionsDiv').textContent = `Browser dimensions: ${width}x${height}`;
}

// Call the functions
displayTime();
displayIP();
displayLocation();
displayDimensions();

// Set intervals for updating time and dimensions
setInterval(displayTime, 1000);
setInterval(displayDimensions, 1000); // Update dimensions every second in case of resize

// Function to update which content is visible based on scroll position
function updateContent() {
    const contents = document.querySelectorAll('.content');
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;

    contents.forEach((content, index) => {
        const thresholdStart = windowHeight * index * 0.8;
        const thresholdEnd = thresholdStart + windowHeight * 0.8;

        if (scrollPosition >= thresholdStart && scrollPosition < thresholdEnd) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
}

// Add scroll event listener to update content visibility
window.addEventListener('scroll', updateContent);

// Initialize the first content as active
updateContent();
