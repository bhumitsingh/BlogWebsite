const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

const fontSize = Math.max(12, Math.floor(canvas.width / 50));
const columns = Math.floor(canvas.width / fontSize);
const drops = new Array(columns).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "limegreen";
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(33 + Math.random() * 94);
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);
window.addEventListener("resize", resizeCanvas);

const consoleOutput = document.getElementById("consoleOutput");
const consoleInput = document.getElementById("consoleInput");
const consoleDisplay = document.getElementById("consoleDisplay");

// Commands
const commands = {
    help: "Available commands: help, blogs, projects, clear",
    blogs: `Listing blogs:\n
                <a href='https://example.com/ai' target='_blank'>Blog 1: Understanding AI</a>\n
                <a href='https://example.com/webdev' target='_blank'>Blog 2: The Future of Web Development</a>\n
                <a href='https://example.com/cybersecurity' target='_blank'>Blog 3: Cybersecurity Basics</a>`,
    projects: `Listing projects:\n
                <a href='https://github.com/example/ai-chatbot' target='_blank'>Project 1: AI Chatbot</a>\n
                <a href='https://github.com/example/blockchain-social' target='_blank'>Project 2: Blockchain Social Media</a>\n
                <a href='https://github.com/example/weather-app' target='_blank'>Project 3: Weather App with Flask</a>`,
    clear: ""
};

consoleInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const input = consoleInput.value.trim().toLowerCase();
        consoleInput.value = "";
        if (input === "clear") {
            consoleOutput.innerHTML = "";
            consoleDisplay.innerHTML = "";
        } else {
            consoleOutput.innerHTML += "\n> " + input;
            consoleDisplay.innerHTML = commands[input] || "Command not found. Type 'help' for options.";
        }
    }
});