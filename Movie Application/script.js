document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchTerm = document.getElementById('search-input').value;
    if (searchTerm.trim()) {
        fetch(`api.php?query=${encodeURIComponent(searchTerm)}`)
            .then(response => response.json())
            .then(data => {
                displayMovies(data.results);
            })
            .catch(error => console.error('Error fetching data:', error));
    } else {
        // Optionally clear the movie list if the search term is empty
        document.getElementById('movie-list').innerHTML = '';
    }
});

function displayMovies(movies) {
    const movieList = document.getElementById('movie-list');
    if (movies.length === 0) {
        movieList.innerHTML = '<p>No movies found. Try another search!</p>';
        return;
    }
    movieList.innerHTML = movies.map(movie => `
        <div class="movie" data-movie-id="${movie.id}">
            <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
        </div>
    `).join('');

    // Add click event listeners to each movie
    document.querySelectorAll('.movie').forEach(movie => {
        movie.addEventListener('click', () => {
            fetchMovieDetails(movie.getAttribute('data-movie-id'));
        });
    });
}

function fetchMovieDetails(movieId) {
    fetch(`api.php?details=${movieId}`)
        .then(response => response.json())
        .then(data => {
            displayMovieDetails(data);
        })
        .catch(error => {
            console.error('Error fetching movie details:', error);
            document.getElementById('movie-list').innerHTML = '<p>Error loading movie details. Please try again later.</p>';
        });
}

function displayMovieDetails(movie) {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = `
        <div class="movie-details">
            <button id="back-button">⬅Back</button>
            <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title}">
            <h2>${movie.title}</h2>
            <p><strong>Release Date:</strong> ${movie.release_date}</p>
            <p><strong>Rating:</strong> ${movie.vote_average} / 10</p>
            <p><strong>Overview:</strong> ${movie.overview}</p>
        </div>
    `;

    // Add event listener to the back button
    document.getElementById('back-button').addEventListener('click', () => {
        fetchPopularMovies(); // Call this function to reload the initial movie list
    });
}

function fetchPopularMovies() {
    fetch('api.php') // Assumes this endpoint returns the popular movies list
        .then(response => response.json())
        .then(data => {
            displayMovies(data.results);
        })
        .catch(error => {
            console.error('Error fetching popular movies:', error);
            document.getElementById('movie-list').innerHTML = '<p>Error loading movies. Please try again later.</p>';
        });
}

// Call fetchPopularMovies on page load
document.addEventListener('DOMContentLoaded', fetchPopularMovies);

document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    function updateThemeStyles() {
        const icon = toggleButton.querySelector('i');
        if (body.getAttribute('data-theme') === 'dark') {
            icon.className = 'fas fa-moon';
            // Set variables for dark mode
            body.style.setProperty('--header-color', '#90caf9');  // Example color
            body.style.setProperty('--text-color', '#ccc');
            body.style.setProperty('--background-color', '#121212');
        } else {
            icon.className = 'fas fa-lightbulb';
            // Set variables for light mode
            body.style.setProperty('--header-color', '#0056b3');  // Example color
            body.style.setProperty('--text-color', '#333');
            body.style.setProperty('--background-color', '#b1a9a9');
        }
    }

    // Initialize the correct theme on page load
    if (!body.hasAttribute('data-theme')) {
        body.setAttribute('data-theme', 'dark');  // Default to dark
    }
    updateThemeStyles();

    // Attach event listener to toggle button for theme change
    toggleButton.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        updateThemeStyles();
    });
});

