// Setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Player (a simple box)
let player = {
    x: 50,
    y: 50,
    size: 30,
    speed: 20
};

// Keyboard Controls
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") player.x += player.speed;
    if (event.key === "ArrowLeft") player.x -= player.speed;
    if (event.key === "ArrowUp") player.y -= player.speed;
    if (event.key === "ArrowDown") player.y += player.speed;
});

// Game Loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear screen
    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.size, player.size); // Draw player
    requestAnimationFrame(gameLoop); // Repeat
}

gameLoop(); // Start the game
