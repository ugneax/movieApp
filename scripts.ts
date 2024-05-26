export interface Movie {
    title: string,
    imageUrl: string,
    seats:string,
    reservedSeats:string[]
}

let MoviesList:any = []
let activeMovieId:number

export function isAdmin():boolean {
    return localStorage.getItem('userType') === 'admin'
}

export function changeUserType(type:string):void {
    localStorage.setItem('userType',type)
}

export function addMovie(movieTitle:string,movieImageUrl:string,moveSeats:string):void {
    MoviesList = getMovieList()

    let newMovie:Movie = {
        title:movieTitle,
        imageUrl:movieImageUrl,
        seats:moveSeats,
        reservedSeats:[]
    }

    MoviesList.push(newMovie)
    saveMovieListToStorage()
}

export function getMoviesListFromStorage() : [] {
    if(localStorage.getItem('movieList')) {
        let moviesListFromStorage:any = localStorage.getItem('movieList')

        return JSON.parse(moviesListFromStorage)
    } else {
        return []

    }
}

export function getMovieList():[]{
    let currentMovieList:[] = getMoviesListFromStorage()

    MoviesList = []
    currentMovieList.forEach(movie => {
        MoviesList.push(movie)
    })

    return MoviesList
}

function saveMovieListToStorage():void {
    localStorage.setItem('movieList',JSON.stringify(MoviesList))
}

export function deleteMovie(movieId:number):void{
    MoviesList = getMovieList()
    MoviesList.splice(movieId,1)
    saveMovieListToStorage()
}

export function changeActiveMovie(movieId:number):void {
    activeMovieId = movieId
}

export function getActiveMovie():any {
    return MoviesList[activeMovieId]
}

export function isSeatReserved(movie:Movie, seatId:string):boolean{
    if(movie.reservedSeats.filter(seat => seat == seatId).length > 0) {
        return true
    }
    return false
}

export function addReserveList():void {
    let reservedList = document.querySelectorAll('.reserved') as NodeList
    let reservedSeatsNew: any = []

    reservedList.forEach(item => {
        let reservedItemId = (item as HTMLElement).getAttribute('data-id')
        reservedSeatsNew.push(reservedItemId)
    })

    let currentMovieList:[] = MoviesList

    MoviesList = []

    currentMovieList.forEach((movie:Movie,index:number):void => {
        if(index == activeMovieId) {
            movie.reservedSeats = reservedSeatsNew
        }

        MoviesList.push(movie)
    })

    saveMovieListToStorage()
}

export function clearReserveList():void{
    let currentMovieList:[] = MoviesList

    MoviesList = []

    currentMovieList.forEach((movie:Movie,index:number):void => {
        if(index == activeMovieId) {
            movie.reservedSeats = []
        }

        MoviesList.push(movie)
    })

    saveMovieListToStorage()
}

export function isValidUrl(url:string):boolean {
    try {
        new URL(url)
        return true
    } catch (err) {
        return false
    }
}