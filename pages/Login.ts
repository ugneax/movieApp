import {changeUserType} from '../scripts.js'
import {changePage} from '../app.js'
export function LoginPage ():string{
    return (
       `
<div class="loginPage">
    <div class="loginAsUser">Login as user</div>
    <div class="loginAsAdmin">Login as admin</div>
</div>
`
    )
}

export function initLoginPage(): void{
    changeUserType('user')

    const loginAsUser = document.querySelector('.loginAsUser') as HTMLElement

    loginAsUser.onclick = () =>{
        changePage('movies')
    }

    const loginAsAdmin = document.querySelector('.loginAsAdmin') as HTMLElement

    loginAsAdmin.onclick = ():void =>{
        changePage('admin')
    }
}