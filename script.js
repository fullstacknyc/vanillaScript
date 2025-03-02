//Writing the title of the page using JavaScript
const myTitle = document.createElement(`title`);
myTitle.innerHTML = `scripting`;
document.head.appendChild(myTitle);
//styling the body using JavaScript
document.body.style.backgroundColor = `black`;
document.body.style.color = `white`;
//creating a div element
const myDiv = document.createElement('div');
myDiv.textContent = undefined;
document.body.appendChild(myDiv);
//styling the div element
myDiv.style.fontSize = `50px`;
myDiv.style.fontWeight = `bold`;
myDiv.style.fontFamily = `Segoe UI, Tahoma, Geneva, Verdana, sans-serif`;
//making the time positioned absolutely on the top right corner
myDiv.style.position = `absolute`;
myDiv.style.top = `0`;
myDiv.style.right = `0`;
//making myDiv to display the current time
function displayTime() {
    myDiv.textContent = new Date().toLocaleTimeString();
}
setInterval(displayTime, 1000);