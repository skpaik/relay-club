import {User} from '@supabase/supabase-js'
import React, {useEffect, useState} from "react";
import {Cart, Product, SbSessionProps} from "@/src/models";
import Link from "next/link";
import {ProductService} from "@/src/services/ProductService";
import {CartService} from "@/src/services/CartService";

export function ProductsForm({session}: SbSessionProps) {
    const user: User | null | undefined = session?.user;
    const [productList, setProductList] = useState<Product[]>([]);
    const [cartAddStatus, setCartAddStatus] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Product>();

    useEffect(() => {
        (async function () {
            setProductList(await ProductService.getProductList());
        })()
    }, [])

    const handleAddToCart = async (item: Product) => {
        setCurrentProduct(item);
        setCartAddStatus(false);

        let user_id = user?.id;

        if (!user_id) {
            let user_id_local = localStorage.getItem("user_id");

            if (!user_id_local) {
                user_id_local = Math.random().toString(36).substring(3, 12);
                localStorage.setItem("user_id", user_id_local);
            }

            user_id = user_id_local;
        }

        try {
            const cart: Cart = {
                name: item.name,
                sku: item.sku,
                unit_price: item.price,
                quantity: 1,
                product_id: item?.id,
                user_id: user_id
            };

            const {data, error} = await CartService.addToCart(cart);

            if (error) {
                setCartAddStatus(false);
                console.error('Error adding product to cart:', error);
            } else {
                setCartAddStatus(true);
            }
        } catch (error) {
            setCartAddStatus(false);
            console.error('Error adding product to cart:', error);
        }
    };

    const handleDeleteProduct = async (item: Product) => {
        try {
            const {error} = await ProductService.deleteProduct(item)

            if (!error) {
                const productListFiltered = productList.filter(function (obj) {
                    return obj.id !== item.id;
                });
                setProductList(productListFiltered);
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    return (
        <div className="min-h-screen bg-white p-8">
            <h2 className="text-3xl font-semibold mb-6">Products</h2>
            {cartAddStatus &&
                <div role="alert" className="alert alert-success mb-4">
                    <span>{currentProduct?.name} added to cart successfully.</span>
                    <br/>
                    <br/>
                    <a className={'btn'} href={"/cart"}>Go to cart</a>
                </div>
            }
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {productList.map((item, index) => (
                    <div>
                        <div className="max-w-sm rounded overflow-hidden shadow-lg">
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{item.name}</div>
                                <p className="text-gray-700 text-base">
                                    $ {item.price.toFixed(2)}
                                </p>
                            </div>
                            <div className="px-6 pt-4 pb-2">
                                {user &&
                                    <div>
                                        <Link href={{pathname: '/products-edit', query: {id: item.id}}}
                                              className="btn inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"> Edit</Link>
                                        <button onClick={() => handleDeleteProduct(item)}
                                                className="btn inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Delete
                                        </button>
                                    </div>
                                }
                                <button onClick={() => handleAddToCart(item)}
                                        className="btn inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
