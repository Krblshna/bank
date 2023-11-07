import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchExchangeRates } from "./API";
import { ExchangeData, ExchangeRateStore, ExchangeRates } from "./types";
import { AppDispatch, RootState } from "../../app/store";
import { roundFloorToDigits, roundCeilToDigits } from "../../utils/helpers";
import { deposit, withdraw } from "../bankAccounts/slice";

const initialState: ExchangeRateStore = {
    loading: true,
    entities: {} as ExchangeRates,
    error: "",
};

export function ExchangeMoney(
    accountFrom: number,
    accountTo: number,
    amount: string
) {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        const state = getState();
        const exchangeRateGetter = selectExchangeRatesGetter(state);
        const exchangeRate = exchangeRateGetter(accountFrom, accountTo);
        const account = state.bankAccounts.entities[accountFrom];
        const takeAmount = parseFloat(amount);
        if (account.value < takeAmount)
            return dispatch(
                setValidationErrorText("Не хватает денег на счете")
            );
        const roundFunc =
            exchangeRate > 1 ? roundFloorToDigits : roundCeilToDigits;
        const addAmount = roundFunc(takeAmount / exchangeRate, 2);
        dispatch(withdraw([account.account_number, takeAmount]));
        dispatch(deposit([accountTo, addAmount]));
    };
}

export const fetchRates = createAsyncThunk("exchangeRates/fetch", async () => {
    const response = await fetchExchangeRates();
    return response;
});

export const exchangeRatesSlice = createSlice({
    name: "exchangeRates",
    initialState,
    reducers: {
        setValidationErrorText: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRates.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRates.fulfilled, (state, action) => {
                state.loading = false;
                const rates = {} as ExchangeRates;
                action.payload.exchange_rates.forEach((rate) => {
                    if (rates[rate.currency_from] == null) {
                        rates[rate.currency_from] = {} as Record<
                            string,
                            ExchangeData
                        >;
                    }
                    if (rates[rate.currency_to] == null) {
                        rates[rate.currency_to] = {} as Record<
                            string,
                            ExchangeData
                        >;
                    }
                    rates[rate.currency_from][rate.currency_to] = {
                        value: rate.value,
                        delta: rate.delta,
                    } as ExchangeData;
                    rates[rate.currency_to][rate.currency_from] = {
                        value: 1 / rate.value,
                        delta: 1 / rate.delta,
                    } as ExchangeData;
                });
                state.entities = rates;
            });
    },
});

export const { setValidationErrorText } = exchangeRatesSlice.actions;

export const selectExchangeRates = (state: RootState) => state.exchangeRates;

export const selectExchangeRatesGetter = (state: RootState) => {
    return (accountFrom: number, accountTo: number) => {
        let exchangeRate = 0;
        if (accountFrom && accountTo) {
            const account = state.bankAccounts.entities[accountFrom];
            const differentAccount = state.bankAccounts.entities[accountTo];
            exchangeRate =
                state.exchangeRates.entities[account.currency][
                    differentAccount.currency
                ].value;
        }
        return exchangeRate;
    };
};
