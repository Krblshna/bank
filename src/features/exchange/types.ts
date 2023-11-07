export type currency = "ruble" | "dollar" | "euro";

export type ExchangeRate = {
    currency_from: currency;
    currency_to: currency;
    value: number;
    delta: number;
};

export type RatesResponse = {
    exchange_rates: ExchangeRate[];
};

export type ExchangeData = {
    value: number;
    delta: number;
};

export type ExchangeRates = Record<currency, Record<currency, ExchangeData>>;

export type ExchangeRateStore = {
    loading: boolean;
    entities: ExchangeRates;
    error: string;
};
