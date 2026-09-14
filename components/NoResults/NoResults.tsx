import Image from "next/image";
import Button from "@/components/Button/Button";
import styles from "./NoResults.module.css";

// Props for NoResults empty state component
interface NoResultsProps {
    onReset: () => void;
    imageSrc?: string;
}

// Visual empty state displayed when car filters return zero matches
export default function NoResults({
    onReset,
    imageSrc = "/no-cars.webp",
}: NoResultsProps) {
    // Handle reset and scroll viewport up
    const handleReset = () => {
        if (typeof window !== "undefined") {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
        onReset();
    };

    return (
        // Accessible status container informing screen readers about empty search state
        <div className={styles.container} role="status" aria-live="polite">
            <div className={styles.imageWrapper}>
                <Image
                    src={imageSrc}
                    alt="No cars found"
                    fill
                    sizes="(max-width: 768px) 300px, 414px"
                    priority
                    className={styles.image}
                />
            </div>
            <h3 className={styles.title}>No cars found</h3>
            <p className={styles.description}>
                We couldn’t find any cars that match your current filters. Try
                changing your search criteria or reset the filters.
            </p>
            {/* Action button that clears filters and scrolls viewport to top */}
            <Button variant="outline" size="compact" onClick={handleReset}>
                Reset filters
            </Button>
        </div>
    );
}
