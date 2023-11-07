import { setupStore } from "../../../app/store";
import { renderWithProviders } from "../../../utils/test-utils";
import { act, screen } from "@testing-library/react";
import DepositsList from "../depositsList";
import { addDeposit, timePass } from "../slice";

describe("deposits", () => {
    test("create new ruble deposit", async () => {
        const store = setupStore();
        renderWithProviders(<DepositsList />, { store });
        expect(screen.queryByText(/У вас нет вкладов/i)).toBeInTheDocument();
        await act(async () => {
            await store.dispatch(addDeposit([10000, 123, "ruble", 0.3]));
        });
        expect(
            screen.queryByText(/У вас нет вкладов/i)
        ).not.toBeInTheDocument();
        expect(screen.getByText(/10000/i)).toBeInTheDocument();
        expect(screen.getByText(/123 д\./i)).toBeInTheDocument();
        expect(screen.getByText(/₽/i)).toBeInTheDocument();
        expect(screen.queryByText(/\$/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/€/i)).not.toBeInTheDocument();
    });

    test("create new dollar deposit", async () => {
        const store = setupStore();
        renderWithProviders(<DepositsList />, { store });
        expect(screen.queryByText(/У вас нет вкладов/i)).toBeInTheDocument();
        await act(async () => {
            await store.dispatch(addDeposit([321, 30, "dollar", 0.2]));
        });
        expect(
            screen.queryByText(/У вас нет вкладов/i)
        ).not.toBeInTheDocument();
        expect(screen.getByText(/321/i)).toBeInTheDocument();
        expect(screen.getByText(/30 д\./i)).toBeInTheDocument();
        expect(screen.getByText(/\$/i)).toBeInTheDocument();
        expect(screen.queryByText(/₽/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/€/i)).not.toBeInTheDocument();
    });

    test("check deposit dissapear", async () => {
        const store = setupStore();
        renderWithProviders(<DepositsList />, { store });
        expect(screen.queryByText(/У вас нет вкладов/i)).toBeInTheDocument();
        await act(async () => {
            await store.dispatch(addDeposit([321, 30, "dollar", 0.2]));
        });
        expect(
            screen.queryByText(/У вас нет вкладов/i)
        ).not.toBeInTheDocument();
        expect(screen.getByText(/321/i)).toBeInTheDocument();
        expect(screen.getByText(/30 д\./i)).toBeInTheDocument();
        await act(async () => {
            await store.dispatch(timePass(10));
        });
        expect(screen.getByText(/321/i)).toBeInTheDocument();
        expect(screen.getByText(/20 д\./i)).toBeInTheDocument();
        await act(async () => {
            await store.dispatch(timePass(15));
        });
        expect(screen.getByText(/321/i)).toBeInTheDocument();
        expect(screen.getByText(/5 д\./i)).toBeInTheDocument();
        await act(async () => {
            await store.dispatch(timePass(30));
        });
        expect(screen.queryByText(/У вас нет вкладов/i)).toBeInTheDocument();
    });
});
