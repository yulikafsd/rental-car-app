"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Filters from "@/components/Filters/Filters";
import CarCard from "@/components/CarCard/CarCard";
import Button from "@/components/Button/Button";
import { useCars } from "@/hooks/useCars";
import { useCarFilters } from "@/hooks/useCarFilters";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { CarFilters } from "@/types/car";
import styles from "./CatalogView.module.css";

export default function CatalogView() {
    const searchParams = useSearchParams();
    const { favorites } = useFavoritesStore();

    const [filters, setFilters] = useState<CarFilters>(() => ({
        brand: searchParams.get("brand") || undefined,
        pricePerHour: searchParams.get("pricePerHour")
            ? Number(searchParams.get("pricePerHour"))
            : undefined,
        minMileage: searchParams.get("minMileage")
            ? Number(searchParams.get("minMileage"))
            : undefined,
        maxMileage: searchParams.get("maxMileage")
            ? Number(searchParams.get("maxMileage"))
            : undefined,
        onlyFavorites:
            searchParams.get("onlyFavorites") === "true" || undefined,
    }));

    const { data: filtersData } = useCarFilters();
    const brandsList = filtersData?.brands || [];

    const {
        data,
        isLoading,
        isError,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    } = useCars({ filters });

    const allCars = useMemo(() => {
        return data?.pages.flatMap((page) => page.cars) || [];
    }, [data]);

    const displayedCars = useMemo(() => {
        if (!filters.onlyFavorites) return allCars;

        const favoriteSet = new Set(favorites.map((id) => String(id)));
        return allCars.filter((car) => favoriteSet.has(String(car.id)));
    }, [allCars, filters.onlyFavorites, favorites]);

    const handleApplyFilters = (newFilters: CarFilters) => {
        setFilters(newFilters);
    };

    const handleResetFilters = () => {
        setFilters({});
    };

    return (
        <section aria-labelledby="catalog-heading">
            <h2 id="catalog-heading" className="visually-hidden">
                Available Cars
            </h2>
            <Filters
                key={searchParams.toString()}
                brandsList={brandsList}
                onApplyFilters={handleApplyFilters}
                onResetFilters={handleResetFilters}
            />
            {isLoading && (
                <div
                    role="status"
                    aria-live="polite"
                    className={styles.loadingWrapper}
                >
                    <h3>Loading cars...</h3>
                    <p>Please wait while we fetch the best cars for you</p>
                </div>
            )}
            {isError && (
                <div role="alert" className={styles.errorWrapper}>
                    <h3>Error loading cars</h3>
                    <p>Failed to load the car list. Please try again later.</p>
                </div>
            )}
            {!isLoading && !isError && displayedCars.length === 0 && (
                <div className={styles.emptyStateWrapper}>
                    <h3>No cars found</h3>
                    <p>
                        We couldn’t find any cars that match your current
                        filters. Try changing your search criteria or reset the
                        filters.
                    </p>
                    <Button
                        variant="outline"
                        size="compact"
                        onClick={handleResetFilters}
                    >
                        Reset filters
                    </Button>
                </div>
            )}
            {!isLoading && displayedCars.length > 0 && (
                <div className={styles.carsGrid}>
                    {displayedCars.map((car) => (
                        <CarCard key={car.id} car={car} />
                    ))}
                </div>
            )}
            {!isLoading && hasNextPage && !filters.onlyFavorites && (
                <div className={styles.loadMoreWrapper}>
                    <Button
                        variant="outline"
                        size="compact"
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                    >
                        {isFetchingNextPage ? "Loading..." : "Load more"}
                    </Button>
                </div>
            )}
        </section>
    );
}
