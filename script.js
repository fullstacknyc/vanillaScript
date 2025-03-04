// Add title, styles, and create elements in one go
document.head.innerHTML += `
    <title>very useful website</title>
    <style>
        @keyframes slideInFromLeft { 0% { left: -100%; } 100% { left: 50%; } }
        body { height: 200vh; background-color: black; color: white; }
        #myDiv {
            position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
            text-align: center; font-size: 50px; font-weight: bold;
            font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif; padding: 20px;
        }
        #timeDiv, #dateDiv, #scrollText { transition: opacity 0.5s; }
        #scrollText { opacity: 0; }
    </style>
`;

// Create main structure
document.body.innerHTML += `
    <div id="myDiv">
        <div id="timeDiv"></div>
        <div id="scrollText">
            <div id="dateDiv"></div>
        </div>
    </div>
`;

// Function to display current time and date
function displayTime() {
    const now = new Date();
    document.getElementById('timeDiv').textContent = now.toLocaleTimeString();
    document.getElementById('dateDiv').textContent = now.toLocaleDateString();
}

// Initial call and set interval
displayTime();
setInterval(displayTime, 1000);

// Add scroll event listener
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > window.innerHeight * 0.1;
    document.getElementById('timeDiv').style.opacity = scrolled ? '0' : '1';
    document.getElementById('scrollText').style.opacity = scrolled ? '1' : '0';
});
