class PollenParticle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = {
            x: (Math.random() - 0.5) * 2,
            y: -Math.random() * 2 - 1
        };
        this.alpha = 1;
        this.size = Math.random() * 3 + 2;
        this.lifetime = 60;
        this.age = 0;
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.velocity.y += 0.05;
        this.age++;
        this.alpha = 1 - (this.age / this.lifetime);
        return this.age < this.lifetime;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

class Flower {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.height = 0;
        this.width = 0;
        this.growing = true;
        this.maxHeight = Math.random() * 100 + 100;
        this.color = color;
        this.petalVariation = Math.random() * 0.2 + 0.9;
        this.swayAngle = Math.random() * Math.PI * 2;
        this.swaySpeed = Math.random() * 0.02 + 0.01;
        this.swayAmplitude = Math.random() * 2;
        this.leafNodes = [];
        this.isPollinated = false;
        this.pollenCount = 0;
        this.maxPollen = 3;
        this.canBeePollinate = true;
        this.pollenParticles = [];
        this.lastPollinationTime = 0;
        this.pollinationCooldown = 2000;
        this.createLeafNodes();
    }

    createLeafNodes() {
        const numLeaves = Math.floor(Math.random() * 3) + 2;
        for (let i = 0; i < numLeaves; i++) {
            const position = Math.random() * this.maxHeight * 0.8;
            const size = Math.random() * 5 + 5;
            const angle = Math.random() * Math.PI / 4 - Math.PI / 8;
            this.leafNodes.push({ position, size, angle });
        }
    }

    pollinate(currentTime) {
        if (currentTime - this.lastPollinationTime < this.pollinationCooldown) {
            return false;
        }

        if (this.pollenCount < this.maxPollen) {
            this.pollenCount++;
            this.lastPollinationTime = currentTime;
            
            for (let i = 0; i < 10; i++) {
                this.pollenParticles.push(new PollenParticle(
                    this.x,
                    this.y - this.height,
                    this.color
                ));
            }

            if (this.pollenCount >= this.maxPollen) {
                this.isPollinated = true;
                this.width *= 1.2;
                return true;
            }
        }
        return false;
    }

    update() {
        if (this.growing) {
            this.height += 2;
            this.width += 0.5;
            if (this.height >= this.maxHeight) {
                this.growing = false;
            }
        }
        this.swayAngle += this.swaySpeed;
        this.pollenParticles = this.pollenParticles.filter(particle => particle.update());
    }

    draw(ctx) {
        ctx.save();

        ctx.translate(this.x + Math.sin(this.swayAngle) * this.swayAmplitude, this.y);
        ctx.rotate(Math.sin(this.swayAngle) * 0.05);

        const stemGradient = ctx.createLinearGradient(-5, 0, 5, -this.height);
        stemGradient.addColorStop(0, '#4CAF50');
        stemGradient.addColorStop(1, '#228B22');
        ctx.fillStyle = stemGradient;
        ctx.fillRect(-5, 0, 10, -this.height);

        this.leafNodes.forEach(leaf => {
            ctx.save();
            ctx.translate(0, -this.height + leaf.position);
            ctx.rotate(leaf.angle);
            ctx.fillStyle = '#388E3C';
            ctx.beginPath();
            ctx.ellipse(0, 0, leaf.size, leaf.size * 0.5, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });

        const petalGradient = ctx.createRadialGradient(0, -this.height, this.width * 0.5, 0, -this.height, this.width);
        petalGradient.addColorStop(0, this.color);
        petalGradient.addColorStop(1, '#FFFFFF');
        ctx.fillStyle = petalGradient;

        ctx.beginPath();
        ctx.ellipse(0, -this.height, this.width * this.petalVariation, this.width * 0.6 * this.petalVariation, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.ellipse(0, -this.height, this.width * this.petalVariation, this.width * 0.6 * this.petalVariation, -Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FF69B4';
        ctx.beginPath();
        ctx.arc(0, -this.height, this.width * 0.4, 0, Math.PI * 2);
        ctx.fill();

        this.pollenParticles.forEach(particle => particle.draw(ctx));

        if (this.pollenCount > 0) {
            ctx.save();
            ctx.translate(0, -this.height);
            for (let i = 0; i < this.pollenCount; i++) {
                ctx.fillStyle = 'gold';
                ctx.beginPath();
                ctx.arc((i - 1) * 10, 20, 3, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }

        ctx.restore();
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
        this.speed = Math.random() * 1 + 0.5;
        this.angle = Math.random() * Math.PI * 2;
        this.flowerTarget = null;
        this.hasPollen = false;
        this.pollinationCooldown = 0;
    }

    update(flowers, currentTime) {
        if (this.pollinationCooldown > 0) {
            this.pollinationCooldown--;
        }

        if (!this.flowerTarget && this.pollinationCooldown === 0) {
            this.flowerTarget = this.findPollinationTarget(flowers);
        }

        if (this.flowerTarget) {
            const dx = this.flowerTarget.x - this.x;
            const dy = (this.flowerTarget.y - this.flowerTarget.height) - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 20) {
                if (this.flowerTarget.pollinate(currentTime)) {
                    this.pollinationCooldown = 60;
                }
                this.flowerTarget = null;
            } else {
                this.angle = Math.atan2(dy, dx);
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed;
            }
        } else {
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;

            if (Math.random() < 0.02) {
                this.angle += (Math.random() - 0.5) * Math.PI * 0.5;
            }
        }

        if (this.x < 0) this.x = this.canvas.width;
        if (this.x > this.canvas.width) this.x = 0;
        if (this.y < 0) this.y = this.canvas.height;
        if (this.y > this.canvas.height) this.y = 0;
    }

    findPollinationTarget(flowers) {
        return flowers.find(flower => 
            !flower.isPollinated && 
            flower.pollenCount < flower.maxPollen &&
            flower.canBeePollinate
        );
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
}

class Garden {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.flowers = [];
        this.currentColor = '#FF1493';
        this.clouds = [];
        this.bees = [];
        this.score = 0;
        this.lastUpdateTime = Date.now();
        this.init();
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.addEventListener('click', (event) => this.handleClick(event));
        window.addEventListener('resize', () => this.resizeCanvas());
        this.setupColorPalette();
        this.createClouds();
        this.createBees();
        this.animate();
    }

    handleClick(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const clickedFlower = this.flowers.find(flower => {
            const dx = flower.x - x;
            const dy = (flower.y - flower.height) - y;
            return Math.sqrt(dx * dx + dy * dy) < 30;
        });

        if (clickedFlower) {
            if (clickedFlower.pollinate(Date.now())) {
                this.score += 10;
            }
        } else {
            this.addFlower(event);
        }
    }

    createClouds() {
        for (let i = 0; i < 3; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height * 0.3;
            const speed = Math.random() * 0.5 + 0.2;
            this.clouds.push(new Cloud(x, y, speed));
        }
    }

    createBees() {
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

    addFlower(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        this.flowers.push(new Flower(x, y, this.currentColor));
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    animate() {
        const currentTime = Date.now();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBackground();
        
        this.clouds.forEach(cloud => {
            cloud.update();
            if (cloud.x < -50) {
                cloud.x = this.canvas.width + 50;
                cloud.y = Math.random() * this.canvas.height * 0.3;
            }
            cloud.draw(this.ctx);
        });

        this.bees.forEach(bee => {
            bee.canvas = this.canvas;
            bee.update(this.flowers, currentTime);
            bee.draw(this.ctx);
        });

        this.flowers.forEach(flower => {
            flower.update();
            flower.draw(this.ctx);
        });

        this.ctx.fillStyle = 'black';
        this.ctx.font = '20px Arial';
        this.ctx.fillText(`Score: ${this.score}`, 10, 30);

        requestAnimationFrame(() => this.animate());
    }

    drawBackground() {
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#B0E0E6');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#6B8E23';
        this.ctx.fillRect(0, this.canvas.height * 0.8, this.canvas.width, this.canvas.height * 0.2);

        this.drawHill(this.canvas.width * 0.2, this.canvas.height * 0.8, this.canvas.width * 0.3, this.canvas.height * 0.1);
        this.drawHill(this.canvas.width * 0.7, this.canvas.height * 0.8, this.canvas.width * 0.4, this.canvas.height * 0.15);

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
        this.ctx.fill(); // Fixed: changed ctx to this.ctx
    }
}
// Add this new class for game state management
class GameState {
    constructor() {
        this.level = 1;
        this.score = 0;
        this.targetScore = 50;
        this.pollinatedFlowers = 0;
        this.totalFlowers = 0;
        this.achievements = new Set();
        this.timeElapsed = 0;
        this.lastUpdate = Date.now();
    }

    update() {
        const now = Date.now();
        this.timeElapsed += now - this.lastUpdate;
        this.lastUpdate = now;

        // Check for level progression
        if (this.score >= this.targetScore) {
            this.levelUp();
        }

        // Check achievements
        this.checkAchievements();
    }

    levelUp() {
        this.level++;
        this.targetScore = Math.floor(this.targetScore * 1.5);
        // Reward player with more bees on level up
        return true;
    }

    checkAchievements() {
        // First Blood
        if (this.pollinatedFlowers === 1 && !this.achievements.has('firstPollination')) {
            this.achievements.add('firstPollination');
            return 'First Pollination!';
        }
        // Garden Master
        if (this.pollinatedFlowers === 10 && !this.achievements.has('gardenMaster')) {
            this.achievements.add('gardenMaster');
            return 'Garden Master!';
        }
        return null;
    }

    formatTime() {
        const seconds = Math.floor(this.timeElapsed / 1000);
        const minutes = Math.floor(seconds / 60);
        return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
    }
}

// Add this to handle UI notifications
class NotificationManager {
    constructor() {
        this.notifications = [];
        this.container = document.createElement('div');
        this.container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
        `;
        document.body.appendChild(this.container);
    }

    show(message, type = 'success') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            background-color: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 5px;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
        `;
        notification.textContent = message;
        this.container.appendChild(notification);

        // Fade in
        setTimeout(() => notification.style.opacity = '1', 10);

        // Remove after animation
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => this.container.removeChild(notification), 300);
        }, 2000);
    }
}

// Modify the Garden class to include game state
class Garden {
    constructor(canvas) {
        // Existing properties...
        this.gameState = new GameState();
        this.notifications = new NotificationManager();
        this.paused = false;
        this.debug = false;
        
        // Add UI elements
        this.createUI();
    }

    createUI() {
        // Create UI container
        const ui = document.createElement('div');
        ui.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            color: white;
            font-family: Arial, sans-serif;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        `;
        document.body.appendChild(ui);

        // Create pause button
        const pauseBtn = document.createElement('button');
        pauseBtn.textContent = '⏸️';
        pauseBtn.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            padding: 10px;
            font-size: 20px;
            cursor: pointer;
            background: rgba(255,255,255,0.7);
            border: none;
            border-radius: 5px;
        `;
        pauseBtn.onclick = () => this.togglePause();
        document.body.appendChild(pauseBtn);

        this.ui = ui;
    }

    togglePause() {
        this.paused = !this.paused;
        if (this.paused) {
            this.notifications.show('Game Paused');
        } else {
            this.notifications.show('Game Resumed');
        }
    }

    updateUI() {
        this.ui.innerHTML = `
            <div style="background: rgba(0,0,0,0.5); padding: 10px; border-radius: 5px;">
                <div>Level: ${this.gameState.level}</div>
                <div>Score: ${this.gameState.score} / ${this.gameState.targetScore}</div>
                <div>Time: ${this.gameState.formatTime()}</div>
                <div>Flowers: ${this.gameState.pollinatedFlowers} / ${this.gameState.totalFlowers}</div>
            </div>
        `;
    }

    handleClick(event) {
        if (this.paused) return;

        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const clickedFlower = this.flowers.find(flower => {
            const dx = flower.x - x;
            const dy = (flower.y - flower.height) - y;
            return Math.sqrt(dx * dx + dy * dy) < 30;
        });

        if (clickedFlower) {
            if (clickedFlower.pollinate(Date.now())) {
                this.gameState.score += 10;
                this.gameState.pollinatedFlowers++;
                const achievement = this.gameState.checkAchievements();
                if (achievement) {
                    this.notifications.show(achievement);
                }
                if (this.gameState.levelUp()) {
                    this.notifications.show(`Level ${this.gameState.level}! More bees incoming!`);
                    this.createBees(2); // Add 2 more bees on level up
                }
            }
        } else {
            this.addFlower(event);
            this.gameState.totalFlowers++;
        }
    }

    animate() {
        const currentTime = Date.now();
        
        if (!this.paused) {
            this.gameState.update();
            this.updateUI();
            
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.drawBackground();
            
            // Update and draw game elements
            this.clouds.forEach(cloud => {
                cloud.update();
                if (cloud.x < -50) {
                    cloud.x = this.canvas.width + 50;
                    cloud.y = Math.random() * this.canvas.height * 0.3;
                }
                cloud.draw(this.ctx);
            });

            this.bees.forEach(bee => {
                bee.canvas = this.canvas;
                bee.update(this.flowers, currentTime);
                bee.draw(this.ctx);
            });

            this.flowers.forEach(flower => {
                flower.update();
                flower.draw(this.ctx);
            });

            // Debug information
            if (this.debug) {
                this.drawDebugInfo();
            }
        }

        requestAnimationFrame(() => this.animate());
    }

    drawDebugInfo() {
        this.ctx.fillStyle = 'black';
        this.ctx.font = '12px Arial';
        this.ctx.fillText(`FPS: ${Math.round(1000 / (Date.now() - this.lastFrame))}`, 10, 60);
        this.ctx.fillText(`Active Flowers: ${this.flowers.length}`, 10, 80);
        this.ctx.fillText(`Active Bees: ${this.bees.length}`, 10, 100);
        this.lastFrame = Date.now();
    }
}
// Initialize the garden
const canvas = document.getElementById('roseCanvas');
const garden = new Garden(canvas);