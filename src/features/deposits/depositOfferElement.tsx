import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CreateDeposit, selectDeposits, setValidationErrorText } from "./slice";
import { useState } from "react";
import { DepositOffer } from "./types";
import IntInput from "../../components/IntInput";
import CurrencyInput from "../../components/CurrencyInput";

type Props = {
    depositOffer: DepositOffer;
};

export default function DepositOfferElement({ depositOffer }: Props) {
    const { errors } = useAppSelector(selectDeposits);
    const dispatch = useAppDispatch();
    const [amount, setAmount] = useState("");
    const [days, setDays] = useState(0);
    const [errorText, setErrorText] = useState("");
    const validationError = errorText || errors[depositOffer.id];

    function onAmountChange(num: string) {
        clearValidation();
        setAmount(num);
    }

    function clearValidation() {
        setErrorText("");
        if (errors[depositOffer.id])
            dispatch(setValidationErrorText([depositOffer.id, ""]));
    }

    function onDaysChange(num: number) {
        clearValidation();
        setDays(num);
    }

    function createDeposit() {
        if (!amount) {
            setErrorText("Введите сумму");
            return;
        }
        if (!days) {
            setErrorText("Введите срок депозита");
            return;
        }
        dispatch(CreateDeposit(parseFloat(amount), days, depositOffer));
    }

    return (
        <section className="deposit" data-testid="deposit">
            <header className="title">{depositOffer.name}</header>
            <div className="description">{depositOffer.description}</div>
            <CurrencyInput
                amount={amount}
                setAmount={onAmountChange}
                className="sum"
                placeholder="введите сумму"
                currency={depositOffer.currency}
            />
            <IntInput
                amount={days}
                setAmount={onDaysChange}
                className="days"
                placeholder="срок в днях"
            />
            {validationError ? (
                <p className="error">{validationError}</p>
            ) : null}
            <button onClick={createDeposit}>Открыть</button>
            <div className="label">вклад</div>
        </section>
    );
}
