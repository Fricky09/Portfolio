
const passwordInput = document.getElementById('password-input');
const toggleBtn = document.getElementById('toggle-password');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');
const charCount = document.getElementById('char-count');
const copyBtn = document.getElementById('copy-btn');

const requirements = {
    length: { regex: /.{8,}/, element: document.getElementById('req-length') },
    uppercase: { regex: /[A-Z]/, element: document.getElementById('req-uppercase') },
    lowercase: { regex: /[a-z]/, element: document.getElementById('req-lowercase') },
    number: { regex: /[0-9]/, element: document.getElementById('req-number') },
    special: { regex: /[!@#$%^&*(),.?":{}|<>]/, element: document.getElementById('req-special') }
};

// Toggle password visibility
toggleBtn.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'Text' : 'Password';
    passwordInput.type = type;
    toggleBtn.querySelector('i').className = type === 'Text' ? 'fas fa-eye-slash' : 'fas fa-eye';
});

// Real-time password checking
passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    charCount.textContent = password.length + ' characters';

    let strength = 0;
    let checks = 0;

    // Check each requirement
    for (const [key, req] of Object.entries(requirements)) {
        const isValid = req.regex.test(password);
        const icon = req.element.querySelector('i');

        if (isValid) {
            req.element.classList.add('met');
            strength += 20;
            checks++;
        } else {
            req.element.classList.remove('met');
        }
    }

    // Update strength bar
    strengthBar.className = 'strength-bar';
    strengthText.className = 'strength-text';

    if (password.length === 0) {
        strengthText.textContent = 'Enter a password';
    } else if (checks <= 2) {
        strengthBar.classList.add('weak');
        strengthText.classList.add('Weak');
        strengthText.textContent = 'Weak';
    } else if (checks <= 3) {
        strengthBar.classList.add('Fair');
        strengthText.classList.add('Fair');
        strengthText.textContent = 'Fair';
    } else if (checks <= 4) {
        strengthBar.classList.add('Good');
        strengthText.classList.add('Good');
        strengthText.textContent = 'Good';
    } else {
        strengthBar.classList.add('Strong');
        strengthText.classList.add('Strong');
        strengthText.textContent = 'Strong 💪';
    }

    // Enable copy button if password exists
    copyBtn.disabled = password.length === 0;
});

// Copy to clipboard
copyBtn.addEventListener('click', async () => {
    if (passwordInput.value) {
        await navigator.clipboard.writeText(passwordInput.value);
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyBtn.classList.add('copied');

        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.classList.remove('copied');
        }, 2000);
    }
});
