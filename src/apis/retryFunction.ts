// taken from https://hackernoon.com/how-to-improve-your-backend-by-adding-retries-to-your-api-calls-83r3udx
export const fetchRetry = (url: string, options = {}, retries = 3): Promise<any> => {
    return fetch(url, options)
        .then(res => {
            if (res.ok) return res.json()
            if (retries > 0) {
                return fetchRetry(url, options, retries--)
            }
        })
        .catch(err => {
                if (retries > 0) {
                    return fetchRetry(url, options, retries--)
                }
            }
        )
}