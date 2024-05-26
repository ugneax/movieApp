import {getActiveMovie, isAdmin, addReserveList, isSeatReserved, clearReserveList} from '../scripts.js'
import {changePage} from '../app.js'

export function SeatsPage ():string{
    let movie:any = getActiveMovie()
    let seatsHtml:string = ""

    for (let seat:number = 0; seat < movie.seats; seat++) {
        let activeClass:string = ''
        let seatReserved:string = (seat+1).toString()

        if(isSeatReserved(movie,seatReserved)) {
            activeClass = ' reserved active'
        }

        seatsHtml += `<div class="seat${activeClass}" data-id="${seatReserved}">${seatReserved}</div>`
    }

    return (`
        <div class="seatsPage">
            <div><img class="activeMovieImage" src="${movie.imageUrl}"></div>
            <div class="seatsContainer">
                <button class="backToMovies"><i class="fa-solid fa-arrow-left"></i> Back to movies</button>
                <div class="activeMovieTitle">Movie title: ${ movie.title}</div>
                <div class="seatsBox">${seatsHtml}</div>
                <button class="reserveSeatsButton">Reserve seats</button>
                <div>${(isAdmin())? `<button class="cancelReservation">Cancel Reservation</button>` : ` `}</div>
            </div>
        </div>
        `
    )
}

export function backToMovies():void {
    let goBackToMovies = document.querySelector('.backToMovies') as HTMLElement
    goBackToMovies.onclick = ():void =>{
        changePage('movies')
    }
}

function chooseSeatsButton():void{
    let seats = document.querySelectorAll('.seat') as NodeList
    seats.forEach(seat => {
        (seat as HTMLElement).onclick = function ():void{
            let currentClass = (this as HTMLElement).className.trim()
            if (!currentClass.includes('reserved')) {
                (this as HTMLElement).className = currentClass + ' reserved'
            }
        }
    })
}

function reserveSeatButton():void{
    let reserveSeat = document.querySelector('.reserveSeatsButton') as HTMLElement

    reserveSeat.onclick = ():void =>{
        addReserveList()

        changePage('seats')
    }
}

function cancelReservationButton():void{
    let cancelReservation = document.querySelector('.cancelReservation') as HTMLElement

    cancelReservation.onclick = ():void =>{
        clearReserveList()

        changePage('seats')
    }
}

export function initSeatPage(): void{
    chooseSeatsButton()
    reserveSeatButton()
    backToMovies()

    if(isAdmin())
    {
        cancelReservationButton()
    }
}