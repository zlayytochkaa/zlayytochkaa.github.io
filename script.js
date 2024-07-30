document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('user_id');

    fetch(`https://dfa9-31-129-105-188.ngrok-free.app/user/${userId}`, {
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    })
    .then(response => {
        console.log(response); 
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        const greeting = document.getElementById('greeting');
        const name = data.fullname || data.username;
        greeting.innerText += ` ${name}`;
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
