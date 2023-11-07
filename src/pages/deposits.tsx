import { useAppSelector } from "../app/hooks";
import { selectDeposits } from "../features/deposits/slice";
import DepositOfferElement from "../features/deposits/depositOfferElement";
import { depositsOffers } from "../features/deposits/data";

import "../assets/deposits.scss";

export default function DepositsTab() {
    const deposits = useAppSelector(selectDeposits);
    const depositsArr = Object.values(deposits.entities);
    const depositsCurencies = depositsArr.map((deposit) => deposit.currency);
    const filteredVariants = depositsOffers.filter(
        (deposit) => depositsCurencies.indexOf(deposit.currency) === -1
    );

    const depositsElements = filteredVariants.map((depositOffer) => {
        return (
            <DepositOfferElement
                key={depositOffer.id}
                depositOffer={depositOffer}
            />
        );
    });

    return (
        <div className="deposits-page">
            <main className="wrapper">
                {filteredVariants.length === 0 ? (
                    <p>
                        Дождитесь окончания срока депозитов, чтобы открыть новые
                    </p>
                ) : (
                    depositsElements
                )}
            </main>
        </div>
    );
}
