document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    // Check localStorage for saved theme preference, default to 'dark' if not set
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme); // Apply the saved theme

    function updateIcon() {
        const icon = toggleButton.querySelector('i');
        if (body.getAttribute('data-theme') === 'dark') {
            icon.className = 'fas fa-moon';
            toggleButton.style.color = 'yellow'; // Dark mode icon color
        } else {
            icon.className = 'fas fa-lightbulb';
            toggleButton.style.color = 'purple'; // Light mode icon color
        }
    }

    // Set the correct icon on page load
    updateIcon();

    // Add event listener to toggle theme and save to localStorage
    toggleButton.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme); // Save new theme to localStorage
        updateIcon();
    });
});
