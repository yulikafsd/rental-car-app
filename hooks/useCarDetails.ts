import { useQuery, useMutation } from "@tanstack/react-query";
import {
    fetchCarById,
    sendBookingRequest,
    SendBookingParams,
} from "@/services/api";
import { Car, BookingResponse } from "@/types/car";
import { AxiosError } from "axios";

// Fetch full details of a specific car by ID
export const useCarDetails = (carId: string) => {
    return useQuery<Car, Error>({
        queryKey: ["car", carId],
        queryFn: () => fetchCarById(carId),
        // Prevents executing the query if carId is undefined or empty string
        enabled: Boolean(carId),
        // Cache details for 5 minutes to avoid redundant network hits on tab focus
        staleTime: 1000 * 60 * 5,
    });
};

// Mutation hook for handling car rental reservation requests
export const useBookCar = () => {
    return useMutation<
        BookingResponse,
        AxiosError<{ message?: string }>,
        SendBookingParams
    >({
        mutationFn: sendBookingRequest,
    });
};
