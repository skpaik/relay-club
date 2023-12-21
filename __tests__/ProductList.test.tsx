// __tests__/ProductList.test.tsx
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import Jest-DOM extension
import {SampleData} from "@/src/sample_data";
import ProductList from "@/components/ProductList";


describe('ProductList Component', () => {
    const mockProducts = new SampleData().product_list;

    it('renders a list of products', () => {
        const { getByText } = render(<ProductList products={mockProducts} />);

        mockProducts.forEach((product) => {
            const productElement = getByText(product.name);
            expect(productElement).toBeInTheDocument();
        });
    });

    it('renders the correct number of products', () => {
        const { container } = render(<ProductList products={mockProducts} />);

        const productItems = container.querySelectorAll('li');
        expect(productItems.length).toBe(mockProducts.length);
    });
});
