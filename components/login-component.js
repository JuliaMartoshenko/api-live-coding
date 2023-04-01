import { login } from '../api.js';

export function renderLoginComponent({ appElement, setToken, fetchTodosAndRender }) {
    const appHtml = `
            <div class="form">
                <h3 class="form-title">Форма добавления</h3>
                <div class="form-row">
                    Логин
                    <input 
                    type="text" 
                    id="login-input" 
                    class="input" />
                </div>
                <div class="form-row">
                    Пароль
                    <input 
                    type="text" 
                    id="password-input" 
                    class="input" />
                </div>
                <br />
                <button class="button" id="login-button">Войти</button>
            </div>
            `

        appElement.innerHTML = appHtml;

        const loginButtonElement = document.getElementById('login-button');
        loginButtonElement.addEventListener('click', () => {
            login({
                login: 'admin',
                password: 'admin',
            }).then((user) => {
                console.log(user);
                setToken(`Bearer ${user.user.token}`);
                fetchTodosAndRender();
            });
        })
}