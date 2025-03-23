document.addEventListener('DOMContentLoaded', function() {
    // Get the button element by ID
    const changeColorBtn = document.getElementById('changeColorBtn');

    // Check if the button exists
    if (!changeColorBtn) {
        console.error('Button with id "changeColorBtn" not found!');
        return;
    }

    // Add event listener to change background color when the button is clicked
    changeColorBtn.addEventListener('click', function() {
        // Generate a random color in hexadecimal format
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        
        // Apply the random background color to the body
        document.body.style.backgroundColor = randomColor;

        // Calculate the brightness of the generated color
        const brightness = calculateBrightness(randomColor);
        console.log('Generated Color:', randomColor);
        console.log('Brightness:', brightness);

        // Adjust text color based on the brightness of the background for accessibility
        document.body.style.color = brightness < 128 ? 'white' : 'black';
    });

    // Function to calculate the brightness of a color
    function calculateBrightness(color) {
        // Extract RGB components from hex color
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);

        // Calculate brightness using the formula: 0.299 * R + 0.587 * G + 0.114 * B
        return (r * 0.299 + g * 0.587 + b * 0.114);
    }
});
