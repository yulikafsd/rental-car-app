"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

// Application header providing primary branding and navigation
export default function Header() {
    const pathname = usePathname();
    const isHomeActive = pathname === "/";
    const isCatalogActive = pathname === "/catalog";

    return (
        <header className={styles.header}>
            <div className={`container ${styles.headerContainer}`}>
                {/* Brand logo linking directly to home view */}
                <Link
                    href="/"
                    className={styles.logoLink}
                    aria-label="RentalCar homepage"
                >
                    <Image
                        className={styles.logoImg}
                        src="/logo.svg"
                        alt="RentalCar Logo"
                        width={104}
                        height={16}
                        priority
                    />
                </Link>

                {/* Navigation landmark */}
                <nav className={styles.nav} aria-label="Main navigation">
                    <ul className={styles.navList}>
                        <li>
                            <Link
                                href="/"
                                className={`${styles.link} ${
                                    isHomeActive ? styles.activeLink : ""
                                }`}
                                aria-current={isHomeActive ? "page" : undefined}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/catalog"
                                className={`${styles.link} ${
                                    isCatalogActive ? styles.activeLink : ""
                                }`}
                                aria-current={
                                    isCatalogActive ? "page" : undefined
                                }
                            >
                                Catalog
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
