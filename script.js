document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');
    const loginForm = document.getElementById('loginForm');
    const imageUpload = document.getElementById('imageUpload');
    const profileImage = document.getElementById('profileImage');
    const checkboxes = document.querySelectorAll('input[name="colorCheckbox"]');


    // Get references to elements whose styles will be changed
    const body = document.body;
    const loginContainer = document.querySelector('.login-container');
    const tableContainer = document.querySelector('.table-container');
    const formControls = document.querySelectorAll('.form-control');
    const imageBox = document.querySelector('.image-box');
    const loginButton = document.getElementById('loginBtn');

    // Set initial focus to the username textbox
    if (usernameInput) {
        usernameInput.focus();
    }

    // Function to update element colors based on the selected color
    const updateElementColors = (selectedColor) => {
        try {
            // Define color schemes for each checkbox color
            const colorSchemes = {
                black: {
                    bodyBg: 'black',
                    loginContainerBg: '#333',
                    tableContainerBg: '#555',
                    formControlBg: '#666',
                    formControlColor: 'white',
                    imageBoxBorder: 'white',
                    placeholderColor: '#aaa',
                    buttonBg: '#444',
                    buttonHoverBg: 'grey'
                },
                blue: {
                    bodyBg: 'darkblue',
                    loginContainerBg: '#1f3a93', // Slightly lighter dark blue
                    tableContainerBg: '#2a52be', // Medium blue
                    formControlBg: 'white',
                    formControlColor: 'RoyalBlue',
                    imageBoxBorder: 'RoyalBlue',
                    placeholderColor: 'lightgrey',
                    buttonBg: 'RoyalBlue',
                    buttonHoverBg: 'darkblue'
                },
                red: {
                    bodyBg: 'maroon',
                    loginContainerBg: '#8B0000',
                    tableContainerBg: '#A52A2A',
                    formControlBg: 'grey',
                    formControlColor: 'darkred',
                    imageBoxBorder: 'darkred',
                    placeholderColor: '#ccc',
                    buttonBg: 'darkred',
                    buttonHoverBg: 'maroon'
                },
                brown: {
                    bodyBg: '#5e4334',
                    loginContainerBg: '#6d4c41',
                    tableContainerBg: '#795548',
                    formControlBg: 'light grey',
                    formControlColor: '#8d6e63',
                    imageBoxBorder: '#8d6e63',
                    placeholderColor: '#c5b7b0',
                    buttonBg: '#8d6e63',
                    buttonHoverBg: '#5e4334'
                },
                pink: {
                    bodyBg: '#cc6699',
                    loginContainerBg: '#de89b0',
                    tableContainerBg: '#efacc8',
                    formControlBg: 'lightgrey',
                    formControlColor: '#e05391',
                    imageBoxBorder: '#e05391',
                    placeholderColor: '#f5dbe7',
                    buttonBg: '#e05391',
                    buttonHoverBg: '#cc6699'
                }
            };

            const colors = colorSchemes[selectedColor];

            if (colors) {
                body.style.backgroundColor = colors.bodyBg;
                loginContainer.style.backgroundColor = colors.loginContainerBg;
                tableContainer.style.backgroundColor = colors.tableContainerBg;
                formControls.forEach(control => {
                    control.style.backgroundColor = colors.formControlBg;
                    control.style.color = colors.formControlColor;
                    control.style.setProperty('--placeholder-color', colors.placeholderColor); // For placeholder
                });
                imageBox.style.borderColor = colors.imageBoxBorder; // Assuming border is on the image box
                loginButton.style.backgroundColor = colors.buttonBg;
                loginButton.style.borderColor = colors.buttonBg; // Set border color as well
                // Change hover effect for the button
                // This requires adding/removing classes or modifying CSS rules,
                // Direct inline style for :hover is not possible with JS
                // We'll revert to CSS classes for this.
                // We will add a class to the button to handle hover styles
            }
        } catch (error) {
                console.error('Error updating element colors:', error);
        }
    };

    // Initialize element colors based on default checkbox (blue)
    updateElementColors('blue');

    // Handle Enter keypress for username textbox (move focus to password)
    if (usernameInput) {
        usernameInput.addEventListener('keydown', (event) => {
            try {
                if (event.key === 'Enter') {
                    event.preventDefault(); 
                    passwordInput.focus(); 
                }
            } catch (error) {
                    console.error('Error handling Enter key in username:', error);
                    alert('An error occurred. Please try again.');
            }
        });
    }

    // Handle Enter keypress for password textbox to button
    if (passwordInput) {
        passwordInput.addEventListener('keydown', (event) => {
            try {
                if (event.key === 'Enter') {
                    event.preventDefault(); 
                    loginBtn.click(); 
                }
            } catch (error) {
                    console.error('Error handling Enter key in password:', error);
                    alert('An error occurred. Please try again.');
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
                let selectedColor = 'blue'; 

                checkboxes.forEach(checkbox => {
                    if (checkbox.checked) {
                        selectedColor = checkbox.value;
                    }
                });

                if (username === '' || password === '') {
                    alert('Please enter both username and password.');
                    return;
                }

                alert(`Login successful! Username: ${username}, Password: ${password}, Color: ${selectedColor}`);
		const encodedColor = encodeURIComponent(selectedColor);
                window.location.href = `cre_company.html?color=${encodedColor}`; // Using template literals for a clean URL

            } catch (error) {
                    console.error('Error during form submission:', error);
                    alert('An error occurred during login. Please try again.');
            }
        });
    }

    // Handle image upload and display preview
    if (imageUpload) {
        imageUpload.addEventListener('change', (event) => {
            const file = event.target.files;
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    profileImage.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Handle checkbox selection (only one can be checked) and update element colors
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            try {
                checkboxes.forEach(otherCheckbox => {
                    if (otherCheckbox !== checkbox) {
                        otherCheckbox.checked = false;
                    }
                });
                if (checkbox.checked) {
                    updateElementColors(checkbox.value);
                } else {
                    const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
                    if (checkedCount === 0) {
                         updateElementColors('blue'); // Revert to default blue if none are checked
                    }
                }
            } catch (error) {
                    console.error('Error handling checkbox change:', error);
                    alert('An error occurred while changing color. Please try again.');
            }
        });
    });
});
