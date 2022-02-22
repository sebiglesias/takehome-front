import React from 'react';
import { render, screen } from '@testing-library/react';
import {App} from './App';
import {Provider} from "react-redux";
import store from "./store";

describe('App', () => {
    it('should render the app', function () {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        )
    })
});
