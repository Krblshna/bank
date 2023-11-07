import { setupStore } from "../../../app/store";
import { delay, http, HttpResponse } from "msw";
import { act } from "@testing-library/react";
import { setupServer } from "msw/node";
import { SITE_URL } from "../../../utils/helpers";
import { ExchangeMoney, fetchRates } from "../slice";
import { fetchAccounts } from "../../bankAccounts/slice";

const json_bank_response = {
    data: {
        accounts: [
            {
                account_number: 353,
                currency: "ruble",
                value: 1000,
            },
            {
                account_number: 354,
                currency: "euro",
                value: 1000,
            },
            {
                account_number: 355,
                currency: "dollar",
                value: 1000,
            },
        ],
    },
};

const json_exchange_response = {
    data: {
        exchange_rates: [
            {
                currency_from: "ruble",
                currency_to: "dollar",
                value: 100,
                delta: 0,
            },
            {
                currency_from: "ruble",
                currency_to: "euro",
                value: 200,
                delta: 0,
            },
            {
                currency_from: "dollar",
                currency_to: "euro",
                value: 2,
                delta: 0,
            },
        ],
    },
};

export const handlers = [
    http.get(`${SITE_URL}/bank_accounts`, async () => {
        await delay(150);
        return HttpResponse.json(json_bank_response);
    }),
    http.get(`${SITE_URL}/exchange_rates`, async () => {
        await delay(150);
        return HttpResponse.json(json_exchange_response);
    }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

test("exchange money", async () => {
    const store = setupStore();
    const ruble_account_id = 353;
    const euro_account_id = 354;
    const dollar_account_id = 355;
    await act(async () => {
        await store.dispatch(fetchRates());
        await store.dispatch(fetchAccounts());
    });
    let state = store.getState();
    expect(state.bankAccounts.entities[ruble_account_id].value).toEqual(1000);
    expect(state.bankAccounts.entities[euro_account_id].value).toEqual(1000);
    expect(state.bankAccounts.entities[dollar_account_id].value).toEqual(1000);
    await act(async () => {
        await store.dispatch(
            ExchangeMoney(ruble_account_id, dollar_account_id, "500")
        );
    });
    state = store.getState();
    expect(state.bankAccounts.entities[ruble_account_id].value).toEqual(500);
    expect(state.bankAccounts.entities[euro_account_id].value).toEqual(1000);
    expect(state.bankAccounts.entities[dollar_account_id].value).toEqual(1005);
    await act(async () => {
        await store.dispatch(
            ExchangeMoney(ruble_account_id, euro_account_id, "500")
        );
    });

    state = store.getState();
    expect(state.bankAccounts.entities[ruble_account_id].value).toEqual(0);
    expect(state.bankAccounts.entities[euro_account_id].value).toEqual(1002.5);
    expect(state.bankAccounts.entities[dollar_account_id].value).toEqual(1005);
    await act(async () => {
        await store.dispatch(
            ExchangeMoney(dollar_account_id, ruble_account_id, "500")
        );
    });

    state = store.getState();
    expect(state.bankAccounts.entities[ruble_account_id].value).toEqual(50000);
    expect(state.bankAccounts.entities[euro_account_id].value).toEqual(1002.5);
    expect(state.bankAccounts.entities[dollar_account_id].value).toEqual(505);
    await act(async () => {
        await store.dispatch(
            ExchangeMoney(dollar_account_id, euro_account_id, "5")
        );
    });

    state = store.getState();
    expect(state.bankAccounts.entities[ruble_account_id].value).toEqual(50000);
    expect(state.bankAccounts.entities[euro_account_id].value).toEqual(1005);
    expect(state.bankAccounts.entities[dollar_account_id].value).toEqual(500);
    await act(async () => {
        await store.dispatch(
            ExchangeMoney(euro_account_id, ruble_account_id, "50")
        );
    });

    state = store.getState();
    expect(state.bankAccounts.entities[ruble_account_id].value).toEqual(60000);
    expect(state.bankAccounts.entities[euro_account_id].value).toEqual(955);
    expect(state.bankAccounts.entities[dollar_account_id].value).toEqual(500);
    await act(async () => {
        await store.dispatch(
            ExchangeMoney(euro_account_id, dollar_account_id, "100")
        );
    });

    state = store.getState();
    expect(state.bankAccounts.entities[ruble_account_id].value).toEqual(60000);
    expect(state.bankAccounts.entities[euro_account_id].value).toEqual(855);
    expect(state.bankAccounts.entities[dollar_account_id].value).toEqual(700);
});
