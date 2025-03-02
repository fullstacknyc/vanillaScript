// Set page title and style body
document.title = 'scripting';
document.body.style.cssText = 'background-color: black; color: white;';

// Create and style div element to display time
const myDiv = document.createElement('div');
myDiv.style.cssText = 'font-size: 50px; font-weight: bold; font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif; position: absolute; top: 0; right: 0;';
document.body.appendChild(myDiv);

// Update div with current time every second
setInterval(() => myDiv.textContent = new Date().toLocaleTimeString(), 1000);
