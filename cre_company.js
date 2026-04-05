// cre_company.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Color Scheme Application ---
    const applyColorScheme = () => {
        try {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            let selectedColor = urlParams.get('color'); // Get color from URL

            // Fallback: If no color in URL, check localStorage for a stored preference
            if (!selectedColor) {
                selectedColor = localStorage.getItem('creCompanyColor'); 
            }
            // Final fallback: Default to 'blue'
            if (!selectedColor) {
                selectedColor = 'blue';
            }

            // Ensure updateElementColors is available from shared.js
            if (typeof updateElementColors === 'function') {
                updateElementColors(selectedColor);
                // Also store the color in localStorage for this page to persist selection
                localStorage.setItem('creCompanyColor', selectedColor); 
            } else {
                console.error("updateElementColors function is not available. Ensure shared.js is loaded before cre_company.js.");
            }

            // You can also add a class to the body if you want to apply more complex
            // CSS rules based on the selected color using classes.
            // For example, if you have different table styles per color.
            document.body.classList.forEach(cls => {
                if (cls.startsWith('color-')) {
                    document.body.classList.remove(cls);
                }
            });
            document.body.classList.add(`color-${selectedColor}`);


        } catch (error) {
            console.error('Error applying color scheme:', error);
        }
    };

    // Apply color scheme on page load
    applyColorScheme();

    // --- Keyboard Navigation for cre_company.html ---
    const formInputs = document.querySelectorAll('#companyForm .form-control');
    const saveButton = document.getElementById('saveBtn');
    const companyLogoUpload = document.getElementById('logoUpload');

    // Set initial focus to the first input
    if (formInputs.length > 0 && formInputs.focus) { // Ensure focus method exists
        formInputs[0].focus(); 
    }

    // Navigate inputs with Enter key
    formInputs.forEach((input, index) => {
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); 
                if (index < formInputs.length - 1) {
                    formInputs[index + 1].focus(); // Move to the next input
                } else {
                    saveButton.focus(); // Move to the save button
                }
            }
        });
    });

    // Handle Enter key on save button
    if (saveButton) {
        saveButton.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                saveButton.click(); // Simulate click on the save button
                // You might want to remove the direct form submit here if you're handling it via the 'submit' event listener
                // document.getElementById('companyForm').submit(); 
            }
        });
    }

    // --- Image Upload for Company Logo (unique to cre_company.html) ---
    const companyLogo = document.getElementById('companyLogo');
    if (companyLogoUpload && companyLogo) {
        companyLogoUpload.addEventListener('change', (event) => {
            const file = event.target.files; 
            if (file && file.length > 0) { // Check if a file was actually selected
                const reader = new FileReader();
                reader.onload = (e) => {
                    companyLogo.src = e.target.result;
                };
                reader.readAsDataURL(file); // Access the first file in the FileList
            }
        });
    }

    // --- Form Submission Logic (unique to cre_company.html) ---
    const companyForm = document.getElementById('companyForm');
    if (companyForm) {
        companyForm.addEventListener('submit', (event) => {
            event.preventDefault(); 
            console.log('Company form submitted!');
            alert('Company details saved successfully!');
            // You can add data gathering and AJAX submission here
        });
    }
});

