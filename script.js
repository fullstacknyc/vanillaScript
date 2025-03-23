document.addEventListener('DOMContentLoaded', function() {
    // Cloning tech boxes for infinite scroll (Optimized)
    const container = document.querySelector('.tech-boxes-container');
    const techBoxes = document.querySelectorAll('.tech-box');
    const cloneContainer = container.cloneNode(true);  // Clone entire container to reduce individual appends
    container.parentNode.appendChild(cloneContainer);

    // Button to change background color
    document.getElementById('changeColorBtn').addEventListener('click', function() {
        // Generate a random color
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        
        // Change background color
        document.body.style.backgroundColor = randomColor;

        // Change text color based on background brightness for accessibility
        const brightness = parseInt(randomColor.slice(1, 3), 16) * 0.299 + parseInt(randomColor.slice(3, 5), 16) * 0.587 + parseInt(randomColor.slice(5, 7), 16) * 0.114;
        document.body.style.color = brightness < 128 ? 'white' : 'black';
    });
});
