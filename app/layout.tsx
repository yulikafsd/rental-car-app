import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

import QueryProvider from "@/providers/QueryProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const manrope = Manrope({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-manrope",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://rental-car-app-yu-za.vercel.app"),
    title: "Rental Car App",
    description: "Find and rent your perfect car easily and quickly.",
    icons: {
        icon: "/favicon.png",
    },
    openGraph: {
        title: "Rental Car App",
        description: "Find and rent your perfect car easily and quickly.",
        url: "https://rental-car-app-yu-za.vercel.app/",
        images: [
            {
                url: "https://rental-car-app-yu-za.vercel.app/hero-bg.webp",
                width: 1440,
                height: 700,
                alt: "Rental Car Preview",
            },
        ],
        type: "website",
    },
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
    return (
        <html lang="en">
            <body className={manrope.variable} suppressHydrationWarning>
                <QueryProvider>
                    <Header />
                    <main>{children}</main>
                    <Toaster position="top-right" />
                    <Footer />
                </QueryProvider>
            </body>
        </html>
    );
}
