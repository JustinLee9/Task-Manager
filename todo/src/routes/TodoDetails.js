import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./TodoDetails.module.css";

function TodoDetails() {
    const { id } = useParams();
    const [todo, setTodo] = useState(null);
    const [editedContent, setEditedContent] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [authenticated, setAuthenticated] = useState(true);

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        if (id) {
            fetchTodo();
        }
    }, [id]);

    const fetchUser = async () => {
        try {
            const response = await fetch("/.auth/me");
            const data = await response.json();
            if (!data.clientPrincipal) {
                setAuthenticated(false);
            }
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const fetchTodo = () => {
        fetch(`/api/getTodos?id=${id}`)
            .then((response) => (response.ok ? response.json() : Promise.reject("Network response was not ok")))
            .then((data) => {
                if (Array.isArray(data)) {
                    const selectedTodo = data.find(todo => todo._id === id);
                    if (selectedTodo) {
                        setTodo(selectedTodo);
                    } else {
                        console.error("Todo with ID not found");
                    }
                } else {
                    console.error("Invalid data format");
                }
            })
            .catch((error) => console.error("Error fetching todo:", error));
    };

    const handleEdit = () => {
        setEditedContent(todo.content);
        setIsEditing(true);
    };

    const handleSave = () => {
        if (!todo || !id) {
            console.error("Todo ID not found");
            return;
        }

        fetch("/api/updateTodo", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ _id: id, content: editedContent, done: todo.done }),
        })
            .then((response) => (response.ok ? response.json() : Promise.reject("Network response was not ok")))
            .then(() => {
                setTodo((prevTodo) => ({ ...prevTodo, content: editedContent }));
                setIsEditing(false);
            })
            .catch((error) => console.error("Error updating todo:", error));
    };

    const markTodoAsDone = () => {
        if (!todo || !id) {
            console.error("Todo ID not found");
            return;
        }

        fetch("/api/updateTodo", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ _id: id, content: todo.content, done: true }),
        })
            .then((response) => (response.ok ? response.json() : Promise.reject("Network response was not ok")))
            .then(() => {
                setTodo((prevTodo) => ({ ...prevTodo, done: true }));
            })
            .catch((error) => console.error("Error marking todo as done:", error));
    };

    if (!authenticated) {
        window.location.href = "/.auth/login/github?post_login_redirect_uri=/todos";
        return null;
    }

    if (!todo) return <div className={styles.container}>Loading...</div>;

    return (
        <div className={styles.container}>
            {isEditing ? (
                <div className={styles["edit-container"]}>
                    <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} rows="5" cols="50" />
                    <button onClick={handleSave}>Save</button>
                </div>
            ) : (
                <div>
                    <h2>Todo Details</h2>
                    <p><strong>Content:</strong> {todo.content}</p>
                    {!todo.done && (
                        <div className={styles.actions}>
                            <button onClick={handleEdit}>Edit</button>
                            <button onClick={markTodoAsDone}>Mark as Done</button>
                        </div>
                    )}
                </div>
            )}
            <Link to="/todos" className={styles.link}>Back to Todos</Link>
        </div>
    );
}

export default TodoDetails;
