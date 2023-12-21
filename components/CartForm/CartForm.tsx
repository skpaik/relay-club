// components/CartForm/CartForm.tsx
import React, {useEffect, useState} from "react";
import {User} from "@supabase/supabase-js";
import {Cart, SbSessionProps} from "@/src/models";
import {CartService} from "@/src/services/CartService";
import CartItemList from "./CartItemList";
import CartSummary from "./CartSummary";
import CartAction from "@/components/CartForm/CartAction";


export function CartForm({session}: SbSessionProps) {
    const user: User | null | undefined = session?.user;
    const [cartItems, setCartItems] = useState<Cart[]>([])

    useEffect(() => {
        (async function () {
            let user_id = user?.id;
            try {
                const data = await CartService.getCartItems(user_id);
                setCartItems(data)
            } catch (error: any) {
                //setError(error)
            } finally {
                //setLoading(false)
            }
        })()
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-300">
            <div className="container mx-auto p-6 sm:p-12 space-y-4 divide-y ">
                <div className="flex justify-between items-start">
                    <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6">My cart items</h2>
                </div>
                <CartItemList cartItems={cartItems}/>
                <CartSummary cartItems={cartItems}/>
                <CartAction cartItems={cartItems}/>
            </div>
        </div>
    );
}
