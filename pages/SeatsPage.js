import { getActiveMovie, isAdmin, addReserveList, isSeatReserved, clearReserveList } from '../scripts.js';
import { changePage } from '../app.js';
export function SeatsPage() {
    let movie = getActiveMovie();
    let seatsHtml = "";
    for (let seat = 0; seat < movie.seats; seat++) {
        let activeClass = '';
        let seatReserved = (seat + 1).toString();
        if (isSeatReserved(movie, seatReserved)) {
            activeClass = ' reserved active';
        }
        seatsHtml += `<div class="seat${activeClass}" data-id="${seatReserved}">${seatReserved}</div>`;
    }
    return (`
        <div class="seatsPage">
            <div><img class="activeMovieImage" src="${movie.imageUrl}"></div>
            <div class="seatsContainer">
                <button class="backToMovies"><i class="fa-solid fa-arrow-left"></i> Back to movies</button>
                <div class="activeMovieTitle">Movie title: ${movie.title}</div>
                <div class="seatsBox">${seatsHtml}</div>
                <button class="reserveSeatsButton">Reserve seats</button>
                <div>${(isAdmin()) ? `<button class="cancelReservation">Cancel Reservation</button>` : ` `}</div>
            </div>
        </div>
        `);
}
export function backToMovies() {
    let goBackToMovies = document.querySelector('.backToMovies');
    goBackToMovies.onclick = () => {
        changePage('movies');
    };
}
function chooseSeatsButton() {
    let seats = document.querySelectorAll('.seat');
    seats.forEach(seat => {
        seat.onclick = function () {
            let currentClass = this.className.trim();
            if (!currentClass.includes('reserved')) {
                this.className = currentClass + ' reserved';
            }
        };
    });
}
function reserveSeatButton() {
    let reserveSeat = document.querySelector('.reserveSeatsButton');
    reserveSeat.onclick = () => {
        addReserveList();
        changePage('seats');
    };
}
function cancelReservationButton() {
    let cancelReservation = document.querySelector('.cancelReservation');
    cancelReservation.onclick = () => {
        clearReserveList();
        changePage('seats');
    };
}
export function initSeatPage() {
    chooseSeatsButton();
    reserveSeatButton();
    backToMovies();
    if (isAdmin()) {
        cancelReservationButton();
    }
}
