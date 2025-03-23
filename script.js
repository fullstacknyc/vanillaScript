document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.tech-boxes-container');
    const boxes = Array.from(container.children);
    let currentPosition = 0;

    // Function to ensure enough boxes are in the container
    function fillContainer() {
        const containerWidth = container.offsetWidth;
        const boxWidth = boxes[0].offsetWidth + 20; // width of one box + margin
        const numOfBoxesRequired = Math.ceil(containerWidth / boxWidth); // Calculate how many boxes are needed

        // Duplicate boxes to fill the width of the container if necessary
        while (container.children.length < numOfBoxesRequired) {
            boxes.forEach(box => container.appendChild(box.cloneNode(true)));
        }
    }

    // Function to move the container continuously
    function moveContainer() {
        currentPosition -= 1; // Move left by 1px
        container.style.transform = `translateX(${currentPosition}px)`;

        const firstBoxWidth = boxes[0].offsetWidth + 20; // box width + margin
        const containerWidth = container.offsetWidth;

        // Check if the first box is about to leave the viewport
        if (Math.abs(currentPosition) >= firstBoxWidth) {
            // Move the first box to the end just before it goes out of view
            const firstBox = container.firstElementChild;
            container.appendChild(firstBox); // Move first box to the end
            
            // Spawn a new box just off-screen (to the right side)
            const newBox = firstBox.cloneNode(true);
            newBox.style.transform = `translateX(${containerWidth}px)`; // Position it off-screen to the right
            container.appendChild(newBox);

            // Reset the current position without jump
            currentPosition = 0;
        }
    }

    // Fill the container initially and make the container scroll continuously
    fillContainer();
    setInterval(moveContainer, 10); // Move the container every 10ms for smooth scrolling

    // Recalculate the number of boxes if the window resizes
    window.addEventListener('resize', fillContainer);
});
