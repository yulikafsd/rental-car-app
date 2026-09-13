import Image from "next/image";
import Button from "@/components/Button/Button";
import styles from "./NoResults.module.css";

interface NoResultsProps {
    onReset: () => void;
    imageSrc?: string;
}

export default function NoResults({
    onReset,
    imageSrc = "/no-cars.webp",
}: NoResultsProps) {
    return (
        <div className={styles.container}>
            <div className={styles.imageWrapper}>
                <Image
                    src={imageSrc}
                    alt="No cars found"
                    fill
                    sizes="(max-width: 768px) 240px, 320px"
                    priority
                    className={styles.image}
                />
            </div>
            <h3 className={styles.title}>No cars found</h3>
            <p className={styles.description}>
                We couldn’t find any cars that match your current filters. Try
                changing your search criteria or reset the filters.
            </p>
            <Button variant="outline" size="compact" onClick={onReset}>
                Reset filters
            </Button>
        </div>
    );
}
