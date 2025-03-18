const colorBox = document.getElementById("colorBox");
const colorCode = document.getElementById("colorCode");
const generateBtn = document.getElementById("generateBtn");

// Function to generate random hex color
function getRandomColor() {
    let color = "#" + Math.floor(Math.random()*16777215).toString(16);
    return color;
}

// Function to apply color
function changeColor() {
    let newColor = getRandomColor();
    colorBox.style.backgroundColor = newColor;
    colorCode.innerText = newColor;
}

// Copy color code when clicked
colorBox.addEventListener("click", () => {
    navigator.clipboard.writeText(colorCode.innerText);
    alert("Copied: " + colorCode.innerText);
});

// Change color on button click
generateBtn.addEventListener("click", changeColor);
