import {
    configureStore,
    ThunkAction,
    Action,
    PreloadedState,
    combineReducers,
} from "@reduxjs/toolkit";
import { exchangeRatesSlice } from "../features/exchange/slice";
import { bankAccountsSlice } from "../features/bankAccounts/slice";
import { depositsSlice } from "../features/deposits/slice";
import { timeControlSlice } from "../features/timeControl/slice";

const rootReducer = combineReducers({
    exchangeRates: exchangeRatesSlice.reducer,
    bankAccounts: bankAccountsSlice.reducer,
    deposits: depositsSlice.reducer,
    timeControl: timeControlSlice.reducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    });
}

export const store = setupStore();

export type AppDispatch = AppStore["dispatch"];
export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
