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
myDiv.style.padding = '20px';
const timeDiv = document.createElement('div');
const dateDiv = document.createElement('div');
myDiv.appendChild(timeDiv);
const scrollText = document.createElement('div');
scrollText.textContent = "";
scrollText.style.opacity = '0';
scrollText.style.transition = 'opacity 0.5s';
scrollText.appendChild(dateDiv);
myDiv.appendChild(scrollText);
const style = document.createElement('style');
style.innerHTML = `
    @keyframes slideInFromLeft {
        0% { left: -100%; }
        100% { left: 50%; }
    }
    body {
        height: 200vh;
    }
    #myDiv {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }
    #timeDiv, #dateDiv, #scrollText {
        transition: opacity 0.5s;
    }
`;
document.head.appendChild(style);
myDiv.id = 'myDiv';
timeDiv.id = 'timeDiv';
dateDiv.id = 'dateDiv';
scrollText.id = 'scrollText';
function displayTime() {
    const now = new Date();
    timeDiv.textContent = now.toLocaleTimeString();
    dateDiv.textContent = now.toLocaleDateString();
}
displayTime();
setInterval(displayTime, 1000);
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    if (scrollPosition > windowHeight * 0.1) {
        timeDiv.style.opacity = '0';
        scrollText.style.opacity = '1';
    } else {
        timeDiv.style.opacity = '1';
        scrollText.style.opacity = '0';
    }
});
