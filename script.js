document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('user_id');

    fetch(`https://dfa9-31-129-105-188.ngrok-free.app/user/${userId}`)
        .then(response => {
            console.log(response);  // Добавьте вывод в консоль для полного ответа
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();  // Используйте text() для отладки
        })
        .then(data => {
            console.log(data);  // Выведите сырые данные в консоль
            try {
                const parsedData = JSON.parse(data);  // Попробуйте разобрать JSON
                const greeting = document.getElementById('greeting');
                const name = parsedData.fullname || parsedData.username;
                greeting.innerText += name;
            } catch (e) {
                console.error('Error parsing JSON:', e);
            }
        })
        .catch(error => console.error('Error:', error));
});