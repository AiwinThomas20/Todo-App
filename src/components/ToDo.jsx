import React from "react";
import { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { IoMdDoneAll } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const ToDo = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (todo !== "") {
      if (editId) {
        const updatedTodos = todos.map((to) =>
          to.id === editId ? { ...to, list: todo } : to
        );
        setTodos(updatedTodos);
        setEditId(0);
      } else {
        setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
      }
      setTodo("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodo("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((to) => to.id !== id));
    setTodo("");
    setEditId("");
  };

  const onComplete = (id) => {
    const updatedTodos = todos.map((to) =>
      to.id === id ? { ...to, status: !to.status } : to
    );
    setTodos(updatedTodos);
    setTodo("");
    setEditId("");
  };

  const onEdit = (id) => {
    const editTodo = todos.find((to) => to.id === id);
    setTodo(editTodo.list);
    setEditId(editTodo.id);
  };

  return (
    <div className="container">
      <h2>TODO APP</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button onClick={addTodo}>{editId ? "EDIT" : "ADD"}</button>
      </form>
      <div className="list">
        <ul>
          {todos.map((to) => (
            <li className="list-items" key={to.id}>
              <div className="list-item-list" id={to.status ? "list-item" : ""}>
                {to.list}
              </div>
              <span>
                <IoMdDoneAll
                  className="list-item-icons"
                  onClick={() => onComplete(to.id)}
                  id="complete"
                />
                {to.status ? (
                  ""
                ) : (
                  <FiEdit
                    className="list-item-icons"
                    onClick={() => onEdit(to.id)}
                    id="edit"
                  />
                )}
                <MdDelete
                  className="list-item-icons"
                  onClick={() => deleteTodo(to.id)}
                  id="delete"
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default ToDo;


