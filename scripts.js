let MoviesList = [];
let activeMovieId;
export function isAdmin() {
    return localStorage.getItem('userType') === 'admin';
}
export function changeUserType(type) {
    localStorage.setItem('userType', type);
}
export function addMovie(movieTitle, movieImageUrl, moveSeats) {
    MoviesList = getMovieList();
    let newMovie = {
        title: movieTitle,
        imageUrl: movieImageUrl,
        seats: moveSeats,
        reservedSeats: []
    };
    MoviesList.push(newMovie);
    saveMovieListToStorage();
}
export function getMoviesListFromStorage() {
    if (localStorage.getItem('movieList')) {
        let moviesListFromStorage = localStorage.getItem('movieList');
        return JSON.parse(moviesListFromStorage);
    }
    else {
        return [];
    }
}
export function getMovieList() {
    let currentMovieList = getMoviesListFromStorage();
    MoviesList = [];
    currentMovieList.forEach(movie => {
        MoviesList.push(movie);
    });
    return MoviesList;
}
function saveMovieListToStorage() {
    localStorage.setItem('movieList', JSON.stringify(MoviesList));
}
export function deleteMovie(movieId) {
    MoviesList = getMovieList();
    MoviesList.splice(movieId, 1);
    saveMovieListToStorage();
}
export function changeActiveMovie(movieId) {
    activeMovieId = movieId;
}
export function getActiveMovie() {
    return MoviesList[activeMovieId];
}
export function isSeatReserved(movie, seatId) {
    if (movie.reservedSeats.filter(seat => seat == seatId).length > 0) {
        return true;
    }
    return false;
}
export function addReserveList() {
    let reservedList = document.querySelectorAll('.reserved');
    let reservedSeatsNew = [];
    reservedList.forEach(item => {
        let reservedItemId = item.getAttribute('data-id');
        reservedSeatsNew.push(reservedItemId);
    });
    let currentMovieList = MoviesList;
    MoviesList = [];
    currentMovieList.forEach((movie, index) => {
        if (index == activeMovieId) {
            movie.reservedSeats = reservedSeatsNew;
        }
        MoviesList.push(movie);
    });
    saveMovieListToStorage();
}
export function clearReserveList() {
    let currentMovieList = MoviesList;
    MoviesList = [];
    currentMovieList.forEach((movie, index) => {
        if (index == activeMovieId) {
            movie.reservedSeats = [];
        }
        MoviesList.push(movie);
    });
    saveMovieListToStorage();
}
export function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    }
    catch (err) {
        return false;
    }
}
