document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.tech-boxes-container');
    const techBoxes = Array.from(document.querySelectorAll('.tech-box'));
    
    // Helper to get box width including margin
    const getBoxWidth = () => techBoxes[0].offsetWidth + 20;

    // Function to calculate the total container width dynamically
    const calculateContainerWidth = () => getBoxWidth() * techBoxes.length;

    // Dynamically resize container width based on number of boxes
    container.style.width = `${calculateContainerWidth()}px`;

    // Function to clone boxes dynamically based on container width
    const cloneBoxes = () => {
        const boxWidth = getBoxWidth();
        const containerWidth = container.offsetWidth;
        const boxesToClone = Math.ceil(containerWidth / boxWidth);

        for (let i = 0; i < boxesToClone; i++) {
            techBoxes.forEach(box => {
                const clonedBox = box.cloneNode(true);
                container.appendChild(clonedBox);
            });
        }
    };

    // Clone the boxes at the beginning
    cloneBoxes();

    let currentPosition = 0;
    let totalWidth = calculateContainerWidth();

    // Function to smoothly move the container
    function moveContainer() {
        currentPosition -= 1;
        container.style.transform = `translateX(${currentPosition}px)`;

        // Reset position to start when it reaches the end
        if (Math.abs(currentPosition) >= totalWidth) {
            currentPosition = 0; // Reset to start
            container.style.transition = 'none'; // Disable transition during reset
            container.style.transform = `translateX(${currentPosition}px)`;

            // After reset, re-enable transition
            setTimeout(() => {
                container.style.transition = 'transform 0.1s linear';
            }, 100);
        }
    }

    // Initial call to start the movement
    const intervalId = setInterval(moveContainer, 10);

    // Adjust container width on window resize
    window.addEventListener('resize', function() {
        container.style.transition = 'none'; // Disable transition during resize
        container.style.transform = `translateX(0px)`; // Reset the position
        setTimeout(() => {
            totalWidth = calculateContainerWidth(); // Recalculate the total width
            container.style.width = `${calculateContainerWidth()}px`;
            cloneBoxes(); // Re-clone boxes to fit the new container width
            container.style.transition = 'transform 0.1s linear'; // Re-enable transition
        }, 100);
    });
});
