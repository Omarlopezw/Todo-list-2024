import { TodoListController } from "../controller/toDoListController.js"

//Componente web de la vista
class TodoListView extends HTMLElement
{
    constructor(model)
    {
        super();

        this.modelReference = model;
        this.controllerReference = new TodoListController(this,model) ;

    }
    connectedCallback()
    {
        this.render();

        this.appendChild(this.firstTitle);
        this.appendChild(this.myList);
        this.appendChild(this.mytask);
        this.appendChild(this.addTaskBtn);

        this.addTaskBtn.onclick = (event)=>{this.controllerReference.onAddTaskButtonClick(this.getTaskData())};
        
    }
    render()
    {
        this.firstTitle = document.createElement('h1');
        this.firstTitle.innerText = 'My todo list';

        this.myList = document.createElement('ul');

        this.mytask = document.createElement('input');
        this.mytask.placeholder = 'Write your next task';

        this.addTaskBtn = document.createElement('button');
        this.addTaskBtn.innerText = 'Send your next task';
    }
    getTaskData()
    {
        return this.mytask.value;
    }
    createNewTask(data)
    {
        if(data == '')
        {
            alert('Send a task...')
        }
        else
        {
            this.newTask = document.createElement('li');
            this.newTask.innerText = data;
            this.mytask.value = '';
    
            this.myList.appendChild(this.newTask);
        }
    }

}


customElements.define('x-todolist-view', TodoListView);


export{TodoListView};