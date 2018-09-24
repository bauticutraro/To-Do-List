let todos = [{
    title: "Task 1",
    priority: {
        name: 'Low',
        value: 0
    },
    description: 'Task 1',
    completed: false,
}];

let sortTodosOption = { 
    sort: 'title'
}


// Items
const todoList = document.getElementById('todoList');
const todoInputTitle = document.getElementById('todoInputTitle');
const todoInputPriority = document.getElementById('todoInputPriority');
const todoInputDescription = document.getElementById('todoInputDescription');
const addTodoButton = document.getElementById('addTodo');
const inputSearch = document.getElementById('inputSearch');
const inputHidenCompletedTodos = document.getElementById('inputHidenCompletedTodos');
const incompletedTodos = document.getElementById('incompletedTodos');


// ========================= Structure of the Table ========================= //
let template = tableTitles();


// ========================= LocalStorage ========================= //
todos = getDataLocalStorage();


// ========================= Render ========================= //
const render = () => {  

    // ========================= Delete the todo ========================= //
    // Deleted items
    todos.forEach(deleteItems);



    // ========================= Change the todo ========================= //
    // Priority Value
    todos.forEach(setPriorityValue);



    // ========================= Filter Todos ========================= // 
    // Search todos
    const filteredTodos = todos.filter(filterTodos);

    // Sort Todos By Title
    const sortTodosTitles = filteredTodos.sort(sortTodosByTitle);

    // Sort Todos (Options)
    const sortTodos = sortTodosTitles.sort(sortTodosByOptions);

    // Incompleted Todos
    const sortIncompletedTodos = sortTodos.filter(e => !e.completed);


    // ========================= Print Todos ========================= // 
    // Print Data
    printData(sortIncompletedTodos, sortTodos);



    // ========================= Change the todo ========================= //

    // Checked
    checkedTodo(sortTodos);

    // Change Title
    changeTitle(sortTodos);

    // Change Description
    changeDescription(sortTodos);

    // Change Priority
    changePrioity(sortTodos);


    // ========================= Delete the todo ========================= //
    // Delete Todo
    deleteTodo(sortTodos);


    // ========================= Some Styles ========================= //
    // Sort Todos Classes
    sortTodosClasses(sortTodos);


    // ========================= Reset Values  ========================= //    
    // Reset inputs values when you add a new todo
    resetValues();
    

    // ========================= LocalStorage ========================= //
    // Set Data in the LocalStorage
    setDataLocalStorage();

}; render();


// Add Todo
addTodoButton.addEventListener('click', addNewTodo);

// Hide Completed Todos
inputHidenCompletedTodos.addEventListener('change', render);

// Search
inputSearch.addEventListener('input', render);

// Checked
todoList.addEventListener('click', e => (e.target.className === 'input-checkbox') ? render() : null);

// Delete Todo
todoList.addEventListener('click', e => (e.target.className === 'delete-todo') ? render() : null);


// Navbar Efect
window.addEventListener('scroll', navbarEfect);

