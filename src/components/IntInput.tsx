type Props = {
    amount: number;
    setAmount: (amount: number) => void;
    className: string;
    placeholder: string;
};

export default function IntInput({
    amount,
    setAmount,
    className,
    placeholder,
}: Props) {
    function onAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.value) {
            setAmount(0);
            return;
        }
        const cleanValue = e.target.value.replace(/[^0-9]/g, "");
        const number = parseInt(cleanValue);
        if (Number.isNaN(number)) return;
        setAmount(number);
    }
    return (
        <input
            value={amount || ""}
            onChange={onAmountChange}
            className={className}
            type="text"
            placeholder={placeholder}
        />
    );
}
