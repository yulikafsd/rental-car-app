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

export interface Location {
    country: string;
    city: string;
    address: string;
}

export interface CarsResponse {
    cars: Car[];
    totalCars: number;
    page: number;
    totalPages: number;
    perPage?: number;
}

export interface FilterMetadata {
    brands: string[];
    price: {
        min: number;
        max: number;
    };
}

export interface CarFilters {
    brand?: string;
    pricePerHour?: number;
    minMileage?: number;
    maxMileage?: number;
    onlyFavorites?: boolean;
}

export interface BookingRequest {
    name: string;
    email: string;
    comment?: string;
    carName?: string;
}

export interface BookingResponse {
    message: string;
}
