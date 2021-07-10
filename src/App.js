import "./App.css"
import React, { useState, useEffect } from "react"
import List from "./List."
import Alert from "./Alert"

// get item fom local storage

const getLocalStorage = () => {
  let list = localStorage.getItem("list")

  if (list) {
    return JSON.parse(localStorage.getItem("list"))
  } else {
    return []
  }
}

function App() {
  const [name, setName] = useState("")
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name) {
      //alert
      showAlert(true, "danger", "value can not be empty")
    } else if (name && isEditing) {
      const updatedList = list.map((todo) => {
        return todo.id === editID ? { ...todo, title: name } : todo
      })
      setList(updatedList)

      //Show alert
      showAlert(true, "success", "Item updated successfully")

      setName("")
      setIsEditing(false)
    } else {
      //Show alert
      showAlert(true, "success", "Item added")

      // add list event
      const newItem = { id: new Date().getTime().toString(), title: name }
      console.log(newItem)
      setList([...list, newItem])
      setName("")
    }
  }

  // alert
  const showAlert = (show = true, type = "", msg = "") => {
    setAlert({ show, type, msg })
  }

  // Delete all todos
  const clearList = () => {
    setList([])
  }

  // Edit feature
  const editTodo = (id) => {
    setIsEditing(true)
    setEditID(id)
    let currentTodo = list.filter((todo) => {
      return todo.id === id
    })
    setName(currentTodo[0].title)
  }

  // Delete feature
  const deleteTodo = (id) => {
    let currentList = list.filter((todo) => {
      return todo.id !== id
    })
    setList(currentList)
    // In case someone deletes a todo while they were editing
    setName("")
    setIsEditing(false)
  }

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list))
  }, [list])

  return (
    <section className="section-center">
      <form className="todo-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>Todo List</h3>
        <div className="form-control">
          <input
            type="text"
            className="input-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "Edit" : "submit"}
          </button>
        </div>
      </form>

      {list.length > 0 && (
        <div className="list-container">
          <List items={list} deleteTodo={deleteTodo} editTodo={editTodo} />
          <button className="clear-btn" onClick={clearList}>
            Clear Lists
          </button>
        </div>
      )}
    </section>
  )
}

export default App
