import { setupStore } from "../../app/store";
import { renderWithProviders } from "../../utils/test-utils";
import { act, screen } from "@testing-library/react";
import DepositsTab from "../deposits";
import { addDeposit } from "../../features/deposits/slice";
import { depositsOffers } from "../../features/deposits/data";

test("check deposits disappearance", async () => {
    const offersAmount = depositsOffers.length;
    const store = setupStore();
    renderWithProviders(<DepositsTab />, { store });
    expect(
        (await screen.findAllByTestId("deposit")).length
    ).toBeGreaterThanOrEqual(3);
    await act(async () => {
        await store.dispatch(addDeposit([100, 10, "ruble", 0]));
    });
    expect((await screen.findAllByTestId("deposit")).length).toEqual(
        offersAmount - 1
    );
    await act(async () => {
        await store.dispatch(addDeposit([100, 10, "dollar", 0]));
    });
    expect((await screen.findAllByTestId("deposit")).length).toEqual(
        offersAmount - 2
    );
    await act(async () => {
        await store.dispatch(addDeposit([100, 10, "euro", 0]));
    });
    expect((await screen.queryAllByTestId("deposit")).length).toEqual(
        offersAmount - 3
    );
});
