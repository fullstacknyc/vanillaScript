const canvas = document.getElementById('gardenCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let flowers = [];
let currentColor = '#FF1493';

// Flower class
class Flower {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = 5;
        this.growing = true;
    }

    update() {
        if (this.growing && this.size < 50) this.size += 0.5;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Handle click to add flowers
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    flowers.push(new Flower(x, y, currentColor));
});

// Handle color palette selection
document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', () => {
        currentColor = option.getAttribute('data-color');
    });
});

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grass
    ctx.fillStyle = '#6B8E23';
    ctx.fillRect(0, canvas.height * 0.8, canvas.width, canvas.height * 0.2);

    // Update and draw flowers
    flowers.forEach(flower => {
        flower.update();
        flower.draw(ctx);
    });

    requestAnimationFrame(animate);
}

animate();
