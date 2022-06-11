import React from 'react'

function Todo({ todo, toggleTodo }) {
    function handleTodoClick() {
        toggleTodo(todo.id)
    }

    return (
        <div>
            <label class="checkbox-container">{todo.name}
                <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
                <span class="checkmark"></span>
            </label>
        </div>
    )
}

export default Todo