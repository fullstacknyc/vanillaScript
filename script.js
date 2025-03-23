document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.tech-boxes-container');
    const boxes = Array.from(container.children);
    let currentPosition = 0;

    // Function to fill the container with enough boxes to fill the width
    function fillContainer() {
        const containerWidth = container.offsetWidth;
        const boxWidth = boxes[0].offsetWidth + 20; // width of one box + margin
        const numOfBoxesRequired = Math.ceil(containerWidth / boxWidth); // Calculate how many boxes are needed

        // Duplicate boxes to fill the width of the container
        while (container.children.length < numOfBoxesRequired) {
            boxes.forEach(box => container.appendChild(box.cloneNode(true)));
        }
    }

    // Function to move the container smoothly
    function moveContainer() {
        currentPosition -= 1; // Move left by 1px
        container.style.transform = `translateX(${currentPosition}px)`;

        // If the first box has gone out of view, move it to the end without a jump
        if (Math.abs(currentPosition) >= boxes[0].offsetWidth) {
            // Move the first box to the end without jump
            container.appendChild(container.firstElementChild); 
            currentPosition = 0; // Reset position smoothly without visible jump
        }
    }

    // Initialize and make the container scroll continuously
    fillContainer(); // Ensure enough items are present to fill the container
    setInterval(moveContainer, 10); // Move the container every 10ms for smooth scrolling

    // Recalculate the number of boxes if the window resizes
    window.addEventListener('resize', fillContainer);
});
