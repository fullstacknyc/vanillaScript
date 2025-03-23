document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.tech-boxes-container');
    const techBoxes = document.querySelectorAll('.tech-box');
    techBoxes.forEach(box => container.appendChild(box.cloneNode(true)));

    document.getElementById('changeColorBtn').addEventListener('click', function() {
        document.body.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    });
});
