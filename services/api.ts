import axios from "axios";
import {
    CarsResponse,
    FilterMetadata,
    Car,
    CarFilters,
    BookingRequest,
    BookingResponse,
} from "@/types/car";

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export interface FetchCarsParams {
    page?: number;
    perPage?: number;
    filters?: CarFilters;
}

export interface SendBookingParams {
    carId: string;
    bookingData: BookingRequest;
}

export const fetchCars = async ({
    page = 1,
    perPage = 12,
    filters = {},
}: FetchCarsParams = {}): Promise<CarsResponse> => {
    const { data } = await apiClient.get<CarsResponse>("/cars", {
        params: {
            page,
            perPage,
            ...filters,
        },
    });
    return data;
};

export const fetchCarFilters = async (): Promise<FilterMetadata> => {
    const { data } = await apiClient.get<FilterMetadata>("/cars/filters");
    return data;
};

export const fetchCarById = async (id: string): Promise<Car> => {
    const { data } = await apiClient.get<Car>(`/cars/${id}`);
    return data;
};

export const sendBookingRequest = async ({
    carId,
    bookingData,
}: SendBookingParams): Promise<BookingResponse> => {
    const { data } = await apiClient.post<BookingResponse>(
        `/cars/${carId}/booking-requests`,
        bookingData,
    );
    return data;
};
