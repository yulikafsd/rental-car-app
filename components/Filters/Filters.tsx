"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Button from "@/components/Button/Button";
import { CarFilters } from "@/types/car";
import CustomSelect from "./СustomSelect/CustomSelect";
import MileageFilter from "./MileageFilter/MileageFilter";
import styles from "./Filters.module.css";

interface FiltersProps {
    brandsList: string[];
    onApplyFilters: (filters: CarFilters) => void;
    onResetFilters: () => void;
}

interface FormValues {
    brand: string;
    pricePerHour: string;
    minMileage: string;
    maxMileage: string;
    onlyFavorites: boolean;
}

const DEFAULT_VALUES: FormValues = {
    brand: "",
    pricePerHour: "",
    minMileage: "",
    maxMileage: "",
    onlyFavorites: false,
};

const NUMERIC_KEYS = new Set(["pricePerHour", "minMileage", "maxMileage"]);

const PRICE_OPTIONS = Array.from({ length: 13 }, (_, i) => ({
    value: String((i + 3) * 10),
    label: `To $${(i + 3) * 10}`,
}));

export default function Filters({
    brandsList,
    onApplyFilters,
    onResetFilters,
}: FiltersProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [values, setValues] = useState<FormValues>(() => ({
        brand: searchParams.get("brand") || "",
        pricePerHour: searchParams.get("pricePerHour") || "",
        minMileage: searchParams.get("minMileage") || "",
        maxMileage: searchParams.get("maxMileage") || "",
        onlyFavorites: searchParams.get("onlyFavorites") === "true",
    }));

    const handleChange = <K extends keyof FormValues>(
        key: K,
        value: FormValues[K],
    ) => {
        setValues((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const params = new URLSearchParams();
        Object.entries(values).forEach(([key, val]) => {
            if (val) params.set(key, String(val));
        });

        const queryString = params.toString();
        router.push(queryString ? `${pathname}?${queryString}` : pathname, {
            scroll: false,
        });

        const parsedFilters = Object.entries(values).reduce<CarFilters>(
            (acc, [key, val]) => {
                if (!val) return acc;
                return {
                    ...acc,
                    [key]: NUMERIC_KEYS.has(key) ? Number(val) : val,
                };
            },
            {},
        );

        onApplyFilters(parsedFilters);
    };

    const handleReset = () => {
        setValues(DEFAULT_VALUES);
        router.push(pathname, { scroll: false });
        onResetFilters();
    };

    const formattedBrands = brandsList.map((b) => ({
        value: b,
        label: b,
    }));

    return (
        <form className={styles.filtersForm} onSubmit={handleSubmit}>
            <CustomSelect
                id="brand-select"
                label="Car brand"
                placeholder="Choose a brand"
                value={values.brand}
                options={formattedBrands}
                onChange={(val) => handleChange("brand", val)}
            />

            <CustomSelect
                id="price-select"
                label="Price/ 1 hour"
                placeholder="Choose a price"
                value={values.pricePerHour}
                options={PRICE_OPTIONS}
                onChange={(val) => handleChange("pricePerHour", val)}
            />

            <MileageFilter
                fromValue={values.minMileage}
                toValue={values.maxMileage}
                onChangeFrom={(val) => handleChange("minMileage", val)}
                onChangeTo={(val) => handleChange("maxMileage", val)}
            />

            <div className={`${styles.filterGroup} ${styles.checkboxGroup}`}>
                <label
                    className={styles.checkboxLabel}
                    htmlFor="only-favorites"
                >
                    <input
                        id="only-favorites"
                        className={styles.filterCheckbox}
                        type="checkbox"
                        checked={values.onlyFavorites}
                        onChange={(e) =>
                            handleChange("onlyFavorites", e.target.checked)
                        }
                    />
                    Only
                    <br />
                    favorites
                </label>
            </div>

            <div className={styles.filterActions}>
                <Button type="submit" variant="primary" size="compact">
                    Search
                </Button>
                <button
                    type="button"
                    className={styles.clearFiltersButton}
                    onClick={handleReset}
                >
                    Clear filters
                </button>
            </div>
        </form>
    );
}
