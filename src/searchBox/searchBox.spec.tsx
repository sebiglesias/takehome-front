import {SearchBox} from "./searchBox";
import {render} from "@testing-library/react";
import {Provider} from "react-redux";
import store from "../store";

describe('SearchBox', () =>  {

    const onSubmit = jest.fn()

    it('should render', () => {
        render(
            <Provider store={store}>
            <SearchBox onSubmit={onSubmit} disabled={false}/>
        </Provider>)

    })

})