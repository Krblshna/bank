import { currencyToLabel } from "../utils/helpers";
import { currency } from "../features/exchange/types";

type Props = {
    amount: string;
    setAmount: (amount: string) => void;
    className?: string;
    currency?: currency;
    placeholder: string;
};

export default function CurrencyInput({
    amount,
    setAmount,
    className,
    currency,
    placeholder,
}: Props) {
    function onAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.value) {
            setAmount("");
            return;
        }
        const str = e.target.value.replace(/^0+/, "0");
        const regex = /\d*\.?\d{0,2}/;
        const found = str.match(regex);
        if (found != null) {
            const cleanValue = found[0];
            setAmount(cleanValue);
        }
    }
    return (
        <div className="input-wrapper">
            <input
                value={amount}
                onChange={onAmountChange}
                className={className}
                type="text"
                placeholder={placeholder}
            />
            {!!currency && (
                <label className="currency-label">
                    {currencyToLabel(currency)}
                </label>
            )}
        </div>
    );
}
