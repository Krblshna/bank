import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchBankAccounts } from "./API";
import { BankAccounts, BankAccountsStore } from "./types";
import { RootState } from "../../app/store";

const initialState: BankAccountsStore = {
    loading: true,
    entities: {} as BankAccounts,
};

export const fetchAccounts = createAsyncThunk(
    "bankAccounts/fetch",
    async () => {
        const response = await fetchBankAccounts();
        return response;
    }
);

export const bankAccountsSlice = createSlice({
    name: "bankAccounts",
    initialState,
    reducers: {
        withdraw: (state, action: PayloadAction<[number, number]>) => {
            const [accountId, amount] = action.payload;
            state.entities[accountId].value -= amount;
        },
        deposit: (state, action: PayloadAction<[number, number]>) => {
            const [accountId, amount] = action.payload;
            state.entities[accountId].value += amount;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAccounts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAccounts.fulfilled, (state, action) => {
                state.loading = false;
                const accounts = {} as BankAccounts;
                action.payload.accounts.forEach((account) => {
                    accounts[account.account_number] = account;
                });
                state.entities = accounts;
            });
    },
});

export const { withdraw, deposit } = bankAccountsSlice.actions;

export const selectAccounts = (state: RootState) => state.bankAccounts;
