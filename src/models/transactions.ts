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

export type AccountDTO = {
    pageProps: {
        accountInfo: {
            address: string
            balance: string
            blockNumber: number
            erc20Networth: number
            totalNfts: 60
            transactionCount: string
        }
        balance: {
            results: {
                balance: string,
                tokenAddress: string,
                tokenDecimals: number,
                tokenName: string,
                tokenSymbol: string,
                tokenType: string
            },
            total: number
        }
        page: number,
        pageSize: number,
        tokenInfo?: number
    }
}