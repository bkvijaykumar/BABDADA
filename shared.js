// shared.js

/**
 * Updates the styles of various elements on the page based on a selected color scheme.
 * This function should be available globally or exported if using modules.
 * @param {string} selectedColor - The key for the selected color scheme (e.g., 'blue', 'red').
 */
const updateElementColors = (selectedColor) => {
    try {
        const body = document.body;
        const loginContainer = document.querySelector('.login-container');
        const tableContainer = document.querySelector('.table-container');
        const formControls = document.querySelectorAll('.form-control');
        const imageBox = document.querySelector('.image-box');
        const loginButton = document.getElementById('loginBtn'); // Assuming this button exists on pages where colors are updated

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
                formControlBg: '#f2f2f2', // Changed from 'light grey' for consistency
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
                formControlBg: '#f2f2f2', // Changed from 'lightgrey' for consistency
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
            if (loginContainer) loginContainer.style.backgroundColor = colors.loginContainerBg;
            if (tableContainer) tableContainer.style.backgroundColor = colors.tableContainerBg;
            
            formControls.forEach(control => {
                control.style.backgroundColor = colors.formControlBg;
                control.style.color = colors.formControlColor;
                // For placeholder color, it's better to use CSS variables
                control.style.setProperty('--placeholder-color', colors.placeholderColor);
            });
            if (imageBox) imageBox.style.borderColor = colors.imageBoxBorder;
            
            // Handle button color and hover class
            if (loginButton) {
                loginButton.style.backgroundColor = colors.buttonBg;
                loginButton.style.borderColor = colors.buttonBg; // Set border color as well
                // Remove existing color classes and add the new one for hover effects
                loginButton.classList.remove('black-btn', 'blue-btn', 'red-btn', 'brown-btn', 'pink-btn');
                loginButton.classList.add(`${selectedColor}-btn`);
            }
        }
    } catch (error) {
        console.error('Error updating element colors:', error);
    }
};

/**
 * Attaches event listeners to color checkboxes to update styles and manage selection.
 * Also initializes the color based on localStorage or default.
 */
function attachColorSelectionListeners() {
    const checkboxes = document.querySelectorAll('input[name="colorCheckbox"]');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            try {
                // Ensure only one checkbox is checked at a time
                checkboxes.forEach(otherCheckbox => {
                    if (otherCheckbox !== this) {
                        otherCheckbox.checked = false;
                    }
                });

                if (this.checked) {
                    updateElementColors(this.value);
                    // Store the selected color in localStorage to persist across pages
                    localStorage.setItem('selectedColor', this.value);
                } else {
                    // If the last checked box is unchecked, revert to default or handle as needed
                    // For now, if a box is unchecked and it was the only one, we might re-check the default
                    // Or, simply leave no color selected, which is less ideal for a color picker.
                    // A better UI might be radio buttons if only one selection is allowed.
                }
            } catch (error) {
                console.error('Error handling checkbox change:', error);
            }
        });
    });

    // Apply color from localStorage on page load, if available
    const storedColor = localStorage.getItem('selectedColor');
    if (storedColor) {
        updateElementColors(storedColor);
        // Also check the corresponding checkbox
        const storedCheckbox = document.querySelector(`input[name="colorCheckbox"][value="${storedColor}"]`);
        if (storedCheckbox) {
            storedCheckbox.checked = true;
            // Uncheck other checkboxes if any
            checkboxes.forEach(otherCheckbox => {
                if (otherCheckbox !== storedCheckbox) {
                    otherCheckbox.checked = false;
                }
            });
        }
    } else {
        // If no color is stored, and no checkbox is checked by default in HTML,
        // you might want to default to 'blue' or another scheme.
        // Assuming your HTML has one checked by default (e.g., blue),
        // the initial updateElementColors('blue') will handle it.
    }
}

// Initial call to update colors based on the default or localStorage when shared.js loads
document.addEventListener('DOMContentLoaded', () => {
    // This call is redundant if attachColorSelectionListeners() also initializes,
    // but useful if updateElementColors is called standalone.
    // We'll keep the one in attachColorSelectionListeners() as it's more comprehensive.
});

