"use client";

import { useEffect, useState, useMemo } from "react";
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

/* Main catalog interactive view managing URL filters, infinite query state, and grid rendering */
export default function CatalogView() {
    /* Scroll to top when catalog mounts */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { favorites } = useFavoritesStore();

    /* Initialize filter state parsing query parameters */
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

    /* Fetch available brands for filter dropdown */
    const { data: filtersData } = useCarFilters();
    const brandsList = filtersData?.brands || [];

    /* Infinite query hook for paginated car retrieval */
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

    /* Flatten paginated response into a single car collection */
    const allCars = useMemo(() => {
        return data?.pages.flatMap((page) => page.cars) || [];
    }, [data]);

    /* Filter cars locally when favorites toggle is active */
    const displayedCars = useMemo(() => {
        if (!filters.onlyFavorites) return allCars;

        const favoriteSet = new Set(favorites.map((id) => String(id)));
        return allCars.filter((car) => favoriteSet.has(String(car.id)));
    }, [allCars, filters.onlyFavorites, favorites]);

    /* Apply updated filters and trigger query refetch */
    const handleApplyFilters = (newFilters: CarFilters) => {
        setFilters(newFilters);
    };

    /* Reset query parameters in URL and clear local filter state */
    const handleResetFilters = () => {
        router.push(pathname, { scroll: false });
        setFilters({});
    };

    /* Central loading indicator flag */
    const showListLoader = isLoading || (isFetching && !isFetchingNextPage);

    return (
        <section aria-labelledby="catalog-heading">
            <h2 id="catalog-heading" className="visually-hidden">
                Available Cars
            </h2>

            {/* Filter panel bar */}
            <Filters
                key={searchParams.toString()}
                brandsList={brandsList}
                onApplyFilters={handleApplyFilters}
                onResetFilters={handleResetFilters}
                isLoading={showListLoader}
            />

            <div
                className={styles.contentContainer}
                aria-busy={showListLoader}
                aria-live="polite"
            >
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

                {/* Semantic list of cars */}
                {displayedCars.length > 0 && (
                    <ul
                        className={styles.carsGrid}
                        aria-label="Available cars catalog"
                    >
                        {displayedCars.map((car) => (
                            <li key={car.id} className={styles.carGridItem}>
                                <CarCard car={car} />
                            </li>
                        ))}
                    </ul>
                )}

                {/* Pagination load more trigger */}
                {!isLoading && hasNextPage && !filters.onlyFavorites && (
                    <div className={styles.loadMoreWrapper}>
                        <Button
                            variant="outline"
                            size="compact"
                            onClick={() => fetchNextPage()}
                            disabled={isFetchingNextPage || showListLoader}
                            aria-label="Load more rental cars"
                        >
                            {isFetchingNextPage ? "Loading..." : "Load more"}
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}
