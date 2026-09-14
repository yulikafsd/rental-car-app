"use client";

import Image from "next/image";
import { useCarDetails } from "@/hooks/useCarDetails";
import BookingForm from "@/components/BookingForm/BookingForm";
import CarInfo from "@/components/CarInfo/CarInfo";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import styles from "./page.module.css";

interface CarDetailsViewProps {
    carId: string;
}

/* Vehicle presentation container coordinating media, booking form, and technical specifications */
export default function CarDetailsView({ carId }: CarDetailsViewProps) {
    const { data: car, isLoading, isError, refetch } = useCarDetails(carId);

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
                onRetry={() => refetch()}
            />
        );
    }

    return (
        /* Section with car specifications, image and booking form */
        <section
            className="container"
            aria-label={`${car.brand} ${car.model} details`}
        >
            <div className={styles.articleWrapper}>
                <div className={styles.articleGrid}>
                    {/* Left media and interaction column */}
                    <div className={styles.leftColumn}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src={car.img || "/hero-bg.webp"}
                                alt={`${car.brand} ${car.model}`}
                                fill
                                priority
                                sizes="(max-width: 1024px) 100vw, 640px"
                                className={styles.carImage}
                            />
                        </div>

                        <BookingForm carId={car.id} />
                    </div>

                    {/* Right specifications column */}
                    <div className={styles.rightColumn}>
                        <CarInfo car={car} />
                    </div>
                </div>
            </div>
        </section>
    );
}
