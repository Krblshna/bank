import BankAccounts from "../features/bankAccounts/bankAccounts";
import DepositsList from "../features/deposits/depositsList";
import ExchangeRates from "../features/exchange/exchangeRates";
import TimeControl from "../features/timeControl/timeControl";

import "../assets/main.scss";

export default function MainPage() {
    return (
        <>
            <main className="main-page">
                <BankAccounts />
                <DepositsList />
            </main>
            <aside className="main-page">
                <ExchangeRates />
            </aside>
            <TimeControl />
        </>
    );
}
