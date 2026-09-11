import { useQuery } from "@tanstack/react-query";
import { fetchCarFilters } from "@/services/api";
import { FilterMetadata } from "@/types/car";

export const useCarFilters = () => {
    return useQuery<FilterMetadata, Error>({
        queryKey: ["carFilters"],
        queryFn: fetchCarFilters,
        staleTime: Infinity,
    });
};
