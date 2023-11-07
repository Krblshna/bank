import { setupStore } from "../../../app/store";
import { renderWithProviders } from "../../../utils/test-utils";
import BankAccounts from "../bankAccounts";
import { delay, http, HttpResponse } from "msw";
import { fetchAccounts } from "../slice";
import { act, screen } from "@testing-library/react";
import { setupServer } from "msw/node";
import { SITE_URL } from "../../../utils/helpers";

const json_response = {
    data: {
        accounts: [
            {
                account_number: 353,
                currency: "ruble",
                value: 765890,
            },
            {
                account_number: 354,
                currency: "euro",
                value: 432567,
            },
            {
                account_number: 355,
                currency: "dollar",
                value: 876789,
            },
        ],
    },
};

export const handlers = [
    http.get(`${SITE_URL}/bank_accounts`, async () => {
        await delay(150);
        return HttpResponse.json(json_response);
    }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

test("fetches bank accounts & receives data", async () => {
    const store = setupStore();
    renderWithProviders(<BankAccounts />, { store });
    expect(screen.queryByText(/Loading\.\.\./i)).toBeInTheDocument();
    await act(async () => {
        await store.dispatch(fetchAccounts());
    });
    expect(screen.queryByText(/Loading\.\.\./i)).not.toBeInTheDocument();
    expect(screen.getByText(/765890/i)).toBeInTheDocument();
    expect(screen.getByText(/432567/i)).toBeInTheDocument();
    expect(screen.getByText(/876789/i)).toBeInTheDocument();
    expect(screen.getByText(/353/i)).toBeInTheDocument();
    expect(screen.getByText(/354/i)).toBeInTheDocument();
    expect(screen.getByText(/355/i)).toBeInTheDocument();
});
