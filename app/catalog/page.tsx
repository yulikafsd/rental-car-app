import { Suspense } from "react";
import type { Metadata } from "next";

import CatalogView from "./CatalogView";
import Loader from "@/components/Loader/Loader";

export const metadata: Metadata = {
    title: "Car Catalog",
    description:
        "Browse and rent reliable cars at the best prices with RentalCar.",
    openGraph: {
        title: "Car Catalog",
        description:
            "Browse and rent reliable cars at the best prices with RentalCar.",
        url: "/catalog",
        images: [
            {
                url: "/hero-bg.webp",
                width: 1440,
                height: 700,
                alt: "Rental Car Catalog Preview",
            },
        ],
        type: "website",
    },
};

/* Catalog page boundary rendering hidden accessibility heading and view container */
export default function CatalogPage() {
    return (
        <section className="container" aria-labelledby="catalog-page-title">
            <h1 id="catalog-page-title" className="visually-hidden">
                Car Rental Catalog
            </h1>
            <Suspense fallback={<Loader />}>
                <CatalogView />
            </Suspense>
        </section>
    );
}
