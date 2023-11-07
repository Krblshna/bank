import { SITE_URL } from "../../utils/helpers";
import { RatesResponse } from "./types";

export async function fetchExchangeRates(): Promise<RatesResponse> {
    const response = await fetch(`${SITE_URL}/exchange_rates`);
    const result = await response.json();
    return result.data;
}
