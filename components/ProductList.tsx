// components/ProductList.tsx
import React from 'react';

interface Product {
    id: number;
    name: string;
}

interface ProductListProps {
    products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    return (
        <ul>
            {products.map((product) => (
                <li key={product.id}>{product.name}</li>
            ))}
        </ul>
    );
};

export default ProductList;
