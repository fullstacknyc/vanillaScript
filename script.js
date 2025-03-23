document.addEventListener('DOMContentLoaded', function() {
    // Cloning tech boxes for infinite scroll
    const container = document.querySelector('.tech-boxes-container');
    const techBoxes = document.querySelectorAll('.tech-box');
    techBoxes.forEach(box => container.appendChild(box.cloneNode(true)));

    // Button to change background color
    document.getElementById('changeColorBtn').addEventListener('click', function() {
        document.body.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    });
});
