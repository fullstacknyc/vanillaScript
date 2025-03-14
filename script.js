const canvas = document.getElementById('roseCanvas');
const ctx = canvas.getContext('2d');

let flowers = []; // Array to hold flower objects

// Function to draw a rose
function drawRose(x, y, size) {
    // Draw petals
    ctx.fillStyle = '#FF1493'; // Deep pink color for petals
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
        drawRose(flower.x, flower.y - flower.height, flower.width);
        
        // Update the height and width of the flower
        if (flower.growing) {
            flower.height += 2; // Increase height
            flower.width += 0.5; // Increase width
            if (flower.height >= 150) {
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

    // Add a new flower at the cursor position
    flowers.push({
        x: x,
        y: y,
        height: 0,
        width: 0,
        growing: true
    });
});

// Start the animation
animate();