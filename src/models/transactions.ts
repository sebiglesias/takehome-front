export type TransferDTO = {
    results: {
        block_hash: string
        block_number: number
        confirmed: boolean
        cumulative_gas_used: string
        from: "0x1b1998c55e53d53ad9423ba9fa80ed30f3c82436"
        gas: string
        gas_price: string
        gas_used: string
        hash: "0xf31e22545d6defaf66ca286168813d24b8631461da9c2a65c23fae8ff8fe6d7c"
        input: "0xa9059cbb0000000000000000000000004d36be327a7d1d6c450285160000909264d731e2000000000000000000000000000000000000000000000000000000000000032d"
        nonce: number
        published: number
        status: number
        timestamp: number
        to: "0xa8754b9fa15fc18bb59458815510e40a12cd2014"
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