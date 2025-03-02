document.head.innerHTML += '<title>very useful website</title><style>@keyframes slideInFromLeft{0%{left:-100%}100%{left:50%}}body{height:200vh}#myDiv{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center}#timeDiv,#dateDiv,#scrollText{transition:opacity 0.5s}</style>';
document.body.style.cssText = 'background-color:black;color:white';
const myDiv = document.body.appendChild(document.createElement('div'));
myDiv.id = 'myDiv';
myDiv.style.cssText = 'font-size:50px;font-weight:bold;font-family:Segoe UI, Tahoma, Geneva, Verdana, sans-serif;padding:20px';
const timeDiv = myDiv.appendChild(document.createElement('div'));
timeDiv.id = 'timeDiv';
const scrollText = myDiv.appendChild(document.createElement('div'));
scrollText.id = 'scrollText';
scrollText.style.cssText = 'opacity:0;transition:opacity 0.5s';
const dateDiv = scrollText.appendChild(document.createElement('div'));
dateDiv.id = 'dateDiv';

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
