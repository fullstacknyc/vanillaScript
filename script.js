const myTitle = document.createElement(`title`);
myTitle.textContent = `pipboy 3000`;
document.head.appendChild(myTitle);
document.body.style.backgroundColor = `black`;
document.body.style.color = `white`;
const myDiv = document.createElement('div');
document.body.appendChild(myDiv);
myDiv.style.fontSize = '50px';
myDiv.style.fontWeight = 'bold';
myDiv.style.fontFamily = 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif';
myDiv.style.position = 'absolute';
myDiv.style.top = '0';
myDiv.style.right = '0';
function displayTime() {
    myDiv.textContent = new Date().toLocaleTimeString();
}
setInterval(displayTime, 1000);
