const canvas = document.getElementById(`gameCanvas`);
const ctx = canvas.getContext(`2d`);

let creatures = [
    {x: 100, y: 100, speedX: 2, speedY: 1, color: `red`},
    {x: 200, y: 200, speedX: -1, speedY: 2, color: `blue`}
];

creatures.forEach(creature => {
    creature.x += creature.speedX;
    creature.y += creature.speedY;
});

if (creature.x < 0 || creature.x > canvas.width) creature.speedX *= -1;
if (creature.y < 0 || creature.y > canvas.height) creature.speedY *= -1;

ctx.fillStyle = creature.color;
ctx.beginPath();
ctx.arc(creature.x, creature.y, 10, 0, Math.PI * 2);
ctx.fill();
