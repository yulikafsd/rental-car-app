"use client";

import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

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
        <div className="filterGroup" ref={selectRef}>
            <label className="filterLabel" htmlFor={id}>
                {label}
            </label>
            <div className="customSelectWrapper">
                <button
                    id={id}
                    type="button"
                    className="customSelectButton"
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    <span>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                    {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                </button>

                {isOpen && (
                    <ul className="customSelectList" role="listbox">
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
                                className={`customSelectOption ${opt.value === value ? "selected" : ""}`}
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
