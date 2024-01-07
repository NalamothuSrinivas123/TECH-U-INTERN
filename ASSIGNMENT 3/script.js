document.addEventListener("DOMContentLoaded", function () {
    // Common elements
    const passwordInput = document.getElementById("password");
    const strengthText = document.getElementById("strengthText");

    // Add an event listener for password input to check strength dynamically
    if (passwordInput) {
        passwordInput.addEventListener("input", function () {
            const password = passwordInput.value;
            updatePasswordStrength(password);
        });
    }

    // Login form handling
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            // Call login validation function
            if (validateLogin(username, password)) {
                // Perform login action if validation succeeds
                alert("Login successful!");
            }
        });
    }

    // Signup form handling
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;
            const termsCheckbox = document.getElementById("termsCheckbox");

            // Call signup validation function
            if (validateSignup(username, email, password, confirmPassword, termsCheckbox)) {
                // Perform signup action if validation succeeds
                alert("Signup successful!");
            }
        });
    }

    // Validation functions
    function validateLogin(username, password) {
        if (username.trim() === "" || password.trim() === "") {
            displayError("loginForm", "Please enter both username/email and password.");
            return false;
        }

        // Clear any existing errors
        clearErrors("loginForm");
        return true;
    }

    function validateSignup(username, email, password, confirmPassword, termsCheckbox) {
        if (username.trim() === "" || email.trim() === "" || password.trim() === "" || confirmPassword.trim() === "") {
            displayError("signupForm", "Please fill in all fields.");
            return false;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            displayError("signupForm", "Invalid email format.");
            return false;
        }

        // Validate password criteria
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            displayError("signupForm", "Password must be at least 8 characters and include both letters and numbers.");
            return false;
        }

        // Confirm password and confirmPassword match
        if (password !== confirmPassword) {
            displayError("signupForm", "Passwords do not match.");
            return false;
        }

        // Validate the "Terms and Conditions" checkbox
        if (!termsCheckbox.checked) {
            displayError("signupForm", "Please agree to the Terms and Conditions.");
            return false;
        }

        // Clear any existing errors
        clearErrors("signupForm");
        return true;
    }

    function displayError(formId, errorMessage) {
        // Display error messages next to the relevant form fields
        const errorDiv = document.createElement("div");
        errorDiv.className = "error";
        errorDiv.textContent = errorMessage;

        document.getElementById(formId).appendChild(errorDiv);
    }

    function clearErrors(formId) {
        // Clear any existing error messages
        const errors = document.getElementById(formId).getElementsByClassName("error");
        Array.from(errors).forEach(function (error) {
            error.remove();
        });
    }

    function updatePasswordStrength(password) {
        const strength = calculatePasswordStrength(password);
        strengthText.textContent = getStrengthText(strength);
    }

    function calculatePasswordStrength(password) {
        const lengthStrength = Math.min(password.length / 8, 1);
        const hasLetters = /[a-zA-Z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const strength = (lengthStrength + hasLetters + hasNumbers) / 3;

        return strength;
    }

    function getStrengthText(strength) {
        if (strength === 0) {
            return "Very Weak";
        } else if (strength <= 0.4) {
            return "Weak";
        } else if (strength <= 0.7) {
            return "Moderate";
        } else {
            return "Strong";
        }
    }
});
