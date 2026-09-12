import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
    favorites: string[];
    toggleFavorite: (id: string) => void;
    isFavorite: (id: string) => boolean;
}

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
        },
    ),
);
