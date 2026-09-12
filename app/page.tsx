import styles from "./page.module.css";
import Button from "@/components/Button/Button";

export default function HomePage() {
    return (
        <section className={styles.hero}>
            <div className={styles.contentWrap}>
                <h1 className={styles.title}>Find your perfect rental car</h1>
                <p className={styles.description}>
                    Reliable and budget-friendly rentals for any journey
                </p>
                <Button href="/catalog" variant="primary" size="extraLarge">
                    View Catalog
                </Button>
            </div>
        </section>
    );
}
