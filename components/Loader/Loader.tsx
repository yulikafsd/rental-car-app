"use client";

import { useEffect } from "react";
import styles from "./Loader.module.css";

// Properties for customizable loader dialog
interface LoaderProps {
    title?: string;
    subtitle?: string;
}

// Container-level loading spinner overlay
export default function Loader({
    title = "Loading cars...",
    subtitle = "Please wait while we fetch the best cars for you",
}: LoaderProps) {
    // Lock body scroll when loader mounts and restore on unmount
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    return (
        <div
            className={styles.overlay}
            role="status"
            aria-live="polite"
            aria-busy="true"
        >
            <div className={styles.modalCard}>
                <div className={styles.spinner} aria-hidden="true" />
                <h3 className={styles.title}>{title}</h3>
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>
        </div>
    );
}
