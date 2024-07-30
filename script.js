document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('user_id');

    fetch(`https://dfa9-31-129-105-188.ngrok-free.app/user/${userId}`)
        .then(response => {
            console.log(response);  // Отладка: выводим полный ответ
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();  // Отладка: используем text() для проверки
        })
        .then(data => {
            console.log(data);  // Отладка: выводим сырые данные
            try {
                const parsedData = JSON.parse(data);  // Пробуем парсить JSON
                const greeting = document.getElementById('greeting');
                const name = parsedData.fullname || parsedData.username;
                greeting.innerText += name;
            } catch (e) {
                console.error('Error parsing JSON:', e);
            }
        })
        .catch(error => console.error('Error:', error));
});
