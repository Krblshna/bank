import { useAppSelector } from "../../app/hooks";
import CurrencyInput from "../../components/CurrencyInput";
import { currencyToLabel, roundFloorToDigits } from "../../utils/helpers";
import { BankAccount } from "../bankAccounts/types";
import { selectAccounts } from "../bankAccounts/slice";

type Props = {
    accountId: number;
    amount: string;
    onChangeAccount: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onAmountChange: (amount: string) => void;
};

export default function ExchangeElement({
    accountId,
    amount,
    onChangeAccount,
    onAmountChange,
}: Props) {
    const accounts = useAppSelector(selectAccounts);
    const currentAccount = accounts.entities[accountId];
    const accountsArr: BankAccount[] = Object.values(accounts.entities);
    const accountsElements = accountsArr.map((account) => {
        return (
            <option value={account.account_number} key={account.account_number}>
                {`Счет ${account.account_number} ${roundFloorToDigits(
                    account.value,
                    2
                )} ${currencyToLabel(account.currency)}`}
            </option>
        );
    });

    return (
        <>
            <div className="transfer">
                <header className="title">Перевести со счета</header>
                <div className="select-wrapper">
                    <select value={accountId} onChange={onChangeAccount}>
                        <option value="">Выберите счет</option>
                        {accountsElements}
                    </select>
                </div>
                <CurrencyInput
                    amount={amount}
                    setAmount={onAmountChange}
                    placeholder="введите сумму"
                    currency={currentAccount?.currency}
                />
            </div>
        </>
    );
}
