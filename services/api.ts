import axios from "axios";
import {
    CarsResponse,
    FilterMetadata,
    Car,
    CarFilters,
    BookingRequest,
    BookingResponse,
} from "@/types/car";

// Default fallback URL to prevent runtime crashes if env variable is omitted
const BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://car-rental-api.goit.study";

// Axios instance configured for car rental REST API
const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Parameters for fetching paginated cars list with optional filters
export interface FetchCarsParams {
    page?: number;
    perPage?: number;
    filters?: CarFilters;
}

// Payload parameters required for submitting a booking request
export interface SendBookingParams {
    carId: string;
    bookingData: BookingRequest;
}

// Map client-side filter keys to backend query parameter names
const FILTER_KEY_MAP: Record<string, string> = {
    brand: "brand",
    price: "price",
    pricePerHour: "price",
    minMileage: "minMileage",
    maxMileage: "maxMileage",
};

// Fetch cars with pagination and filter parameters from backend
export const fetchCars = async ({
    page = 1,
    perPage = 12,
    filters = {},
}: FetchCarsParams = {}): Promise<CarsResponse> => {
    const queryParams: Record<string, unknown> = {
        page,
        perPage,
    };

    // Convert numeric filter values to numbers to satisfy backend schema and avoid 400 Bad Request
    Object.entries(filters).forEach(([key, val]) => {
        const apiKey = FILTER_KEY_MAP[key];
        if (apiKey && val !== undefined && val !== "" && val !== null) {
            if (
                apiKey === "price" ||
                apiKey === "minMileage" ||
                apiKey === "maxMileage"
            ) {
                const numericVal = Number(val);
                if (!Number.isNaN(numericVal)) {
                    queryParams[apiKey] = numericVal;
                }
            } else {
                queryParams[apiKey] = val;
            }
        }
    });

    const { data } = await apiClient.get<CarsResponse>("/cars", {
        params: queryParams,
    });
    return data;
};

// Fetch metadata for available filters (brands list and min/max prices)
export const fetchCarFilters = async (): Promise<FilterMetadata> => {
    const { data } = await apiClient.get<FilterMetadata>("/cars/filters");
    return data;
};

// Fetch detailed information for a single car by its UUID
export const fetchCarById = async (id: string): Promise<Car> => {
    const { data } = await apiClient.get<Car>(`/cars/${id}`);
    return data;
};

// Submit rental booking request for a specific car
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
