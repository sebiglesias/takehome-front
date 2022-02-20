import {AccountDTO, TransferDTO} from "../models/transactions";

export class RoninApi {
    private baseUrl = "https://explorer.roninchain.com/"

    getTransfers(address: string, size: number, offset: number): Promise<TransferDTO> {
        return fetch(`${this.baseUrl}api/txs/${address}?from=${offset}&size=${size}`)
            .then(res =>res.json())
    }

    getAccountInfo(address: string): Promise<AccountDTO> {
        return fetch(`${this.baseUrl}_next/data/UITHlIJIOn5fyqyXWX6gT/address/${address}/token-holdings.json?address=${address}`)
            .then(res => res.json())
    }
}