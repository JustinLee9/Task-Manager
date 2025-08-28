import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./DonePage.module.css";

function DoneTodosPage() {
    const [doneTodos, setDoneTodos] = useState([]);
    const [userID, setUserID] = useState("");

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        if (userID) {
            fetchDoneTodos();
        }
    }, [userID]);

    const fetchUser = async () => {
        try {
            const response = await fetch("/.auth/me");
            const data = await response.json();
            if (data.clientPrincipal) {
                setUserID(data.clientPrincipal.userId);
            }
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const fetchDoneTodos = () => {
        fetch("/api/getTodos")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => setDoneTodos(data.filter((todo) => todo.userId === userID && todo.done)))
            .catch((error) => console.error("Error fetching done todos:", error));
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Done Todos</h2>
            <ul className={styles.todoList}>
                {doneTodos.map((todo) => (
                    <li key={todo._id} className={styles.todoItem}>
                        <span>{todo.content}</span>
                    </li>
                ))}
            </ul>
            <Link to="/todos" className={styles.link}>Go Back</Link>
        </div>
    );
}

export default DoneTodosPage;
