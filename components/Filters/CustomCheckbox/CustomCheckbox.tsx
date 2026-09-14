"use client";

import { ReactNode } from "react";
import styles from "./CustomCheckbox.module.css";

interface CheckboxProps {
    id: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    children: ReactNode;
    name?: string;
    disabled?: boolean;
}

/* Accessible custom-styled checkbox wrapping native input */
export default function Checkbox({
    id,
    checked,
    onChange,
    children,
    name,
    disabled = false,
}: CheckboxProps) {
    return (
        <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel} htmlFor={id}>
                <input
                    id={id}
                    name={name}
                    className={styles.realCheckbox}
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={(e) => onChange(e.target.checked)}
                />
                <span className={styles.customBox} aria-hidden="true" />
                <span className={styles.labelText}>{children}</span>
            </label>
        </div>
    );
}
