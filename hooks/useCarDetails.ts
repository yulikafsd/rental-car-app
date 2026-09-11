import { useQuery, useMutation } from "@tanstack/react-query";
import {
    fetchCarById,
    sendBookingRequest,
    SendBookingParams,
} from "@/services/api";
import { Car, BookingResponse } from "@/types/car";

export const useCarDetails = (carId: string) => {
    return useQuery<Car, Error>({
        queryKey: ["car", carId],
        queryFn: () => fetchCarById(carId),
        enabled: Boolean(carId),
    });
};

export const useBookCar = () => {
    return useMutation<BookingResponse, Error, SendBookingParams>({
        mutationFn: (params: SendBookingParams) => sendBookingRequest(params),
    });
};
