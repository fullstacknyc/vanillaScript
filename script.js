document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.tech-boxes-container');
    const boxes = Array.from(container.children);
    let currentPosition = 0;

    // Function to move the container smoothly
    function moveContainer() {
        currentPosition -= 1; // Move left by 1px
        container.style.transform = `translateX(${currentPosition}px)`;

        // When the first box goes out of view, wrap it to the end to maintain smooth scrolling
        if (Math.abs(currentPosition) >= boxes[0].offsetWidth) {
            container.appendChild(container.firstElementChild); // Move first element to the end
            currentPosition = 0; // Reset position to avoid jump
        }
    }

    // Fill the container with boxes (if necessary)
    function fillContainer() {
        while (container.scrollWidth < container.offsetWidth) {
            boxes.forEach(box => container.appendChild(box.cloneNode(true)));
        }
    }

    fillContainer(); // Ensure enough items to start with
    setInterval(moveContainer, 10); // Move the container every 10ms for smooth scrolling
});
