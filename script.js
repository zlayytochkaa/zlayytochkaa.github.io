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
        const profileData = {
            id: urlParams.get('id'),
            profile: profileType,
            first: document.getElementById(`${profileType}-project-name`).value || document.getElementById(`${profileType}-achievements`).value,
            second: document.getElementById(`${profileType}-project-links`).value || document.getElementById(`${profileType}-teams`).value,
            third: document.getElementById(`${profileType}-team-info`).value || document.getElementById(`${profileType}-languages`).value,
            fourth: document.getElementById(`${profileType}-create-events`) ? document.getElementById(`${profileType}-create-events`).checked : document.getElementById(`${profileType}-need-team`).value,
            fifth: document.getElementById(`${profileType}-job-offers`).value
        };

        fetch('https://your-ngrok-url/save_profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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
