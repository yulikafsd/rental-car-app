import styles from "./page.module.css";
import Button from "@/components/Button/Button";

// Landing home page component showcasing hero section
export default function HomePage() {
    return (
        <section className={styles.hero} aria-labelledby="hero-heading">
            <div className={styles.contentWrap}>
                {/* Primary page heading */}
                <h1 id="hero-heading" className={styles.title}>
                    Find your perfect rental car
                </h1>

                {/* Subheading promotional text */}
                <p className={styles.description}>
                    Reliable and budget-friendly rentals for any journey
                </p>

                {/* Direct navigation to catalog */}
                <Button
                    href="/catalog"
                    variant="primary"
                    size="extraLarge"
                    aria-label="View rental cars catalog"
                >
                    View Catalog
                </Button>
            </div>
        </section>
    );
}
