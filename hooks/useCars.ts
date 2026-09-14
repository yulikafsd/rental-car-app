import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchCars } from "@/services/api";
import { CarFilters, CarsResponse } from "@/types/car";

// Input parameters for useCars hook
interface UseCarsParams {
    filters: CarFilters;
    perPage?: number;
}

// Custom hook to handle infinite pagination for car catalog with TanStack Query
export const useCars = ({ filters, perPage = 12 }: UseCarsParams) => {
    return useInfiniteQuery<CarsResponse, Error>({
        // Pass filters directly to track query cache state
        queryKey: ["cars", filters, perPage],
        queryFn: ({ pageParam = 1 }) =>
            fetchCars({
                page: pageParam as number,
                perPage,
                filters,
            }),
        initialPageParam: 1,
        // Calculate next page with strict boundary check
        getNextPageParam: (lastPage) => {
            if (
                lastPage?.page !== undefined &&
                lastPage?.totalPages !== undefined
            ) {
                if (lastPage.page < lastPage.totalPages) {
                    return lastPage.page + 1;
                }
            }
            return undefined;
        },
        placeholderData: keepPreviousData,
    });
};
