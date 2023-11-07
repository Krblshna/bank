import MainPage from "./pages/home";
import { Routes, Route } from "react-router-dom";
import ExchangeTab from "./pages/exchange";
import DepositsTab from "./pages/deposits";
import { useAppDispatch } from "./app/hooks";
import { useEffect } from "react";
import { fetchAccounts } from "./features/bankAccounts/slice";
import { fetchRates } from "./features/exchange/slice";
import Navigation from "./features/navigation/navigation";

function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchAccounts());
        dispatch(fetchRates());
    }, [dispatch]);

    return (
        <div className="App">
            <Navigation />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="exchange" element={<ExchangeTab />} />
                <Route path="deposits" element={<DepositsTab />} />
            </Routes>
        </div>
    );
}

export default App;
