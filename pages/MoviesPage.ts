import {getMovieList,Movie, isAdmin, deleteMovie, changeActiveMovie} from '../scripts.js'
import {changePage} from '../app.js'

export function MoviesPage ():string{
    let moviesHtml:string = ''

    getMovieList().forEach((movie:Movie,index:number):void => {
        moviesHtml += `
            <div class="movieCard">
                <img class="image" src="${movie.imageUrl}">
                <div class="title">Movie name: ${movie.title}</div>
                <div class="movieSeats">Capacity: ${movie.seats}</div>
                <button class="chooseSeats" data-id="${index}">Choose seats</button>
                <div>${(isAdmin())? `<button class="deleteMovie" data-id="${index}">Delete movie</button>` : ` `}</div>
            </div>
        `
    })

    return (
        `
<div class="addNewMovie">${(isAdmin())? `<button class="addButton">Add movie</button>` : ` `}</div>
<div class="moviesPage">
   ${moviesHtml}
</div>
`
    )
}

function addNewMovieButton():void{
    let addButton = document.querySelector('.addButton') as HTMLButtonElement
    addButton.onclick = (): void =>{
        changePage('admin')
    }
}

function deleteMovieButton():void{
    let deleteMovieElements = document.querySelectorAll('.deleteMovie') as NodeList
    deleteMovieElements.forEach(movie => {
        (movie as HTMLElement).onclick = function ():void{
            let movieId: any = (this as HTMLElement).getAttribute('data-id')
            if(movieId){
                deleteMovie(movieId)

                changePage('movies')
            }
        }
    })
}

export function initMoviesPage(): void{
    if(isAdmin())
    {
        addNewMovieButton()
        deleteMovieButton()
    }
    openSeatsBoxButton()
}

function openSeatsBoxButton():void{
    let openSeatsBoxButton = document.querySelectorAll('.chooseSeats') as NodeList
    openSeatsBoxButton.forEach(box => {
        (box as HTMLElement).onclick = function ():void {
            let boxID: any = (this as HTMLElement).getAttribute('data-id')
            if(boxID)
            {
                changeActiveMovie(boxID)

                changePage('seats')
            }
        }
    })
}