"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
    const pathname = usePathname();
    const isCatalogActive = pathname === "/catalog";

    return (
        <header className={styles.header}>
            <div className={`container ${styles.headerContainer}`}>
                <Link href="/" className={styles.logoLink}>
                    <Image
                        src="/logo.svg"
                        alt="RentalCar Logo"
                        width="104"
                        height="16"
                        priority
                    />
                </Link>
                <nav className={styles.nav}>
                    <Link
                        href="/"
                        className={`${styles.link} ${
                            pathname === "/" ? styles.activeLink : ""
                        }`}
                    >
                        Home
                    </Link>
                    <Link
                        href="/catalog"
                        className={`${styles.link} ${
                            isCatalogActive ? styles.activeLink : ""
                        }`}
                    >
                        Catalog
                    </Link>
                </nav>
            </div>
        </header>
    );
}
