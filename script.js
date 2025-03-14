class Flower {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.height = 0;
        this.width = 0;
        this.growing = true;
        this.maxHeight = Math.random() * 100 + 100; // Random max height between 100 and 200
        this.color = color;
        this.rotation = 0; // Rotation for 3D effect
        this.curveOffset = Math.random() * 20 - 10; // Random offset for stem curvature
    }

    update() {
        if (this.growing) {
            this.height += 2; // Increase height
            this.width += 0.5; // Increase width
            this.rotation += 0.05; // Slight rotation for 3D effect
            if (this.height >= this.maxHeight) {
                this.growing = false; // Stop growing after reaching a certain height
            }
        }
    }

    draw(ctx) {
        // Draw stem with a gradient
        const stemGradient = ctx.createLinearGradient(this.x - 5, this.y, this.x + 5, this.y - this.height);
        stemGradient.addColorStop(0, '#4CAF50'); // Dark green
        stemGradient.addColorStop(1, '#228B22'); // Forest green
        ctx.fillStyle = stemGradient;

        // Draw curved stem using a quadratic Bezier curve
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        const controlPointX = this.x + this.curveOffset; // Control point for curvature
        const controlPointY = this.y - this.height / 2; // Control point height
        ctx.quadraticCurveTo(controlPointX, controlPointY, this.x, this.y - this.height);
        ctx.lineWidth = 10; // Stem width
        ctx.strokeStyle = ctx.fillStyle; // Use the same gradient for the stroke
        ctx.stroke();

        // Draw petals with gradient and shadow
        const petalGradient = ctx.createRadialGradient(this.x, this.y - this.height, this.width * 0.5, this.x, this.y - this.height, this.width);
        petalGradient.addColorStop(0, this.color);
        petalGradient.addColorStop(1, '#FFFFFF'); // White highlight for petals
        ctx.fillStyle = petalGradient;

        ctx.save(); // Save the current context
        ctx.translate(this.x, this.y - this.height); // Move to flower position
        ctx.rotate(this.rotation); // Apply rotation for 3D effect

        ctx.beginPath();
        ctx.ellipse(0, 0, this.width, this.width * 0.6, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.ellipse(0, 0, this.width, this.width * 0.6, -Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore(); // Restore the context to its original state

        // Draw center of the rose with a shadow
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

        // Draw animated clouds
        this.drawCloud(100, 100);
        this.drawCloud(300, 80);
        this.drawCloud(500, 120);
        this.drawSun(700, 100);
    }

    drawCloud(x, y) {
        this.ctx.fillStyle = 'white';
        this.ctx.beginPath();
        this.ctx.arc(x, y, 20, 0, Math.PI * 2);
        this.ctx.arc(x + 20, y, 25, 0, Math.PI * 2);
        this.ctx.arc(x + 40, y, 20, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawSun(x, y) {
        this.ctx.fillStyle = 'yellow';
        this.ctx.beginPath();
        this.ctx.arc(x, y, 30, 0, Math.PI * 2);
        this.ctx.fill();
    }
}

// Initialize the garden
const canvas = document.getElementById('roseCanvas');
const garden = new Garden(canvas);