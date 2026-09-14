"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import styles from "./CustomSelect.module.css";

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps {
    id: string;
    label: string;
    placeholder: string;
    value: string;
    options: Option[];
    onChange: (value: string) => void;
    formatSelectedValue?: (selectedLabel: string) => string;
}

/* Accessible custom dropdown select supporting keyboard navigation and outside click detection */
export default function CustomSelect({
    id,
    label,
    placeholder,
    value,
    options,
    onChange,
    formatSelectedValue,
}: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    /* Compute dynamic style variants safely */
    const modifierClass = id.replace(/-/g, "_");

    /* Dismiss dropdown when clicking outside component bounds */
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                selectRef.current &&
                !selectRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    /* Close dropdown on Escape key */
    const handleKeyDown = (
        e: KeyboardEvent<HTMLButtonElement | HTMLUListElement>,
    ) => {
        if (e.key === "Escape") {
            setIsOpen(false);
        }
    };

    const selectedOption = options.find((opt) => opt.value === value);

    /* Select option and collapse list */
    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    /* Render computed text label */
    const displayButtonText = selectedOption
        ? formatSelectedValue
            ? formatSelectedValue(selectedOption.label)
            : selectedOption.label
        : placeholder;

    return (
        <div className={styles.filterGroup} ref={selectRef}>
            {/* Visual form label */}
            <label
                id={`${id}-label`}
                className={styles.filterLabel}
                htmlFor={id}
            >
                {label}
            </label>

            <div className={styles.customSelectWrapper}>
                {/* Combobox trigger with ARIA expansion and controls binding */}
                <button
                    id={id}
                    type="button"
                    className={`${styles.customSelectButton} ${styles[`button_${modifierClass}`] || ""}`}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-controls={`${id}-listbox`}
                    aria-labelledby={`${id}-label ${id}`}
                    onClick={() => setIsOpen((prev) => !prev)}
                    onKeyDown={handleKeyDown}
                >
                    <span
                        className={
                            !selectedOption
                                ? styles.placeholder
                                : styles.selectedValue
                        }
                    >
                        {displayButtonText}
                    </span>

                    {/* Chevron icons marked as decorative */}
                    {isOpen ? (
                        <FiChevronUp aria-hidden="true" />
                    ) : (
                        <FiChevronDown aria-hidden="true" />
                    )}
                </button>

                {/* Floating options panel */}
                {isOpen && (
                    <ul
                        id={`${id}-listbox`}
                        className={`${styles.customSelectList} ${styles[`list_${modifierClass}`] || ""}`}
                        role="listbox"
                        aria-labelledby={`${id}-label`}
                        tabIndex={-1}
                        onKeyDown={handleKeyDown}
                    >
                        {options.map((opt) => (
                            <li
                                key={opt.value}
                                role="option"
                                aria-selected={opt.value === value}
                                className={`${styles.customSelectOption} ${opt.value === value ? styles.selected : ""}`}
                                onClick={() => handleSelect(opt.value)}
                            >
                                {opt.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
