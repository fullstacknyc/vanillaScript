// Set body styles
document.body.style.position = "relative";
document.body.style.color = "black";
document.body.style.backgroundColor = "white";
document.body.style.fontFamily = "Segoe UI, sans-serif";
document.body.style.fontSize = "2em";
document.body.style.margin = "0";
document.body.style.padding = "0";
document.body.style.cursor = 'none';

// Set page title
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

// Update greeting immediately and then every second
updateGreeting();
setInterval(updateGreeting, 1000);

// Create custom cursor
const cursor = document.createElement('div');
cursor.id = 'custom-cursor';
document.body.appendChild(cursor);

cursor.style.backgroundColor = 'transparent';
cursor.style.border = '1px solid black';
cursor.style.mixBlendMode = 'difference';
cursor.style.transition = 'transform 0.3s fade 0.3s';

// Add flame effect styles
const style = document.createElement('style');
style.textContent = `
  #custom-cursor::before,
  #custom-cursor::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: black;
    animation: flame 2s infinite;
  }
  
  #custom-cursor::after {
    animation-delay: -1s;
  }
  
  @keyframes flame {
    0%, 100% {
      transform: translate(-50%, -50%) scale(0.5) rotate(0deg);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.2) rotate(180deg);
    }
  }
`;
document.head.appendChild(style);

// Create trail effect
const trailCount = 5;
const trails = [];

for (let i = 0; i < trailCount; i++) {
  const trail = document.createElement('div');
  trail.className = 'cursor-trail';
  trail.style.cssText = `
    position: fixed;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: black;
    opacity: ${(trailCount - i) / trailCount};
    pointer-events: none;
    z-index: 9998;
    transition: transform 0.1s ease ${i * 0.05}s, opacity 0.5s ease;
  `;
  document.body.appendChild(trail);
  trails.push(trail);
}

// Event listeners for cursor and trail movement
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  
  trails.forEach((trail, index) => {
    setTimeout(() => {
      trail.style.left = e.clientX + 'px';
      trail.style.top = e.clientY + 'px';
    }, index * 50);
  });
});

// Event listeners for cursor click effects
document.addEventListener('mousedown', () => {
  cursor.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
  cursor.style.transform = 'scale(1)';
});

// Event listeners for clickable elements
const clickables = document.querySelectorAll('a, button, input[type="submit"]');

clickables.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(1.5)';
    trails.forEach(trail => trail.style.opacity = '0');
  });
  
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    trails.forEach((trail, index) => {
      trail.style.opacity = (trailCount - index) / trailCount;
    });
  });
});
