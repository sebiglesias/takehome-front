import {AxiesApi} from "./axiesApi";
import {setupServer} from "msw/node";
import {rest} from "msw";

describe('Axies API', function () {
    const goldenExchangeRates = {
        axs: {
            usd: 10
        },
        eth: {
            usd: 10
        },
        slp: {
            usd: 10
        }
    }
    const server = setupServer(
        rest.get('https://exchange-rate.axieinfinity.com/', (req, res, ctx) => {
            return res(ctx.json(goldenExchangeRates))
        }),
    )

    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    it('should get exchange rates', async () => {
        const axiesApi = new AxiesApi()
        const response = await axiesApi.getExchangeRate()
        expect(response.eth.usd).toBe(10)
        expect(response.axs.usd).toBe(10)
        expect(response.slp.usd).toBe(10)
    });
});