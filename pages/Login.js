import { changeUserType } from '../scripts.js';
import { changePage } from '../app.js';
export function LoginPage() {
    return (`
<div class="loginPage">
    <div class="loginAsUser">Login as user</div>
    <div class="loginAsAdmin">Login as admin</div>
</div>
`);
}
export function initLoginPage() {
    changeUserType('user');
    const loginAsUser = document.querySelector('.loginAsUser');
    loginAsUser.onclick = () => {
        changePage('movies');
    };
    const loginAsAdmin = document.querySelector('.loginAsAdmin');
    loginAsAdmin.onclick = () => {
        changePage('admin');
    };
}
