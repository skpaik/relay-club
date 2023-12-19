import { AuthSession, User } from '@supabase/supabase-js'
import { supabase } from '../utils/supabaseClient'
import { useEffect, useState } from "react";
import { definitions } from "../types/supabase";

export interface Props {
    session: AuthSession
}

export interface Cart {
    id: string
    sku: string;
    /** Format: text */
    name: string;
    /** Format: number */
    quantity: number;
    /** Format: number */
    unit_price: number;
    /** Format: number */
    total_price?: number;
    /** Format: text */
    user_id?: string;
}

export function CartForm({session}: Props) {
    const user: User | null = session?.user;
    const [cartItems, setCartItems] = useState<Cart[] | null>(null)
    const [errorMessage, setErrorMessage] = useState('')
    const [subTotal, setSubTotal] = useState<number>(0)
    const [discount, setDiscount] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)

    console.log(user);


    useEffect(() => {
        (async function () {
            try {
                setSubTotal(421);
                setDiscount(422);
                setTotal(423);
            } catch (error: any) {
                //setError(error)
            } finally {
                //setLoading(false)
            }
        })()
    }, [cartItems])

    useEffect(() => {
        (async function () {
            try {
                const {data, error, status} = await supabase
                    .from<definitions['cart']>('Cart')
                    .select(`*`)
                    .eq('user_id', user?.id);

                console.log(data);

                if (error && status !== 406) {
                    throw error
                }

                if (data) {
                    setCartItems(data)
                }
            } catch (error: any) {
                //setError(error)
            } finally {
                //setLoading(false)
            }
        })()
    }, [])

    return (
        <div className="min-h-screen bg-gray-900 text-gray-300">
            <div className="container mx-auto p-6 sm:p-12 space-y-4 divide-y ">
                <div className="flex justify-between items-start">
                    <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6">My cart items</h2>
                </div>
                <ul className="flex flex-col pt-4 space-y-2">
                    {cartItems?.map((item, index) => (
                        <li key={index} className="flex items-start justify-between">
                            <h3>
                                {item.name}
                                <span className="text-sm text-violet-400"> x </span>
                                {item.quantity}
                            </h3>
                            <div className="text-right">
                                <span className="block">$${(item.unit_price * item.quantity).toFixed(2)}</span>
                                <span className="text-sm text-gray-400">à ${item.unit_price.toFixed(2)}</span>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="pt-4 space-y-2">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>$ {subTotal}</span>
                    </div>
                    <div>
                        <div className="flex justify-between">
                            <span>Discount</span>
                            <span>-${discount}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                 className="w-3 h-3 mt-1 fill-current text-violet-400">
                                <path
                                    d="M485.887,263.261,248,25.373A31.791,31.791,0,0,0,225.373,16H64A48.055,48.055,0,0,0,16,64V225.078A32.115,32.115,0,0,0,26.091,248.4L279.152,486.125a23.815,23.815,0,0,0,16.41,6.51q.447,0,.9-.017a23.828,23.828,0,0,0,16.79-7.734L486.581,296.479A23.941,23.941,0,0,0,485.887,263.261ZM295.171,457.269,48,225.078V64A16.019,16.019,0,0,1,64,48H225.373L457.834,280.462Z"></path>
                                <path
                                    d="M148,96a52,52,0,1,0,52,52A52.059,52.059,0,0,0,148,96Zm0,72a20,20,0,1,1,20-20A20.023,20.023,0,0,1,148,168Z"></path>
                            </svg>
                            <span className="text-gray-400">Spend $20.00, get 20% off</span>
                        </div>
                    </div>
                </div>
                <div className="pt-4 space-y-2">
                    <div className="space-y-6">
                        <div className="flex justify-between">
                            <span>Total</span>
                            <span className="font-semibold">$ {total}</span>
                        </div>
                        <button type="button"
                                className="w-full py-2 font-semibold border rounded bg-violet-400 text-gray-900 border-violet-400">Go
                            to checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
