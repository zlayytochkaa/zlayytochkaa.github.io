document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('user_id');

    fetch(`https://dfa9-31-129-105-188.ngrok-free.app/user/${userId}`)
        .then(response => response.text())  // Use text() to see the raw response
        .then(data => {
            console.log(data);  // Output the raw response to console
            const parsedData = JSON.parse(data);
            const greeting = document.getElementById('greeting');
            const name = parsedData.fullname || parsedData.username;
            greeting.innerText += name;
        })
        .catch(error => console.error('Error:', error));
});
