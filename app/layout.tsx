import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

// import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

// import Header from "@/components/Header/Header";
// import Footer from "@/components/Footer/Footer";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-roboto",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Rental Car App",
    description: "A simple and efficient note-taking application",
    openGraph: {
        title: "Rental Car App",
        description: "A simple and efficient note-taking application",
        url: "https://rental-car-app-yu-za.vercel.app/",
        images: [
            {
                url: "",
                width: 1200,
                height: 630,
                alt: "NoteHub Preview",
            },
        ],
        type: "website",
    },
};

interface RootLayoutProps {
    children: React.ReactNode;
    modal: React.ReactNode;
}

export default function RootLayout({
    children,
    modal,
}: Readonly<RootLayoutProps>) {
    return (
        <html lang="en">
            <body className={roboto.variable} suppressHydrationWarning>
                {/* <TanStackProvider>
                    <Header /> */}
                <main>{children}</main>
                {modal}
                {/* <Footer />
                </TanStackProvider> */}
            </body>
        </html>
    );
}
