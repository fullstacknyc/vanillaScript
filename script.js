document.head.innerHTML += `
    <title>Stop Scrolling</title>
    <style>
        body { height: 500vh; background: black; color: white; margin: 0; }
        #myDiv {
            position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
            text-align: center; font-size: 50px; font-weight: bold;
            font-family: Segoe UI, sans-serif; padding: 20px;
        }
        .content { opacity: 0; transition: opacity 0.5s; position: absolute; top: 50%;  50%; transform: translate(-50%, -50%); }
        .content.active { opacity: 1; }
    </style>
`;

document.body.innerHTML += `
    <div id="myDiv">
        ${['time', 'date', 'ip', 'location', 'dimensions'].map(id => `<div class="content" id="${id}Div"></div>`).join('')}
    </div>
`;

const updateElement = (id, text) => document.getElementById(id + 'Div').textContent = text;

const updateInfo = async () => {
    const now = new Date();
    updateElement('time', `Time: ${now.toLocaleTimeString()}`);
    updateElement('date', `Date: ${now.toLocaleDateString()}`);
    updateElement('dimensions', `Browser: ${window.innerWidth}x${window.innerHeight}`);

    try {
        const ip = await (await fetch('https://api.ipify.org?format=json')).json();
        updateElement('ip', `IP: ${ip.ip}`);
        const loc = await (await fetch('https://ipapi.co/json/')).json();
        updateElement('location', `Location: ${loc.city}, ${loc.region}, ${loc.country_name}`);
    } catch (e) {
        console.error('Failed to fetch IP or location');
    }
};

setInterval(updateInfo, 1000);
updateInfo();

window.onscroll = () => {
    const scrollPosition = window.scrollY;
    document.querySelectorAll('.content').forEach((content, i) => {
        content.classList.toggle('active', scrollPosition >= window.innerHeight * i * 0.8 && scrollPosition < window.innerHeight * (i + 1) * 0.8);
    });
};