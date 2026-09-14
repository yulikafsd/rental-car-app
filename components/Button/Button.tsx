"use client";

import React, { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";
import Link from "next/link";
import styles from "./Button.module.css";

// Visual variants for button styles
export type ButtonVariant = "primary" | "outline";

// Size options matching layout constraints
export type ButtonSize = "extraLarge" | "large" | "compact" | "full";

// Base properties shared between link and native button
interface BaseButtonProps {
    children: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
    disabled?: boolean;
}

// Props when rendered as a standard HTML button
type AsButtonProps = BaseButtonProps &
    ButtonHTMLAttributes<HTMLButtonElement> & {
        href?: undefined;
    };

// Props when rendered as a Next.js navigation Link
type AsLinkProps = BaseButtonProps &
    ComponentProps<typeof Link> & {
        href: string;
    };

export type ButtonProps = AsButtonProps | AsLinkProps;

// Static map for size styling
const SIZE_CLASS_MAP: Record<ButtonSize, string> = {
    extraLarge: styles.sizeExtraLarge,
    large: styles.sizeLarge,
    compact: styles.sizeCompact,
    full: styles.sizeFull,
};

// Polymorphic Button component rendering either a Next.js Link or native button
export default function Button(props: ButtonProps) {
    const {
        children,
        variant = "primary",
        size = "compact",
        className = "",
        disabled = false,
        ...restProps
    } = props;

    // Select style variant and mapped size class cleanly
    const variantClass =
        variant === "outline" ? styles.outline : styles.primary;
    const sizeClass = SIZE_CLASS_MAP[size] || styles.sizeCompact;
    const disabledClass = disabled ? styles.disabled : "";

    const combinedClassName =
        `${styles.button} ${variantClass} ${sizeClass} ${disabledClass} ${className}`.trim();

    // Render as Next.js Link when href prop is provided
    if ("href" in props && props.href) {
        const linkProps = restProps as Omit<
            ComponentProps<typeof Link>,
            keyof BaseButtonProps | "href"
        >;

        return (
            <Link
                href={disabled ? "#" : props.href}
                className={combinedClassName}
                aria-disabled={disabled ? "true" : undefined}
                tabIndex={disabled ? -1 : undefined}
                onClick={(e) => {
                    if (disabled) {
                        e.preventDefault();
                        e.stopPropagation();
                        return;
                    }
                    linkProps.onClick?.(e);
                }}
                onKeyDown={(e) => {
                    if (disabled && (e.key === "Enter" || e.key === " ")) {
                        e.preventDefault();
                    }
                    linkProps.onKeyDown?.(e);
                }}
                {...linkProps}
            >
                {children}
            </Link>
        );
    }

    // Render as standard HTML button
    const buttonProps = restProps as ButtonHTMLAttributes<HTMLButtonElement>;
    return (
        <button
            type={buttonProps.type || "button"}
            className={combinedClassName}
            disabled={disabled}
            aria-disabled={disabled ? "true" : undefined}
            {...buttonProps}
        >
            {children}
        </button>
    );
}
