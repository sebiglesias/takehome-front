import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AccountType} from "../addressTypeCard/addressTypeCard";
import {Balance, Transaction, TransactionERC20} from "./types";



export type AddressState = {
    walletHash?: string
    accountType?: AccountType
    transactions?: Transaction[]
    balance?: Balance
    transactionsERC20?: TransactionERC20[]
    loading: boolean
}

const initialState: AddressState = {
    walletHash: '',
    loading: false,
    // By default, I'm assuming every account is an investor one, unless some criteria is met for it to be a scholar
    accountType: AccountType.investor
}

const slice = createSlice({
    initialState,
    name: 'address',
    reducers: {
        setWalletHash(state, {payload}: PayloadAction<string>) {
            state.walletHash = payload
        },
        setLoading(state, {payload}: PayloadAction<boolean>) {
            state.loading = payload
        },
        setBalances(state, {payload}: PayloadAction<Balance>) {
            state.balance = payload
        },
        setTransactions(state, {payload}: PayloadAction<Transaction[]>) {
            state.transactions = payload
        },
        setTransactionsERC20(state, {payload}: PayloadAction<TransactionERC20[]>) {
            state.transactionsERC20 = payload
        },
        clearWalletHash(state) {
            state = initialState
        },
    }
})

export const {setWalletHash, clearWalletHash, setLoading, setBalances, setTransactions, setTransactionsERC20} = slice.actions

export default slice.reducer