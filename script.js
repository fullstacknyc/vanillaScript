document.body.style.position = "relative";
document.body.style.color = "black";
document.body.style.backgroundColor = "white";
document.body.style.fontFamily = "Segoe UI, sans-serif";
document.body.style.fontSize = "2em";
document.body.style.margin = "0";
document.body.style.padding = "0";
document.head.title = "Vanilla Script";

// Array of greetings in different languages
const greetings = [
  { text: "Hello" },
  { text: "Bonjour" },
  { text: "Hola" },
  { text: "Ciao" },
  { text: "Konnichiwa" }
];

let currentIndex = 0;

// Function to update the greeting
function updateGreeting() {
  const greetingElement = document.getElementById("greeting");
  const currentGreeting = greetings[currentIndex];

  greetingElement.textContent = `${currentGreeting.text}`;
  greetingElement.style.margin = "50% 0 0 0";
  greetingElement.style.margin = "0";
  greetingElement.style.marginTop = '50%';
  greetingElement.style.width = "100%";
  greetingElement.style.position = "absolute";
  greetingElement.style.top = "50%";
  greetingElement.style.textAlign = "center";
  greetingElement.style.transform = "translateY(-50%)";

  currentIndex = (currentIndex + 1) % greetings.length;
}

// Create the greeting element
const greetingElement = document.createElement("div");
greetingElement.id = "greeting";
document.body.appendChild(greetingElement);
document.body.style.position = "relative";
// Update greeting immediately and then every second
updateGreeting();
setInterval(updateGreeting, 1000);

const cursor = document.createElement('div');
cursor.id = 'custom-cursor';
document.body.appendChild(cursor);

cursor.style.position = 'fixed';
cursor.style.width = '20px';
cursor.style.height = '20px';
cursor.style.borderRadius = '50%';
cursor.style.backgroundColor = 'green';
cursor.style.pointerEvents = 'none';
cursor.style.zIndex = '9999';

document.body.style.cursor = 'none';

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
  cursor.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
  cursor.style.transform = 'scale(1)';
});
