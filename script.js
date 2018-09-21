let todos = [{
    title: "Task 1",
    priority: {
        name: 'Low',
        value: 0
    },
    description: 'Task 1',
    completed: false,
}, {
    title: "Task 2",
    priority: {
        name: 'Medium',
        value: 0
    },
    description: 'Task 2',
    completed: true,
}, {
    title: "Task 3",
    priority: {
        name: 'High',
        value: 0
    },
    description: 'Task 3',
    completed: false,
}];


let sortTodosOption = { 
    sort: 'title'
}

const todoList = document.getElementById('todoList');
const todoInputTitle = document.getElementById('todoInputTitle');
const todoInputPriority = document.getElementById('todoInputPriority');
const todoInputDescription = document.getElementById('todoInputDescription');
const addTodoButton = document.getElementById('addTodo');
const inputSearch = document.getElementById('inputSearch');
const inputHidenCompletedTodos = document.getElementById('inputHidenCompletedTodos');
const incompletedTodos = document.getElementById('incompletedTodos');

const tableTitles = `
                        <tr>
                            <th id='sortByTitle'>Title</th>
                            <th id='sortByPriority'>Priority</th>
                            <th id='sortByDescription'>Description</th>
                            <th id='sortByCompleted'>Completed</th>
                            <th>Delete</th>
                        </tr>
                     `

const newTodo = function (e, index, checked) {
    const completed = (e.completed) ? 'Completed' : 'Incompleted';
    return `
            <tr>
                <td contenteditable id='title-${index}' class="title-todo">${e.title}</td>
                <td>
                    <select class="priority-todo change-select">
                        <option>${e.priority.name}</option>
                        ${(e.priority.name !== 'Low') ? '<option> Low </option>' : null}
                        ${(e.priority.name !== 'Medium') ? '<option> Medium </option>' : null}
                        ${(e.priority.name !== 'High') ? '<option> High </option>' : null}                        
                    </select>
                </td>
                <td contenteditable id='description-${index}' class="description-todo">${e.description}</td>
                <td class="completed-container">
                    <span class="completed-text">  ${completed} <span>
                    <label class="container completed-todo-container">
                        <input type="checkbox" class="input-checkbox" id=${index} ${checked}>  <span class="checkmark"></span>
                    </label>
                </td>
                <td><span class="delete-todo" style="cursor: pointer">&#10006;<span></td>
    
            </tr>
        `
}

let template = tableTitles;

// Get Data of the LocalStorage
let todosJSON = localStorage.getItem('todos');
(todosJSON !== null) ? todos = JSON.parse(todosJSON) : null;


