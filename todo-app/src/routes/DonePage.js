import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./DonePage.module.css";

function DoneTodosPage() {
    const [doneTodos, setDoneTodos] = useState([]);

    useEffect(() => {
        fetchDoneTodos();
    }, []);

    const fetchDoneTodos = () => {
        fetch("/.netlify/functions/getTodos")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => setDoneTodos(data.filter((todo) => todo.done))) // Show all done todos
            .catch((error) => console.error("Error fetching done todos:", error));
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Completed Todos</h2>
            {doneTodos.length === 0 ? (
                <p>No completed todos yet!</p>
            ) : (
                <ul className={styles.todoList}>
                    {doneTodos.map((todo) => (
                        <li key={todo._id} className={styles.todoItem}>
                            <span>{todo.content}</span>
                        </li>
                    ))}
                </ul>
            )}
            <Link to="/todos" className={styles.link}>Go Back</Link>
        </div>
    );
}

export default DoneTodosPage;