import { render } from '@testing-library/react';
import CartItemList  from '../../../components/CartForm/CartItemList';
import { SampleData } from "../../../src/sample_data";
import { Cart } from "../../../src/models";

describe('CartItemList Component', () => {
    const mockCartItems = new SampleData().cart_data;

    it('renders a list of cart items correctly', () => {
        const { getByText, getAllByRole } = render(<CartItemList cartItems={mockCartItems} />);

        console.log("renders a list of cart items correctly420")
        console.log(getByText)

        // Check if each cart item is rendered with its name, quantity, and unit price
        mockCartItems.forEach((item:Cart) => {
            // const itemName = getByText(item.name);
            // const itemQuantity = getByText(`x ${item.quantity}`);
            // const itemUnitPrice = getByText(`$${item.unit_price.toFixed(2)}`);
            //
            // expect(itemName).toBeInTheDocument();
            // expect(itemQuantity).toBeInTheDocument();
            // expect(itemUnitPrice).toBeInTheDocument();
        });

        // Check if the correct number of cart items is rendered
        const cartItemElements = getAllByRole('listitem');
        expect(cartItemElements.length).toBe(mockCartItems.length);
    });

    // it('handles an empty cart gracefully', () => {
    //     const { queryByRole } = render(<CartItemList cartItems={[]} />);
    //
    //     // Check if there are no cart items rendered
    //     const cartItemElement = queryByRole('listitem');
    //     expect(cartItemElement).toBeNull();
    // });
});
