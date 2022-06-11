import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid'
import "./styles/index.scss";

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <header>
        <section class="navbar">
          <div className="container flex">
            <h1>Todo List</h1>
          </div>
        </section>
      </header>
      <main>
        <section class="showcase-form card">
          <TodoList todos={todos} toggleTodo={toggleTodo} />
          <input ref={todoNameRef} type="text" placeholder="Enter new todo here" />
          <button onClick={handleAddTodo} class="btn">Add Todo</button>
          <button onClick={handleClearTodos} class="btn">Clear Completed Todos</button>
          <div>Still {todos.filter(todo => !todo.complete).length} items left to do</div>
        </section>
      </main>
    </>
  )
}

export default App;
