"use client";

import { use } from "react";
import Image from "next/image";
import { useCarDetails } from "@/hooks/useCarDetails";
import styles from "./page.module.css";

import BookingForm from "@/components/BookingForm/BookingForm";
import CarInfo from "@/components/CarInfo/CarInfo";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

interface CarDetailsViewProps {
    params: Promise<{ carId: string }>;
}

export default function CarDetailsView({ params }: CarDetailsViewProps) {
    const resolvedParams = use(params);
    const carId = resolvedParams.carId;

    const { data: car, isLoading, isError } = useCarDetails(carId);

    if (isLoading) {
        return (
            <Loader
                title="Loading car details..."
                subtitle="Please wait while we load the vehicle specifications"
            />
        );
    }

    if (isError || !car) {
        return (
            <ErrorMessage
                title="Car not found"
                message="Car not found or failed to load. Please try again later."
            />
        );
    }

    return (
        <article className={styles.article}>
            <div className={styles.articleGrid}>
                <div className={styles.leftColumn}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src={car.img || "/hero-bg.webp"}
                            alt={`${car.brand} ${car.model}`}
                            fill
                            priority
                            sizes="(max-width: 1200px) 100vw, 560px"
                            className={styles.carImage}
                        />
                    </div>

                    <BookingForm carId={car.id} />
                </div>

                <div className={styles.rightColumn}>
                    <CarInfo car={car} />
                </div>
            </div>
        </article>
    );
}
