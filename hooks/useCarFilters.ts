import { useQuery } from "@tanstack/react-query";
import { fetchCarFilters } from "@/services/api";
import { FilterMetadata } from "@/types/car";

// Hook to fetch available car filter metadata (brands and price bounds)
export const useCarFilters = () => {
    return useQuery<FilterMetadata, Error>({
        queryKey: ["carFilters"],
        queryFn: fetchCarFilters,
        // Keep filter metadata fresh indefinitely since available brands rarely change
        staleTime: Infinity,
        // Retain cache in memory across navigation between pages
        gcTime: 1000 * 60 * 60 * 24,
    });
};
