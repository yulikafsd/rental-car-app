import { Suspense } from "react";
import type { Metadata } from "next";
import CatalogView from "./CatalogView";

export const metadata: Metadata = {
    title: "Car Catalog | RentalCar",
    description:
        "Browse and rent reliable cars at the best prices with RentalCar.",
    openGraph: {
        title: "Car Catalog | RentalCar",
        description:
            "Browse and rent reliable cars at the best prices with RentalCar.",
        url: "https://rental-car-app-yu-za.vercel.app/catalog",
        images: [
            {
                url: "https://rental-car-app-yu-za.vercel.app/hero-bg.webp",
                width: 1440,
                height: 700,
                alt: "Rental Car Catalog Preview",
            },
        ],
        type: "website",
    },
};

export default function CatalogPage() {
    return (
        <div className="container">
            <h1 className="visually-hidden">Car Rental Catalog</h1>
            <Suspense
                fallback={
                    <div
                        role="status"
                        aria-live="polite"
                        className="loadingWrapper"
                    >
                        <p>Loading catalog...</p>
                    </div>
                }
            >
                <CatalogView />
            </Suspense>
        </div>
    );
}
