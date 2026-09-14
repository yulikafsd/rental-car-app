import styles from "./Footer.module.css";

// Application footer rendering copyright and developer contact details
export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.content}`}>
                <small className={styles.copyright}>
                    &copy; {new Date().getFullYear()} Rental Car App. All rights
                    reserved.
                </small>
                <p>
                    Developer:{" "}
                    <a
                        href="mailto:ju.zagorovsky@gmail.com"
                        className={styles.link}
                        aria-label="Send email to developer Yuliia Zahorovska"
                    >
                        Yuliia Zahorovska
                    </a>
                </p>
            </div>
        </footer>
    );
}
