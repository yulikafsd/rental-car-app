"use client";

import React, { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import Link from "next/link";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "outline";
/* 👆 Замінено hero на extraLarge */
export type ButtonSize = "extraLarge" | "large" | "compact" | "full";

interface BaseButtonProps {
    children: React.ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
    disabled?: boolean;
}

type AsButtonProps = BaseButtonProps &
    ButtonHTMLAttributes<HTMLButtonElement> & {
        href?: undefined;
    };

type AsLinkProps = BaseButtonProps &
    AnchorHTMLAttributes<HTMLAnchorElement> & {
        href: string;
    };

export type ButtonProps = AsButtonProps | AsLinkProps;

export default function Button(props: ButtonProps) {
    const {
        children,
        variant = "primary",
        size = "compact",
        className = "",
        disabled = false,
        ...restProps
    } = props;

    const variantClass =
        variant === "outline" ? styles.outline : styles.primary;

    let sizeClass = styles.sizeCompact;
    switch (size) {
        case "extraLarge":
            sizeClass = styles.sizeExtraLarge;
            break;
        case "large":
            sizeClass = styles.sizeLarge;
            break;
        case "full":
            sizeClass = styles.sizeFull;
            break;
        case "compact":
        default:
            sizeClass = styles.sizeCompact;
            break;
    }

    const disabledClass = disabled ? styles.disabled : "";
    const combinedClassName =
        `${styles.button} ${variantClass} ${sizeClass} ${disabledClass} ${className}`.trim();

    if ("href" in props && props.href) {
        const linkProps = restProps as AnchorHTMLAttributes<HTMLAnchorElement>;

        return (
            <Link
                href={disabled ? "#" : props.href}
                className={combinedClassName}
                aria-disabled={disabled}
                tabIndex={disabled ? -1 : undefined}
                onClick={(e) => {
                    if (disabled) {
                        e.preventDefault();
                        return;
                    }
                    linkProps.onClick?.(e);
                }}
                {...linkProps}
            >
                {children}
            </Link>
        );
    }

    const buttonProps = restProps as ButtonHTMLAttributes<HTMLButtonElement>;
    return (
        <button
            type={buttonProps.type || "button"}
            className={combinedClassName}
            disabled={disabled}
            {...buttonProps}
        >
            {children}
        </button>
    );
}
