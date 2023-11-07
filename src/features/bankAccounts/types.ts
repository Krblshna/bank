import { currency } from "../exchange/types";

export type BankAccount = {
    account_number: number;
    currency: currency;
    value: number;
};

export type BankAccounts = {
    [key: number]: BankAccount;
};

export type BankAccountsStore = {
    loading: boolean;
    entities: BankAccounts;
};

export type AccountsResponse = {
    accounts: BankAccount[];
};
