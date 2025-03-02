const myTitle = document.createElement('title');
myTitle.textContent = 'very useful website';
document.head.appendChild(myTitle);

document.body.style.backgroundColor = 'black';
document.body.style.color = 'white';

const myDiv = document.createElement('div');
document.body.appendChild(myDiv);

myDiv.style.fontSize = '50px';
myDiv.style.fontWeight = 'bold';
myDiv.style.fontFamily = 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif';
myDiv.style.position = 'absolute';
myDiv.style.top = '50%';
myDiv.style.left = '50%';
myDiv.style.transform = 'translate(-50%, -50%)';
myDiv.style.padding = '20px';
myDiv.style.textAlign = 'center';

const style = document.createElement('style');
style.innerHTML = `
    @keyframes slideInFromLeft {
        0% { left: -100%; }
        100% { left: 50%; }
    }
`;
document.head.appendChild(style);

myDiv.style.animation = 'slideInFromLeft 1s ease-in-out forwards';

function displayTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const dateString = now.toLocaleDateString();
    myDiv.textContent = `${timeString}\n${dateString}`;
}

// Display time immediately on load
displayTime();
setInterval(displayTime, 1000);
