import { deleteTodo, getTodos, postTodo } from "./api.js";
import { renderLoginComponent } from "./components/login-component.js";

let tasks = [];
let token = null;

const fetchTodosAndRender = () => {
    return getTodos({ token })
        .then((responseData) => {
            tasks = responseData.todos;
            renderApp();
        });
};

const renderApp = () => {
    const appElement = document.getElementById('app');

    if (!token) {
        renderLoginComponent({
            appElement,
            setToken: (newToken) => {
                token = newToken;
            },
            fetchTodosAndRender,
        });

        return;
    }

    const tasksHtml = tasks
        .map((task) => {
            return `
          <li class="task">
            <p class="task-text">
              ${task.text} (Создал: ${task.user?.name ?? 'Неизвестно'})
              <button data-id="${task.id}" class="button delete-button">Удалить</button>
            </p>
          </li>`;
        })
        .join("");

    const appHtml = `
            <h1>Список задач</h1>

            <ul class="tasks" id="list">
            ${tasksHtml}    
            </ul>
            <br />
            <div class="form">
                <h3 class="form-title">Форма добавления</h3>
                <div class="form-row">
                    Что нужно сделать:
                    <input type="text" id="text-input" class="input" placeholder="Выпить кофе" />
                </div>
                <br />
                <button class="button" id="add-button">Добавить</button>
            </div>
        `;

    appElement.innerHTML = appHtml;

    const buttonElement = document.getElementById("add-button");
    const listElement = document.getElementById("list");
    const textInputElement = document.getElementById("text-input");

    const deleteButtons = document.querySelectorAll(".delete-button");

    for (const deleteButton of deleteButtons) {
        deleteButton.addEventListener("click", (event) => {
            event.stopPropagation();

            const id = deleteButton.dataset.id;

            // подписываемся на успешное завершение запроса с помощью then
            deleteTodo({ token, id })
                .then((responseData) => {
                    // получили данные и рендерим их в приложении
                    tasks = responseData.todos;
                    renderApp();
                });
        });
    }
    buttonElement.addEventListener("click", () => {
        if (textInputElement.value === "") {
            return;
        }

        buttonElement.disabled = true;
        buttonElement.textContent = "Задача добавляеятся...";

        // подписываемся на успешное завершение запроса с помощью then
        postTodo({ token, text: textInputElement.value })
            .then(() => {
                // TODO: кинуть исключение
                textInputElement.value = "";
            })
            .then(() => {
                return fetchTodosAndRender();
            })
            .then(() => {
                buttonElement.disabled = false;
                buttonElement.textContent = "Добавить";
            })
            .catch((error) => {
                console.error(error);
                alert("Кажется у вас проблемы с интернетом, попробуйте позже");
                buttonElement.disabled = false;
                buttonElement.textContent = "Добавить";
            });
    });
};

renderApp();