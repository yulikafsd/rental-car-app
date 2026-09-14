// Represents geographic location details for a rental car.
export interface Location {
    country: string;
    city: string;
    address: string;
}

// Core entity representing a car item returned by the API.
export interface Car {
    id: string;
    year: number;
    brand: string;
    model: string;
    type: string;
    img: string;
    description: string;
    fuelConsumption: string;
    engine: string;
    features: string[];
    rentalPrice: string;
    rentalCompany: string;
    location: Location;
    rentalConditions: string[];
    mileage: number;
}

// Paginated response structure returned by GET /cars.
export interface CarsResponse {
    cars: Car[];
    totalCars: number;
    page: number;
    totalPages: number;
    perPage?: number;
}

// Available filter bounds returned by GET /cars/filters.
export interface FilterMetadata {
    brands: string[];
    price: {
        min: number;
        max: number;
    };
}

// Query parameters strictly supported by the GET /cars backend endpoint.
export interface CarsQueryParams {
    brand?: string;
    price?: number;
    minMileage?: number;
    maxMileage?: number;
    page?: number;
    perPage?: number;
}

// UI filter state used across catalog components and client-side filtering.
export interface CarFilters {
    brand?: string;
    // 👍 Kept price/pricePerHour aligned with the API query expectations
    price?: number;
    pricePerHour?: number;
    minMileage?: number;
    maxMileage?: number;
    onlyFavorites?: boolean;
}

// Payload required for creating a booking request via POST /cars/{carId}/booking-requests.
export interface BookingRequest {
    name: string;
    email: string;
    comment?: string;
}

// Success response schema for a booking submission.
export interface BookingResponse {
    message: string;
}

// Generic API error shape for typed error handling with React Hot Toast.
export interface ApiErrorResponse {
    message: string;
    status?: number;
}
