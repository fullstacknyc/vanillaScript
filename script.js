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
        this.leafNodes = [];
        this.createLeafNodes();
    }

    createLeafNodes() {
        const numLeaves = Math.floor(Math.random() * 3) + 2; // Random number of leaves (2-4)
        for (let i = 0; i < numLeaves; i++) {
            const position = Math.random() * this.maxHeight * 0.8; // Leaf position along the stem
            const size = Math.random() * 5 + 5; // Leaf size
            const angle = Math.random() * Math.PI / 4 - Math.PI / 8; // Leaf angle
            this.leafNodes.push({ position, size, angle });
        }
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

        // Draw leaves
        this.leafNodes.forEach(leaf => {
            ctx.save();
            ctx.translate(0, -this.height + leaf.position); // Corrected leaf position
            ctx.rotate(leaf.angle);
            ctx.fillStyle = '#388E3C'; // Darker green for leaves
            ctx.beginPath();
            ctx.ellipse(0, 0, leaf.size, leaf.size * 0.5, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });

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

class Cloud {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    update() {
        this.x -= this.speed;
    }

    draw(ctx) {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 20, 0, Math.PI * 2);
        ctx.arc(this.x + 20, this.y, 25, 0, Math.PI * 2);
        ctx.arc(this.x + 40, this.y, 20, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Bee {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = Math.random() * 1 + 0.5; // Random speed
        this.angle = Math.random() * Math.PI * 2; // Random initial angle
        this.flowerTarget = null; // The flower the bee is currently targeting
    }

    update(flowers) {
        // If the bee doesn't have a flower target, find one
        if (!this.flowerTarget) {
            this.flowerTarget = this.findClosestFlower(flowers);
        }

        // If the bee has a flower target, move towards it
        if (this.flowerTarget) {
            const dx = this.flowerTarget.x - this.x;
            const dy = this.flowerTarget.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // If the bee is close enough to the flower, stop targeting it
            if (distance < 20) {
                this.flowerTarget = null;
            } else {
                // Move towards the flower
                this.angle = Math.atan2(dy, dx);
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed;
            }
        } else {
            // If the bee doesn't have a flower target, move randomly
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;

            // Change direction randomly
            if (Math.random() < 0.02) {
                this.angle += (Math.random() - 0.5) * Math.PI * 0.5;
            }
        }

        // Keep the bee within the bounds of the canvas
        if (this.x < 0) this.x = this.canvas.width;
        if (this.x > this.canvas.width) this.x = 0;
        if (this.y < 0) this.y = this.canvas.height;
        if (this.y > this.canvas.height) this.y = 0;
    }

    draw(ctx) {
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, 5, 4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.x - 2, this.y - 3, 1, 0, Math.PI * 2);
        ctx.arc(this.x + 2, this.y - 3, 1, 0, Math.PI * 2);
        ctx.fill();
    }

    findClosestFlower(flowers) {
        let closestFlower = null;
        let closestDistance = Infinity;

        for (const flower of flowers) {
            const dx = flower.x - this.x;
            const dy = flower.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestFlower = flower;
            }
        }

        return closestFlower;
    }
}

class Garden {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.flowers = [];
        this.currentColor = '#FF1493'; // Default color
        this.clouds = []; // Array to hold clouds
        this.bees = []; // Array to hold bees
        this.init();
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.addEventListener('click', (event) => this.addFlower(event));
        window.addEventListener('resize', () => this.resizeCanvas());
        this.setupColorPalette();
        this.createClouds(); // Create initial clouds
        this.createBees(); // Create initial bees
        this.animate();
    }

    createClouds() {
        // Create multiple clouds with random positions and speeds
        for (let i = 0; i < 3; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height * 0.3;
            const speed = Math.random() * 0.5 + 0.2;
            this.clouds.push(new Cloud(x, y, speed));
        }
    }

    createBees() {
        // Create multiple bees with random positions
        for (let i = 0; i < 5; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height * 0.8;
            this.bees.push(new Bee(x, y));
        }
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
        
        // Update and draw clouds
        this.clouds.forEach(cloud => {
            cloud.update();
            if (cloud.x < -50) { // If cloud is off-screen
                cloud.x = this.canvas.width + 50; // Reset to right side
                cloud.y = Math.random() * this.canvas.height * 0.3; // New random y position
            }
            cloud.draw(this.ctx);
        });

        // Update and draw bees
        this.bees.forEach(bee => {
            bee.canvas = this.canvas;
            bee.update(this.flowers);
            bee.draw(this.ctx);
        });

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