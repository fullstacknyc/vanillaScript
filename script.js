// Get references to elements
const durationInput = document.getElementById("duration");
const easeSelect = document.getElementById("ease");
const animationBox = document.getElementById("animationBox");

function applyAnimation() {
  const duration = durationInput.value;  // Get duration from slider
  const ease = easeSelect.value;         // Get easing function from dropdown
  
  // Apply the CSS animation
  animationBox.style.transition = `transform ${duration}s ${ease}`;
  animationBox.style.transform = `translateX(200px) rotate(360deg)`;
  
  // Reset animation after it finishes
  setTimeout(() => {
    animationBox.style.transition = `transform 0s`; // Instant reset
    animationBox.style.transform = `translateX(0) rotate(0)`; // Reset position and rotation
  }, duration * 1000);
}
