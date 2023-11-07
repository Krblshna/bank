import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
    Deposits,
    Deposit,
    DepositsStore,
    DepositData,
    DepositOffer,
    OffersErrors,
} from "./types";
import { AppDispatch, RootState } from "../../app/store";
import { BankAccount } from "../bankAccounts/types";
import { currencyToLabel, roundFloorToDigits } from "../../utils/helpers";
import { withdraw } from "../bankAccounts/slice";

const initialState: DepositsStore = {
    loading: true,
    entities: {} as Deposits,
    errors: {} as OffersErrors,
};

export function CreateDeposit(
    amount: number,
    days: number,
    depositOffer: DepositOffer
) {
    return (dispatch: AppDispatch, getState: () => RootState) => {
        const state = getState();
        const accountArr = Object.values(
            state.bankAccounts.entities
        ) as BankAccount[];
        const account = accountArr.find(
            (account) => account.currency === depositOffer.currency
        );
        if (!account) {
            dispatch(
                setValidationErrorText([
                    depositOffer.id,
                    `У вас нет банковского аккаунта в валюте - ${currencyToLabel(
                        depositOffer.currency
                    )}`,
                ])
            );
            return;
        }
        if (account.value < amount) {
            dispatch(
                setValidationErrorText([
                    depositOffer.id,
                    `Недостаточно средств на счете - ${roundFloorToDigits(
                        account.value,
                        2
                    )}${currencyToLabel(account.currency)}`,
                ])
            );
            return;
        }
        dispatch(
            addDeposit([
                amount,
                days,
                depositOffer.currency,
                depositOffer.interest,
            ])
        );
        dispatch(withdraw([account.account_number, amount]));
    };
}

let currentId = 123456;

export const depositsSlice = createSlice({
    name: "deposits",
    initialState,
    reducers: {
        addDeposit: (state, action: PayloadAction<DepositData>) => {
            const [amount, days, currency, interest] = action.payload;
            currentId += 1;
            const deposit = {
                amount,
                days,
                currency,
                id: currentId,
                interest,
            } as Deposit;
            state.entities[currentId] = deposit;
        },
        timePass: (state, action: PayloadAction<number>) => {
            const days = action.payload;
            const newEntities = {} as Deposits;
            const depositArr = Object.values(state.entities) as Deposit[];
            depositArr
                .filter((deposit) => {
                    return deposit.days > days;
                })
                .forEach((deposit) => {
                    deposit.days -= days;
                    newEntities[deposit.id] = deposit;
                });
            state.entities = newEntities;
        },
        setValidationErrorText: (
            state,
            action: PayloadAction<[number, string]>
        ) => {
            const [id, errorText] = action.payload;
            state.errors[id] = errorText;
        },
    },
});

export const { addDeposit, timePass, setValidationErrorText } =
    depositsSlice.actions;

export const selectDeposits = (state: RootState) => state.deposits;
