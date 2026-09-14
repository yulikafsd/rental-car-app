"use client";

import styles from "./MileageFilter.module.css";

interface MileageFilterProps {
    fromValue: string;
    toValue: string;
    onChangeFrom: (value: string) => void;
    onChangeTo: (value: string) => void;
    disabled?: boolean;
}

/* Mileage range dual-input filter using accessible fieldset grouping */
export default function MileageFilter({
    fromValue,
    toValue,
    onChangeFrom,
    onChangeTo,
    disabled = false,
}: MileageFilterProps) {
    return (
        <fieldset className={styles.filterGroup} disabled={disabled}>
            {/* Visual and accessible legend for the input pair */}
            <legend className={styles.filterLabel}>Car mileage / km</legend>

            <div className={styles.mileageInputsWrapper}>
                {/* Minimum mileage threshold input */}
                <input
                    id="mileage-from"
                    name="minMileage"
                    className={`${styles.filterInput} ${styles.fromInput}`}
                    type="number"
                    min="0"
                    step="1"
                    inputMode="numeric"
                    placeholder="From"
                    aria-label="Minimum mileage in kilometers"
                    value={fromValue}
                    onChange={(e) => onChangeFrom(e.target.value)}
                />

                {/* Maximum mileage threshold input */}
                <input
                    id="mileage-to"
                    name="maxMileage"
                    className={`${styles.filterInput} ${styles.toInput}`}
                    type="number"
                    min="0"
                    step="1"
                    inputMode="numeric"
                    placeholder="To"
                    aria-label="Maximum mileage in kilometers"
                    value={toValue}
                    onChange={(e) => onChangeTo(e.target.value)}
                />
            </div>
        </fieldset>
    );
}
