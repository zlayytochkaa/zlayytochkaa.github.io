document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const data = Object.fromEntries(urlParams.entries());

    fetch(`https://7bae-31-129-105-188.ngrok-free.app/user?${urlParams.toString()}`, {
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
            return;
        }
        const name = data.fullname || data.username;
        document.getElementById('greeting').innerText += ` ${name}`;
    })
    .catch(error => console.error('Error:', error));

    document.getElementById('founder-button').addEventListener('click', () => {
        document.getElementById('initial-screen').classList.add('hidden');
        document.getElementById('founder-form').classList.remove('hidden');
    });

    document.getElementById('developer-button').addEventListener('click', () => {
        document.getElementById('initial-screen').classList.add('hidden');
        document.getElementById('developer-form').classList.remove('hidden');
    });

    document.getElementById('back-to-roles').addEventListener('click', (event) => {
        event.preventDefault();
        document.getElementById('founder-form').classList.add('hidden');
        document.getElementById('initial-screen').classList.remove('hidden');
    });

    document.getElementById('back-to-roles-developer').addEventListener('click', (event) => {
        event.preventDefault();
        document.getElementById('developer-form').classList.add('hidden');
        document.getElementById('initial-screen').classList.remove('hidden');
    });
});
