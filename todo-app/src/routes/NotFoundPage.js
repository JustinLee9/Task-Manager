import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.notFoundTitle}>404 - Page Not Found</h1>
      <p className={styles.notFoundText}>The page you are looking for does not exist.</p>
      <Link to="/todos" className={styles.linkBack}>Go back to Todos</Link>
    </div>
  );
}

export default NotFoundPage;
