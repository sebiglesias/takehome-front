import { isValidRoninAddress } from './roninAddress'

describe('isValidRoninAddress', () => {
   it('should be valid', () => {
      expect(isValidRoninAddress('ronin:2b9fd5ebc7a6ce8539e2aec96774544b8d559732')).toBe(true)
   })
   it('should not be valid', () => {
      // without ronin:
      expect(isValidRoninAddress('2b9fd5ebc7a6ce8539e2aec96774544b8d559732')).toBe(false)
      // withouth hash
      expect(isValidRoninAddress('ronin:')).toBe(false)
      // longer hash
      expect(isValidRoninAddress('ronin:ronin:2b9fd5ebc7a6ce8539e2aec96774544b8d5597323')).toBe(false)
      // shorter hash
      expect(isValidRoninAddress('ronin:ronin:2b9fd5ebc7a6ce8539e2aec96774544b8d55973')).toBe(false)
   })
})
