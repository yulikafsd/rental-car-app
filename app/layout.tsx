import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "modern-normalize/modern-normalize.css";
import "./globals.css";

import QueryProvider from "@/providers/QueryProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

// Configure Manrope variable font with required weights
const manrope = Manrope({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-manrope",
    display: "swap",
});

// Global metadata with title template and relative OpenGraph URLs using metadataBase
export const metadata: Metadata = {
    metadataBase: new URL("https://rental-car-app-yu-za.vercel.app"),
    title: {
        default: "Rental Car App - Find Your Perfect Rental Car",
        template: "%s | Rental Car App",
    },
    description: "Find and rent your perfect car easily and quickly.",
    icons: {
        icon: "/favicon.png",
    },
    openGraph: {
        title: "Rental Car App",
        description: "Find and rent your perfect car easily and quickly.",
        url: "/",
        images: [
            {
                url: "/hero-bg.webp",
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

// Root layout providing global font variable, React Query context, header, footer, and toast notifications
export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
    return (
        <html lang="en">
            <body className={manrope.variable} suppressHydrationWarning>
                <QueryProvider>
                    <Header />
                    <main>{children}</main>
                    {/* Styled toaster matching application font and color palette */}
                    <Toaster
                        position="top-right"
                        toastOptions={{
                            duration: 3500,
                            style: {
                                fontFamily: "var(--font-manrope), sans-serif",
                                fontSize: "14px",
                                color: "var(--color-dark)",
                                background: "var(--color-white)",
                                border: "2px solid var(--color-light-blue)",
                            },
                        }}
                    />
                    <Footer />
                </QueryProvider>
            </body>
        </html>
    );
}
