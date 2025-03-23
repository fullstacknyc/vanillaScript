document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.tech-boxes-container');
    const boxes = Array.from(container.children);
    let currentPosition = 0;

    // Duplicate boxes until we cover the container width
    function fillContainer() {
        while (container.scrollWidth < container.offsetWidth) {
            boxes.forEach(box => container.appendChild(box.cloneNode(true)));
        }
    }

    // Move the container smoothly
    function moveContainer() {
        currentPosition -= 1;
        container.style.transform = `translateX(${currentPosition}px)`;

        if (Math.abs(currentPosition) >= container.scrollWidth / 2) {
            currentPosition = 0;
            container.style.transition = 'none';
            container.style.transform = `translateX(${currentPosition}px)`;

            setTimeout(() => {
                container.style.transition = 'transform 0.1s linear';
            }, 100);
        }
    }

    fillContainer();
    setInterval(moveContainer, 10);
});
