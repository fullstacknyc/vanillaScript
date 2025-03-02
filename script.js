const greeting = 'Hello, world!';

greeting.attributes = 'id="greeting"';
greeting.style = `align-items: center; margin: 0 auto; text-align: center;`;
document.write(greeting);

document.body.appendChild(greeting);