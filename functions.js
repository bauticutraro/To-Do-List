// ===================================================================================================== //
// ============================================= Functions ============================================= //
// ===================================================================================================== //


// ========================= Loacal Storage ========================= //

// Get Data of the LocalStorage
const getDataLocalStorage = () => {
    let todosJSON = localStorage.getItem('todos');
    return (todosJSON !== null) ? JSON.parse(todosJSON) : null;
};

// Get Data of the LocalStorage
const setDataLocalStorage = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
};




// ========================= Structure of the Table ========================= //

// Table Titles
const tableTitles = () => { 
    tableHeads = `
                <tr>
                    <th id='sortByTitle'>Title</th>
                    <th id='sortByPriority'>Priority</th>
                    <th id='sortByDescription'>Description</th>
                    <th id='sortByCompleted'>Completed</th>
                    <th>Delete</th>
                </tr>
                `;
    return tableHeads;
};

// Todo Structure
const todoStructure = (e, index, checked) => {
    const completed = (e.completed) ? '¡Completed!' : 'Incompleted';
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
        `;
};

// Styles // 
// Sort Todos Classes
const sortTodosClasses = sortTodos => {
    // On Click Title Sort
    let sortByTitle = document.getElementById('sortByTitle'),
        sortByPriority = document.getElementById('sortByPriority'),  
        sortByCompleted = document.getElementById('sortByCompleted');
        sortByDescription = document.getElementById('sortByDescription');
        
    if (sortTodos.length) {
    
        (sortTodosOption.sort === 'title') ? sortByTitle.classList.add('show') : 
        (sortTodosOption.sort === 'priority') ? sortByPriority.classList.add('show') :
        (sortTodosOption.sort === 'completed') ? sortByCompleted.classList.add('show') :
        (sortTodosOption.sort === 'description') ? sortByDescription.classList.add('show') : null;

        sortByTitle.addEventListener('click', () => { sortTodosOption.sort = 'title'; render()});
        sortByPriority.addEventListener('click', () => { sortTodosOption.sort = 'priority'; render()});
        sortByCompleted.addEventListener('click', () => { sortTodosOption.sort = 'completed'; render()});
        sortByDescription.addEventListener('click', () => { sortTodosOption.sort = 'description'; render()});
    }

};




// ========================= Filter Todos ========================= // 

// Filter Todos (Search and completed todos)
const filterTodos = e => {
    const searchText = e.title.toLowerCase().includes(inputSearch.value.toLowerCase())
    const hideCompletedTodos = inputHidenCompletedTodos.checked && e.completed;
    return searchText && !hideCompletedTodos ;
};

// Sort Todos (Tilte default)
const sortTodosByTitle = (a, b) =>  a.title > b.title;

// Sort Todos (options)
const sortTodosByOptions = (a, b) => {
    return (sortTodosOption.sort === "title") ? a.title.toLowerCase() > b.title.toLowerCase() :
            (sortTodosOption.sort === "priority") ? a.priority.value > b.priority.value :
            (sortTodosOption.sort === "description") ? a.description.toLowerCase() > b.description.toLowerCase() :
            (sortTodosOption.sort === "completed") ? a.completed > b.completed : a.title > b.title ;
};

// Print the todos data
const printData = (sortIncompletedTodos, sortTodos) => {
    incompletedTodos.textContent = `You have ${sortIncompletedTodos.length} todos left`;
    todoList.innerHTML = '';
    template = tableTitles();

    // Print todos
    sortTodos.forEach((e, index) => (e.completed) ? template += todoStructure(e, index, 'checked') : template += todoStructure(e, index, ''));
    
    if (!sortTodos.length) template = '<h1>No results found :(</h1>';

    return todoList.innerHTML += template;  
};




// ========================= Change the todo ========================= //

// Set Priority Value
const setPriorityValue  = e => {
    (e.priority.name === 'Low') 
    ? e.priority.value = 0 
    : (e.priority.name === 'Medium') 
    ? e.priority.value = 1 
    : e.priority.value = 2;
};

// Checked Function
const checkedTodo = sortTodos => {
    const checkbox = Array.from(document.getElementsByClassName('input-checkbox'));
    checkbox.forEach((e, index) => e.addEventListener('click', () =>  sortTodos[index].completed = !sortTodos[index].completed));
};

// Change Title Function
const changeTitle = sortTodos => {
    const titles = Array.from(document.getElementsByClassName('title-todo'));
    titles.forEach((e, index) => e.addEventListener('input', () =>  sortTodos[index].title = e.textContent));
    titles.forEach(e => e.addEventListener('focusout', () => render()));
};

// Change Description Function
const changeDescription = sortTodos => {
    const descriptions = Array.from(document.getElementsByClassName('description-todo'));
    descriptions.forEach((e, index) => e.addEventListener('input', () =>  sortTodos[index].description = e.textContent));
    descriptions.forEach(e => e.addEventListener('focusout', () => render()));
};

// Change Priority
const changePrioity = sortTodos => {
    const priorities = Array.from(document.getElementsByClassName('priority-todo'));
    priorities.forEach((e, index) => e.addEventListener('change', () =>  {sortTodos[index].priority.name = e.value; render()}));
}; 




// ========================= Delete the todo ========================= //

// Delete Todo
const deleteTodo = sortTodos => {
    const deleteTodoIcon = Array.from(document.getElementsByClassName('delete-todo'));
    deleteTodoIcon.forEach((e, index) => e.addEventListener('click', () => sortTodos[index].deleted = true));
};

// Delete Item
const deleteItems = (e, index) => (e.deleted) ? todos.splice(index, 1) : null;




// ========================= Add a todo ========================= //

// Add New Todo
const addNewTodo = e => {
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
};

// Reset Values when you add a new todo
const resetValues = () => {
    todoInputTitle.value = '';
    todoInputDescription.value = '';
};





// ========================= Navbar efect ========================= //
const navbarEfect = () => {
    const nav = document.getElementById('navbar');
    const addTodoContainer = document.getElementById('add-todo-container');
    const scroll = window.scrollY > addTodoContainer.scrollHeight - 1;
    return (scroll) ? nav.classList.add('scroll') : nav.classList.remove('scroll');
}