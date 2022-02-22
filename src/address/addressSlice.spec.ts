import {AccountType} from "../addressTypeCard/addressTypeCard";
import reducer, {
    setAccountType,
    setBalances,
    setLoading,
    setTransactionTypes,
    setWalletHash
} from "./addressSlice";

describe('Address Slice', () => {
    const initialState = {
        walletHash: '',
        loading: false,
        accountType: AccountType.investor
    }
    it('should setWalletHash', () => {
        const newState = reducer(initialState, setWalletHash('someHash'))
        expect(newState).toStrictEqual({...initialState, walletHash: 'someHash'})
    })
    it('should setLoading', function () {
        const newState = reducer(initialState, setLoading(true))
        expect(newState).toStrictEqual({...initialState, loading: true})
    })
    it('should setBalances', function () {
        const balance = {
            weth: '1',
            axie: '1',
            slp: '1',
            axs: '1'
        }
        const newState = reducer(initialState, setBalances(balance))
        expect(newState).toStrictEqual({...initialState, balance})
    })
    it('should setTransactionTypes', function () {
        const txsTypes = {
            weth: 1,
            axie: 2,
            slp: 3,
            axs: 4,
            ron: 5
        }
        const newState = reducer(initialState, setTransactionTypes(txsTypes))
        expect(newState).toStrictEqual({...initialState, transactions: txsTypes})
    })
    it('should setAccountType', function () {
        const newState = reducer(initialState, setAccountType(AccountType.scholar ))
        expect(newState).toStrictEqual({...initialState, accountType: AccountType.scholar})
    })
})