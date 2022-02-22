import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export type ExchangeRates = {
    axs: {
        usd: number
    },
    eth: {
        usd: number
    },
    slp: {
        usd: number
    }
}

const initialState: ExchangeRates = {
    axs: {
        usd: 0
    },
    eth: {
        usd: 0
    },
    slp: {
        usd: 0
    }
}

const slice = createSlice({
    initialState,
    name: 'exchangeRate',
    reducers: {
        setExchangeRates(state, {payload}: PayloadAction<ExchangeRates>) {
            state.axs.usd = payload.axs.usd
            state.eth.usd = payload.eth.usd
            state.slp.usd = payload.slp.usd
        }
    }
})

export const {setExchangeRates} = slice.actions

export default slice.reducer
