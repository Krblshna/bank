import { setupStore } from "../../../app/store";
import { renderWithProviders } from "../../../utils/test-utils";
import ExchangeRates from "../exchangeRates";
import { delay, http, HttpResponse } from "msw";
import { fetchRates } from "../slice";
import { act, screen } from "@testing-library/react";
import { setupServer } from "msw/node";
import { SITE_URL } from "../../../utils/helpers";

const json_response = {
    data: {
        exchange_rates: [
            {
                currency_from: "ruble",
                currency_to: "dollar",
                value: 95.66,
                delta: -2.65,
            },
            {
                currency_from: "ruble",
                currency_to: "euro",
                value: 105.09,
                delta: -0.85,
            },
            {
                currency_from: "dollar",
                currency_to: "euro",
                value: 105.09 / 95.66,
                delta: -0.13,
            },
        ],
    },
};

export const handlers = [
    http.get(`${SITE_URL}/exchange_rates`, async () => {
        await delay(150);
        return HttpResponse.json(json_response);
    }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

test("fetches exchange rates & receives data", async () => {
    const store = setupStore();
    renderWithProviders(<ExchangeRates />, { store });
    expect(screen.queryByText(/Loading\.\.\./i)).toBeInTheDocument();
    await act(async () => {
        await store.dispatch(fetchRates());
    });
    expect(screen.queryByText(/Loading\.\.\./i)).not.toBeInTheDocument();
    expect(screen.getByText(95.66)).toBeInTheDocument();
    expect(screen.getByText(105.09)).toBeInTheDocument();
    expect(screen.getByText(-2.65)).toBeInTheDocument();
    expect(screen.getByText(-0.85)).toBeInTheDocument();
});
