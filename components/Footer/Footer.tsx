import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.content}`}>
                <p>
                    © {new Date().getFullYear()} Rental Car App. All rights
                    reserved.
                </p>
                <p>
                    Developer:
                    <a href="mailto:ju.zagorovsky@gmail.com">
                        Yuliia Zahorovska
                    </a>
                </p>
            </div>
        </footer>
    );
}
