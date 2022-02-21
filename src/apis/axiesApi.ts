import {ExchangeRates} from "../exchangeRates/exchangeRatesSlice";

export class AxiesApi {
    private baseUrl = 'https://exchange-rate.axieinfinity.com/'

    getExchangeRate(): Promise<ExchangeRates> {
        return fetch(this.baseUrl).then(res => res.json())
    }
}