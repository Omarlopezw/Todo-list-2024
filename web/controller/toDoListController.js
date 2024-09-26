

class TodoListController
{
    constructor(view,model)
    {
        this.viewReference = view;
        this.modelReference = model;
    }
    onAddTaskButtonClick(data)
    {
        this.viewReference.createNewTask(data);

        this.modelReference.addNewTask(data);

    }
    updateTask(data)
    {

    }
    deleteTask(data)
    {

    }
}

export { TodoListController };