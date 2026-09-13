"use client";

import { useEffect } from "react";
import styles from "./Loader.module.css";

interface LoaderProps {
    title?: string;
    subtitle?: string;
}

export default function Loader({
    title = "Loading cars...",
    subtitle = "Please wait while we fetch the best cars for you",
}: LoaderProps) {
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    return (
        <div className={styles.overlay} role="status" aria-live="polite">
            <div className={styles.modalCard}>
                <div className={styles.spinner} />
                <h3 className={styles.title}>{title}</h3>
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>
        </div>
    );
}
