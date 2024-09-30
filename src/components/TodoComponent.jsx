import React from "react";
import { useReducer, useState } from "react";
import initialTodoData from "../utils/InitialTodoData";
import ReducerFxn from "../utils/ReducerFxn";

export default function TodoComponent() {
  const [state, dispatch] = useReducer(ReducerFxn, initialTodoData);
  const [newTodo, setNewTodo] = useState("");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Function to add a new todo
  const handleAdd = () => {
    if (newTodo.trim() !== "") {
      dispatch({ type: "ADD_TODO", payload: newTodo });
      setNewTodo("");
    }
  };

  // Function to handle edit button click
  const handleEdit = (todo) => {
    setEditId(todo.id);
    setEditValue(todo.title);
  };

  // Function to save edited todo
  const handleSave = () => {
    dispatch({ type: "EDIT_TODO", payload: { id: editId, title: editValue } });
    setEditId(null);
    setEditValue("");
  };

  return (
    <div className="todoContainer">
      <div className="addToDO">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button className="addButton" onClick={handleAdd}>
          Add Todo
        </button>
      </div>
      <div className="ulList">
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {state.map((todo) => (
            <li key={todo.id} style={{ marginBottom: "10px" }}>
              {editId === todo.id ? (
                <>
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    style={{ padding: "6px", marginRight: "8px" }}
                  />
                  <button onClick={handleSave} style={{ padding: "6px" }}>
                    Save
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() =>
                      dispatch({ type: "TOGGLE_TODO", payload: todo.id })
                    }
                    style={{ marginRight: "8px" }}
                  />
                  <span
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                      marginRight: "16px",
                    }}
                  >
                    {todo.title}
                  </span>
                  <button
                    onClick={() => handleEdit(todo)}
                    disabled={!todo.completed}
                    style={{ padding: "6px", marginRight: "8px" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      dispatch({ type: "DELETE_TODO", payload: todo.id })
                    }
                    disabled={!todo.completed}
                    style={{ padding: "6px" }}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
