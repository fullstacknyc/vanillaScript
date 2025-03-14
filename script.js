const canvas = document.getElementById('roseCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let flowers = []; // Array to hold flower objects

// Function to draw a rose
function drawRose(x, y, size, color) {
    // Draw petals
    ctx.fillStyle = color; // Use the selected color
    ctx.beginPath();
    ctx.ellipse(x, y, size, size * 0.6, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.ellipse(x, y, size, size * 0.6, -Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();

    // Draw center of the rose
    ctx.fillStyle = '#FF69B4'; // Light pink color for the center
    ctx.beginPath();
    ctx.arc(x, y, size * 0.4, 0, Math.PI * 2);
    ctx.fill();
}

// Function to draw the stem
function drawStem(x, y, height) {
    ctx.fillStyle = '#228B22'; // Forest green for the stem
    ctx.fillRect(x - 5, y, 10, height);
}

// Function to animate flowers
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw all flowers
    flowers.forEach(flower => {
        drawStem(flower.x, flower.y, -flower.height);
        drawRose(flower.x, flower.y - flower.height, flower.width, flower.color);
        
        // Update the height and width of the flower
        if (flower.growing) {
            flower.height += 2; // Increase height
            flower.width += 0.5; // Increase width
            if (flower.height >= flower.maxHeight) {
                flower.growing = false; // Stop growing after reaching a certain height
            }
        }
    });

    requestAnimationFrame(animate);
}

// Event listener for mouse clicks
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left; // Get x position relative to canvas
    const y = event.clientY - rect.top; // Get y position relative to canvas

    // Get the selected color from the color picker
    const flowerColor = colorPicker.value;

    // Add a new flower at the cursor position
    flowers.push({
        x: x,
        y: y,
        height: 0,
        width: 0,
        growing: true,
        maxHeight: Math.random() * 100 + 100, // Random max height between 100 and 200
        color: flowerColor
    });
});

// Function to create a dynamic background
function drawBackground() {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#87CEEB'); // Sky blue
    gradient.addColorStop(1, '#B0E0E6'); // Light blue
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Start the animation
function startAnimation() {
    drawBackground();
    animate();
}

// Adjust canvas size on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Start the animation
startAnimation();