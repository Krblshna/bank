import { useAppSelector } from "../../app/hooks";
import { roundFloorToDigits, roundCeilToDigits } from "../../utils/helpers";
import { BankAccount } from "../bankAccounts/types";
import { selectAccounts } from "../bankAccounts/slice";
import { selectExchangeRatesGetter } from "./slice";
import ExchangeElement from "./exchangeElement";

type Props = {
    accountFrom: number;
    accountTo: number;
    amountFrom: string;
    amountTo: string;
    setAccountFrom: (a: number) => void;
    setAccountTo: (a: number) => void;
    setAmountFrom: (a: string) => void;
    setAmountTo: (a: string) => void;
    clearValidation: () => void;
};

export default function ExchangeAccounts({
    accountFrom,
    accountTo,
    amountFrom,
    amountTo,
    setAccountFrom,
    setAccountTo,
    setAmountFrom,
    setAmountTo,
    clearValidation,
}: Props) {
    const accounts = useAppSelector(selectAccounts);
    const accountsArr: BankAccount[] = Object.values(accounts.entities);
    const exchangeRatesGetter = useAppSelector(selectExchangeRatesGetter);
    const exchangeRate = exchangeRatesGetter(accountFrom, accountTo);

    function setAmountWrapper(
        exchangeRate: number,
        setAmount: (a: string) => void,
        setReverseAmount: (a: string) => void
    ) {
        return function (amount: string) {
            clearValidation();
            setAmount(amount.toString());
            if (!amount) {
                setReverseAmount(amount.toString());
                return;
            }
            if (!exchangeRate || !Number.isFinite(exchangeRate)) return;
            const roundFunc =
                exchangeRate > 1 ? roundCeilToDigits : roundFloorToDigits;
            setReverseAmount(
                roundFunc(parseFloat(amount) * exchangeRate, 2).toString()
            );
        };
    }

    const setAmountFromAction = setAmountWrapper(
        1 / exchangeRate,
        setAmountFrom,
        setAmountTo
    );

    const setAmountToAction = setAmountWrapper(
        exchangeRate,
        setAmountTo,
        setAmountFrom
    );

    function onChangeAccountWrapper(
        setAccount: (a: number) => void,
        setReverseAccount: (a: number) => void,
        reverseAccountId: number
    ) {
        return function (e: React.ChangeEvent<HTMLSelectElement>) {
            const accountId = parseInt(e.target.value);
            setAccount(accountId);
            clearValidation();
            setAmountFrom("");
            setAmountTo("");
            if (!reverseAccountId || !e.target.value) return;
            const account = accounts.entities[accountId];
            const differentAccount = accounts.entities[reverseAccountId];
            if (account.currency === differentAccount.currency) {
                const newAcc = accountsArr.find(
                    (acc) => acc.currency !== account.currency
                );
                if (newAcc) setReverseAccount(newAcc.account_number);
            }
        };
    }

    const setAccountFromAction = onChangeAccountWrapper(
        setAccountFrom,
        setAccountTo,
        accountTo
    );

    const setAccountToAction = onChangeAccountWrapper(
        setAccountTo,
        setAccountFrom,
        accountFrom
    );

    return (
        <div className="wrapper">
            <ExchangeElement
                accountId={accountFrom}
                amount={amountFrom}
                onChangeAccount={setAccountFromAction}
                onAmountChange={setAmountFromAction}
            />
            <ExchangeElement
                accountId={accountTo}
                amount={amountTo}
                onChangeAccount={setAccountToAction}
                onAmountChange={setAmountToAction}
            />
        </div>
    );
}
