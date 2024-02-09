const addButton = document.querySelector(".add-button");
const deleteButton = document.querySelector(".delete-button");
const todosHtml = document.querySelector(".todos");
const input = document.querySelector('.todo-input');
const completeButton = document.getElementById('complete');
const incompleteButton = document.getElementById('incomplete');
const deleteAllButton = document.querySelector('.delete-all');
const emptyPar = document.querySelector('.empty');
let todoListItems=[]; 
let filteredBy = undefined;
let todo;


const onClickCheckbox=(id)=>{
  todoListItems = todoListItems.map(item=> {
    return  {
      ...item,
      checked: item.id == id ?  !item.checked : item.checked,
    }
  })
  renderTodo()
}

const onClickDeleteButton=(id)=>{
   deleteTodo(id)
}

const renderTodo = (finalTodoList) => {
  todosHtml.innerHTML = '';
  emptyPar.style.display = 'block';
  (finalTodoList ?? todoListItems).forEach(todo => {
    emptyPar.style.display = 'none'
    const liElement = document.createElement('li');
    liElement.innerHTML= 
    `<input type='checkbox' ${todo.checked ? 'checked': ''} onclick="onClickCheckbox(${todo.id})">
    <span class='textSpan ${todo.checked?'lining':''}'>${todo.text}</span>
    <i class="fa-regular fa-trash-can" onclick="onClickDeleteButton(${todo.id})"></i>
    `
    liElement.classList.add('todos-list')
    todosHtml.appendChild(liElement);
  });
  input.value='';
};

const addTodo =(value)=>  {
  if(value){
    todo = {
        text: value,
        checked: false,
        id : new Date().getTime(),
      };    
      todoListItems.push(todo);
     renderTodo()
    }
    
}

const deleteTodo=(id) => {  
  todoListItems = todoListItems.filter(todo => todo.id !== id);
  renderTodo()
  }


  input.addEventListener("keydown", e => {
    if(e.key === "Enter") {
     addTodo(input.value.trim());
    } 
   });

   addButton.addEventListener("click", () => addTodo(input.value.trim())); 

   completeButton.addEventListener("click", () => {
    toggleFilter(true)
    completeButton.classList.toggle('clickedColor')
   
  }); 

    incompleteButton.addEventListener("click", () => {
      toggleFilter(false)
      incompleteButton.classList.toggle('clickedColor')

  });

  const toggleFilter=(filter) => {  
    console.log('filteredBy: ',filteredBy, 'filter: ', filter);
    if(filteredBy !== undefined && filteredBy == filter){      
      renderTodo();
      filteredBy = undefined
    }else{
      filteredBy = filter;
      const filteredList = todoListItems.filter(item=>item.checked === filter)      
      renderTodo(filteredList);
    }  
 }
  

 deleteAllButton.addEventListener("click", () => {
    todoListItems=[]
    renderTodo()

});