import React from "react";
import styles from "./SplashPage.module.css";

function SplashPage() {
    const handleLogin = () => {
        window.location.href = "/.auth/login/github?post_login_redirect_uri=/todos";
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Justin's To-Do App</h1>
            <button className={styles.button} onClick={handleLogin}>Login with Azure</button>
        </div>
    );
}

export default SplashPage;