import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {AccountType} from "../addressTypeCard/addressTypeCard";

export type AddressState = {
    walletHash?: string
    accountType?: AccountType
    transactions?: []
    transactionsERC20?: []
    balances?: []
}

const initialState: AddressState = {
    walletHash: '',
}

const slice = createSlice({
    initialState,
    name: 'address',
    reducers: {
        setWalletHash(state, {payload}: PayloadAction<string>) {
            state.walletHash = payload
        },
        clearWalletHash(state) {
            state.walletHash = ''
        },
    }
})

export const {setWalletHash, clearWalletHash} = slice.actions

export default slice.reducer