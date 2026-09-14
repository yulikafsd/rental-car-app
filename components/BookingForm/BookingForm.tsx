"use client";

import { useState, ChangeEvent, SyntheticEvent } from "react";
import toast from "react-hot-toast";
import { FiAlertCircle } from "react-icons/fi";
import { useBookCar } from "@/hooks/useCarDetails";
import Button from "@/components/Button/Button";
import styles from "./BookingForm.module.css";

interface BookingFormProps {
    carId: string;
}

interface FormValues {
    name: string;
    email: string;
    comment: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    comment?: string;
}

/* Base form initial state values */
const INITIAL_VALUES: FormValues = {
    name: "",
    email: "",
    comment: "",
};

/* Email syntax verification pattern */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Field definition metadata for DRY rendering */
interface FieldConfig {
    name: keyof FormValues;
    label: string;
    type: "text" | "email" | "textarea";
    autoComplete?: string;
}

const FIELDS_CONFIG: FieldConfig[] = [
    { name: "name", label: "Name*", type: "text", autoComplete: "name" },
    { name: "email", label: "Email*", type: "email", autoComplete: "email" },
    { name: "comment", label: "Comment", type: "textarea" },
];

/* Interactive booking form collecting client contact information and request details */
export default function BookingForm({ carId }: BookingFormProps) {
    const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
    const [errors, setErrors] = useState<FormErrors>({});

    const { mutate: bookCar, isPending } = useBookCar();

    /* Validate individual form fields */
    const validateField = (
        name: keyof FormValues,
        value: string,
    ): string | undefined => {
        const trimmed = value.trim();

        if (name === "name") {
            if (!trimmed) return "Please enter your name.";
            if (trimmed.length < 2)
                return "Name must be at least 2 characters.";
        }

        if (name === "email") {
            if (!trimmed) return "Please enter your email.";
            if (!EMAIL_REGEX.test(trimmed))
                return "Please enter a valid email address.";
        }

        if (name === "comment") {
            if (!trimmed) return "Comment is required.";
        }

        return undefined;
    };

    /* Controlled input update handler */
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));

        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    /* Validate field when focus leaves input */
    const handleBlur = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        const fieldError = validateField(name as keyof FormValues, value);
        setErrors((prev) => ({ ...prev, [name]: fieldError }));
    };

    /* Form submission and API invocation handler */
    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors: FormErrors = {
            name: validateField("name", values.name),
            email: validateField("email", values.email),
            comment: validateField("comment", values.comment),
        };

        if (newErrors.name || newErrors.email || newErrors.comment) {
            setErrors(newErrors);
            toast.error("Please fill in the form correctly.");
            return;
        }

        bookCar(
            {
                carId,
                bookingData: {
                    name: values.name.trim(),
                    email: values.email.trim(),
                    comment: values.comment.trim(),
                },
            },
            {
                onSuccess: (data) => {
                    toast.success(data.message || "Car successfully booked!");
                    setValues(INITIAL_VALUES);
                    setErrors({});
                },
                onError: (error) => {
                    toast.error(error.message || "Failed to submit booking.");
                },
            },
        );
    };

    return (
        <div className={styles.formWrapper}>
            {/* Form titles */}
            <h3 id="booking-form-title" className={styles.title}>
                Book your car now
            </h3>
            <p className={styles.subtitle}>
                Stay connected! We are always ready to help you.
            </p>

            {/* Accessible form linked with its title via aria-labelledby */}
            <form
                className={styles.form}
                onSubmit={handleSubmit}
                noValidate
                aria-labelledby="booking-form-title"
            >
                {/* Iterated fields */}
                {FIELDS_CONFIG.map(({ name, label, type, autoComplete }) => {
                    const fieldId = `booking-${name}`;
                    const errorId = `booking-${name}-error`;
                    const error = errors[name];
                    const hasError = Boolean(error);
                    const isTextarea = type === "textarea";

                    const inputClassName = `${
                        isTextarea ? styles.textarea : styles.input
                    } ${hasError ? styles.inputError : ""}`;

                    return (
                        <div key={name} className={styles.fieldGroup}>
                            {isTextarea ? (
                                <textarea
                                    id={fieldId}
                                    name={name}
                                    value={values[name]}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder=" "
                                    aria-invalid={hasError}
                                    aria-describedby={
                                        hasError ? errorId : undefined
                                    }
                                    className={inputClassName}
                                />
                            ) : (
                                <input
                                    id={fieldId}
                                    type={type}
                                    name={name}
                                    value={values[name]}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    autoComplete={autoComplete}
                                    placeholder=" "
                                    aria-invalid={hasError}
                                    aria-describedby={
                                        hasError ? errorId : undefined
                                    }
                                    className={inputClassName}
                                />
                            )}

                            <label
                                htmlFor={fieldId}
                                className={`${styles.fieldLabel} ${
                                    hasError ? styles.labelError : ""
                                }`}
                            >
                                {label}
                            </label>

                            {/* Error feedback linked via id and declared as alert landmark */}
                            {hasError && (
                                <div className={styles.errorContainer}>
                                    <FiAlertCircle
                                        className={styles.errorIcon}
                                        aria-hidden="true"
                                    />
                                    <span
                                        id={errorId}
                                        role="alert"
                                        className={styles.errorText}
                                    >
                                        {error}
                                    </span>
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* Form action button */}
                <Button
                    type="submit"
                    variant="primary"
                    size="full"
                    disabled={isPending}
                    aria-disabled={isPending ? "true" : undefined}
                >
                    {isPending ? "Sending..." : "Send"}
                </Button>
            </form>
        </div>
    );
}
