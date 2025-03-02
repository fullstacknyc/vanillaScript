const greeting = 'Hello, world!';

greeting.attributes = 'id="greeting"';
body.style = `align-items: center; font-family: Segoe UI, sans-serif; display: flex; height: 100vh; justify-content: center; margin: 0;`;
document.write(greeting);

document.body.appendChild(greeting);