import {User} from '@supabase/supabase-js'
import React, {useState} from "react";
import Router from 'next/router'
import {SbSessionProps} from "@/src/models";
import {ProductService} from "@/src/services/ProductService";

export function ProductsAddForm({session}: SbSessionProps) {
    const user: User | null | undefined = session?.user;

    console.log("\nuser?.id: " + user?.id);
    const [productName, setProductName] = useState('');
    const [productSku, setProductSku] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productQuantity, setProductQuantity] = useState("1");

    const handleAddProduct = async () => {
        try {
            const product = {
                name: productName,
                sku: productSku,
                price: parseFloat(productPrice),
                quantity: parseInt(productQuantity),
            }

            const {data, error} = await ProductService.addProduct(product);

            if (error) {
                console.error('Error adding product:', error);
            } else {
                console.log('Product added successfully:', data);
                Router.push('/products');
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-6">Add Product</h2>
                <div className="mb-4">
                    <label htmlFor="productName" className="block text-sm font-medium text-gray-600">
                        Product Name
                    </label>
                    <input value={productName}
                           type="text" id="productName" name="productName"
                           className="mt-1 p-2 w-full border rounded-md"
                           onChange={(e) => setProductName(e.target.value)}/>
                </div>
                <div className="mb-4">
                    <label htmlFor="productSku" className="block text-sm font-medium text-gray-600">
                        Product Sku
                    </label>
                    <input value={productSku}
                           type="text" id="productSku" name="productSku"
                           className="mt-1 p-2 w-full border rounded-md"
                           onChange={(e) => setProductSku(e.target.value)}/>
                </div>

                <div className="mb-4">
                    <label htmlFor="productPrice" className="block text-sm font-medium text-gray-600">
                        Product Price
                    </label>
                    <input type="text" value={productPrice}
                           id="productPrice" name="productPrice"
                           className="mt-1 p-2 w-full border rounded-md"
                           onChange={(e) => setProductPrice(e.target.value)}/>
                </div>

                <div className="mb-6">
                    <label htmlFor="productQuantity" className="block text-sm font-medium text-gray-600">
                        Product Quantity
                    </label>

                    <input type="text" value={productQuantity}
                           id="productQuantity" name="productQuantity"
                           className="mt-1 p-2 w-full border rounded-md"
                           onChange={(e) => setProductQuantity(e.target.value)}/>
                </div>

                <button type="submit" onClick={handleAddProduct}
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                    Add Product
                </button>

            </div>
        </div>
    )
}
