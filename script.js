document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('user_id');

    fetch(`http://192.168.0.226:5000/user/${userId}`)
        .then(response => response.json())
        .then(data => {
            const greeting = document.getElementById('greeting');
            const name = data.fullname || data.username;
            greeting.innerText += name;
        })
        .catch(error => console.error('Error:', error));
});