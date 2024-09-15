// JavaScript to handle button clicks
document.querySelectorAll('.nav-button').forEach(button => {
    button.addEventListener('click', () => {
        // Remove 'active' class from all buttons
        document.querySelectorAll('.nav-button').forEach(btn => btn.classList.remove('active'));

        // Add 'active' class to the clicked button
        button.classList.add('active');

        // Change the main content based on the button clicked
        const mainContent = document.getElementById('main-content');
        switch (button.id) {
            case 'home':
                mainContent.innerHTML = '<h1>Home</h1><p>Welcome to the Home page!</p>';
                break;
            case 'search':
                mainContent.innerHTML = '<h1>Search</h1><p>Here you can search for content.</p>';
                break;
            case 'explore':
                mainContent.innerHTML = '<h1>Explore</h1><p>Discover new content here.</p>';
                break;
            case 'info':
                mainContent.innerHTML = '<h1>Info</h1><p>Learn more about this site.</p>';
                break;
        }
    });
});
