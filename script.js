function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

document.addEventListener("DOMContentLoaded", () => {
    const userId = getQueryParam('user_id');
    if (userId) {
        document.getElementById('user-id').innerText += userId;
    } else {
        document.getElementById('user-id').innerText = "user_id не найден";
    }
});
