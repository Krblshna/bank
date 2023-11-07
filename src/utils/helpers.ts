import { currency } from "../features/exchange/types";

export const SITE_URL = "http://localhost:3000";

const currencyLabels = {
    dollar: "$",
    euro: "€",
    ruble: "₽",
} as Record<currency, string>;

export function roundCeilToDigits(value: number, digits: number) {
    value *= Math.pow(10, digits);
    value = Math.ceil(value);
    return value / Math.pow(10, digits);
}

export function roundToDigits(value: number, digits: number) {
    value *= Math.pow(10, digits);
    value = Math.round(value);
    return value / Math.pow(10, digits);
}

export function roundFloorToDigits(value: number, digits: number) {
    value *= Math.pow(10, digits);
    value = Math.floor(value);
    return value / Math.pow(10, digits);
}

export function currencyToLabel(value: currency): string {
    return currencyLabels[value];
}

export const currencyNames = {
    ruble: "Рублевый",
    dollar: "Долларовый",
    euro: "Евровый",
} as Record<currency, string>;
