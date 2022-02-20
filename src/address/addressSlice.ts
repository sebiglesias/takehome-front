import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type AddressState = {
    walletHash?: string

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