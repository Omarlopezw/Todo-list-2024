

class TodoListModel
{
    constructor()
    {

    }
    async addNewTask(data)
    {
        let fetchData = 
        { 
            method: 'POST', 
            body: JSON.stringify( data ) 
        }

        let request = await fetch( 'http://localhost:8080/addNewTask',fetchData );

        let response = await request.json();

        return response;
    }
}


export { TodoListModel };