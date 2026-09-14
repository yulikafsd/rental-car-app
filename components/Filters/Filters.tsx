"use client";

import { useState, useMemo, SubmitEvent } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import CustomSelect from "./СustomSelect/CustomSelect";
import MileageFilter from "./MileageFilter/MileageFilter";
import CustomCheckbox from "./CustomCheckbox/CustomCheckbox";
import Button from "@/components/Button/Button";

import { CarFilters } from "@/types/car";
import styles from "./Filters.module.css";

interface FiltersProps {
    brandsList: string[];
    onApplyFilters: (filters: CarFilters) => void;
    onResetFilters: () => void;
    isLoading?: boolean;
}

interface FormValues {
    brand: string;
    pricePerHour: string;
    minMileage: string;
    maxMileage: string;
    onlyFavorites: boolean;
}

/* Default filter state values */
const DEFAULT_VALUES: FormValues = {
    brand: "",
    pricePerHour: "",
    minMileage: "",
    maxMileage: "",
    onlyFavorites: false,
};

/* Keys requiring numeric conversion before emitting to parent handler */
const NUMERIC_KEYS = new Set(["pricePerHour", "minMileage", "maxMileage"]);

/* Generated hourly price options range ($30 - $150) */
const PRICE_OPTIONS = Array.from({ length: 13 }, (_, i) => ({
    value: String((i + 3) * 10),
    label: String((i + 3) * 10),
}));

/* Search filter controls bar managing brand selection, price limits, mileage ranges and favorites */
export default function Filters({
    brandsList,
    onApplyFilters,
    onResetFilters,
    isLoading = false,
}: FiltersProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    /* Local form state synchronized with initial URL query parameters */
    const [values, setValues] = useState<FormValues>(() => ({
        brand: searchParams.get("brand") || "",
        pricePerHour: searchParams.get("pricePerHour") || "",
        minMileage: searchParams.get("minMileage") || "",
        maxMileage: searchParams.get("maxMileage") || "",
        onlyFavorites: searchParams.get("onlyFavorites") === "true",
    }));

    /* Generic handler for single input field updates */
    const handleChange = <K extends keyof FormValues>(
        key: K,
        value: FormValues[K],
    ) => {
        setValues((prev) => ({ ...prev, [key]: value }));
    };

    /* Form submission handler persisting query string and executing filter callback */
    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const params = new URLSearchParams();
        Object.entries(values).forEach(([key, val]) => {
            if (val) params.set(key, String(val));
        });

        const queryString = params.toString();
        router.push(queryString ? `${pathname}?${queryString}` : pathname, {
            scroll: false,
        });

        /* Parse non-empty values and convert numerical fields */
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

    /* Reset form state and clear URL query parameters */
    const handleReset = () => {
        setValues(DEFAULT_VALUES);
        router.push(pathname, { scroll: false });
        onResetFilters();
    };

    /* Memoized brand select options */
    const formattedBrands = useMemo(
        () => brandsList.map((b) => ({ value: b, label: b })),
        [brandsList],
    );

    return (
        /* Filters form */
        <form
            className={styles.filtersForm}
            onSubmit={handleSubmit}
            aria-label="Car catalog search filters"
        >
            {/* Brand selection dropdown */}
            <CustomSelect
                id="brand-select"
                label="Car brand"
                placeholder="Choose a brand"
                value={values.brand}
                options={formattedBrands}
                onChange={(val) => handleChange("brand", val)}
            />

            {/* Hourly rate selection dropdown */}
            <CustomSelect
                id="price-select"
                label="Price/ 1 hour"
                placeholder="Choose a price"
                value={values.pricePerHour}
                options={PRICE_OPTIONS}
                onChange={(val) => handleChange("pricePerHour", val)}
                formatSelectedValue={(label) => `To $${label}`}
            />

            {/* Mileage range double input */}
            <MileageFilter
                fromValue={values.minMileage}
                toValue={values.maxMileage}
                onChangeFrom={(val) => handleChange("minMileage", val)}
                onChangeTo={(val) => handleChange("maxMileage", val)}
            />

            {/* Saved favorites toggle checkbox */}
            <CustomCheckbox
                id="only-favorites"
                checked={values.onlyFavorites}
                onChange={(checked) => handleChange("onlyFavorites", checked)}
            >
                Only
                <br />
                favorites
            </CustomCheckbox>

            {/* Action triggers group */}
            <div className={styles.filterActions}>
                {/* Submit button */}
                <Button
                    type="submit"
                    variant="primary"
                    size="compact"
                    disabled={isLoading}
                    aria-label="Search available cars"
                >
                    Search
                </Button>

                {/* Clear filters button */}
                <button
                    type="button"
                    className={styles.clearFiltersButton}
                    onClick={handleReset}
                    disabled={isLoading}
                    aria-label="Reset all search filters"
                >
                    Clear filters
                </button>
            </div>
        </form>
    );
}
