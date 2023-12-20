import {User} from '@supabase/supabase-js'
import {useState} from "react";
import Router from 'next/router'
import {Product, SbSessionProps} from "./models";
import {supabase} from '../utils/supabaseClient'

export function ProductsAddForm({session}: SbSessionProps) {
    const user: User | null = session?.user;

    console.log("\nuser?.id: " + user?.id);
    const [productName, setProductName] = useState('');
    const [productSku, setProductSku] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productQuantity, setProductQuantity] = useState("1");

    const handleAddProduct = async () => {
        try {
            const {data, error} = await supabase.from('Product').insert([
                {
                    name: productName,
                    sku: productSku,
                    price: parseFloat(productPrice),
                    quantity: parseInt(productQuantity),
                },
            ]);

            if (error) {
                console.error('Error adding product:', error);
            } else {
                console.log('Product added successfully:', data);
                Router.push('/products');
            }
        } catch (error) {
            console.error('Error adding product:', error.message);
        }
    };
    return (
        <div className="min-h-screen bg-gray-900 text-gray-300">
            <div className="container mx-auto p-6  space-y-4 divide-y ">
                <div className="flex justify-between items-start">
                    <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6"> Add product</h2>
                </div>
                <ul className="flex flex-col pt-4 space-y-2">
                    <li>
                        <label>
                            Product Name: <input type="text" value={productName}
                                                 onChange={(e) => setProductName(e.target.value)}/>
                        </label>
                    </li>
                    <li>
                        <label>
                            Product sku: <input type="text" value={productSku}
                                                 onChange={(e) => setProductSku(e.target.value)}/>
                        </label>
                    </li>
                    <li>
                        <label>
                            Product price: <input type="text" value={productPrice}
                                                 onChange={(e) => setProductPrice(e.target.value)}/>
                        </label>
                    </li>
                    <li>
                        <label>
                            Product quantity: <input type="text" value={productQuantity}
                                                 onChange={(e) => setProductQuantity(e.target.value)}/>
                        </label>
                    </li>
                    <li>
                        <button className="btn" onClick={handleAddProduct}>
                            Add Product
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}
