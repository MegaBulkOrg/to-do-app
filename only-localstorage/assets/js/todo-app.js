(function(){
    let storageKey = '';
    function createAppTitle(title) {
        let appTitle = document.createElement('h1');
        appTitle.classList.add('text-center','mb-4');
        appTitle.innerHTML = title;
        return appTitle;
    }
    function createTodoItemForm() {
        let form = document.createElement('form'),
            input = document.createElement('input'),
            buttonWrapper = document.createElement('div'),
            button = document.createElement('button');
        form.classList.add('input-group','mb-3','desktop-form');
        input.classList.add('form-control','me-3');
        input.placeholder = 'Введите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn','btn-primary');
        button.textContent = 'Добавить дело';
        button.setAttribute('disabled','');
        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);
        form.addEventListener('input', function() {
            !input.value ? button.setAttribute('disabled','') : button.removeAttribute('disabled')
        })
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let todoItem = createTodoItem({name: input.value, done: false});
            document.querySelector('.list-group').append(todoItem.item);
            saveList(storageKey);
            input.value = '';
            button.setAttribute('disabled','');
        })
        return form;
    }
    function createNewItemModalButton() {
        let buttonWrap = document.createElement('div');
        buttonWrap.classList.add('add-item-modal-btn-wrapper');
        let button = document.createElement('button');
        button.classList.add('btn','btn-primary','mb-3')
        button.setAttribute('data-bs-toggle','modal');
        button.setAttribute('data-bs-target','#add-item-modal');
        button.textContent = 'Добавить дело';
        buttonWrap.append(button);
        return buttonWrap;
    }
    function createNewItemModal() {
        let modal = document.createElement('div');
        modal.classList.add('modal');
        modal.setAttribute('id','add-item-modal');
        modal.setAttribute('tabindex','-1');
        let modalDialog = document.createElement('div');
        modalDialog.classList.add('modal-dialog');
        modal.append(modalDialog);
        let modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        modalDialog.append(modalContent);
        let modalHeader = document.createElement('div');
        modalHeader.classList.add('modal-header');
        modalContent.append(modalHeader);
        let modalTitle = document.createElement('h5');
        modalTitle.classList.add('modal-title');
        modalTitle.textContent = 'Добавление новой задачи';
        modalHeader.append(modalTitle);
        let btnClose = document.createElement('button');
        btnClose.classList.add('btn-close');
        btnClose.setAttribute('data-bs-dismiss','modal');
        btnClose.setAttribute('aria-label','Close');
        modalHeader.append(btnClose);
        let modalBody = document.createElement('div');
        modalBody.classList.add('modal-body');
        modalContent.append(modalBody);
        let modalForm = createTodoItemForm(storageKey);
        modalBody.append(modalForm);
        modalForm.classList.remove('desktop-form');
        modalForm.classList.add('mobile-form');
        return modal
    }
    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }
    function createTodoItem(todoItem) {
        let item = document.createElement('li'),
            buttonGroup = document.createElement('div'),
            doneButton = document.createElement('button'),
            deleteButton = document.createElement('button');
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
            item.classList.toggle('list-group-item-success');
            saveList(storageKey);
        });
        deleteButton.addEventListener('click', function() {
            confirm('Вы уверены') ? item.remove() : null
            saveList(storageKey);
        });
        return {item, doneButton, deleteButton};
    }
    function createInitialList(list, ul) {
        for (let initialItem of list) {
            let listElement = createTodoItem(initialItem);
            ul.append(listElement.item);
        }
    }
    function saveList(key) {
        let items = document.querySelectorAll('.list-group-item');
        let saveList = [];
        for (let item of items) {
            saveList.push({
                name: item.firstChild.textContent,
                done: item.classList.contains('list-group-item-success')
            })
        }
        localStorage.setItem(key, JSON.stringify(saveList));
    }
    function createTodoApp(container, title='Список дел', key, initialList=[]) {
      document.querySelector('title').textContent = `ToDo App - ${title}`;
      let todoAppTitle = createAppTitle(title),
            todoItemForm = createTodoItemForm(),
            newItemModalButton = createNewItemModalButton(),
            newItemModal = createNewItemModal(),
            todoList = createTodoList();
        container.append(todoAppTitle);
        container.append(todoItemForm);
        container.append(newItemModalButton);
        container.append(todoList);
        container.append(newItemModal);
        storageKey = key;
        let storageData = localStorage.getItem(key);
        if (!storageData) {
            createInitialList(initialList, todoList);
            saveList(key);
        } else {
            createInitialList(JSON.parse(storageData), todoList);
        }
    }
    window.createTodoApp = createTodoApp;
})();
