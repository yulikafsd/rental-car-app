"use client";

import { use } from "react";
import Image from "next/image";
import { useCarDetails } from "@/hooks/useCarDetails";
import styles from "./page.module.css";

import BookingForm from "@/components/BookingForm/BookingForm";
import CarInfo from "@/components/CarInfo/CarInfo";

interface PageProps {
    params: Promise<{ carId: string }>;
}

export default function CarDetailsPage({ params }: PageProps) {
    const resolvedParams = use(params);
    const carId = resolvedParams.carId;

    const { data: car, isLoading, isError } = useCarDetails(carId);

    if (isLoading) {
        return (
            <div className={styles.loadingState}>
                <p>Loading car details...</p>
            </div>
        );
    }

    if (isError || !car) {
        return (
            <div className={styles.errorState}>
                <p>Car not found or failed to load.</p>
            </div>
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
