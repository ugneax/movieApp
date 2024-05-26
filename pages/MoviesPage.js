import { getMovieList, isAdmin, deleteMovie, changeActiveMovie } from '../scripts.js';
import { changePage } from '../app.js';
export function MoviesPage() {
    let moviesHtml = '';
    getMovieList().forEach((movie, index) => {
        moviesHtml += `
            <div class="movieCard">
                <img class="image" src="${movie.imageUrl}">
                <div class="title">Movie name: ${movie.title}</div>
                <div class="movieSeats">Capacity: ${movie.seats}</div>
                <button class="chooseSeats" data-id="${index}">Choose seats</button>
                <div>${(isAdmin()) ? `<button class="deleteMovie" data-id="${index}">Delete movie</button>` : ` `}</div>
            </div>
        `;
    });
    return (`
<div class="addNewMovie">${(isAdmin()) ? `<button class="addButton">Add movie</button>` : ` `}</div>
<div class="moviesPage">
   ${moviesHtml}
</div>
`);
}
function addNewMovieButton() {
    let addButton = document.querySelector('.addButton');
    addButton.onclick = () => {
        changePage('admin');
    };
}
function deleteMovieButton() {
    let deleteMovieElements = document.querySelectorAll('.deleteMovie');
    deleteMovieElements.forEach(movie => {
        movie.onclick = function () {
            let movieId = this.getAttribute('data-id');
            if (movieId) {
                deleteMovie(movieId);
                changePage('movies');
            }
        };
    });
}
export function initMoviesPage() {
    if (isAdmin()) {
        addNewMovieButton();
        deleteMovieButton();
    }
    openSeatsBoxButton();
}
function openSeatsBoxButton() {
    let openSeatsBoxButton = document.querySelectorAll('.chooseSeats');
    openSeatsBoxButton.forEach(box => {
        box.onclick = function () {
            let boxID = this.getAttribute('data-id');
            if (boxID) {
                changeActiveMovie(boxID);
                changePage('seats');
            }
        };
    });
}
