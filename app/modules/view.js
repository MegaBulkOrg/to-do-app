let storageKey = '';
function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
}
function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');
    form.classList.add('input-group','mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn','btn-primary');
    button.textContent = 'Добавить дело';
    button.setAttribute('disabled','');
    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);
    return {form, input, button};
}
function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
}
function createTodoItemElement(todoItem, {onDone, onDelete}) {
    let item = document.createElement('li');
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = todoItem.name;
    todoItem.done ? item.classList.add('list-group-item-success') : null
    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);
    doneButton.addEventListener('click', function() {
        onDone({todoItem, element:item});
        item.classList.toggle('list-group-item-success', todoItem.done);
    });
    deleteButton.addEventListener('click', function() {
        onDelete({todoItem, element:item});
    });
    return item;   
}
async function createTodoApp(container, {title, key, todoItemList = [], onCreateFormSubmit, onDoneClick, onDeleteClick}) {            
    let todoAppTitle = createAppTitle(title),
        todoItemForm = createTodoItemForm(),
        todoList = createTodoList(),
        handlers = {
            onDone: onDoneClick,
            onDelete: onDeleteClick
        };
    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);
    storageKey = key;      
    for (let initialItem of todoItemList) {
        let listElement = createTodoItemElement(initialItem, handlers);
        todoList.append(listElement);
    }
    todoItemForm.form.addEventListener('input', function() {
        !todoItemForm.input.value ? todoItemForm.button.setAttribute('disabled','') : todoItemForm.button.removeAttribute('disabled')
    })
    todoItemForm.form.addEventListener('submit', async e => {
        e.preventDefault();        
        let todoItem = await onCreateFormSubmit({
            owner: key,
            name: todoItemForm.input.value.trim()
        }),
            todoItemElement = createTodoItemElement(todoItem, handlers);
        todoList.append(todoItemElement);
        todoItemForm.input.value = '';
        todoItemForm.button.setAttribute('disabled','');
    })
}
export {createTodoApp};