class Flower {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.height = 0;
        this.width = 0;
        this.growing = true;
        this.maxHeight = Math.random() * 100 + 100; // Random max height between 100 and 200
        this.color = color;
    }

    update() {
        if (this.growing) {
            this.height += 2; // Increase height
            this.width += 0.5; // Increase width
            if (this.height >= this.maxHeight) {
                this.growing = false; // Stop growing after reaching a certain height
            }
        }
    }

    draw(ctx) {
        // Draw stem
        ctx.fillStyle = '#228B22'; // Forest green for the stem
        ctx.fillRect(this.x - 5, this.y, 10, -this.height);

        // Draw petals
        ctx.fillStyle = this.color; // Use the selected color
        ctx.beginPath();
        ctx.ellipse(this.x, this.y - this.height, this.width, this.width * 0.6, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.ellipse(this.x, this.y - this.height, this.width, this.width * 0.6, -Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();

        // Draw center of the rose
        ctx.fillStyle = '#FF69B4'; // Light pink color for the center
        ctx.beginPath();
        ctx.arc(this.x, this.y - this.height, this.width * 0.4, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Garden {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.flowers = [];
        this.currentColor = '#FF1493'; // Default color
        this.init();
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.addEventListener('click', (event) => this.addFlower(event));
        window.addEventListener('resize', () => this.resizeCanvas());
        this.setupColorPalette();
        this.animate();
    }

    setupColorPalette() {
        const colorOptions = document.querySelectorAll('.color-option');
        colorOptions.forEach(option => {
            option.addEventListener('click', (event) => {
                this.currentColor = event.target.getAttribute('data-color');
            });
        });
    }

    // Create: Add a new flower
    addFlower(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left; // Get x position relative to canvas
        const y = event.clientY - rect.top; // Get y position relative to canvas

        this.flowers.push(new Flower(x, y, this.currentColor));
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBackground();
        this.flowers.forEach(flower => {
            flower.update();
            flower.draw(this.ctx);
        });
        requestAnimationFrame(() => this.animate());
    }

    drawBackground() {
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#87CEEB'); // Sky blue
        gradient.addColorStop(1, '#B0E0E6'); // Light blue
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// Initialize the garden
const canvas = document.getElementById('roseCanvas');
const garden = new Garden(canvas);