function fetchGenres() {
    const apiKey = 'a1dbb95aa8f4698fb5dc70f3c95e4d6a';  // Replace with your actual TMDb API key
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            populateGenresDropdown(data.genres);
        })
        .catch(error => console.error('Error loading genres:', error));
}

function populateGenresDropdown(genres) {
    const dropdownContent = document.querySelector('.dropdown-content');
    genres.forEach(genre => {
        const genreLink = document.createElement('a');
        genreLink.href = `#`;  // Here you might want to set a proper link or handle it via JavaScript
        genreLink.textContent = genre.name;
        genreLink.addEventListener('click', function() {
            // Optionally, you can fetch movies by this genre here
            console.log(`Genre ID ${genre.id} was clicked`);  // For testing or further development
        });
        dropdownContent.appendChild(genreLink);
    });
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', fetchGenres);

function populateGenresDropdown(genres) {
    const dropdownContent = document.querySelector('.dropdown-content');
    genres.forEach(genre => {
        const genreLink = document.createElement('a');
        genreLink.href = `#`;  // Prevent default link behavior
        genreLink.textContent = genre.name;
        genreLink.addEventListener('click', function(event) {
            event.preventDefault();  // Stop the link from changing the hash
            fetchMoviesByGenre(genre.id);  // Fetch movies by genre ID
        });
        dropdownContent.appendChild(genreLink);
    });
}

function fetchMoviesByGenre(genreId) {
    const apiKey = 'a1dbb95aa8f4698fb5dc70f3c95e4d6a';  // Use your TMDb API key
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&language=en-US`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayMovies(data.results);
        })
        .catch(error => console.error('Error fetching movies by genre:', error));
}

function displayMovies(movies) {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = ''; 
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.className = 'movie';
        movieElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
        `;
        movieList.appendChild(movieElement);
    });
}

