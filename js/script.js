'use strict';

class Todo {
  constructor(form, input, todoList, todoComleted) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.todoList = document.querySelector(todoList);
    this.todoComleted = document.querySelector(todoComleted);
    this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
  };

  addTodo(e) {
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
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  handler() {
    //используя делегирование определять на какую кнопку кликнули корзина или галочка после этого вызвать delte или completed методы
    document.querySelector('.todo-container').addEventListener('click', (event) => {
      const node = event.target.parentNode.parentNode;
      if (event.target.classList.contains('todo-remove')) {
        this.deleteItem(node)
      }
      if (event.target.classList.contains('todo-complete')) {
        this.completedItem(node)
      }
    })
  }

  deleteItem = (node) => { // по ключу найти элемент и удалить его из Map? после этого сделать render
    this.todoData.forEach(item => {
      if (item.value === node.querySelector('.text-todo').textContent) {
        this.todoData.delete(item.key)
        this.render()
      }
    })
  }

  completedItem = (node) => { //перебрать через forEach все элементы todoData
    this.todoData.forEach(item => {
      if (item.value === node.querySelector('.text-todo').textContent) {
        item.completed = !item.completed
      }
      this.render()
    })
  }

  render() {
    this.todoList.textContent = ''
    this.todoComleted.textContent = ''
    this.todoData.forEach(this.createItem)
    this.addToStorage();
  }

  addToStorage() {
    localStorage.setItem('toDoList', JSON.stringify([...this.todoData]))
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

    if (todo.completed) {
      this.todoComleted.append(li)
    } else {
      this.todoList.append(li)
    }
  }

  init() {
    this.form.addEventListener('submit', this.addTodo.bind(this))
    this.render()
    this.handler();
  }
}
const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();