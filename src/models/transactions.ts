export type TransferSummary = {
    from: number
    to: number
    timestamp: number
    txHash: string
}

export type TransferDTO = {
    results: {
        from: string;
        to: string;
        timestamp: number;
        tx_hash: string;
    }[]
    total: number
}

export type BalanceDTO = {
    results: {
        balance: string,
        token_address: string,
        token_decimals: string,
        token_name: string,
        token_symbol: string,
        token_type: string
    }[],
    total: number
}