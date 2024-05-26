import { changeUserType, addMovie, isValidUrl } from '../scripts.js';
import { changePage } from "../app.js";
export function AdminPage() {
    return (`
<div class="adminPage">
    <div class="text">Create new movie!</div>
    <input class="movieTitle" placeholder="Enter movie name">
    <input class="movieImage" placeholder="Enter movie image source">
    <input class="movieSeats" placeholder="Enter movie seats">
    <button class="createMovie">Create movie</button>
    <button class="goToMovie">Go to list</button>
</div>
`);
}
export function initAdminPage() {
    changeUserType('admin');
    const movieTitle = document.querySelector('.movieTitle');
    const movieImage = document.querySelector('.movieImage');
    const movieSeats = document.querySelector('.movieSeats');
    const createMovie = document.querySelector('.createMovie');
    const goToMovie = document.querySelector('.goToMovie');
    createMovie.onclick = () => {
        if (!isValidUrl(movieImage.value)) {
            alert("Invalid movie image url address!");
        }
        else if (/\D/.test(movieSeats.value)) {
            alert("Create at least 1 seat!");
        }
        else if (movieTitle.value.length < 1) {
            alert("Create movie title!");
        }
        else {
            addMovie(movieTitle.value, movieImage.value, movieSeats.value);
            changePage('movies');
        }
    };
    goToMovie.onclick = () => {
        changePage('movies');
    };
}
