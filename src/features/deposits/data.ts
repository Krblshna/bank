import { currency } from "../exchange/types";
import { DepositOffer } from "./types";

export const depositsOffers = [
    {
        id: 1,
        name: "Рублевый 5% в год",
        description:
            "Фиксированная ставка на весь срок без пополнения и снятия",
        currency: "ruble" as currency,
        interest: 0.05 / 365,
    },
    {
        id: 2,
        name: "Долларовый 4% в год",
        description:
            "Фиксированная ставка на весь срок без пополнения и снятия",
        currency: "dollar" as currency,
        interest: 0.04 / 365,
    },
    {
        id: 3,
        name: "Евро 3% в год",
        description:
            "Фиксированная ставка на весь срок без пополнения и снятия",
        currency: "euro" as currency,
        interest: 0.03 / 365,
    },
] as DepositOffer[];
