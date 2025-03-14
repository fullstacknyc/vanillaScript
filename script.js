class Flower {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.height = 0;
        this.width = 0;
        this.growing = true;
        this.maxHeight = Math.random() * 100 + 100; // Random max height between 100 and 200
        this.color = color;
        this.petalVariation = Math.random() * 0.2 + 0.9; // Petal size variation
        this.swayAngle = Math.random() * Math.PI * 2; // Initial sway angle
        this.swaySpeed = Math.random() * 0.02 + 0.01; // Sway speed
        this.swayAmplitude = Math.random() * 2; // Sway amplitude
    }

    update() {
        if (this.growing) {
            this.height += 2; // Increase height
            this.width += 0.5; // Increase width
            if (this.height >= this.maxHeight) {
                this.growing = false; // Stop growing after reaching a certain height
            }
        }
        this.swayAngle += this.swaySpeed; // Update sway angle
    }

    draw(ctx) {
        ctx.save(); // Save the current context state

        // Swaying animation
        ctx.translate(this.x + Math.sin(this.swayAngle) * this.swayAmplitude, this.y);
        ctx.rotate(Math.sin(this.swayAngle) * 0.05); // Rotate the flower

        // Draw stem with a gradient
        const stemGradient = ctx.createLinearGradient(-5, 0, 5, -this.height);
        stemGradient.addColorStop(0, '#4CAF50'); // Dark green
        stemGradient.addColorStop(1, '#228B22'); // Forest green
        ctx.fillStyle = stemGradient;
        ctx.fillRect(-5, 0, 10, -this.height);

        // Draw petals with gradient and shadow
        const petalGradient = ctx.createRadialGradient(0, -this.height, this.width * 0.5, 0, -this.height, this.width);
        petalGradient.addColorStop(0, this.color);
        petalGradient.addColorStop(1, '#FFFFFF'); // White highlight for petals
        ctx.fillStyle = petalGradient;

        ctx.beginPath();
        ctx.ellipse(0, -this.height, this.width * this.petalVariation, this.width * 0.6 * this.petalVariation, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.ellipse(0, -this.height, this.width * this.petalVariation, this.width * 0.6 * this.petalVariation, -Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();

        // Draw center of the rose with a shadow
        ctx.fillStyle = '#FF69B4'; // Light pink color for the center
        ctx.beginPath();
        ctx.arc(0, -this.height, this.width * 0.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore(); // Restore the context to the original state
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
        
        // Only update and draw growing flowers
        this.flowers.forEach(flower => {
            flower.update();
            flower.draw(this.ctx);
        });
        
        this.flowers = this.flowers.filter(flower => flower.growing || flower.height < flower.maxHeight); // Keep flowers in array if they are still growing or haven't reached max height

        requestAnimationFrame(() => this.animate());
    }

    drawBackground() {
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#87CEEB'); // Sky blue
        gradient.addColorStop(1, '#B0E0E6'); // Light blue
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw ground
        this.ctx.fillStyle = '#6B8E23'; // Olive drab
        this.ctx.fillRect(0, this.canvas.height * 0.8, this.canvas.width, this.canvas.height * 0.2);

        // Draw hills
        this.drawHill(this.canvas.width * 0.2, this.canvas.height * 0.8, this.canvas.width * 0.3, this.canvas.height * 0.1);
        this.drawHill(this.canvas.width * 0.7, this.canvas.height * 0.8, this.canvas.width * 0.4, this.canvas.height * 0.15);

        // Draw animated clouds
        this.drawCloud(100, 100);
        this.drawCloud(300, 80);
        this.drawCloud(500, 120);
        this.drawSun(700, 100);
    }

    drawHill(x, y, width, height) {
        this.ctx.fillStyle = '#8FBC8F'; // Dark sea green
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.quadraticCurveTo(x + width / 2, y - height * 2, x + width, y);
        this.ctx.closePath();
        this.ctx.fill();
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