import { Metadata } from "next";
import { fetchCarById } from "@/services/api";
import CarDetailsView from "./CarDetailsView";

interface PageProps {
    params: Promise<{ carId: string }>;
}

/* Dynamic metadata generation resolving vehicle details from API */
export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { carId } = await params;

    try {
        const car = await fetchCarById(carId);

        const title = `${car.brand} ${car.model} (${car.year})`;
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
                        url: car.img || "/hero-bg.webp",
                        width: 1200,
                        height: 630,
                        alt: `${car.brand} ${car.model}`,
                    },
                ],
            },
        };
    } catch {
        return {
            title: "Car Details",
            description: "View detailed car specifications and book your ride.",
            openGraph: {
                images: [
                    {
                        url: "/hero-bg.webp",
                        width: 1200,
                        height: 630,
                        alt: "Rental Car Details",
                    },
                ],
            },
        };
    }
}

/* Vehicle detail route entry point passing resolved parameter to client presentation */
export default async function CarDetailsPage({ params }: PageProps) {
    const { carId } = await params;

    return <CarDetailsView carId={carId} />;
}
