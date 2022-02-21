import {SearchBox} from "./searchBox";

describe('SearchBox', () =>  {

    const onSubmit = jest.fn()

    test('Renders', () => {
        expect(<SearchBox onSubmit={onSubmit} disabled={false}/>).toBe(true)
    })

})