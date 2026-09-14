import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// State interface for favorite car identifiers
interface FavoritesState {
    favorites: string[];
    toggleFavorite: (id: string) => void;
    isFavorite: (id: string) => boolean;
}

// Global Zustand store persisting favorite car IDs to local storage
export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            favorites: [],
            toggleFavorite: (id: string) => {
                const targetId = String(id);
                const { favorites } = get();
                const isFav = favorites.includes(targetId);

                set({
                    favorites: isFav
                        ? favorites.filter((favId) => favId !== targetId)
                        : [...favorites, targetId],
                });
            },
            isFavorite: (id: string) => get().favorites.includes(String(id)),
        }),
        {
            name: "rental-car-favorites",
            // Explicitly guard storage access for SSR/Next.js environment
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
