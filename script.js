document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const data = Object.fromEntries(urlParams.entries());
    const updateProfileHeader = () => {
        fetch(`https://e8e7-31-129-105-188.ngrok-free.app/user?${urlParams.toString()}`, {
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
            const profileHeader = document.getElementById('profile-header');
            const questionsContainer = document.getElementById('questions-container');
            questionsContainer.innerHTML = '';
    
            if (data.profile === 'faunder') {
                profileHeader.innerText = 'Фаундер';
                questionsContainer.innerHTML = `
                    <h2>Название проекта</h2>
                    <h2>Достижения</h2>
                    <h2>Ссылки на проекты</h2>
                    <h2>Команда, название и участники</h2>
                    <h2>Будете ли вы создавать ивенты?</h2>
                `;
            } else if (data.profile === 'developer') {
                profileHeader.innerText = 'Разработчик';
                questionsContainer.innerHTML = `
                    <h2>Достижения</h2>
                    <h2>В каких командах вы работали</h2>
                    <h2>Языки программирования</h2>
                    <h2>Нуждаетесь ли вы в команде</h2>
                    <h2>Готовы ли вы рассматривать предложения о работе</h2>
                `;
            }
            window.userProfileData = {
                first: data.first,
                second: data.second,
                third: data.third,
                fourth: data.fourth,
                fifth: data.fifth
            };
    
        })
        .catch(error => console.error('Error:', error));
    };
    const initialLoad = () => {
        fetch(`https://e8e7-31-129-105-188.ngrok-free.app/user?${urlParams.toString()}`, {
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
            document.getElementById('greeting').innerText = `Здравствуйте, ${name}`;
            if (data.profile) {
                document.getElementById('main-menu').classList.remove('hidden');
                if (data.profile === 'faunder') {
                    document.getElementById('create-broadcast-button').classList.remove('hidden');
                }
            } else {
                document.getElementById('initial-screen').classList.remove('hidden');
            }
            document.getElementById('loading-screen').classList.add('hidden');
        })
        .catch(error => console.error('Error:', error));
        updateProfileHeader();
    };
    initialLoad();
    const validateFields = (fields) => {
        let valid = true;
        fields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('error');
                valid = false;
            } else {
                field.classList.remove('error');
            }
        });
        return valid;
    };
    const saveProfile = (profileType) => {
        let first, second, third, fourth, fifth;
        let valid = true;
        if (profileType === 'faunder') {
            first = document.getElementById('faunder-project-name');
            second = document.getElementById('faunder-achievements');
            third = document.getElementById('faunder-project-links');
            fourth = document.getElementById('faunder-team-info');
            fifth = document.getElementById('faunder-create-events').checked ? "Да, буду" : "Нет, не буду";
            valid = validateFields([first, second, third, fourth]);
        } else if (profileType === 'developer') {
            first = document.getElementById('developer-achievements');
            second = document.getElementById('developer-teams');
            third = document.getElementById('developer-languages');
            fourth = document.getElementById('developer-need-team');
            fifth = document.getElementById('developer-job-offers');
            valid = validateFields([first, second, third, fourth, fifth]);
        }
        if (!valid) {
            return;
        }
        const profileData = {
            id: urlParams.get('id'),
            profile: profileType,
            first: first.value,
            second: second.value,
            third: third.value,
            fourth: fourth.value,
            fifth: fifth.value
        };
        fetch('https://e8e7-31-129-105-188.ngrok-free.app/save_profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            },
            body: JSON.stringify(profileData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
                return;
            }
            document.getElementById('founder-form').classList.add('hidden');
            document.getElementById('developer-form').classList.add('hidden');
            document.getElementById('main-menu').classList.remove('hidden');
            if (profileType === 'faunder') {
                document.getElementById('create-broadcast-button').classList.remove('hidden');
            }
        })
        .catch(error => console.error('Error:', error));
        updateProfileHeader();
    };
    document.getElementById('founder-button').addEventListener('click', () => {
        document.getElementById('initial-screen').classList.add('hidden');
        document.getElementById('founder-form').classList.remove('hidden');
    });
    document.getElementById('developer-button').addEventListener('click', () => {
        document.getElementById('initial-screen').classList.add('hidden');
        document.getElementById('developer-form').classList.remove('hidden');
    });
    document.getElementById('faunder-confirm-button').addEventListener('click', () => {
        saveProfile('faunder');
    });
    document.getElementById('developer-confirm-button').addEventListener('click', () => {
        saveProfile('developer');
    });
    document.getElementById('back-to-roles').addEventListener('click', () => {
        document.getElementById('founder-form').classList.add('hidden');
        document.getElementById('initial-screen').classList.remove('hidden');
    });
    document.getElementById('back-to-roles-developer').addEventListener('click', () => {
        document.getElementById('developer-form').classList.add('hidden');
        document.getElementById('initial-screen').classList.remove('hidden');
    });
    document.getElementById('open-profile-button').addEventListener('click', () => {
        document.getElementById('main-menu').classList.add('hidden');
        document.getElementById('profile-menu').classList.remove('hidden');
    });
    document.getElementById('comeback-button').addEventListener('click', () => {
        document.getElementById('main-menu').classList.remove('hidden');
        document.getElementById('profile-menu').classList.add('hidden');
    });
});