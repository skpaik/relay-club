// __tests__/components/CartForm/CartSummary.test.tsx
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import React from 'react';
import CartSummary from '../../../components/CartForm/CartSummary';
import {SampleData} from "../../../src/sample_data";

describe('CartSummary Component', () => {

    it('renders subTotal, discount, and total correctly', () => {
        const { getByText } = render(<CartSummary cartItems={new SampleData().cart_data} />);

        const subTotal = getByText('Subtotal');
        const discount = getByText('Discount');
        const total = getByText('Total');

        expect(subTotal).toBeInTheDocument();
        expect(discount).toBeInTheDocument();
        expect(total).toBeInTheDocument();
    });


    it('check subTotal, discount, and total value correctly case 1', () => {
        const { getByTestId} = render(<CartSummary cartItems={new SampleData().cart_data_1}/>);

        expect(getByTestId('sub-total-price').textContent).toEqual("$ 0.00");
        expect(getByTestId('discount-price').textContent).toEqual("$ 0.00");
        expect(getByTestId('total-price').textContent).toEqual("$ 0.00");
    });

    it('check subTotal, discount, and total value correctly case 2', () => {
        const { getByTestId} = render(<CartSummary cartItems={new SampleData().cart_data_2}/>);

        expect(getByTestId('sub-total-price').textContent).toEqual("$ 0.00");
        expect(getByTestId('discount-price').textContent).toEqual("$ 0.00");
        expect(getByTestId('total-price').textContent).toEqual("$ 0.00");
    });

    it('check subTotal, discount, and total value correctly case 3', () => {
        const { getByTestId} = render(<CartSummary cartItems={new SampleData().cart_data_3}/>);

        expect(getByTestId('sub-total-price').textContent).toEqual("$ 0.00");
        expect(getByTestId('discount-price').textContent).toEqual("$ 0.00");
        expect(getByTestId('total-price').textContent).toEqual("$ 0.00");
    });

    // it('renders offerApplied correctly', () => {
    //     // Mock offerApplied array
    //     const mockOfferApplied = ['Offer 1', 'Offer 2'];
    //
    //     const { getByText } = render(<CartSummary cartItems={mockCartItems} />);
    //
    //     mockOfferApplied.forEach((offer) => {
    //         const offerElement = getByText(offer);
    //         expect(offerElement).toBeInTheDocument();
    //     });
    // });
});
