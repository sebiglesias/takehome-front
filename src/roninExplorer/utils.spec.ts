import {extractBalance, extractTxs, getRealBalance} from "./utils";
import {Balance} from "../address/types";

describe('getRealBalance', () => {
    it('get number with all decimals', () => {
        expect(getRealBalance('1', 2)).toBe('0.01')
    })

    it('get number with no decimals', () => {
        expect(getRealBalance('1', 0)).toBe('1')
    })

    it('get number with some decimals', () => {
        expect(getRealBalance('123456', 2)).toBe('1234.56')
        expect(getRealBalance('5044084745688249587', 18)).toBe('5.04408475')
    })

})

describe('extractTxs', () => {
    it('should extract transactions', function () {
        const data = ['slp', 'slp', 'slp', 'weth', 'axie', 'axs', 'ron', 'nft']
        const txsPercentages = extractTxs(data);
        expect(Math.floor(txsPercentages.axs)).toBe(12)
        expect(Math.floor(txsPercentages.weth)).toBe(12)
        expect(Math.floor(txsPercentages.slp)).toBe(37)
        expect(Math.floor(txsPercentages.ron)).toBe(12)
        expect(Math.floor(txsPercentages.axie)).toBe(25)
    });
})

describe('extractBalance', () => {
    it('should extract Balance', function () {
        const dto = {
            results: [
                {
                balance: "5044084745688249587",
                token_address: "0xc99a6a985ed2cac1ef41640596c5a5f9f4e19ef5",
                token_decimals: 18,
                token_name: "Ronin Wrapped Ether",
                token_symbol: "WETH",
                token_type: "ERC20"
                },
                {
                    balance: "5044084745688249587",
                    token_address: "0xc99a6a985ed2cac1ef41640596c5a5f9f4e19ef5",
                    token_decimals: 18,
                    token_name: "Ronin Wrapped Ether",
                    token_symbol: "AXS",
                    token_type: "ERC20"
                },
                {
                    balance: "5044084745688249587",
                    token_address: "0xc99a6a985ed2cac1ef41640596c5a5f9f4e19ef5",
                    token_decimals: 18,
                    token_name: "Ronin Wrapped Ether",
                    token_symbol: "SLP",
                    token_type: "ERC20"
                },
                {
                    balance: "5044084745688249587",
                    token_address: "0xc99a6a985ed2cac1ef41640596c5a5f9f4e19ef5",
                    token_decimals: 18,
                    token_name: "Ronin Wrapped Ether",
                    token_symbol: "AXIE",
                    token_type: "ERC20"
                },
            ],
            total: 1
        }
        const balance: Balance = extractBalance(dto)
        expect(balance.axs).toBe('5.04408475')
        expect(balance.axie).toBe('5044084745688249000')
        expect(balance.slp).toBe('5.04408475')
        expect(balance.weth).toBe('5.04408475')
    });
})