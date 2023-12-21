// components/CartForm/CartItemList.tsx
import React from "react";
import {Cart} from "@/src/models";

interface CartItemListProps {
    cartItems: Cart[];
}

const CartItemList: React.FC<CartItemListProps> = ({cartItems}) => {
    return (
        <ul className="flex flex-col pt-4 space-y-2">
            {cartItems.map((item, index) => (
                <li key={index} className="flex items-start justify-between">
                    <h3 data-testid={"item-name-" + item.id}>
                        {item.name}
                        <span className="text-sm text-violet-400"> x </span>
                        {item.quantity}
                    </h3>
                    <div className="text-right">
                        <span  data-testid={"item-total-price-" + item.id} className="block">$ {(item.unit_price * item.quantity).toFixed(2)}</span>
                        <span  data-testid={"item-unit-price-" + item.id} className="text-sm text-gray-400">$ {item.unit_price.toFixed(2)}</span>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default CartItemList;
