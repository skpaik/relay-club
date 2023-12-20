import {User} from '@supabase/supabase-js'
import {useEffect, useState} from "react";
import Router, {useRouter} from 'next/router'
import {Product, SbSessionProps} from "@/src/models";
import {supabase} from '@/utils/supabaseClient'

export function ProductsEditForm({session}: SbSessionProps) {
    const user: User | null | undefined = session?.user;

    const router = useRouter()

    useEffect(() => {
        const {id} = router.query;
        (async function () {
            try {
                let {data: product, error} = await supabase
                    .from('Product')
                    .select("*")
                    .eq('id', id).single();

                if (product){
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

    console.log("\nuser?.id: " + user?.id);
    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState('');
    const [productSku, setProductSku] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productQuantity, setProductQuantity] = useState("1");

    const handleEditProduct = async () => {
        try {
            const { data, error } = await supabase
                .from('Product')
                .update({
                    name: productName,
                    sku: productSku,
                    price: parseFloat(productPrice),
                    quantity: parseInt(productQuantity),
                })
                .eq('id', productId)
                .select();

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
        <div className="min-h-screen bg-gray-900 text-gray-300">
            <div className="container mx-auto p-6  space-y-4 divide-y ">
                <div className="flex justify-between items-start">
                    <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6">Edit product</h2>
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
                        <button className="btn" onClick={handleEditProduct}>
                            Update Product
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}
