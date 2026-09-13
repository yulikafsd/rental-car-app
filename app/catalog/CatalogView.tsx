"use client";

import { useState, useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import Filters from "@/components/Filters/Filters";
import CarCard from "@/components/CarCard/CarCard";
import Button from "@/components/Button/Button";
import Loader from "@/components/Loader/Loader";
import NoResults from "@/components/NoResults/NoResults";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

import { useCars } from "@/hooks/useCars";
import { useCarFilters } from "@/hooks/useCarFilters";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { CarFilters } from "@/types/car";
import styles from "./CatalogView.module.css";

export default function CatalogView() {
    const router = useRouter();
    const pathname = usePathname();

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
        isFetching,
        isError,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
        refetch,
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
        router.push(pathname, { scroll: false });
        setFilters({});
    };

    const showListLoader = isLoading || (isFetching && !isFetchingNextPage);

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
                isLoading={showListLoader}
            />

            <div className={styles.contentWrapper}>
                {showListLoader && <Loader />}

                {isError && (
                    <ErrorMessage
                        title="Error loading cars"
                        message="Failed to load the car list. Please try again later."
                        onRetry={() => refetch()}
                    />
                )}

                {!isLoading && !isError && displayedCars.length === 0 && (
                    <NoResults onReset={handleResetFilters} />
                )}

                {displayedCars.length > 0 && (
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
                            disabled={isFetchingNextPage || showListLoader}
                        >
                            {isFetchingNextPage ? "Loading..." : "Load more"}
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}
