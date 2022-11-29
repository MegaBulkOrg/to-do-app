let listKey = ''
export function getToDoList(lk) {
    listKey === lk ? null : listKey = lk;
    let storageData = localStorage.getItem(lk);
    return storageData ? JSON.parse(storageData) : [];
}
export function createToDoItem({owner,name}) {
    let response = getToDoList(owner),
        idList = [];
    for (let item of response) {
        idList.push(item.id);
    }
    let lastItemId = idList.length === 0 ? 0 : Math.max.apply(null, idList),
        newItem = {
            id: lastItemId + 1,
            name,
            done: false 
        };
    response.push(newItem);
    localStorage.setItem(owner, JSON.stringify(response));    
    return newItem;
}
export function switchToDoItemDone({todoItem}) {
    todoItem.done = !todoItem.done;
    let response = getToDoList(listKey),
        doneItem = response.find(item => item.id === todoItem.id);
    doneItem.done = !doneItem.done ? true : false
    localStorage.setItem(listKey, JSON.stringify(response));
}
export function deleteToDoItem({element,todoItem}) {
    if (!confirm('Вы уверены?')) return
    element.remove();
    let response = getToDoList(listKey),
        deleteItem = response.find(item => item.id === todoItem.id),
        deleteItemIndex = response.indexOf(deleteItem);
    response.splice(deleteItemIndex,1);
    localStorage.setItem(listKey, JSON.stringify(response));
}