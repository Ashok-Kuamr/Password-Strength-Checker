// Password visibility toggle
const togglePassword = document.getElementById('togglePassword');
const password = document.getElementById('password');

togglePassword.addEventListener('click', function() {
    // Toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    
    // Toggle the eye icon
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

// Password strength checker
password.addEventListener('input', checkPasswordStrength);

function checkPasswordStrength() {
    const passwordValue = password.value;
    const result = passwordStrength(passwordValue);
    
    const strengthResult = document.getElementById('strength-result');
    const suggestionsContainer = document.getElementById('suggestions-container');
    const suggestionsList = document.getElementById('suggestions-list');
    
    // Clear previous results
    strengthResult.className = 'hidden';
    suggestionsContainer.className = 'suggestions hidden';
    suggestionsList.innerHTML = '';
    
    if (passwordValue.length === 0) return;
    
    // Display strength
    strengthResult.textContent = `Password Strength: ${result.strength}`;
    strengthResult.classList.remove('hidden');
    strengthResult.classList.add(result.strength.toLowerCase());
    
    // Display suggestions if any
    if (result.suggestions.length > 0) {
        result.suggestions.forEach(suggestion => {
            const li = document.createElement('li');
            li.textContent = suggestion;
            suggestionsList.appendChild(li);
        });
        suggestionsContainer.classList.remove('hidden');
    }
}

function passwordStrength(password) {
    let score = 0;
    const suggestions = [];
    
    // Check password length
    if (password.length >= 8) {
        score++;
    } else {
        suggestions.push("Password should be at least 8 characters long.");
    }
    
    // Check uppercase letter
    if (/[A-Z]/.test(password)) {
        score++;
    } else {
        suggestions.push("Password should contain at least one uppercase letter.");
    }
    
    // Check lowercase letter
    if (/[a-z]/.test(password)) {
        score++;
    } else {
        suggestions.push("Password should contain at least one lowercase letter.");
    }
    
    // Check digits
    if (/[0-9]/.test(password)) {
        score++;
    } else {
        suggestions.push("Password should contain at least one digit.");
    }
    
    // Check symbols
    if (/[~!@#$%^&*(),.?":{}|<>]/.test(password)) {
        score++;
    } else {
        suggestions.push("Password should contain at least one special character.");
    }
    
    // Determine password strength
    let strength;
    if (score === 5) {
        strength = "Strong";
    } else if (score === 4) {
        strength = "Medium";
    } else {
        strength = "Weak";
    }
    
    return { strength, suggestions };
}