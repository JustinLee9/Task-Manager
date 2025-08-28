import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./TodosPage.module.css";

function TodosPage() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [userID, setUserID] = useState("");
  const [authenticated, setAuthenticated] = useState(true);
  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (userID) {
      fetchTodos();
    }
  }, [userID]);

  const fetchUser = async () => {
    try {
      const response = await fetch("/.auth/me");
      const data = await response.json();
      if (data.clientPrincipal) {
        setUserID(data.clientPrincipal.userId);
      } else {
        setAuthenticated(false);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const fetchTodos = () => {
    fetch("/api/getTodos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setTodos(data.filter((todo) => todo.userId === userID && !todo.done)))
      .catch((error) => console.error("Error fetching todos:", error));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      content: inputValue,
      done: false,
      userId: userID,
    };

    fetch("/api/addTodos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(fetchTodos)
      .then(() => setInputValue(""))
      .catch((error) => console.error("Error adding todo:", error));
  };
  

  const markTodoAsDone = (id) => {
    fetch("/api/updateTodo", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id, done: true }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(fetchTodos)
      .catch((error) => console.error("Error marking todo as done:", error));
  };

  const handleLogout = () => {
    window.location.href = "/.auth/logout";
  };

  if (!authenticated) {
    window.location.href = "/.auth/login/github?post_login_redirect_uri=/todos";
    return null;
  }

  return (
    <div className={styles.container}>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a new todo..."
          className={styles["input-text"]}
        />
        <button type="submit" className={styles["add-button"]}>
          Add Todo
        </button>
      </form>

      <ul className={styles.todoList}>
        {todos.map((todo) => (
          <li key={todo._id}>
            <span className={styles["todo-content"]}>
              {todo.content && todo.content.length > 10
                ? todo.content.substring(0, 10) + "..."
                : todo.content}
            </span>
            <div className={styles.actions}>
              <button onClick={() => markTodoAsDone(todo._id)}>
                Mark Done
              </button>
              <Link to={`/todo/${todo._id}`}>View Details</Link>
            </div>
          </li>
        ))}
      </ul>
      <Link to="/done" className={styles["view-done-link"]}>
        View Done Todos
      </Link>
      <button onClick={handleLogout} className={styles["logout-button"]}>Logout</button>
    </div>
  );
}

export default TodosPage;
