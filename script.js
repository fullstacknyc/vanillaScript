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

        // If the first box has completely moved off the screen
        if (Math.abs(currentPosition) >= firstBoxWidth) {
            // Move the first box to the end just before it goes out of view
            const firstBox = container.firstElementChild;
            container.appendChild(firstBox); // Move first box to the end

            // Reset the current position immediately for smooth scrolling
            currentPosition = 0;
        }

        // Request the next animation frame for smoother scrolling
        requestAnimationFrame(moveContainer);
    }

    // Initialize and start moving the container
    fillContainer();
    moveContainer(); // Start moving the container

    // Recalculate the number of boxes if the window resizes
    window.addEventListener('resize', fillContainer);
});
