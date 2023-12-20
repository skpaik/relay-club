import {User} from '@supabase/supabase-js'
import {useEffect, useState} from "react";
//import {SampleData} from "../src/sample_data";
import {Cart, PricingRule, SbSessionProps} from "../src/models";
import {CheckoutSystem} from "../src/CheckoutSystem";
import {supabase} from '../utils/supabaseClient'
import Router from "next/router";


export function CartForm({session}: SbSessionProps) {
    const user: User | null | undefined = session?.user;
    const [offerApplied, setOfferApplied] = useState<string[]>([])
    const [cartItems, setCartItems] = useState<Cart[]>([])
    const [errorMessage, setErrorMessage] = useState('')
    const [subTotal, setSubTotal] = useState<number>(0)
    const [discount, setDiscount] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)

    console.log("\nuser?.id: " + user?.id);

    useEffect(() => {
        if (cartItems.length == 0) return;

        (async function () {
            try {
                let pricing_rules_data: PricingRule[] | null = [];
                //let pricing_rules_data: PricingRule[] | null = new SampleData().pricing_rules_data;

                console.log("cartItems");
                console.log(cartItems);

                let sku_list: string[] = cartItems.map(item => item.sku);

                console.log("sku_list");
                console.log(sku_list);
                console.log(pricing_rules_data);


                const {data, error, status} = await supabase
                    .from<PricingRule>('PricingRule')
                    .select(`*`)
                    .in('sku', sku_list);

                console.log("sku_list response");
                console.log(data);

                if (error && status !== 406) {
                    throw error
                }

                pricing_rules_data = data;
                if (pricing_rules_data) {
                    //setCartItems(data)
                }


                const checkoutSystem = new CheckoutSystem(pricing_rules_data);

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
                console.log("subTotal");
                console.log(subTotal);
                console.log("discount");
                console.log(discount);
                console.log("total");
                console.log(total);
                const get_cart_items = checkoutSystem.get_cart_items();
                const get_offer_applied = checkoutSystem.get_offer_applied();
                setOfferApplied(get_offer_applied);
                console.log("\nget_offer_applied");
                console.log(get_offer_applied);
                if (get_cart_items.length != cartItems.length) {
                    setCartItems(get_cart_items);
                }
            } catch (error: any) {
                //setError(error)
            } finally {
                //setLoading(false)
            }
        })()
    }, [cartItems])


    useEffect(() => {
        (async function () {
            let user_id = user?.id;
            console.log("\nuser_id: " + user_id);
            if (!user_id) {
                let user_id_local = localStorage.getItem("user_id");
                if (user_id_local) {
                    user_id = user_id_local;
                }
            }

            try {
                const {data, error, status} = await supabase
                    .from<Cart>('Cart')
                    .select(`*`)
                    .eq('user_id', user_id);

                console.log(data);

                if (error && status !== 406) {
                    throw error
                }

                if (data) {
                    //setCartItems(new CheckoutSystem2([]).mergeCartItems(data))
                    setCartItems(data)
                }
            } catch (error: any) {
                //setError(error)
            } finally {
                //setLoading(false)
            }
        })()
    }, [])
    /*
    useEffect(() => {
        const sample_data_: Cart[] = new SampleData().cart_data;

        const cart_data = new CheckoutSystem2([]).mergeCartItems(sample_data_);

        setCartItems(cart_data)
    }, [])
*/
    const handleClearCart = async () => {
        cartItems.forEach((cartItem, index, array) => {
            (async function () {
                await supabase
                    .from('Cart')
                    .delete()
                    .eq('id', cartItem.id)
            })()
        });
        await Router.push('/products');
    }
    return (
        <div className="min-h-screen bg-gray-900 text-gray-300">
            <div className="container mx-auto p-6 sm:p-12 space-y-4 divide-y ">
                <div className="flex justify-between items-start">
                    <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6">My cart items</h2>
                </div>
                <ul className="flex flex-col pt-4 space-y-2">
                    {cartItems.map((item, index) => (
                        <li key={index} className="flex items-start justify-between">
                            <h3>
                                {item.name}
                                <span className="text-sm text-violet-400"> x </span>
                                {item.quantity}
                            </h3>
                            <div className="text-right">
                                <span className="block">${(item.unit_price * item.quantity).toFixed(2)}</span>
                                <span className="text-sm text-gray-400">à ${item.unit_price.toFixed(2)}</span>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="pt-4 space-y-2">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>$ {subTotal.toFixed(2)}</span>
                    </div>
                    <div>
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
                    </div>
                </div>
                <div className="pt-4 space-y-2">
                    <div className="space-y-6">
                        <div className="flex justify-between">
                            <span>Total</span>
                            <span className="font-semibold">$ {total.toFixed(2)}</span>
                        </div>
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
            </div>
        </div>
    )
}
