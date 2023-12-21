// __tests__/components/CartForm/CartSummary.test.tsx
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import React from 'react';
import CartSummary  from '../../../components/CartForm/CartSummary';
import { SampleData } from "../../../src/sample_data";

describe('CartSummary Component', () => {
    const mockCartItems = new SampleData().cart_data;

    it('renders subTotal, discount, and total correctly', () => {
        const { getByText } = render(<CartSummary cartItems={mockCartItems} />);

        const subTotal = getByText('Subtotal');
        const discount = getByText('Discount');
        const total = getByText('Total');

        expect(subTotal).toBeInTheDocument();
        expect(discount).toBeInTheDocument();
        expect(total).toBeInTheDocument();
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
