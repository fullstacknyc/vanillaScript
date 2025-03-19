// JavaScript for scrolling between sections
const sections = document.querySelectorAll('.section');
let currentSection = 0;

const showSection = (index) => {
    // Hide all sections
    sections.forEach((section) => {
        section.style.opacity = 0;
    });

    // Show the current section
    sections[index].style.opacity = 1;
};

const handleScroll = (event) => {
    if (event.deltaY > 0 && currentSection < sections.length - 1) {
        currentSection++;
    } else if (event.deltaY < 0 && currentSection > 0) {
        currentSection--;
    }

    // Show the section corresponding to the new index
    showSection(currentSection);
};

// Initialize the first section to be visible
showSection(currentSection);

// Add scroll event listener
window.addEventListener('wheel', handleScroll, { passive: true });
