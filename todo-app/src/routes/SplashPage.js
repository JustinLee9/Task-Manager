import { Link } from "react-router-dom";
import styles from "./SplashPage.module.css";

function SplashPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Justin's To-Do App</h1>
            <p>A full-stack todo application built with React and MongoDB</p>
            <Link to="/todos" className={styles.button}>View Todo App</Link>
        </div>
    );
}

export default SplashPage;