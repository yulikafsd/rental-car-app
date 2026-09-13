"use client";

import { ReactNode } from "react";
import styles from "./CustomCheckbox.module.css";

interface CheckboxProps {
    id: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    children: ReactNode;
}

export default function Checkbox({
    id,
    checked,
    onChange,
    children,
}: CheckboxProps) {
    return (
        <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel} htmlFor={id}>
                <input
                    id={id}
                    className={styles.realCheckbox}
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                />
                <span className={styles.customBox} aria-hidden="true" />
                <span className={styles.labelText}>{children}</span>
            </label>
        </div>
    );
}
