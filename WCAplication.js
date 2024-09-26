import { TodoListView } from './web/view/toDoListView.js';

let main = ()=>
{
    let WCApp = new TodoListView();

    document.body.appendChild(WCApp);
}

window.onload = main();