import Button from "@/components/Button/Button";
import styles from "./ErrorMessage.module.css";

// Props interface for configurable error alert box
interface ErrorMessageProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
}

// Accessible error message container with optional retry action
export default function ErrorMessage({
    title = "Error loading cars",
    message = "Failed to load the car list. Please try again later.",
    onRetry,
}: ErrorMessageProps) {
    return (
        <div role="alert" aria-live="assertive" className={styles.container}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{message}</p>
            {onRetry && (
                <Button variant="outline" size="compact" onClick={onRetry}>
                    Try again
                </Button>
            )}
        </div>
    );
}
