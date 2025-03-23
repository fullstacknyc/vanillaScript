document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.tech-boxes-container');
    const techBoxes = Array.from(document.querySelectorAll('.tech-box')); // Get all tech-box elements
    const boxWidth = techBoxes[0].offsetWidth + 20; // width of one box including margin

    let totalWidth = boxWidth * techBoxes.length; // Total width of all boxes combined
    container.style.width = `${totalWidth}px`; // Set the container's total width dynamically

    // Duplicate the tech boxes for seamless scrolling
    techBoxes.forEach(box => {
        const clonedBox = box.cloneNode(true);
        container.appendChild(clonedBox); // Append each cloned box to the container
    });

    let currentPosition = 0;
    function moveContainer() {
        currentPosition -= 1; // Move 1px to the left
        container.style.transform = `translateX(${currentPosition}px)`;

        // If the container has moved far enough to the left, reset the position to create an infinite loop
        if (Math.abs(currentPosition) >= totalWidth) {
            currentPosition = 0; // Reset position to the start
        }
    }

    // Move the container every 10ms for a smooth scrolling effect
    setInterval(moveContainer, 10);
});
