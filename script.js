document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.tech-boxes-container');
    let techBoxes = Array.from(container.children);

    // Helper to get single box width including margin
    const getBoxWidth = () => techBoxes[0].offsetWidth + 20;

    // Ensure minimum clones to fill the viewport
    const ensureClones = () => {
        const boxWidth = getBoxWidth();
        const containerWidth = container.parentElement.offsetWidth;
        const minBoxesNeeded = Math.ceil(containerWidth / boxWidth) + 1;

        while (techBoxes.length < minBoxesNeeded) {
            techBoxes.forEach(box => {
                const clone = box.cloneNode(true);
                container.appendChild(clone);
            });
            techBoxes = Array.from(container.children);
        }
    };

    // Initial setup
    ensureClones();

    let currentPosition = 0;
    let totalWidth = getBoxWidth() * techBoxes.length;

    function moveContainer() {
        currentPosition -= 1;
        container.style.transform = `translateX(${currentPosition}px)`;

        // Seamless wrap-around instead of resetting
        if (Math.abs(currentPosition) >= getBoxWidth()) {
            container.appendChild(container.firstElementChild);
            container.style.transition = 'none';
            container.style.transform = `translateX(0px)`;
            currentPosition = 0;
            requestAnimationFrame(() => {
                container.style.transition = 'transform 0.1s linear';
            });
        }
    }

    // Start movement
    setInterval(moveContainer, 10);

    // Adjust on resize
    window.addEventListener('resize', function() {
        container.style.transition = 'none';
        ensureClones();
        totalWidth = getBoxWidth() * techBoxes.length;
    });
});
