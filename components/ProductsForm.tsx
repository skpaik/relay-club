import {User} from '@supabase/supabase-js'
import {useEffect, useState} from "react";
import {Cart, Product, SbSessionProps} from "./models";
import {supabase} from '../utils/supabaseClient'


export function ProductsForm({session}: SbSessionProps) {
    const user: User | null = session?.user;
    const [productList, setProductList] = useState<Product[]>([]);
    const [cartAddStatus, setCartAddStatus] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Product>();

    console.log("\nuser?.id: " + user?.id);

    useEffect(() => {
        (async function () {
            try {
                const {data, error, status} = await supabase
                    .from<Product>('Product')
                    .select(`*`);

                console.log(data);

                if (error && status !== 406) {
                    throw error
                }

                if (data) {
                    setProductList(data)
                }
            } catch (error: any) {
                //setError(error)
            } finally {
                //setLoading(false)
            }
        })()
    }, [])

    const handleAddToCart = async (item: Product) => {
        setCurrentProduct(item);
        setCartAddStatus(false);
        try {
            const cart: Cart = {
                name: item.name,
                sku: item.sku,
                unit_price: item.price,
                quantity: 1,
                product_id: item?.id,
                user_id: user?.id
            };
            const {data, error} = await supabase.from('Cart').insert([cart,]);

            if (error) {
                setCartAddStatus(false);
                console.error('Error adding product to cart:', error);
            } else {
                setCartAddStatus(true);
                console.log('Product added to cart successfully:', data);
                //Router.push('/cart');
            }
        } catch (error) {
            setCartAddStatus(false);
            console.error('Error adding product to cart:', error.message);
        }
    };
    return (
        <div className="min-h-screen bg-gray-900 text-gray-300">
            <div className="container mx-auto p-6  space-y-4 divide-y ">
                <div className="flex justify-between items-start">
                    <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6">Products</h2>
                    <a href={"/products-add"} className="text-2xl md:text-1xl font-extrabold text-white mb-6">Add
                        products</a>
                </div>
                {cartAddStatus &&
                    <div role="alert" className="alert alert-success">
                        <span>{currentProduct?.name} added to cart successfully.</span>
                        <br/>
                        <br/>
                        <a className={'btn'} href={"/cart"}>Go to cart</a>
                    </div>
                }
                <ul className="flex flex-col pt-4 space-y-2">
                    {productList.map((item, index) => (
                        <div key={index}
                             className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div className="px-5 pb-5 mt-4">
                                <a href="#">
                                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                        {item.name}
                                    </h5>
                                </a>
                                <div className="flex items-center justify-between">
                                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                        ${item.price.toFixed(2)}
                                    </span>
                                    <button className="btn" onClick={() => handleAddToCart(item)}>
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}
