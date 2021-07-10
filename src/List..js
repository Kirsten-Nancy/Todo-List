import React from "react"
import { FaEdit, FaTrash } from "react-icons/fa"
const List = ({ items, deleteTodo, editTodo }) => {
  return (
    <div className="todo-list">
      {items.map((item) => {
        const { id, title } = item
        return (
          <article key={id} className="list-item">
            <p className="title">{title}</p>
            <div className="btn-container">
              <button type="button" className="edit-btn">
                <FaEdit onClick={() => editTodo(id)} />
              </button>
              <button type="button" className="delete-btn">
                <FaTrash onClick={() => deleteTodo(id)} />
              </button>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default List
