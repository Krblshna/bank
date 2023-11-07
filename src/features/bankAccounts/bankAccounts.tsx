import { useAppSelector } from "../../app/hooks";
import { selectAccounts } from "./slice";
import { BankAccount } from "./types";
import { currencyNames, roundFloorToDigits } from "../../utils/helpers";

export default function BankAccounts() {
    const accounts = useAppSelector(selectAccounts);
    if (accounts.loading) {
        return <div className="loading">Loading...</div>;
    }
    const accountsArr: BankAccount[] = Object.values(accounts.entities);
    const accountsElements = accountsArr.map((account) => {
        const accountDesc = currencyNames[account.currency];
        return (
            <div className="account" key={account.account_number}>
                <div className="account-name">
                    {`${accountDesc} Счет (${account.account_number})`}
                </div>
                <div className="amount">
                    {roundFloorToDigits(account.value, 2)}
                </div>
            </div>
        );
    });
    return (
        <section className="accounts-section">
            <header className="title">Ваши счета</header>
            {accountsElements}
        </section>
    );
}
