import { useAppSelector } from "../../app/hooks";
import { selectExchangeRates } from "./slice";
import { ratesTypes } from "./data";

export default function ExchangeRates() {
    const rates = useAppSelector(selectExchangeRates);
    if (rates.loading) {
        return <div className="loading">Loading...</div>;
    }
    const ratesElemenets = ratesTypes.map(({ label, currency }) => {
        const { value, delta } = rates.entities.ruble[currency];
        const deltaClass = delta > 0 ? "grow" : "fall";
        const deltaSign = delta > 0 ? "+" : "";
        return (
            <div className={`currency-deatils ${currency}`} key={currency}>
                <div className="currency-name">{label}</div>
                <div className="amount">{value}</div>
                <div className={`delta ${deltaClass}`}>
                    {deltaSign}
                    {delta.toFixed(2)}
                </div>
            </div>
        );
    });
    return (
        <section className="exchange-rates-section">
            <div className="wrapper">
                <header className="title">Курс обмена банка</header>
                <div className="exchange-deals">
                    <span className="buy">Покупка</span>
                </div>
                <div className="currency-wrapper">{ratesElemenets}</div>
            </div>
        </section>
    );
}
