// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Select the container that holds the tech-boxes
    const techBoxesContainer = document.querySelector('.tech-boxes-container');
    
    // Select all the existing tech-box elements
    const techBoxes = document.querySelectorAll('.tech-box');
    
    // Duplicate the tech-boxes to create a seamless loop
    techBoxes.forEach(box => {
        const clonedBox = box.cloneNode(true);
        techBoxesContainer.appendChild(clonedBox);
    });
});

// Background color change functionality
document.getElementById('changeColorBtn').addEventListener('click', function() {
    document.body.style.backgroundColor = getRandomColor();
});

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
