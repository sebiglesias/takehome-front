import {getRealBalance} from "./utils";

describe('getRealBalance', () => {
    test('get number with all decimals', () => {
        expect(getRealBalance('1', 2)).toBe('0.01')
    })

    test('get number with no decimals', () => {
        expect(getRealBalance('1', 0)).toBe('1')
    })

    test('get number with some decimals', () => {
        expect(getRealBalance('123456', 2)).toBe('1234.56')
        expect(getRealBalance('5044084745688249587', 18)).toBe('5.04408475')
    })

})