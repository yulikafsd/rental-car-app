"use client";

import { useState, ChangeEvent, SyntheticEvent } from "react";
import toast from "react-hot-toast";
import { FiAlertCircle } from "react-icons/fi";
import { useBookCar } from "@/hooks/useCarDetails";
import Button from "@/components/Button/Button";
import styles from "./BookingForm.module.css";

interface BookingFormProps {
    carId: string;
    carName?: string;
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

const INITIAL_VALUES: FormValues = {
    name: "",
    email: "",
    comment: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function BookingForm({ carId, carName }: BookingFormProps) {
    const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
    const [errors, setErrors] = useState<FormErrors>({});

    const { mutate: bookCar, isPending } = useBookCar();

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
            if (!EMAIL_REGEX.test(trimmed)) return "Please enter your email.";
        }

        if (name === "comment") {
            if (!trimmed) return "Comment is required.";
        }

        return undefined;
    };

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));

        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleBlur = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        const fieldError = validateField(name as keyof FormValues, value);
        setErrors((prev) => ({ ...prev, [name]: fieldError }));
    };

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
                    carName,
                },
            },
            {
                onSuccess: (data) => {
                    // 👍 Показ успішного тосту
                    toast.success(data.message || "Car successfully booked!");
                    setValues(INITIAL_VALUES);
                    setErrors({});
                },
                onError: (error) => {
                    // 👍 Показ тосту з помилкою бекенду
                    toast.error(error.message || "Failed to submit booking.");
                },
            },
        );
    };

    return (
        <div className={styles.formWrapper}>
            <h3 className={styles.title}>Book your car now</h3>
            <p className={styles.subtitle}>
                Stay connected! We are always ready to help you.
            </p>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
                {/* Name */}
                <div className={styles.fieldGroup}>
                    {/* 👍 input стоїть перед label для роботи селекторів ~, placeholder=" " обов'язковий */}
                    <input
                        id="booking-name"
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder=" "
                        className={`${styles.input} ${
                            errors.name ? styles.inputError : ""
                        }`}
                    />
                    <label
                        htmlFor="booking-name"
                        className={`${styles.fieldLabel} ${
                            errors.name ? styles.labelError : ""
                        }`}
                    >
                        Name*
                    </label>

                    {errors.name && (
                        <>
                            {/* 👍 Червона іконка праворуч */}
                            <FiAlertCircle className={styles.errorIcon} />
                            <span className={styles.errorText}>
                                {errors.name}
                            </span>
                        </>
                    )}
                </div>

                {/* Email */}
                <div className={styles.fieldGroup}>
                    <input
                        id="booking-email"
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder=" "
                        className={`${styles.input} ${
                            errors.email ? styles.inputError : ""
                        }`}
                    />
                    <label
                        htmlFor="booking-email"
                        className={`${styles.fieldLabel} ${
                            errors.email ? styles.labelError : ""
                        }`}
                    >
                        Email*
                    </label>

                    {errors.email && (
                        <>
                            <FiAlertCircle className={styles.errorIcon} />
                            <span className={styles.errorText}>
                                {errors.email}
                            </span>
                        </>
                    )}
                </div>

                {/* Comment */}
                <div className={styles.fieldGroup}>
                    <textarea
                        id="booking-comment"
                        name="comment"
                        value={values.comment}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder=" "
                        className={`${styles.textarea} ${
                            errors.comment ? styles.inputError : ""
                        }`}
                    />
                    <label
                        htmlFor="booking-comment"
                        className={`${styles.fieldLabel} ${
                            errors.comment ? styles.labelError : ""
                        }`}
                    >
                        Comment
                    </label>

                    {errors.comment && (
                        <>
                            <FiAlertCircle className={styles.errorIcon} />
                            <span className={styles.errorText}>
                                {errors.comment}
                            </span>
                        </>
                    )}
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    size="full"
                    disabled={isPending}
                >
                    {isPending ? "Sending..." : "Send"}
                </Button>
            </form>
        </div>
    );
}
