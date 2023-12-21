// __tests__/components/CartForm/CartItemList.test.tsx
import {render} from '@testing-library/react';
import '@testing-library/jest-dom'
import React from 'react';
import CartItemList from '../../../components/CartForm/CartItemList';
import {SampleData} from "../../../src/sample_data";
import {Cart} from "../../../src/models";

describe('CartItemList Component', () => {
    const mockCartItems = new SampleData().cart_data;

    it('renders a list of cart items correctly', () => {
        const { getByTestId } = render(<CartItemList cartItems={mockCartItems}/>);

        mockCartItems.forEach((item: Cart) => {
            expect(getByTestId('item-name-' + item.id).textContent).toEqual(item.name + " x " + item.quantity);
            expect(getByTestId('item-total-price-' + item.id).textContent).toEqual("$ " + (item.unit_price * item.quantity).toFixed(2));
            expect(getByTestId('item-unit-price-' + item.id).textContent).toEqual("$ " + item.unit_price.toFixed(2));
        });
    });
});
