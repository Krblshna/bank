import { useAppSelector } from "../../app/hooks";
import { currencyNames, currencyToLabel } from "../../utils/helpers";
import { selectDeposits } from "./slice";

export default function DepositsList() {
    const deposits = useAppSelector(selectDeposits);
    const depositsArr = Object.values(deposits.entities);
    const depositElements = depositsArr.map((deposit) => {
        const currencyName = currencyNames[deposit.currency];
        const currencyLabel = currencyToLabel(deposit.currency);
        return (
            <div className="deposit" key={deposit.id}>
                <div className="name">{`${currencyName} вклад #${deposit.id}`}</div>
                <div className="amount">{`${deposit.amount} ${currencyLabel}`}</div>
                <div className="duration">{`${deposit.days} д.`}</div>
            </div>
        );
    });
    return (
        <section className="deposits-section">
            <header className="title">Вклады</header>
            <div className="deposits-wrapper">
                {depositsArr.length === 0 ? (
                    <p className="no-deposits">У вас нет вкладов</p>
                ) : (
                    depositElements
                )}
            </div>
        </section>
    );
}
