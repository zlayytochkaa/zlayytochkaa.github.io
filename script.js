document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const data = Object.fromEntries(urlParams.entries());

    fetch(`https://4cc5-31-129-105-188.ngrok-free.app/user?${urlParams.toString()}`, {
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

    const saveProfile = (profileType) => {
        let first, second, third, fourth, fifth;

        if (profileType === 'faunder') {
            first = document.getElementById('faunder-project-name').value;
            second = document.getElementById('faunder-achievements').value;
            third = document.getElementById('faunder-project-links').value;
            fourth = document.getElementById('faunder-team-info').value;
            fifth = document.getElementById('faunder-create-events').checked ? "Да, буду" : "Нет";
        } else if (profileType === 'developer') {
            first = document.getElementById('developer-achievements').value;
            second = document.getElementById('developer-teams').value;
            third = document.getElementById('developer-languages').value;
            fourth = document.getElementById('developer-need-team').value;
            fifth = document.getElementById('developer-job-offers').value;
        }

        const profileData = {
            id: urlParams.get('id'),
            profile: profileType,
            first: first,
            second: second,
            third: third,
            fourth: fourth,
            fifth: fifth
        };

        fetch('https://4cc5-31-129-105-188.ngrok-free.app/save_profile', {
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
        })
        .catch(error => console.error('Error:', error));
    };

    document.getElementById('faunder-confirm-button').addEventListener('click', () => {
        saveProfile('faunder');
    });

    document.getElementById('developer-confirm-button').addEventListener('click', () => {
        saveProfile('developer');
    });
});
