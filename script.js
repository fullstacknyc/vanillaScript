document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.tech-boxes-container');
    const boxes = Array.from(container.children);
    let currentPosition = 0;

    // Cache the box width + margin, to avoid recalculating repeatedly
    const boxWidth = boxes[0].offsetWidth + 20; // width of one box + margin
    const containerWidth = container.offsetWidth;

    // Calculate number of boxes that should be in the container based on initial size
    let requiredBoxes = Math.ceil(containerWidth / boxWidth);

    // Ensure the container is filled with the necessary number of boxes
    function fillContainer() {
        const currentBoxCount = container.children.length;
        if (currentBoxCount < requiredBoxes) {
            const boxesToAdd = requiredBoxes - currentBoxCount;
            for (let i = 0; i < boxesToAdd; i++) {
                boxes.forEach(box => container.appendChild(box.cloneNode(true)));
            }
        }
    }

    // Function to move the container continuously
    function moveContainer() {
        currentPosition -= 1; // Move left by 1px
        container.style.transform = `translateX(${currentPosition}px)`;

        // If the first box has completely moved off the screen
        if (Math.abs(currentPosition) >= boxWidth) {
            // Move the first box to the end just before it goes out of view
            const firstBox = container.firstElementChild;
            container.appendChild(firstBox); // Move first box to the end

            // Reset the current position immediately for smooth scrolling
            currentPosition = 0;
        }

        // Request the next animation frame for smoother scrolling
        requestAnimationFrame(moveContainer);
    }

    // Initial setup: fill the container and start the scrolling
    fillContainer();
    moveContainer();

    // Recalculate the number of boxes when window is resized
    window.addEventListener('resize', () => {
        const newContainerWidth = container.offsetWidth;
        const newBoxCount = Math.ceil(newContainerWidth / boxWidth);
        if (newBoxCount !== requiredBoxes) {
            requiredBoxes = newBoxCount;
            fillContainer();
        }
    });
});
