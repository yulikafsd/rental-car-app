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

const FILTER_KEY_MAP: Record<keyof Omit<CarFilters, "onlyFavorites">, string> =
    {
        brand: "brand",
        pricePerHour: "price",
        minMileage: "minMileage",
        maxMileage: "maxMileage",
    };

export const fetchCars = async ({
    page = 1,
    perPage = 12,
    filters = {},
}: FetchCarsParams = {}): Promise<CarsResponse> => {
    const queryParams: Record<string, unknown> = {
        page,
        perPage,
    };

    Object.entries(filters).forEach(([key, val]) => {
        const apiKey = FILTER_KEY_MAP[key as keyof typeof FILTER_KEY_MAP];
        if (apiKey && val !== undefined && val !== "") {
            queryParams[apiKey] = val;
        }
    });

    const { data } = await apiClient.get<CarsResponse>("/cars", {
        params: queryParams,
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
