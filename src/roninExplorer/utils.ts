import {BalanceDTO} from "../models/transactions";
import {Balance, TxsPercentages} from "../address/types";

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
                balance.axie = getRealBalance(result.balance)
                break
            default:
                break
        }
    })
    return balance
}

export const extractTxs = (data: string[]): TxsPercentages => {
    const total = data.length
    const txsCount = {
        weth: 0,
        axie: 0,
        slp: 0,
        axs: 0,
        ron: 0
    }
    data.forEach(action => {
        const lowerCasesActionType = action.toLowerCase()
        if (lowerCasesActionType.includes('weth')) {
            txsCount.weth++
        } else if (lowerCasesActionType.includes('axie') || lowerCasesActionType.includes('nft')) {
            txsCount.axie++
        } else if (lowerCasesActionType.includes('slp')) {
            txsCount.slp++
        } else if (lowerCasesActionType.includes('axs')) {
            txsCount.axs++
        } else if (lowerCasesActionType.includes('ron')) {
            txsCount.ron++
        }
    })
    return total > 0 ? {
        weth: (txsCount.weth / total) * 100,
        axie: (txsCount.axie / total) * 100,
        slp: (txsCount.slp / total) * 100,
        axs: (txsCount.axs / total) * 100,
        ron: (txsCount.ron / total) * 100,
    } : txsCount
}

export const getRealBalance = (balance: string, decimals: number = 0) => {
    return '' + parseFloat((parseInt(balance) * Math.pow(10, -decimals)).toFixed(8))
}