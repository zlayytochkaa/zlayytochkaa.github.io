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
});
