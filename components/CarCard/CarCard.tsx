"use client";

import Image from "next/image";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

import Button from "@/components/Button/Button";
import { Car } from "@/types/car";
import { useFavoritesStore } from "@/store/useFavoritesStore";

interface CarCardProps {
    car: Car;
}

export default function CarCard({ car }: CarCardProps) {
    // 👍 Реактивна підписка на наявність ID у списку favorites
    const isFav = useFavoritesStore((state) =>
        state.favorites.includes(String(car.id)),
    );
    // 👍 Отримуємо функцію окремо
    const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

    const city = car.location?.city || "";
    const country = car.location?.country || "";

    const formattedMileage = car.mileage
        ? `${car.mileage.toLocaleString("uk-UA")} km`
        : "";

    return (
        <article className="card" data-card-id={car.id}>
            <div className="cardImageWrapper">
                <Image
                    className="cardImage"
                    src={car.img || "/hero-bg.webp"}
                    alt={`${car.brand} ${car.model}`}
                    width={244}
                    height={268}
                />
                <button
                    className={`favoriteButton ${isFav ? "favoriteButtonActive" : ""}`}
                    type="button"
                    aria-label={
                        isFav ? "Remove from favorites" : "Add to favorites"
                    }
                    onClick={() => toggleFavorite(String(car.id))}
                >
                    {isFav ? (
                        <FaHeart className="favoriteIcon" />
                    ) : (
                        <FiHeart className="favoriteIcon" />
                    )}
                </button>
            </div>

            <div className="cardDescriptionWrapper">
                <div className="cardTitleWrapper">
                    <h3 className="carHeading">
                        {car.brand}{" "}
                        <span className="carModel">{car.model}</span>,{" "}
                        {car.year}
                    </h3>
                    <span className="carPrice">
                        ${car.rentalPrice?.replace(/[^0-9]/g, "")}
                    </span>
                </div>

                <div className="cardDetailsWrapper">
                    <ul className="detailsList">
                        <li className="detailsItem">{city}</li>
                        <li className="detailsItem">{country}</li>
                        <li className="detailsItem">{car.rentalCompany}</li>
                    </ul>
                    <ul className="detailsList">
                        <li className="detailsItem">{car.type}</li>
                        <li className="detailsItem">{formattedMileage}</li>
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
