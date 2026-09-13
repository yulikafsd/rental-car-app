"use client";

import { useState, useRef, useEffect } from "react";
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
}

export default function CustomSelect({
    id,
    label,
    placeholder,
    value,
    options,
    onChange,
}: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const modifierClass = id.replace(/-/g, "_");

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

    const selectedOption = options.find((opt) => opt.value === value);

    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <div className={styles.filterGroup} ref={selectRef}>
            <label className={styles.filterLabel} htmlFor={id}>
                {label}
            </label>
            <div className={styles.customSelectWrapper}>
                <button
                    id={id}
                    type="button"
                    className={`${styles.customSelectButton} ${styles[`button_${modifierClass}`] || ""}`}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    <span
                        className={
                            !selectedOption
                                ? styles.placeholder
                                : styles.selectedValue
                        }
                    >
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                    {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                </button>

                {isOpen && (
                    <ul
                        className={`${styles.customSelectList} ${styles[`list_${modifierClass}`] || ""}`}
                        role="listbox"
                    >
                        <li
                            role="option"
                            aria-selected={!value}
                            className="customSelectOption"
                            onClick={() => handleSelect("")}
                        >
                            {placeholder}
                        </li>
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
