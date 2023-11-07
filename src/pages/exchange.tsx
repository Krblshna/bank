import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
    ExchangeMoney,
    selectExchangeRates,
    selectExchangeRatesGetter,
    setValidationErrorText,
} from "../features/exchange/slice";
import ExchangeRates from "../features/exchange/exchangeRates";
import ExchangeAccounts from "../features/exchange/exchangeAccounts";
import { roundFloorToDigits } from "../utils/helpers";

import "../assets/exchange.scss";

export default function ExchangeTab() {
    const dispatch = useAppDispatch();
    const exchangeRates = useAppSelector(selectExchangeRates);
    const exchangeRatesGetter = useAppSelector(selectExchangeRatesGetter);
    const [accountFrom, setAccountFrom] = useState(0);
    const [accountTo, setAccountTo] = useState(0);
    const [amountFrom, setAmountFrom] = useState("");
    const [amountTo, setAmountTo] = useState("");
    const [errorText, setErrorText] = useState("");
    const validationErrorText = errorText || exchangeRates.error;
    const exchangeRate = exchangeRatesGetter(accountFrom, accountTo);
    const couldExchange =
        exchangeRate &&
        accountFrom &&
        accountTo &&
        parseFloat(amountFrom) &&
        parseFloat(amountTo);

    function clearValidation() {
        dispatch(setValidationErrorText(""));
        if (errorText) {
            setErrorText("");
        }
    }

    function exchange() {
        if (!couldExchange) return;
        dispatch(ExchangeMoney(accountFrom, accountTo, amountFrom));
    }

    return (
        <div className="exchange-funds">
            <main>
                <section className="exchange-funds-section">
                    <ExchangeAccounts
                        accountFrom={accountFrom}
                        accountTo={accountTo}
                        amountFrom={amountFrom}
                        amountTo={amountTo}
                        setAccountFrom={setAccountFrom}
                        setAccountTo={setAccountTo}
                        setAmountFrom={setAmountFrom}
                        setAmountTo={setAmountTo}
                        clearValidation={clearValidation}
                    />
                    {!!exchangeRate && (
                        <p className="exchange-rate-value">
                            Курс обмена: {roundFloorToDigits(exchangeRate, 5)}
                        </p>
                    )}
                    {!!couldExchange && (
                        <button className="exchange-button" onClick={exchange}>
                            Обменять
                        </button>
                    )}
                    <p className="error">{validationErrorText}</p>
                </section>
                <ExchangeRates />
            </main>
        </div>
    );
}
