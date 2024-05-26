import { LoginPage, initLoginPage } from './pages/Login.js'
import { AdminPage, initAdminPage } from './pages/AdminPage.js'
import { MoviesPage, initMoviesPage } from './pages/MoviesPage.js'
import { SeatsPage, initSeatPage } from './pages/SeatsPage.js'

export function changePage(page : string):void {
    const appPage = document.getElementById('app') as HTMLElement
    if(page === 'login'){
        appPage.innerHTML = LoginPage()
        initLoginPage()
    } else if(page === 'admin'){
        appPage.innerHTML = AdminPage()
        initAdminPage()
    } else if(page === 'movies'){
        appPage.innerHTML = MoviesPage()
        initMoviesPage()
    } else if(page === 'seats'){
        appPage.innerHTML = SeatsPage()
        initSeatPage()
    }
}

changePage('login')