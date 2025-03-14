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

class GameState {
    constructor() {
        this.level = 1;
        this.score = 0;
        this.lastScore = 0;
        this.targetScore = 50;
        this.pollinatedFlowers = 0;
        this.totalFlowers = 0;
        this.achievements = new Set();
        this.timeElapsed = 0;
        this.lastUpdate = performance.now();

        
    }

    update() {
        const now = performance.now();
        this.timeElapsed += now - this.lastUpdate;
        this.lastUpdate = now;

        if (this.score !== this.lastScore) {
            this.lastScore = this.score;
            if (this.score >= this.targetScore) {
                return this.levelUp();
            }
        }

        return this.checkAchievements();
    }

    levelUp() {
        this.level++;
        this.targetScore = Math.floor(this.targetScore * 1.5);
        return `Level ${this.level}!`;
    }

    checkAchievements() {
        if (this.pollinatedFlowers === 1 && !this.achievements.has('firstPollination')) {
            this.achievements.add('firstPollination');
            return 'First Pollination!';
        }
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

class NotificationManager {
    constructor() {
        this.notifications = [];
        this.container = document.createElement('div');
        this.container.style.cssText = `
            position: fixed;
            top: 70px;
            right: 20px;
            z-index: 1000;
            pointer-events: none;
        `;
        document.body.appendChild(this.container);
    }

    show(message, type = 'success') {
        while (this.notifications.length >= 3) {
            const oldNotification = this.notifications.shift();
            if (oldNotification.parentNode) {
                oldNotification.parentNode.removeChild(oldNotification);
            }
        }

        const notification = document.createElement('div');
        notification.style.cssText = `
            background-color: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 5px;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
            pointer-events: none;
        `;
        notification.textContent = message;
        this.container.appendChild(notification);
        this.notifications.push(notification);

        requestAnimationFrame(() => {
            notification.style.opacity = '1';
        });

        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
                this.notifications = this.notifications.filter(n => n !== notification);
            }, 300);
        }, 2000);
    }
}
class GameUI {
    constructor(garden) {
        this.garden = garden;
        this.container = document.createElement('div');
        this.container.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            padding: 10px;
            background: rgba(0, 0, 0, 0.5);
            color: white;
            border-radius: 5px;
            font-family: Arial, sans-serif;
            z-index: 1000;
            pointer-events: none;
        `;
        document.body.appendChild(this.container);

        this.pauseBtn = document.createElement('button');
        this.pauseBtn.textContent = '⏸️';
        this.pauseBtn.style.cssText = `
            position: fixed;
            top: 60px;
            right: 10px;
            padding: 5px 10px;
            font-size: 16px;
            cursor: pointer;
            background: rgba(255, 255, 255, 0.7);
            border: none;
            border-radius: 5px;
            z-index: 1000;
            pointer-events: auto;
        `;
        this.pauseBtn.onclick = () => this.garden.togglePause();
        document.body.appendChild(this.pauseBtn);
    }

    update() {
        this.container.innerHTML = `
            Level: ${this.garden.gameState.level}<br>
            Score: ${this.garden.gameState.score} / ${this.garden.gameState.targetScore}<br>
            Time: ${this.garden.gameState.formatTime()}<br>
            Flowers: ${this.garden.gameState.pollinatedFlowers} / ${this.garden.gameState.totalFlowers}
            ${this.garden.debug ? `<br>FPS: ${this.garden.fps}` : ''}
        `;
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
        this.canvasWidth = 0;
        this.canvasHeight = 0;
        this.wingAngle = 0;
        this.wingSpeed = 0.5;
    }

    updateCanvasDimensions(width, height) {
        this.canvasWidth = width;
        this.canvasHeight = height;
    }

    update(flowers, currentTime) {
        // Update wing animation
        this.wingAngle += this.wingSpeed;
        
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

        // Improved boundary checking
        if (this.x < 0) this.x = this.canvasWidth;
        if (this.x > this.canvasWidth) this.x = 0;
        if (this.y < 0) this.y = this.canvasHeight;
        if (this.y > this.canvasHeight) this.y = 0;
    }

    findPollinationTarget(flowers) {
        let closestFlower = null;
        let closestDistance = Infinity;

        for (const flower of flowers) {
            if (!flower.isPollinated && flower.pollenCount < flower.maxPollen && flower.canBeePollinate) {
                const dx = flower.x - this.x;
                const dy = (flower.y - flower.height) - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestFlower = flower;
                }
            }
        }

        return closestFlower;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        // Draw wings
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.beginPath();
        ctx.ellipse(-2, 0, 4, 3, Math.sin(this.wingAngle) * 0.5, 0, Math.PI * 2);
        ctx.ellipse(2, 0, 4, 3, -Math.sin(this.wingAngle) * 0.5, 0, Math.PI * 2);
        ctx.fill();

        // Draw body
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.ellipse(0, 0, 5, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Draw stripes
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.rect(-3, -2, 6, 1);
        ctx.rect(-3, 0, 6, 1);
        ctx.rect(-3, 2, 6, 1);
        ctx.fill();

        // Draw eyes
        ctx.beginPath();
        ctx.arc(3, -1, 1, 0, Math.PI * 2);
        ctx.arc(3, 1, 1, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
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
        this.gameState = new GameState();
        this.notifications = new NotificationManager();
        this.ui = new GameUI(this);
        this.paused = false;
        this.debug = false;
        this.resizeTimeout = null;
        this.lastFrame = performance.now();
        this.frameCount = 0;
        this.fps = 0;
        this.welcomeScreen = new WelcomeScreen(this);
        this.gameStarted = false;
    }

    startGame() {
        this.gameStarted = true;
        this.gameState.lastUpdate = performance.now();
        this.notifications.show('Start planting and pollinating!');
    }

    handleClick(event) {
        if (!this.gameStarted || this.paused) return;
        // ... rest of handleClick code ...
    }

    animate() {
        if (!this.gameStarted) {
            this.drawBackground();
            requestAnimationFrame(() => this.animate());
            return;
        }
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
        if (this.paused) return;

        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const clickedFlower = this.flowers.find(flower => {
            const dx = flower.x - x;
            const dy = (flower.y - flower.height) - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const clickRadius = Math.max(30, flower.width * 0.8);
            return distance < clickRadius;
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
            // Only add flower if clicking in valid area (not too high)
            if (y < this.canvas.height * 0.8) {
                this.addFlower(x, y);
                this.gameState.totalFlowers++;
            }
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

    createBees(count = 5) {
        for (let i = 0; i < count; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height * 0.8;
            const bee = new Bee(x, y);
            bee.updateCanvasDimensions(this.canvas.width, this.canvas.height);
            this.bees.push(bee);
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

    addFlower(x, y) {
        this.flowers.push(new Flower(x, y, this.currentColor));
    }

    resizeCanvas() {
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
        
        this.resizeTimeout = setTimeout(() => {
            const oldWidth = this.canvas.width;
            const oldHeight = this.canvas.height;
            
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;

            // Scale positions of existing elements
            const scaleX = this.canvas.width / oldWidth;
            const scaleY = this.canvas.height / oldHeight;

            this.flowers.forEach(flower => {
                flower.x *= scaleX;
                flower.y *= scaleY;
            });

            this.bees.forEach(bee => {
                bee.x *= scaleX;
                bee.y *= scaleY;
                bee.updateCanvasDimensions(this.canvas.width, this.canvas.height);
            });
        }, 250);
    }

    togglePause() {
        this.paused = !this.paused;
        if (this.paused) {
            this.notifications.show('Game Paused');
        } else {
            this.notifications.show('Game Resumed');
        }
    }

    animate() {
        const currentTime = performance.now();
        const delta = currentTime - this.lastFrame;
        
        this.frameCount++;
        if (delta >= 1000) {
            this.fps = Math.round((this.frameCount * 1000) / delta);
            this.frameCount = 0;
            this.lastFrame = currentTime;
        }

        if (!this.paused) {
            const achievement = this.gameState.update();
            if (achievement) {
                this.notifications.show(achievement);
            }
            this.ui.update();
            
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
                bee.update(this.flowers, currentTime);
                bee.draw(this.ctx);
            });

            this.flowers.forEach(flower => {
                flower.update();
                flower.draw(this.ctx);
            });

            if (this.debug) {
                this.drawDebugInfo();
            }
        }

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
        this.ctx.fillStyle = '#8FBC8F';
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

    drawDebugInfo() {
        this.ctx.fillStyle = 'black';
        this.ctx.font = '12px Arial';
        this.ctx.fillText(`FPS: ${this.fps}`, 10, 60);
        this.ctx.fillText(`Active Flowers: ${this.flowers.length}`, 10, 80);
        this.ctx.fillText(`Active Bees: ${this.bees.length}`, 10, 100);
    }
}

class WelcomeScreen {
    constructor(garden) {
        this.garden = garden;
        this.container = document.createElement('div');
        this.container.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 255, 255, 0.9);
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            font-family: Arial, sans-serif;
            max-width: 500px;
            z-index: 2000;
            box-shadow: 0 0 20px rgba(0,0,0,0.2);
        `;

        this.container.innerHTML = `
            <h2>Welcome to the Interactive Rose Garden! 🌹</h2>
            <p>Goals:</p>
            <ul style="text-align: left;">
                <li>Plant roses by clicking anywhere in the garden</li>
                <li>Choose different colors from the palette in the top-left</li>
                <li>Help bees pollinate flowers or click flowers to pollinate them yourself</li>
                <li>Each fully pollinated flower gives you 10 points</li>
                <li>Reach ${this.garden.gameState.targetScore} points to advance to the next level</li>
                <li>Higher levels bring more bees to help you!</li>
            </ul>
            <p>Achievements to unlock:</p>
            <ul style="text-align: left;">
                <li>First Pollination - Pollinate your first flower</li>
                <li>Garden Master - Pollinate 10 flowers</li>
                <li>More achievements as you progress!</li>
            </ul>
            <button id="startGame" style="
                padding: 10px 20px;
                font-size: 16px;
                background: #4CAF50;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                margin-top: 10px;
            ">Start Gardening!</button>
        `;

        document.body.appendChild(this.container);

        document.getElementById('startGame').onclick = () => {
            this.container.style.display = 'none';
            this.garden.startGame();
        };
    }
}
// Initialize the garden
const canvas = document.getElementById('roseCanvas');
const garden = new Garden(canvas);

// Add keyboard controls
document.addEventListener('keydown', (event) => {
    if (event.key === 'd') {
        garden.debug = !garden.debug;
    } else if (event.key === 'p') {
        garden.togglePause();
    }
});