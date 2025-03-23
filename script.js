document.addEventListener('DOMContentLoaded', function() {
    const changeColorBtn = document.getElementById('changeColorBtn');

    changeColorBtn.addEventListener('click', function() {
        // Generate a random color in hexadecimal format
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        
        // Apply background color
        document.body.style.backgroundColor = randomColor;

        // Calculate brightness for text color adjustment
        const brightness = parseInt(randomColor.slice(1, 3), 16) * 0.299 + 
                           parseInt(randomColor.slice(3, 5), 16) * 0.587 + 
                           parseInt(randomColor.slice(5, 7), 16) * 0.114;

        // Adjust text color for better contrast and accessibility
        document.body.style.color = brightness < 128 ? 'white' : 'black';
    });
});
