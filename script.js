// Array of greetings in different languages
const greetings = [
    { text: "Hello", lang: "English", color: "#FF5733" },
    { text: "Bonjour", lang: "French", color: "#33FF57" },
    { text: "Hola", lang: "Spanish", color: "#3357FF" },
    { text: "Ciao", lang: "Italian", color: "#FF33F1" },
    { text: "Konnichiwa", lang: "Japanese", color: "#33FFF1" }
  ];
  
  let currentIndex = 0;
  
  // Function to update the greeting
  function updateGreeting() {
    const greetingElement = document.getElementById("greeting");
    const currentGreeting = greetings[currentIndex];
    
    greetingElement.textContent = `${currentGreeting.text} (${currentGreeting.lang})`;
    greetingElement.style.color = currentGreeting.color;
    greetingElement.style.fontSize = "24px";
    greetingElement.style.fontWeight = "bold";
    greetingElement.style.alignItems = "center";
    greetingElement.style.justifyContent = "center";
    greetingElement.style.display = "flex";
    
    currentIndex = (currentIndex + 1) % greetings.length;
  }
  
  // Create the greeting element
  const greetingElement = document.createElement("div");
  greetingElement.id = "greeting";
  document.body.appendChild(greetingElement);
  
  // Update greeting immediately and then every second
  updateGreeting();
  setInterval(updateGreeting, 1000);
  