"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, ReactNode } from "react";

// Props interface for React Query client provider wrapper
interface QueryProviderProps {
    children: ReactNode;
}

// Global TanStack Query provider component for Next.js App Router
export default function QueryProvider({ children }: QueryProviderProps) {
    // useState for QueryClient to instantiate only once per component lifecycle
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                        // Cache stays fresh for 1 minute before refetching in background
                        staleTime: 60 * 1000,
                        // Unused inactive queries remain in memory cache for 5 minutes
                        gcTime: 5 * 60 * 1000,
                        // Retry failed queries once instead of default 3 to reduce redundant network hits
                        retry: 1,
                    },
                },
            }),
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
