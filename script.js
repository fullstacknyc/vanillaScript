document.body.style.position = "relative";

// Array of greetings in different languages with text and color properties
const greetings = [
    { text: "Hello", color: "#FF5733" },
    { text: "Bonjour", color: "#33FF57" },
    { text: "Hola", color: "#3357FF" },
    { text: "Ciao", color: "#FF33F1" },
    { text: "Konnichiwa", color: "#33FFF1" }
  ];
  
  let currentIndex = 0;
  
  // Function to update the greeting
  function updateGreeting() {
    const greetingElement = document.getElementById("greeting");
    const currentGreeting = greetings[currentIndex];
    
    greetingElement.textContent = `${currentGreeting.text}`;
    greetingElement.style.color = currentGreeting.color;
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
  