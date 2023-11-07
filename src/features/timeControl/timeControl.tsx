import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { MoveDays, selectTimeControl } from "./slice";
import IntInput from "../../components/IntInput";

export default function TimeControl() {
    const timeControl = useAppSelector(selectTimeControl);
    const dispatch = useAppDispatch();
    const [days, setDays] = useState(0);

    function AddDays(days: number | string) {
        if (!days) return;
        const numericDays = typeof days === "string" ? parseInt(days) : days;
        if (Number.isNaN(numericDays)) return;
        dispatch(MoveDays(numericDays));
    }

    return (
        <footer className="footer">
            <div className="time-control-panel">
                <div className="day-details">
                    Текущий день: {timeControl.day}
                </div>
                <IntInput
                    amount={days}
                    setAmount={setDays}
                    className="text-input"
                    placeholder="введите число дней"
                />
                <button onClick={() => AddDays(1)} className="skip-days">
                    Промотать 1 день
                </button>
                <button onClick={() => AddDays(7)} className="skip-days">
                    Промотать неделю
                </button>
                <button onClick={() => AddDays(days)} className="skip-days">
                    Промотать * дней
                </button>
            </div>
        </footer>
    );
}
