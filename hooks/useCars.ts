import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchCars } from "@/services/api";
import { CarFilters, CarsResponse } from "@/types/car";

interface UseCarsParams {
    filters: CarFilters;
    perPage?: number;
}

export const useCars = ({ filters, perPage = 12 }: UseCarsParams) => {
    return useInfiniteQuery<CarsResponse, Error>({
        queryKey: ["cars", filters],
        queryFn: ({ pageParam = 1 }) =>
            fetchCars({
                page: pageParam as number,
                perPage,
                filters,
            }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.page < lastPage.totalPages) {
                return lastPage.page + 1;
            }
            return undefined;
        },
        placeholderData: keepPreviousData,
    });
};
