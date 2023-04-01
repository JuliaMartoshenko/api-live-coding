export function renderLoginComponent({ appElement, setToken }) {
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
            setToken("Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k");
            fetchTodosAndRender();
        })
}