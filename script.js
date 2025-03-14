const canvas = document.getElementById('roseCanvas');
const ctx = canvas.getContext('2d');

let roseHeight = 0;
let roseWidth = 0;
let growing = true;

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

function drawStem(x, y, height) {
    ctx.fillStyle = '#228B22'; // Forest green for the stem
    ctx.fillRect(x - 5, y, 10, height);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the stem
    drawStem(200, 600, -roseHeight);
    
    // Draw the rose
    if (roseHeight > 100) {
        drawRose(200, 600 - roseHeight, roseWidth);
    }

    // Update the height and width of the rose
    if (growing) {
        roseHeight += 2; // Increase height
        roseWidth += 0.5; // Increase width
        if (roseHeight >= 150) {
            growing = false; // Stop growing after reaching a certain height
        }
    }

    requestAnimationFrame(animate);
}

// Start the animation
animate();