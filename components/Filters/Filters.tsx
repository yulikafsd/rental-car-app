"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Button from "@/components/Button/Button";
import { CarFilters } from "@/types/car";
import CustomSelect from "./CustomSelect";
import MileageFilter from "./MileageFilter";

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

    // 👍 Читаємо значення з URL тільки як initial state
    const [values, setValues] = useState<FormValues>(() => ({
        brand: searchParams.get("brand") || "",
        pricePerHour: searchParams.get("pricePerHour") || "",
        minMileage: searchParams.get("minMileage") || "",
        maxMileage: searchParams.get("maxMileage") || "",
        onlyFavorites: searchParams.get("onlyFavorites") === "true",
    }));

    // 👍 Прибрано useEffect із setState — жодних каскадних рендерів і помилок лінтера

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
        // 👍 Миттєве скидання внутрішніх полів форми
        setValues(DEFAULT_VALUES);

        // 👍 Очищення адресного рядка
        router.push(pathname, { scroll: false });

        // 👍 Очищення фільтрів каталогу
        onResetFilters();
    };

    const formattedBrands = brandsList.map((b) => ({
        value: b,
        label: b,
    }));

    return (
        <form className="filtersForm" onSubmit={handleSubmit}>
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

            <div className="filterGroup checkboxGroup">
                <label className="checkboxLabel" htmlFor="only-favorites">
                    <input
                        id="only-favorites"
                        className="filterCheckbox"
                        type="checkbox"
                        checked={values.onlyFavorites}
                        onChange={(e) =>
                            handleChange("onlyFavorites", e.target.checked)
                        }
                    />
                    Show only favorites
                </label>
            </div>

            <div className="filterActions">
                <Button type="submit" variant="primary" size="compact">
                    Search
                </Button>
                <button
                    type="button"
                    className="clearFiltersButton"
                    onClick={handleReset}
                >
                    Clear filters
                </button>
            </div>
        </form>
    );
}
