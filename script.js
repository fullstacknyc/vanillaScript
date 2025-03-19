// Select all sections
const sections = document.querySelectorAll("section");
let currentSectionIndex = 0;

// Function to scroll to a specific section
function scrollToSection(index) {
  sections[index].scrollIntoView({ behavior: "smooth" });
}

// Handle scroll event
function handleScroll(event) {
  if (event.deltaY > 0 && currentSectionIndex < sections.length - 1) {
    // Scroll down
    currentSectionIndex++;
  } else if (event.deltaY < 0 && currentSectionIndex > 0) {
    // Scroll up
    currentSectionIndex--;
  }
  scrollToSection(currentSectionIndex);
}

// Add event listener for scrolling
window.addEventListener("wheel", handleScroll);