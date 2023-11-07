import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../app/store";
import { fetchRates } from "../exchange/slice";
import { Deposit } from "../deposits/types";
import { BankAccount } from "../bankAccounts/types";
import { timePass } from "../deposits/slice";
import { deposit as depositMoney } from "../bankAccounts/slice";

const initialState = {
    day: 1,
};

export function MoveDays(days: number) {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        const state = getState();
        dispatch(addDays(days));
        dispatch(fetchRates());
        const depositsArr = Object.values(state.deposits.entities) as Deposit[];
        const accountsArr = Object.values(
            state.bankAccounts.entities
        ) as BankAccount[];
        depositsArr.forEach((deposit) => {
            const minDays = Math.min(days, deposit.days);
            let interest = deposit.amount * deposit.interest * minDays;
            const bankAccount = accountsArr.find(
                (account) => account.currency === deposit.currency
            );
            if (bankAccount) {
                if (deposit.days <= days) {
                    interest += deposit.amount;
                }
                dispatch(depositMoney([bankAccount.account_number, interest]));
            }
        });
        dispatch(timePass(days));
    };
}

export const timeControlSlice = createSlice({
    name: "timeControl",
    initialState,
    reducers: {
        addDays: (state, action: PayloadAction<number>) => {
            state.day += action.payload;
        },
    },
});

export const { addDays } = timeControlSlice.actions;

export const selectTimeControl = (state: RootState) => state.timeControl;
