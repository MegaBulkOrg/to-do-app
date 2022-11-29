export async function getToDoList(listKey) {
    const response = await fetch (`http://localhost:3000/api/todos?owner=${listKey}`);    
    return await response.json();
}
export async function createToDoItem({owner,name}) {
    const response = await fetch ('http://localhost:3000/api/todos', {
        method: 'POST',
        body: JSON.stringify({name,owner}),
        headers: {'Content-Type': 'application/json'}
    });
    return await response.json();
}
export function switchToDoItemDone({todoItem}) {
    todoItem.done = !todoItem.done;
    fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
        method: 'PATCH',
        body: JSON.stringify({done:todoItem.done}),
        headers: {'Content-Type': 'application/json'}
    });
}
export function deleteToDoItem({element,todoItem}) {
    if (!confirm('Вы уверены?')) return
    element.remove();
    fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
        method: 'DELETE'
    })
}