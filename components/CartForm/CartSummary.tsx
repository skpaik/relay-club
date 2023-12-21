// components/CartForm/CartSummary.tsx
import React, {useEffect, useState} from "react";
import {Cart} from "../../src/models";
import {CheckoutSystemService} from "../../src/services/CheckoutSystemService";
import {PriceRuleService} from "../../src/services/PriceRuleService";

interface CartSummaryProps {
    cartItems: Cart[];
}

const CartSummary: React.FC<CartSummaryProps> = ({cartItems}) => {
    const [offerApplied, setOfferApplied] = useState<string[]>([])
    const [subTotal, setSubTotal] = useState<number>(0)
    const [discount, setDiscount] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)

    useEffect(() => {
        if (cartItems.length == 0) return;

        (async function () {
            try {
                let sku_list: string[] = cartItems.map(item => item.sku);
                //let data: PricingRule[] | null = new SampleData().pricing_rules_data;
                const data = await PriceRuleService.getPriceRuleItems(sku_list)

                const checkoutSystem = new CheckoutSystemService(data);

                let sub_total: number = 0;

                cartItems.forEach((cartItem, index, array) => {
                    //const new_price = checkoutSystem.applyPricingRule(cartItem.sku, cartItem.unit_price, cartItem.quantity);
                    checkoutSystem.scan(cartItem);
                    sub_total += cartItem.quantity * cartItem.unit_price;
                });

                const new_price_sum = checkoutSystem.applyPricingRules();

                //const sub_total = cartItems.reduce((sum, item) => sum + item.quantity * item.unit_price, 0);

                if (sub_total) setSubTotal(sub_total);

                setDiscount(sub_total - new_price_sum);
                setTotal(new_price_sum);

                setOfferApplied(checkoutSystem.getOfferApplied());

                const get_cart_items = checkoutSystem.getCartItems();

                if (get_cart_items.length != cartItems.length) {
                    //setCartItems(get_cart_items);
                }
            } catch (error: any) {
                //setError(error)
            } finally {
                //setLoading(false)
            }
        })()
    }, [cartItems]);

    return (
        <div className="pt-4 space-y-2">
            <div className="flex justify-between">
                <span>Subtotal</span>
                <span>$ {subTotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
                <span>Discount</span>
                <span>-${discount.toFixed(2)}</span>
            </div>

            {offerApplied.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                         className="w-3 h-3 mt-1 fill-current text-violet-400">
                        <path
                            d="M485.887,263.261,248,25.373A31.791,31.791,0,0,0,225.373,16H64A48.055,48.055,0,0,0,16,64V225.078A32.115,32.115,0,0,0,26.091,248.4L279.152,486.125a23.815,23.815,0,0,0,16.41,6.51q.447,0,.9-.017a23.828,23.828,0,0,0,16.79-7.734L486.581,296.479A23.941,23.941,0,0,0,485.887,263.261ZM295.171,457.269,48,225.078V64A16.019,16.019,0,0,1,64,48H225.373L457.834,280.462Z"></path>
                        <path
                            d="M148,96a52,52,0,1,0,52,52A52.059,52.059,0,0,0,148,96Zm0,72a20,20,0,1,1,20-20A20.023,20.023,0,0,1,148,168Z"></path>
                    </svg>
                    <span className="text-gray-400">{item}</span>
                </div>
            ))}
            <div className="space-y-6">
                <div className="flex justify-between">
                    <span>Total</span>
                    <span className="font-semibold">$ {total.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

export default CartSummary;
