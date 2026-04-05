// login.js

document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');
    const loginForm = document.getElementById('loginForm');
    const imageUpload = document.getElementById('imageUpload');
    const profileImage = document.getElementById('profileImage');
    const checkboxes = document.querySelectorAll('input[name="colorCheckbox"]');

    // **Crucial: Call the function from shared.js to initialize color listeners**
    if (typeof attachColorSelectionListeners === 'function') {
        attachColorSelectionListeners();
    } else {
        console.error("attachColorSelectionListeners is not available. Ensure shared.js is loaded before login.js.");
    }


    // Set initial focus to the username textbox
    if (usernameInput) {
        usernameInput.focus();
    }

    // Handle Enter keypress for username textbox (move focus to password)
    if (usernameInput) {
        usernameInput.addEventListener('keydown', (event) => {
            try {
                if (event.key === 'Enter') {
                    event.preventDefault(); // Prevent default form submission
                    passwordInput.focus();
                }
            } catch (error) {
                console.error('Error handling Enter key in username:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }

    // Handle Enter keypress for password textbox (move focus to the first checkbox or button)
    if (passwordInput) {
        passwordInput.addEventListener('keydown', (event) => {
            try {
                if (event.key === 'Enter') {
                    event.preventDefault();
                   
                        loginBtn.focus(); // Focus the login button
                   
                }
            } catch (error) {
                console.error('Error handling Enter key in password:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }

    // Handle Enter keypress for checkboxes (move focus to the next checkbox or button)
    checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('keydown', (event) => {
            try {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    // Simulate a click on the checkbox to toggle its state
                    checkbox.click(); // This will trigger the 'change' event listener in shared.js

                    // Move focus to the next element
                    if (index < checkboxes.length - 1) {
                        checkboxes[index + 1].focus(); // Move to the next checkbox
                    } else {
                        loginBtn.focus(); // Move to the login button
                    }
                }
            } catch (error) {
                console.error('Error handling Enter key in checkbox:', error);
            }
        });
    });

    // Handle Enter keypress for login button (submit the form)
    if (loginBtn) {
        loginBtn.addEventListener('keydown', (event) => {
            try {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    loginBtn.click(); // Simulate a click
                    // Form submission is handled by the 'submit' listener
                }
            } catch (error) {
                console.error('Error handling Enter key on login button:', error);
            }
        });
    }

    // Handle form submission
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            try {
                const username = usernameInput.value.trim();
                const password = passwordInput.value.trim();
                let selectedColor = localStorage.getItem('selectedColor') || 'blue'; // Use stored color or default

                if (username === '' || password === '') {
                    alert('Please enter both username and password.');
                    return;
                }

                alert(`Login successful! Username: ${username}, Password: ${password}, Color: ${selectedColor}`);
                const encodedColor = encodeURIComponent(selectedColor);
                window.location.href = `cre_company.html?color=${encodedColor}`;

            } catch (error) {
                console.error('Error during form submission:', error);
                alert('An error occurred during login. Please try again.');
            }
        });
    }

    // Handle image upload and display preview
    if (imageUpload) {
        imageUpload.addEventListener('change', (event) => {
            const file = event.target.files[0]; // Get the first file from the FileList
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    profileImage.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // The checkbox selection logic for mutually exclusive selection is now in shared.js
    // and handled by attachColorSelectionListeners().
    // Remove the redundant loop here:
    /*
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            try {
                checkboxes.forEach(otherCheckbox => {
                    if (otherCheckbox !== checkbox) {
                        otherCheckbox.checked = false;
                    }
                });
            } catch (error) {
                console.error('Error handling checkbox change:', error);
            }
        });
    });
    */
});
