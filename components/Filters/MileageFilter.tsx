"use client";

interface MileageFilterProps {
    fromValue: string;
    toValue: string;
    onChangeFrom: (value: string) => void;
    onChangeTo: (value: string) => void;
}

export default function MileageFilter({
    fromValue,
    toValue,
    onChangeFrom,
    onChangeTo,
}: MileageFilterProps) {
    return (
        <fieldset className="filterGroup mileageFieldset">
            <legend className="filterLabel">Car mileage / km</legend>
            <div className="mileageInputsWrapper">
                <input
                    id="mileage-from"
                    className="filterInput"
                    type="number"
                    placeholder="From"
                    aria-label="Minimum mileage in kilometers"
                    value={fromValue}
                    onChange={(e) => onChangeFrom(e.target.value)}
                />
                <input
                    id="mileage-to"
                    className="filterInput"
                    type="number"
                    placeholder="To"
                    aria-label="Maximum mileage in kilometers"
                    value={toValue}
                    onChange={(e) => onChangeTo(e.target.value)}
                />
            </div>
        </fieldset>
    );
}