// Render
const render = function() {  

    // Deleted items
    todos.forEach((e, index) => (e.deleted) ? todos.splice(index, 1) : null );


    // Priority Value
    todos.forEach( e => (e.priority.name === 'Low') ? e.priority.value = 0 : (e.priority.name === 'Medium') ? e.priority.value = 1 : e.priority.value = 2);


    // Search todos
    const filteredTodos = todos.filter(e => {
        const searchText = e.title.toLowerCase().includes(inputSearch.value.toLowerCase())
        const hideCompletedTodos = inputHidenCompletedTodos.checked && e.completed;
        return searchText && !hideCompletedTodos ;
    });


    // Sort Todos By Title
    const sortTodosByTitle = filteredTodos.sort((a, b) =>  a.title > b.title);


    // Sort Todos (Options)
    const sortTodos = sortTodosByTitle.sort((a, b) => {
        return (sortTodosOption.sort === "title") ? a.title.toLowerCase() > b.title.toLowerCase() :
               (sortTodosOption.sort === "priority") ? a.priority.value > b.priority.value :
               (sortTodosOption.sort === "description") ? a.description.toLowerCase() > b.description.toLowerCase() :
               (sortTodosOption.sort === "completed") ? a.completed > b.completed : a.title > b.title ;
    });


    // Incompleted Todos
    const sortIncompletedTodos = sortTodos.filter(e => !e.completed);


    // Print Data
    const printData = function() {
        incompletedTodos.textContent = `You have ${sortIncompletedTodos.length} todos left`;
        todoList.innerHTML = '';
        template = tableTitles;
        // Print todos
        sortTodos.forEach((e, index) => (e.completed) ? template += newTodo(e, index, 'checked') : template += newTodo(e, index, ''));
        
        if (!sortTodos.length) template = '<h1>No results found :(</h1>';

        todoList.innerHTML += template;  
    }; printData();

   


    // Checked
    const checkedTodo = function() {
        const checkbox = Array.from(document.getElementsByClassName('input-checkbox'));
        checkbox.forEach((e, index) => e.addEventListener('click', () =>  sortTodos[index].completed = !sortTodos[index].completed));
    }; checkedTodo();





    // Change Title
    const changeTitle = function() {
        const titles = Array.from(document.getElementsByClassName('title-todo'));
        titles.forEach((e, index) => e.addEventListener('input', () =>  sortTodos[index].title = e.textContent));
        titles.forEach(e => e.addEventListener('focusout', () => render()));
    }; changeTitle();


    // Change Description
    const changeDescription = function() {
        const descriptions = Array.from(document.getElementsByClassName('description-todo'));
        descriptions.forEach((e, index) => e.addEventListener('input', () =>  sortTodos[index].description = e.textContent));
        descriptions.forEach(e => e.addEventListener('focusout', () => render()));
    }; changeDescription();


    // Change Priority
    const changePrioity = function() {
        const priorities = Array.from(document.getElementsByClassName('priority-todo'));
        priorities.forEach((e, index) => e.addEventListener('change', () =>  {sortTodos[index].priority.name = e.value; render()}));
    }; changePrioity();



    // Delete Todo
    const deleteTodo = function() {
        const deleteTodoIcon = Array.from(document.getElementsByClassName('delete-todo'));
        deleteTodoIcon.forEach((e, index) => e.addEventListener('click', () => sortTodos[index].deleted = true));
    }; deleteTodo();


    // On Click Title Sort
    let sortByTitle = document.getElementById('sortByTitle'),
        sortByPriority = document.getElementById('sortByPriority'),  
        sortByCompleted = document.getElementById('sortByCompleted');
        sortByDescription = document.getElementById('sortByDescription');

    (sortTodosOption.sort === 'title') ? sortByTitle.classList.add('show') : 
    (sortTodosOption.sort === 'priority') ? sortByPriority.classList.add('show') :
    (sortTodosOption.sort === 'completed') ? sortByCompleted.classList.add('show') :
    (sortTodosOption.sort === 'description') ? sortByDescription.classList.add('show') : null;

    if (sortTodos.length) {
        sortByTitle.addEventListener('click', () => { sortTodosOption.sort = 'title'; render()});
        sortByPriority.addEventListener('click', () => { sortTodosOption.sort = 'priority'; render()});
        sortByCompleted.addEventListener('click', () => { sortTodosOption.sort = 'completed'; render()});
        sortByDescription.addEventListener('click', () => { sortTodosOption.sort = 'description'; render()});
    }


    // Reset inputs values
    todoInputTitle.value = '';
    todoInputDescription.value = '';
    
    // Set Data in the LocalStorage
    localStorage.setItem('todos', JSON.stringify(todos));

}; render();


// Add Todo
const addTodo = function (e) {
    e.preventDefault()
    if (todoInputTitle.value.trim() && todoInputDescription.value.trim()) {
        todos.push({
            title: todoInputTitle.value,
            priority: {
                name: todoInputPriority.value,
                value: 0
            },
            description: todoInputDescription.value,
            completed: false,
    
        });

        inputSearch.value = '';
        todoInputDescription.value = '';
        render();

    } 
}; addTodoButton.addEventListener('click', addTodo);


// Hide Completed Todos
inputHidenCompletedTodos.addEventListener('change', render);


// Search
inputSearch.addEventListener('input', render);


// Checked
todoList.addEventListener('click', e => (e.target.className === 'input-checkbox') ? render() : null);


// Delete Todo
todoList.addEventListener('click', e => (e.target.className === 'delete-todo') ? render() : null);


// Navbar Efect
const nav = document.getElementById('navbar');
const addTodoContainer = document.getElementById('add-todo-container');

window.addEventListener('scroll', () => (window.scrollY > addTodoContainer.scrollHeight - 1) ? nav.classList.add('scroll') : nav.classList.remove('scroll'));

