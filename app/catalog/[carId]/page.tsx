import { Metadata } from "next";
import { fetchCarById } from "@/services/api";
import CarDetailsView from "./CarDetailsView";

interface PageProps {
    params: Promise<{ carId: string }>;
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { carId } = await params;

    try {
        const car = await fetchCarById(carId);

        const title = `${car.brand} ${car.model} (${car.year}) | Rental Car`;
        const description =
            car.description ||
            `Rent ${car.brand} ${car.model} (${car.year}) for $${car.rentalPrice}/day.`;

        return {
            title,
            description,
            openGraph: {
                title,
                description,
                images: [
                    {
                        url:
                            car.img ||
                            "https://rental-car-app-yu-za.vercel.app/hero-bg.webp",
                    },
                ],
            },
        };
    } catch {
        return {
            title: "Car Details | Rental Car",
            description: "View detailed car specifications and book your ride.",
            openGraph: {
                images: [
                    {
                        url: "https://rental-car-app-yu-za.vercel.app/hero-bg.webp",
                    },
                ],
            },
        };
    }
}

export default function CarDetailsPage({ params }: PageProps) {
    return <CarDetailsView params={params} />;
}
