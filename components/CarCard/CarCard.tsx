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
    priority?: boolean;
}

/* Vehicle catalog card displaying imagery, metadata specifications, and booking CTA */
export default function CarCard({ car, priority = false }: CarCardProps) {
    /* Favorites store integration for persistent state handling */
    const isFav = useFavoritesStore((state) =>
        state.favorites.includes(String(car.id)),
    );
    const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

    /* Destructure location safely to avoid runtime errors on undefined fields */
    const city = car.location?.city || "";
    const country = car.location?.country || "";

    /* Extract numeric price value */
    const price = car.rentalPrice ? car.rentalPrice.replace(/[^0-9]/g, "") : "";

    /* Format mileage with space delimiter */
    const formattedMileage = car.mileage
        ? `${car.mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} km`
        : "";

    /* Text representation constructed for smooth and cohesive screen reader announcement */
    const screenReaderSpecs = [
        city,
        country,
        car.rentalCompany,
        car.type,
        formattedMileage ? `mileage ${formattedMileage}` : "",
    ]
        .filter(Boolean)
        .join(", ");

    return (
        <article className={styles.card} data-card-id={car.id}>
            {/* Visual media container */}
            <div className={styles.cardImageWrapper}>
                <Image
                    className={styles.cardImage}
                    src={car.img || "/hero-bg.webp"}
                    alt={`${car.brand} ${car.model}`}
                    fill
                    sizes="(max-width: 768px) 360px, 244px"
                    priority={priority}
                />

                {/* Accessible toggle button for favorites */}
                <button
                    className={`${styles.favoriteButton} ${
                        isFav ? styles.favoriteButtonActive : ""
                    }`}
                    type="button"
                    aria-label={
                        isFav
                            ? `Remove ${car.brand} ${car.model} from favorites`
                            : `Add ${car.brand} ${car.model} to favorites`
                    }
                    aria-pressed={isFav}
                    onClick={() => toggleFavorite(String(car.id))}
                >
                    {isFav ? (
                        <FaHeart
                            className={styles.favoriteIcon}
                            aria-hidden="true"
                        />
                    ) : (
                        <FiHeart
                            className={styles.favoriteIcon}
                            aria-hidden="true"
                        />
                    )}
                </button>
            </div>

            {/* Main card body with title, price and specifications */}
            <div className={styles.cardDescriptionWrapper}>
                <div className={styles.cardTitleWrapper}>
                    <h3 className={styles.carHeading}>
                        {car.brand}{" "}
                        <span className={styles.carModel}>{car.model}</span>,{" "}
                        {car.year}
                    </h3>
                    <span className={styles.carPrice}>${price}</span>
                </div>

                {/* Accessible block: announces entire specification coherently while hiding fragmented lists */}
                <div className={styles.cardDetailsWrapper}>
                    <span className="visually-hidden">
                        Specifications: {screenReaderSpecs}
                    </span>

                    {/* Visual layout lists hidden from assistive tech to eliminate fragmented reading */}
                    <div aria-hidden="true">
                        {/* First row: City, Country, Rental Company */}
                        <ul className={styles.detailsList}>
                            <li className={styles.detailsItem}>{city}</li>
                            <li className={styles.detailsItem}>{country}</li>
                            <li
                                className={`${styles.detailsItem} ${styles.companyItem}`}
                            >
                                {car.rentalCompany}
                            </li>
                        </ul>

                        {/* Second row: Type, Mileage */}
                        <ul className={styles.detailsList}>
                            <li className={styles.detailsItem}>{car.type}</li>
                            <li
                                className={`${styles.detailsItem} ${styles.mileageItem}`}
                            >
                                {formattedMileage}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Navigation CTA button */}
            <Button
                href={`/catalog/${car.id}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="full"
                aria-label={`Read more about ${car.brand} ${car.model} (opens in new tab)`}
            >
                Read more
            </Button>
        </article>
    );
}
