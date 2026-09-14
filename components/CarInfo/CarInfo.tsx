import { JSX } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoCarSportOutline, IoLocationOutline } from "react-icons/io5";
import { BsCalendar4Week, BsFuelPump } from "react-icons/bs";
import { PiRoadHorizonLight } from "react-icons/pi";
import { FiSettings } from "react-icons/fi";

import { Car } from "@/types/car";
import styles from "./CarInfo.module.css";

interface CarInfoProps {
    car: Car;
}

interface SpecificationItem {
    id: string;
    label: string;
    value: string | number | undefined;
    icon: JSX.Element;
}

// Visual checklist section config for conditions and features
interface ChecklistSection {
    title: string;
    ariaLabel: string;
    items: string[] | undefined;
}

/* Vehicle detail view presenting full specifications, conditions, and pricing */
export default function CarInfo({ car }: CarInfoProps) {
    /* Safely format location or fallback */
    const locationString = car.location
        ? `${car.location.city}, ${car.location.country}`
        : "Location unknown";

    /* Format mileage with uniform space separator matching design specifications */
    const formattedMileage = car.mileage
        ? `${car.mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} km`
        : "N/A";

    /* Extract clean numeric price representation */
    const numericPrice = car.rentalPrice
        ? String(car.rentalPrice).replace(/[^0-9]/g, "")
        : "";

    /* Safe extraction of article id suffix */
    const articleId = car.id ? String(car.id).slice(-4) : "N/A";

    /* Specifications dataset */
    const specifications: SpecificationItem[] = [
        {
            id: "year",
            label: "Year",
            value: car.year,
            icon: (
                <BsCalendar4Week className={styles.icon} aria-hidden="true" />
            ),
        },
        {
            id: "type",
            label: "Type",
            value: car.type,
            icon: (
                <IoCarSportOutline className={styles.icon} aria-hidden="true" />
            ),
        },
        {
            id: "fuelConsumption",
            label: "Fuel Consumption",
            value: car.fuelConsumption,
            icon: <BsFuelPump className={styles.icon} aria-hidden="true" />,
        },
        {
            id: "engine",
            label: "Engine",
            value: car.engine,
            icon: <FiSettings className={styles.icon} aria-hidden="true" />,
        },
        {
            id: "mileage",
            label: "Mileage",
            value: formattedMileage,
            icon: (
                <PiRoadHorizonLight
                    className={styles.icon}
                    aria-hidden="true"
                />
            ),
        },
    ];

    /* Unified checklist sections configuration */
    const checklistSections: ChecklistSection[] = [
        {
            title: "Rental Conditions:",
            ariaLabel: "Rental conditions list",
            items: car.rentalConditions,
        },
        {
            title: "Features:",
            ariaLabel: "Car features list",
            items: car.features,
        },
    ];

    return (
        <article className={styles.card}>
            {/* Header section with vehicle model, article code, location and price */}
            <header className={styles.headerBlock}>
                <div className={styles.titleRow}>
                    <h1 className={styles.title}>
                        {car.brand} {car.model}, {car.year}
                    </h1>
                    <span className={styles.carArticle}>
                        Article: {articleId}
                    </span>
                </div>

                {/* Location row with decorative icon */}
                <div className={styles.locationRow}>
                    <IoLocationOutline
                        size={16}
                        className={styles.locationIcon}
                        aria-hidden="true"
                    />
                    <span>{locationString}</span>
                </div>

                {/* Displayed price block */}
                <div
                    className={styles.price}
                    aria-label={`Rental price: $${numericPrice}`}
                >
                    ${numericPrice}
                </div>

                {/* Vehicle description */}
                <p className={styles.description}>{car.description}</p>
            </header>

            {/* Rental Conditions section */}
            {checklistSections[0].items &&
                checklistSections[0].items.length > 0 && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            {checklistSections[0].title}
                        </h2>
                        <ul
                            className={styles.list}
                            aria-label={checklistSections[0].ariaLabel}
                        >
                            {checklistSections[0].items.map(
                                (condition, idx) => (
                                    <li key={idx} className={styles.listItem}>
                                        <FaRegCircleCheck
                                            className={styles.icon}
                                            aria-hidden="true"
                                        />
                                        <span>{condition}</span>
                                    </li>
                                ),
                            )}
                        </ul>
                    </section>
                )}

            {/* Technical specifications section */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Car Specifications:</h2>
                <ul
                    className={styles.list}
                    aria-label="Car specifications list"
                >
                    {specifications.map((spec) => (
                        <li key={spec.id} className={styles.listItem}>
                            {spec.icon}
                            <span>
                                {spec.label}: {spec.value}
                            </span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Features section */}
            {checklistSections[1].items &&
                checklistSections[1].items.length > 0 && (
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            {checklistSections[1].title}
                        </h2>
                        <ul
                            className={styles.list}
                            aria-label={checklistSections[1].ariaLabel}
                        >
                            {checklistSections[1].items.map((feature, idx) => (
                                <li key={idx} className={styles.listItem}>
                                    <FaRegCircleCheck
                                        className={styles.icon}
                                        aria-hidden="true"
                                    />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
        </article>
    );
}
