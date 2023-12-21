import {User} from '@supabase/supabase-js'
import React, {useEffect, useState} from "react";
import Router, {useRouter} from 'next/router'
import {Product, SbSessionProps} from "@/src/models";
import {ProductService} from "@/src/services/ProductService";

export function ProductsEditForm({session}: SbSessionProps) {
    const user: User | null | undefined = session?.user;

    const router = useRouter()

    useEffect(() => {
        const {id} = router.query;
        (async function () {
            try {
                let {data: product, error} = await ProductService.getProductById(id);

                if (product) {
                    setProductId(product.id);
                    setProductName(product.name);
                    setProductSku(product.sku);
                    setProductPrice(product.price);
                    setProductQuantity(product.quantity);
                }
            } catch (error: any) {
                //setError(error)
            } finally {
                //setLoading(false)
            }
        })()
    }, [])

    const [productId, setProductId] = useState<number>(0);
    const [productName, setProductName] = useState('');
    const [productSku, setProductSku] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productQuantity, setProductQuantity] = useState("1");

    const handleEditProduct = async () => {
        try {
            const product: Product = {
                id: productId,
                name: productName,
                sku: productSku,
                price: parseFloat(productPrice),
                quantity: parseInt(productQuantity),
            }

            const {data, error} = await ProductService.updateProduct(product);

            if (error) {
                console.error('Error updating product:', error);
            } else {
                console.log('Product updating successfully:', data);
                Router.push('/products');
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-6">Edit Product</h2>
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

                <button type="submit" onClick={handleEditProduct}
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                    Update Product
                </button>

            </div>
        </div>
    )
}
