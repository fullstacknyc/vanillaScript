// Get references to elements
const animationBox = document.getElementById("animationBox");
const durationInput = document.getElementById("duration");
const easeSelect = document.getElementById("ease");

let animationIndex = 0;  // Tracks which animation we're on

// List of animations
const animations = [
  {
    transform: "translateX(200px) rotate(360deg)",
    name: "Slide and Rotate"
  },
  {
    transform: "scale(1.5) rotate(0deg)",
    name: "Scale Up"
  },
  {
    transform: "rotate(720deg) translateY(100px)",
    name: "Rotate and Move Down"
  },
  {
    transform: "translateX(-200px) scale(0.5)",
    name: "Slide and Shrink"
  },
  {
    transform: "scale(2) translateY(-100px)",
    name: "Expand and Move Up"
  }
];

// Apply the current animation based on the index
function applyAnimation() {
  const duration = durationInput.value;
  const ease = easeSelect.value;
  const animation = animations[animationIndex];

  // Apply the CSS animation
  animationBox.style.transition = `transform ${duration}s ${ease}`;
  animationBox.style.transform = animation.transform;
  
  // Change animation name dynamically if desired
  console.log(`Current Animation: ${animation.name}`);
}

// Scroll event listener to change animation on scroll
window.addEventListener('wheel', (e) => {
  // If scrolling down, move to the next animation
  if (e.deltaY > 0) {
    animationIndex = (animationIndex + 1) % animations.length;
  } else {
    animationIndex = (animationIndex - 1 + animations.length) % animations.length;
  }
  applyAnimation();
});

// Initial animation
applyAnimation();
