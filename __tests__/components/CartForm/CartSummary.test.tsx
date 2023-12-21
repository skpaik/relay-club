// __tests__/components/CartForm/CartSummary.test.tsx
import { render } from '@testing-library/react';
import CartSummary  from '../../../components/CartForm/CartSummary';
import { SampleData } from "../../../src/sample_data";

describe('CartSummary Component', () => {
    const mockCartItems = new SampleData().cart_data;

    it('renders subTotal, discount, and total correctly', () => {
        const { getByText } = render(<CartSummary cartItems={mockCartItems} />);

        const subTotal = getByText(`Subtotal $30.00`);
        const discount = getByText('Discount -$0.00');
        const total = getByText('Total $30.00');

        expect(subTotal).toBeInTheDocument();
        expect(discount).toBeInTheDocument();
        expect(total).toBeInTheDocument();
    });

    it('renders offerApplied correctly', () => {
        // Mock offerApplied array
        const mockOfferApplied = ['Offer 1', 'Offer 2'];

        const { getByText } = render(<CartSummary cartItems={mockCartItems} />);

        mockOfferApplied.forEach((offer) => {
            const offerElement = getByText(offer);
            expect(offerElement).toBeInTheDocument();
        });
    });
});
