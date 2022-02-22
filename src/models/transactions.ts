export type TransferDTO = {
    results: {
        block_hash: string
        block_number: number
        confirmed: boolean
        cumulative_gas_used: string
        from: string
        gas: string
        gas_price: string
        gas_used: string
        hash: string
        input: string
        nonce: number
        published: number
        status: number
        timestamp: number
        to: string
        tx_index: number
        value: string
    }[]
    total: number
}

export type ERC20TransferDTO = {
    results: {
        block_number: number
        from: string
        log_index: string
        timestamp: number
        to: string
        token_address: string
        token_decimals: number
        token_name: string
        token_symbol: string
        token_type: string
        tx_hash: string
        value: string
    }[]
    total: number
}


export type BalanceDTO = {
    results: {
        balance: string,
        token_address: string,
        token_decimals: number,
        token_name: string,
        token_symbol: string,
        token_type: string
    }[],
    total: number
}