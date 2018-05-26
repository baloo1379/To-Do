class Todo {
  constructor(id, title, completed){
		this.title = title;
    this.id = id;
    this.completed = completed;
  }
}

function addTodo(todo, todos) {
	todos.push(todo);
}

function showTodos(todos, list) {
	
	while (list.firstChild) {
    list.removeChild(list.firstChild);
	}
	
	todos.forEach(function(todo){
		var li = document.createElement("li"),
				span = document.createElement("span"),
				title = document.createTextNode(todo.title),
				check = document.createElement("input"),
				div1 = document.createElement("div"),
				div2 = document.createElement("div"),
				btn = document.createElement("button");
				
	span.appendChild(title);
	check.setAttribute("type", "checkbox");
	check.checked = todo.completed;
	check.classList.add("checkbox");
	check.addEventListener('change',function(){
		todo.completed = this.checked;
		if(todo.completed) span.classList.add("done");
		else span.classList.remove("done");
		//console.log(todo.id, todo.completed);
	},false);
	if(todo.completed) span.classList.add("done");
	else span.classList.remove("done");
	div1.appendChild(check);
	div1.appendChild(span);
	btn.classList.add("delete");
	btn.addEventListener('click',function(){
		deleteTodo(this, todo, list, todos);
	},false);
		div2.appendChild(btn);
	li.appendChild(div1);
	li.appendChild(div2);
	li.classList.add("panel-block");
	list.appendChild(li);
	});
	//console.log(todos);
}

function deleteTodo(btn, todo, list, todos) {
	let tmp = btn.parentNode,
			li = tmp.parentNode;
	todos.splice(todos.indexOf(todo), 1);
	list.removeChild(li);
	//console.log(btn, todo, list, todos);
}

(function(){
	let app = document.querySelector(".todoApp"),
			submit = document.querySelector(".todoSubmit"),
			list = document.querySelector(".todoList"),
			input = document.querySelector(".newTodoTitle"),
			todos = new Array({title: "Default done task", id: 0, completed: 'true'});
	
	submit.addEventListener('click',function(e){
		e.preventDefault();
		let newTodoTitle = document.querySelector(".newTodoTitle");
		if(newTodoTitle.value == "") {}
		else {
			var todo = new Todo(todos.length, newTodoTitle.value, false);
    	addTodo(todo, todos);
			newTodoTitle.value = "";
			showTodos(todos, list);
		}
	},false);
	
	input.addEventListener('keypress',function(e){
		if(e.keyCode == 13)
		{
			let newTodoTitle = document.querySelector(".newTodoTitle");
			if(newTodoTitle.value == "") {}
			else {
				var todo = new Todo(todos.length, newTodoTitle.value, false);
    		addTodo(todo, todos);
				newTodoTitle.value = "";
				showTodos(todos, list);
			}	
		}
		else console.log(e.keyCode);
	},false);
	
	showTodos(todos, list);
	
})();