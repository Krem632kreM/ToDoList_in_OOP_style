'use strict';

class Todo {
  constructor(form, input, todoList, todoComleted) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.todoList = document.querySelector(todoList);
    this.todoComleted = document.querySelector(todoComleted);
    this.todoData = new Map();
  };

    addTodo(e){
      e.preventDefault();

      const newTodo = {
        value: this.input.value,
        completed: false,
        key: this.generateKey(),
      };

      this.todoData.set(newTodo.key, newTodo)
      this.render()

    }


    generateKey() {
      return Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2, 15)
    }

    render() {
      this.todoData.forEach(this.createItem)
    }

    createItem = (todo) => {
      const li = document.createElement('li')
      li.classList.add('todo-item')
      li.insertAdjacentHTML('beforeend', `
      <span class="text-todo">${todo.value}</span>
      <div class="todo-buttons">
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
      </div>
      `)

      if(todo.completed) {
        this.todoComleted.append(li)
      } else {
        this.todoList.append(li)
      }
    }

  

  init() {
    this.form.addEventListener('submit', this.addTodo.bind(this))

  }
}
const todo = new Todo('.todo-control','.header-input','.todo-list','.todo-complete');

todo.init();
