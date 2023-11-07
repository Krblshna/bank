import { SITE_URL } from "../../utils/helpers";
import { AccountsResponse } from "./types";

export async function fetchBankAccounts(): Promise<AccountsResponse> {
    const response = await fetch(`${SITE_URL}/bank_accounts`);
    const result = await response.json();
    return result.data;
}
