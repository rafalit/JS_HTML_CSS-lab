document.addEventListener("DOMContentLoaded", function() {
    const newPasswordInput = document.getElementById("new-password");
    const repeatPasswordInput = document.getElementById("repeat-password");
    const eyeIcon = document.getElementById("eye-icon");
    const eyeIconRepeat = document.getElementById("eye-icon-repeat");
    const passwordRequirements = {
        minLength: document.getElementById("min-length"),
        specialChar: document.getElementById("special-char"),
        capitalLetter: document.getElementById("capital-letter"),
        digit: document.getElementById("digit")
    };
    const errorMessage = document.getElementById("error-message");

    // Function to toggle password visibility
    eyeIcon.addEventListener("click", () => togglePasswordVisibility(newPasswordInput, eyeIcon));
    eyeIconRepeat.addEventListener("click", () => togglePasswordVisibility(repeatPasswordInput, eyeIconRepeat));

    // Event listeners for password input validation
    newPasswordInput.addEventListener("input", validatePasswordStrength);
    newPasswordInput.addEventListener("input", handleRepeatPassword);  // Handle repeat password when new password changes
    repeatPasswordInput.addEventListener("input", checkPasswordMatch);

    // Function to toggle visibility
    function togglePasswordVisibility(input, icon) {
        const type = input.type === "password" ? "text" : "password";
        input.type = type;

        // Change the icon to crossed eye for visible password, and normal eye for hidden password
        if (type === "password") {
            icon.innerHTML = "&#128065;";  // Normal eye (hidden)
        } else {
            icon.innerHTML = "&#128583;";  // Crossed eye (visible)
        }
    }

    // Function to validate password strength
    function validatePasswordStrength() {
        const password = newPasswordInput.value;

        // Reset the requirement states
        Object.values(passwordRequirements).forEach(item => {
            item.classList.remove("green", "completed");
        });

        // Check password length
        if (password.length >= 8) {
            passwordRequirements.minLength.classList.add("green", "completed");
        }

        // Check for special character
        if (/[^a-zA-Z0-9]/.test(password)) {
            passwordRequirements.specialChar.classList.add("green", "completed");
        }

        // Check for uppercase letter
        if (/[A-Z]/.test(password)) {
            passwordRequirements.capitalLetter.classList.add("green", "completed");
        }

        // Check for digit
        if (/\d/.test(password)) {
            passwordRequirements.digit.classList.add("green", "completed");
        }
    }

    // Function to check if password meets all the requirements
    function isValidPassword(password) {
        return (
            password.length >= 8 &&
            /[^a-zA-Z0-9]/.test(password) &&
            /[A-Z]/.test(password) &&
            /\d/.test(password)
        );
    }

    // Function to check password match
    function checkPasswordMatch() {
        // If either of the password fields is empty, don't show the error message
        if (!newPasswordInput.value || !repeatPasswordInput.value) {
            errorMessage.style.display = "none";
            return;
        }

        if (newPasswordInput.value !== repeatPasswordInput.value) {
            errorMessage.style.display = "block";
        } else {
            errorMessage.style.display = "none";
        }
    }

    // Function to handle the repeat password field
    function handleRepeatPassword() {
        const password = newPasswordInput.value;

        // Check if New Password meets the requirements
        if (isValidPassword(password)) {
            repeatPasswordInput.disabled = false;

            // Don't reset Repeat Password if it's already filled and New Password is valid
            if (repeatPasswordInput.value !== "") {
                return;  // Keep the value in Repeat Password
            }

        } else {
            // Reset Repeat Password if New Password is invalid
            repeatPasswordInput.value = "";  // Clear Repeat Password
            repeatPasswordInput.type = "password";  // Set back to password (****)
            repeatPasswordInput.disabled = true;  // Disable Repeat Password field
            errorMessage.style.display = "none";

            // Set the eye icon to normal (eye) when New Password is cleared or invalid
            eyeIcon.innerHTML = "&#128065;";  // Normal eye (hidden)
        }

        // If Repeat Password is cleared, set the icon back to normal eye (hidden)
        if (repeatPasswordInput.value === "") {
            eyeIconRepeat.innerHTML = "&#128065;";  // Normal eye (hidden)
        }
    }

    // Ensure the icon for New Password is set to normal eye (hidden) when it's cleared
    newPasswordInput.addEventListener("input", function() {
        if (newPasswordInput.value === "") {
            eyeIcon.innerHTML = "&#128065;";  // Normal eye (hidden)
        }
    });

    // Reset the eye icon if the Repeat Password is cleared or disabled
    repeatPasswordInput.addEventListener("input", function() {
        if (repeatPasswordInput.value === "") {
            eyeIconRepeat.innerHTML = "&#128065;";  // Normal eye (hidden)
        }
    });
});
