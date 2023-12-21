// components/CartForm/CartAction.tsx
import React from "react";
import {Cart} from "@/src/models";
import {CartService} from "@/src/services/CartService";
import Router from "next/router";

interface CartSummaryProps {
    cartItems: Cart[];
}

const CartAction: React.FC<CartSummaryProps> = ({cartItems}) => {
    const handleClearCart = async () => {
        // Use CartService to clear the cart
        await CartService.clearCart(cartItems);
        // await Router.push("/products");
    };

    return (
        <div className="pt-4 space-y-2">
            <div className="space-y-6">
                <button type="button"
                        className="w-full py-2 font-semibold border rounded bg-violet-400 text-gray-900 border-violet-400">
                    Go to checkout
                </button>
                <button type="button" onClick={handleClearCart}
                        className="w-full py-2 font-semibold border rounded bg-violet-400 text-gray-900 border-violet-400">
                    Clear cart
                </button>
            </div>
        </div>
    );
};

export default CartAction;
