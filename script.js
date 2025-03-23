document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.tech-boxes-container');
    const techBoxes = document.querySelectorAll('.tech-box');
    
    // Duplicate the items to ensure infinite scrolling
    techBoxes.forEach(box => {
        const clone = box.cloneNode(true);
        container.appendChild(clone);
    });

    const updateContainerWidth = () => {
        const boxWidth = techBoxes[0].offsetWidth; // Get the width of a single box
        const containerWidth = techBoxes.length * boxWidth + (techBoxes.length - 1) * 20; // Total width of all items and gaps
        container.style.width = `${containerWidth}px`; // Set the width dynamically based on content
    };

    // Initial update of container width
    updateContainerWidth();

    // Adjust width dynamically when window is resized
    window.addEventListener('resize', updateContainerWidth);

    const totalWidth = container.scrollWidth; // The total width of the container

    let currentPosition = 0; // Start position

    // Function to move the container
    function moveContainer() {
        currentPosition -= 1; // Move 1px to the left
        container.style.transform = `translateX(${currentPosition}px)`;

        // If the container has moved far enough to the left, reset the position to create an infinite loop
        if (Math.abs(currentPosition) >= totalWidth / 2) {
            currentPosition = 0;
            container.style.transition = 'none'; // Disable transition during reset
            container.style.transform = `translateX(${currentPosition}px)`;
            setTimeout(() => {
                container.style.transition = 'transform 0.1s linear'; // Re-enable transition
            }, 10); // Re-enable transition after a brief delay
        }
    }

    // Move the container every 10ms for a smooth scrolling effect
    setInterval(moveContainer, 10);
});
