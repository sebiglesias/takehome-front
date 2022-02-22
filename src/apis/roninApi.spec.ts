import {RoninApi} from "./roninApi";
import {BalanceDTO, TransferDTO} from "../models/transactions";
import {rest} from 'msw'
import {setupServer} from "msw/node"


const goldenTransactions: TransferDTO = {
    results: [{
        block_hash: "0xb72110f71e5db7fe6bdc4346a87f01f8d80cd18d67fc3de8e4d4f04fa093d7f2",
        block_number: 11299261,
        confirmed: false,
        cumulative_gas_used: "564316",
        from: "0x044a7530e4f84ab126b0782f6b030d7338fa2645",
        gas: "368888",
        gas_price: "1000000000",
        gas_used: "79263",
        hash: "0xe432a9b78d136f58792f094491b623835c46d659d4ae2e17a36713d77e98bdb8",
        input: "0x42842e0e000000000000000000000000044a7530e4f84ab126b0782f6b030d7338fa2645000000000000000000000000669c8ec976dcd256c8f62221de4af59ebe68fab7000000000000000000000000000000000000000000000000000000000035cd60",
        nonce: 8,
        published: 1645482716281824300,
        status: 1,
        timestamp: 1645482716,
        to: "0x32950db2a7164ae833121501c797d79e7b79d74c",
        tx_index: 8,
        value: "0",
    }],
    total: 1
}
const goldenBalance: BalanceDTO = {
    results: [{
        balance: "5044084745688249587",
        token_address: "0xc99a6a985ed2cac1ef41640596c5a5f9f4e19ef5",
        token_decimals: 18,
        token_name: "Ronin Wrapped Ether",
        token_symbol: "WETH",
        token_type: "ERC20"
    }],
    total: 1
}

describe('Ronin API', function () {
    const address = 'address'
    const size = 100
    const offset = 0
    const roninApi = new RoninApi()

    const server = setupServer(
        rest.get(`https://explorer.roninchain.com/api/txs/${address}?from=${offset}&size=${size}`, (req, res, ctx) => {
            return res(ctx.json(goldenTransactions))
        }),
        rest.get(`https://explorer.roninchain.com/api/tokenbalances/${encodeURIComponent(address)}`, (req, res, ctx) => {
            return res(ctx.json(goldenBalance))
        })
    )

    beforeAll(() => {
        server.listen()
    })
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    it('should get Transactions', async () => {
        const response = await roninApi.getTransactions(address, size, offset)
        expect(response).toStrictEqual(goldenTransactions)
    })
    it('should get Balances', async () => {
        const response = await roninApi.getBalances(address)
        expect(response).toStrictEqual(goldenBalance)
    });
});