import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AccountType} from "../addressTypeCard/addressTypeCard";
import {Balance, TransactionERC20, TxsPercentages} from "./types";



export type AddressState = {
    walletHash?: string
    accountType?: AccountType
    transactions?: TxsPercentages
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
        setTransactionTypes(state, {payload}: PayloadAction<TxsPercentages>) {
            state.transactions = payload
        },
        setTransactionsERC20(state, {payload}: PayloadAction<TransactionERC20[]>) {
            state.transactionsERC20 = payload
        },
        setAccountType(state, {payload}: PayloadAction<AccountType>) {
            state.accountType = payload
        },
    }
})

export const {setWalletHash, setLoading, setBalances, setTransactionTypes, setTransactionsERC20, setAccountType} = slice.actions

export default slice.reducer