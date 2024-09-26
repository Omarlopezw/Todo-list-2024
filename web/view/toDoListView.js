//Componente web de la vista

class TodoListView extends HTMLElement
{
    constructor()
    {
        super();
    }
    connectedCallback()
    {
        this.render();

        this.appendChild(this.firstTitle);

        
    }
    render()
    {
        this.firstTitle = document.createElement('h1');
        this.firstTitle.innerText = 'My todo list';

        this.myList = document.createElement('ul');

    }

}


customElements.define('x-todolist-view', TodoListView);


export{TodoListView};