import { currency } from "../exchange/types";

export type Deposits = Record<number, Deposit>;
export type Deposit = {
    id: number;
    amount: number;
    days: number;
    currency: currency;
    interest: number;
};
export type DepositsStore = {
    loading: boolean;
    entities: Deposits;
    errors: OffersErrors;
};
export type DepositData = [number, number, currency, number];
export type DepositOffer = {
    id: number;
    name: string;
    description: string;
    currency: currency;
    interest: number;
};
export type OffersErrors = Record<number, string>;
