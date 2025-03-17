// Setup the canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Array to hold creatures
let creatures = [
    { x: 100, y: 100, speedX: 2, speedY: 1, color: "red" },
    { x: 200, y: 200, speedX: -1, speedY: 2, color: "blue" }
];

// Function to update and draw creatures
function update() {
    // Clear the canvas (reset it for the next frame)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Loop through all creatures
    creatures.forEach(creature => {
        // Move the creature by adding speed to its position
        creature.x += creature.speedX;
        creature.y += creature.speedY;

        // Check if the creature hits the walls and bounce it back
        if (creature.x < 0 || creature.x > canvas.width) creature.speedX *= -1;
        if (creature.y < 0 || creature.y > canvas.height) creature.speedY *= -1;

        // Draw the creature as a circle
        ctx.fillStyle = creature.color;    // Set color
        ctx.beginPath();                   // Start drawing
        ctx.arc(creature.x, creature.y, 10, 0, Math.PI * 2); // Circle at (x, y)
        ctx.fill();                        // Fill the circle with the color
    });

    // Keep the animation going (next frame)
    requestAnimationFrame(update);
}

// Start the game loop
update();
