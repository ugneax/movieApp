import {changeUserType, addMovie, isValidUrl} from '../scripts.js'
import {changePage} from "../app.js"
export function AdminPage ():string{
    return (
        `
<div class="adminPage">
    <div class="text">Create new movie!</div>
    <input class="movieTitle" placeholder="Enter movie name">
    <input class="movieImage" placeholder="Enter movie image source">
    <input class="movieSeats" placeholder="Enter movie seats">
    <button class="createMovie">Create movie</button>
    <button class="goToMovie">Go to list</button>
</div>
`
    )
}

export function initAdminPage(): void{
    changeUserType('admin')

    const movieTitle = document.querySelector('.movieTitle') as HTMLInputElement
    const movieImage = document.querySelector('.movieImage') as HTMLInputElement
    const movieSeats = document.querySelector('.movieSeats') as HTMLInputElement
    const createMovie = document.querySelector('.createMovie') as HTMLButtonElement
    const goToMovie = document.querySelector('.goToMovie') as HTMLButtonElement

    createMovie.onclick = ():void =>{
        if(!isValidUrl(movieImage.value)){
            alert("Invalid movie image url address!")
        } else if(/\D/.test(movieSeats.value)){
            alert("Create at least 1 seat!")
        } else if(movieTitle.value.length < 1){
            alert("Create movie title!")
        } else{
            addMovie(movieTitle.value,movieImage.value,movieSeats.value)
            changePage('movies')
        }
    }

    goToMovie.onclick = ():void =>{
        changePage('movies')
    }
}