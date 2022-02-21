import {BalanceDTO} from "../models/transactions";
import {Transaction, TransactionERC20, Balance} from "../address/types";

export const extractBalance = (dto: BalanceDTO): Balance => {
    const balance: Balance = {
        weth: '0',
        axie: '0',
        slp: '0',
        axs: '0'
    }
    dto.results.forEach(result => {
        switch (result.token_symbol) {
            case "WETH":
                balance.weth = getRealBalance(result.balance, result.token_decimals)
                break
            case "SLP":
                balance.slp = getRealBalance(result.balance, result.token_decimals)
                break
            case "AXS":
                balance.axs = getRealBalance(result.balance, result.token_decimals)
                break
            case "AXIE":
                balance.axie = getRealBalance(result.balance, '0')
                break
            default:
                break
        }
    })
    return balance
}

// ts-ignore
export const extractTransactions = (dto): Transaction[] => {
    // ts-ignore
    return {}
}
// ts-ignore
export const extractTransactionsERC20 = (dto): TransactionERC20[] => {
    // ts-ignore
    return {}
}

export const getRealBalance = (balance: string, decimals: string) => {
    return '' + parseFloat((parseInt(balance) * Math.pow(10, -parseInt(decimals))).toFixed(8))
}