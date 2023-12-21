// components/ProductList.tsx
import React from 'react';
import {Product} from "@/src/models";

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
