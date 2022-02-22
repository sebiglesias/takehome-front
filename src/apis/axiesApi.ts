import {ExchangeRates} from "../exchangeRates/exchangeRatesSlice";
import {fetchRetry} from "./retryFunction";

export class AxiesApi {
    private baseUrl = 'https://exchange-rate.axieinfinity.com/'

    getExchangeRate(): Promise<ExchangeRates> {
        return fetchRetry(this.baseUrl)
    }
}