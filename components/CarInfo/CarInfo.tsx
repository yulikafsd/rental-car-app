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

export default function CarInfo({ car }: CarInfoProps) {
    const locationString = car.location
        ? `${car.location.city}, ${car.location.country}`
        : "Location unknown, please, contact us";

    return (
        <div className={styles.card}>
            <div className={styles.headerBlock}>
                <div className={styles.titleRow}>
                    <h1 className={styles.title}>
                        {car.brand} {car.model}, {car.year}
                    </h1>
                    <span className={styles.carArticle}>
                        Article: {car.id.slice(-4)}
                    </span>
                </div>

                <div className={styles.locationRow}>
                    <IoLocationOutline size={16} />
                    <span>{locationString}</span>
                </div>

                <div className={styles.price}>${car.rentalPrice}</div>

                <p className={styles.description}>{car.description}</p>
            </div>

            {car.rentalConditions && car.rentalConditions.length > 0 && (
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Rental Conditions:</h2>
                    <ul className={styles.list}>
                        {car.rentalConditions.map((condition, idx) => (
                            <li key={idx} className={styles.listItem}>
                                <FaRegCircleCheck className={styles.icon} />
                                <span>{condition}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Car Specifications:</h2>
                <ul className={styles.list}>
                    <li className={styles.listItem}>
                        <BsCalendar4Week className={styles.icon} />
                        <span>Year: {car.year}</span>
                    </li>
                    <li className={styles.listItem}>
                        <IoCarSportOutline className={styles.icon} />
                        <span>Type: {car.type}</span>
                    </li>
                    <li className={styles.listItem}>
                        <BsFuelPump className={styles.icon} />
                        <span>Fuel Consumption: {car.fuelConsumption}</span>
                    </li>
                    <li className={styles.listItem}>
                        <FiSettings className={styles.icon} />
                        <span>Engine: {car.engine}</span>
                    </li>
                    <li className={styles.listItem}>
                        <PiRoadHorizonLight className={styles.icon} />
                        <span>Mileage: {car.mileage} km</span>
                    </li>
                </ul>
            </div>

            {car.features && car.features.length > 0 && (
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Features:</h2>
                    <ul className={styles.list}>
                        {car.features.map((feature, idx) => (
                            <li key={idx} className={styles.listItem}>
                                <FaRegCircleCheck className={styles.icon} />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
