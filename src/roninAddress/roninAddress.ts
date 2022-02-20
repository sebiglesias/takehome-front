export const isValidRoninAddress = (text?: string) => {
   const pattern = new RegExp("^ronin:.{40}$", "i")
   return !!text && pattern.test(text)
}

