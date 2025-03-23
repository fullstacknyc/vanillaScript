document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.tech-boxes-container');

    // Function to scroll the container continuously
    function moveContainer() {
        let currentPosition = 0;
        setInterval(() => {
            currentPosition -= 1;
            container.style.transform = `translateX(${currentPosition}px)`;
        }, 10);
    }

    moveContainer();
});
