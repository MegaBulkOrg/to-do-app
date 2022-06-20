import {createTodoApp} from './view.js';
export default (appContainer,storage,listKey,listTitle) => {
    appContainer.innerHTML = ''
    localStorage.setItem('storageName',storage.toString());
    let modulePath = `./${storage}.js`;
    import(modulePath).then(async mod => {
        const todoItemList = await mod.getToDoList(listKey)
        createTodoApp(appContainer,{
            title: listTitle, 
            key: listKey,
            todoItemList,
            onCreateFormSubmit: mod.createToDoItem, 
            onDoneClick: mod.switchToDoItemDone, 
            onDeleteClick: mod.deleteToDoItem
        });
    })
}