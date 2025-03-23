// Select all sections
const sections = document.querySelectorAll("section");
let currentSectionIndex = 0;
let lastScrollTime = 0;
const scrollThreshold = 100; // Adjust this value to control sensitivity

// Function to scroll to a specific section
function scrollToSection(index) {
  if (sections.length === 0) return; // Ensure there are sections to scroll to
  if (index < 0 || index >= sections.length) return; // Prevent out-of-bounds access

  sections[index].scrollIntoView({ behavior: "smooth" });
}

// Handle scroll event for PC
function handleScroll(event) {
  const now = Date.now();
  if (now - lastScrollTime < scrollThreshold) return; // Limit scrolling speed
  lastScrollTime = now;

  if (event.deltaY > 50 && currentSectionIndex < sections.length - 1) {
    // Scroll down
    currentSectionIndex++;
  } else if (event.deltaY < -50 && currentSectionIndex > 0) {
    // Scroll up
    currentSectionIndex--;
  }
  scrollToSection(currentSectionIndex);
}

// Handle touch events for mobile
let startY = 0;

function handleTouchStart(event) {
  startY = event.touches[0].clientY;
}

function handleTouchMove(event) {
  const endY = event.touches[0].clientY;
  const deltaY = startY - endY;

  if (Math.abs(deltaY) < 50) return; // Reduce sensitivity by requiring more movement

  if (deltaY > 50 && currentSectionIndex < sections.length - 1) {
    // Swipe up
    currentSectionIndex++;
  } else if (deltaY < -50 && currentSectionIndex > 0) {
    // Swipe down
    currentSectionIndex--;
  }
  scrollToSection(currentSectionIndex);
}

// Add event listeners for scrolling and touch
window.addEventListener("wheel", handleScroll, { passive: true });
window.addEventListener("touchstart", handleTouchStart, { passive: true });
window.addEventListener("touchmove", handleTouchMove, { passive: true });
