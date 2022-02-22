import React from 'react'
import {render, screen} from '@testing-library/react';
import {CardProps, InfoCard} from "./infoCard";


describe('Info Card', () => {
    const defaultProps: CardProps = {
        imgUrl: 'someUrl',
        title: 'title',
        value: 'value',
        subValue: 'subValue'
    }

    const subValueTestId = 'sub-value-text'
    const titleTestId = 'title-text'
    it('should render full proped component', function () {
        const infoCard = render(<InfoCard {...defaultProps}/>)
        expect(infoCard).toBeTruthy()
        expect(screen.getByRole('img')).toHaveAttribute('src', defaultProps.imgUrl)
        expect(screen.getByTestId(subValueTestId)).toHaveTextContent(`${defaultProps.subValue} USD`)
        expect(screen.getByTestId(titleTestId)).toHaveTextContent(`${defaultProps.value} ${defaultProps.title}`)
    });

    it('should not render undefined subValue', function () {
        const {queryByTestId} = render(<InfoCard {...defaultProps} subValue={undefined}/>)
        expect(queryByTestId(subValueTestId)).toBeFalsy()
    });
})