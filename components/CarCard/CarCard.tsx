"use client";

import Image from "next/image";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

import Button from "@/components/Button/Button";
import { Car } from "@/types/car";

import { useFavoritesStore } from "@/store/useFavoritesStore";
import styles from "./CarCard.module.css";

interface CarCardProps {
    car: Car;
}

export default function CarCard({ car }: CarCardProps) {
    const isFav = useFavoritesStore((state) =>
        state.favorites.includes(String(car.id)),
    );
    const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

    const city = car.location?.city || "";
    const country = car.location?.country || "";

    const formattedMileage = car.mileage
        ? `${car.mileage.toLocaleString("uk-UA")} km`
        : "";

    return (
        <article className={styles.card} data-card-id={car.id}>
            <div className={styles.cardImageWrapper}>
                <Image
                    className={styles.cardImage}
                    src={car.img || "/hero-bg.webp"}
                    alt={`${car.brand} ${car.model}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1440px) 276px, 276px"
                />
                <button
                    className={`${styles.favoriteButton} ${
                        isFav ? styles.favoriteButtonActive : ""
                    }`}
                    type="button"
                    aria-label={
                        isFav ? "Remove from favorites" : "Add to favorites"
                    }
                    onClick={() => toggleFavorite(String(car.id))}
                >
                    {isFav ? (
                        <FaHeart className={styles.favoriteIcon} />
                    ) : (
                        <FiHeart className={styles.favoriteIcon} />
                    )}
                </button>
            </div>

            <div className={styles.cardDescriptionWrapper}>
                <div className={styles.cardTitleWrapper}>
                    <h3 className={styles.carHeading}>
                        {car.brand}{" "}
                        <span className={styles.carModel}>{car.model}</span>,{" "}
                        {car.year}
                    </h3>
                    <span className={styles.carPrice}>
                        ${car.rentalPrice?.replace(/[^0-9]/g, "")}
                    </span>
                </div>

                <div className={styles.cardDetailsWrapper}>
                    <ul className={styles.detailsList}>
                        <li className={styles.detailsItem}>{city}</li>
                        <li className={styles.detailsItem}>{country}</li>
                        <li
                            className={`${styles.detailsItem} ${styles.companyItem}`}
                        >
                            {car.rentalCompany}
                        </li>
                    </ul>
                    <ul className={styles.detailsList}>
                        <li className={styles.detailsItem}>{car.type}</li>
                        <li className={styles.detailsItem}>
                            {formattedMileage}
                        </li>
                    </ul>
                </div>
            </div>

            <Button
                href={`/catalog/${car.id}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="full"
            >
                Read more
            </Button>
        </article>
    );
}
