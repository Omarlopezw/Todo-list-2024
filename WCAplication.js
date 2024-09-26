import { TodoListView } from './web/view/toDoListView.js';
import { TodoListModel} from './web/model/toDoListModel.js';

let main = ()=>
{
    let model = new TodoListModel();
    let WCApp = new TodoListView(model);

    document.body.appendChild(WCApp);
}

window.onload = main();