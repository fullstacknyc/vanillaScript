document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.tech-boxes-container');
    const techBoxTemplate = document.querySelector('.tech-box'); // Get a reference to one tech-box

    // Function to calculate how many boxes should be displayed based on the viewport width
    function updateBoxes() {
        // Clear the container to reset
        container.innerHTML = '';

        const containerWidth = container.offsetWidth;
        const boxWidth = techBoxTemplate.offsetWidth + 20; // width of one box + margin-right

        // Calculate how many boxes can fit in the viewport
        const boxesToFit = Math.ceil(containerWidth / boxWidth);

        // Add boxes dynamically
        for (let i = 0; i < boxesToFit * 2; i++) { // Multiply by 2 to create a seamless loop
            const clone = techBoxTemplate.cloneNode(true);
            container.appendChild(clone);
        }
    }

    // Initial update of boxes
    updateBoxes();

    // Recalculate when the window is resized
    window.addEventListener('resize', updateBoxes);

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
