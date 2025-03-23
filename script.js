document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.tech-boxes-container');
    const boxes = Array.from(container.children);
    let currentPosition = 0;

    // Cache box dimensions and container width
    const boxWidth = boxes[0].offsetWidth + 20; // box width + margin
    let containerWidth = container.offsetWidth;

    // Calculate the number of boxes required to fill the container width
    function calculateRequiredBoxes() {
        const boxCount = Math.ceil(containerWidth / boxWidth);
        return boxCount;
    }

    // Fill the container with the required number of boxes
    function fillContainer() {
        const requiredBoxes = calculateRequiredBoxes();
        const currentBoxCount = container.children.length;

        // If more boxes are needed, clone them to fill the container
        while (container.children.length < requiredBoxes) {
            boxes.forEach(box => container.appendChild(box.cloneNode(true)));
        }
    }

    // Move the container to create the scrolling effect
    function moveContainer() {
        currentPosition -= 1; // Move left by 1px
        container.style.transform = `translateX(${currentPosition}px)`;

        // If the first box has completely moved off-screen, move it to the end
        if (Math.abs(currentPosition) >= boxWidth) {
            const firstBox = container.firstElementChild;
            container.appendChild(firstBox); // Move first box to the end
            currentPosition = 0; // Reset position to smooth out the transition
        }

        // Continue the animation by calling requestAnimationFrame
        requestAnimationFrame(moveContainer);
    }

    // Initial setup: fill the container and start moving the boxes
    fillContainer();
    moveContainer();

    // Adjust container size and boxes on window resize
    window.addEventListener('resize', () => {
        containerWidth = container.offsetWidth;
        fillContainer();
    });
});
