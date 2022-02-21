import {BalanceDTO, ERC20TransferDTO, TransferDTO} from "../models/transactions";

// using endpoints from https://github.com/Shraknard/pyaxie/blob/main/pyaxie.py
// Some endpoints from https://explorer.roninchain.com/ seem to have a cors policy, and I'm unable to bypass it

export class RoninApi {
    private baseUrl = "https://explorer.roninchain.com/"
    private decoderBaseUrl = "https://decoder.roninchain.com/decoder/actions"
    getTransactions(address: string, size: number, offset: number): Promise<TransferDTO> {
        return fetch(`${this.baseUrl}api/txs/${address}?from=${offset}&size=${size}`, {
            headers: [['User-Agent', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36']]
        }).then(res =>res.json())
    }

    getBalances(address: string): Promise<BalanceDTO> {
        return fetch(`${this.baseUrl}api/tokenbalances/${encodeURIComponent(address)}`, {
            headers: [['User-Agent', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36']]
        }).then(res => res.json())
    }

    // Not all transactions seemed to be appearing from txs endpoint
    // taken from https://ronin-exporter.com/exporter
    // seems to fail with a 500 randomly
    getTransactionsERC20(address: string, size: number, offset: number): Promise<ERC20TransferDTO> {
        return fetch(`${this.baseUrl}/api/tokentxs?addr=${address}&from=${offset}&size=${size}&token=ERC20`)
            .then(res => res.json())
    }

    // One can determine the action type by checking if one of the addresses belongs to a specific set of addresses
    // but the ronin api seems to have a separate endpoint that performs that check
    getActionTypes(transactions: {contractAddress: string, callData: string}[]): Promise<{ data: string[] }> {
        return fetch(this.decoderBaseUrl, {
            method: 'POST',
            body: JSON.stringify({txs: transactions}),
            headers: [
                ['User-Agent', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'],
                ['origin', 'https://explorer.roninchain.com'],
                ['referer', 'https://explorer.roninchain.com/'],
                ['content-type', 'application/json']
            ]
        }).then(res => res.json())
    }
}