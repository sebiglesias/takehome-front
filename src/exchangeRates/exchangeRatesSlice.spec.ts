import reducer, {ExchangeRates, setExchangeRates, } from "./exchangeRatesSlice";

describe('Exchange Rates Slice', function () {
    it('should setExchange rates', function () {
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
        const payload = {
            axs: {
                usd: 10
            },
            eth: {
                usd: 40
            },
            slp: {
                usd: 60
            }
        }
        const newState = reducer(initialState, setExchangeRates(payload))
        expect(newState).toStrictEqual(payload)
    });
});