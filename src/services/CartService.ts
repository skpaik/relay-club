// services/CartService.ts
import {Cart} from "@/src/models";
import {supabase} from "@/utils/supabaseClient";
import {CheckoutSystemService} from "@/src/services/CheckoutSystemService";

export class CartService {
    static async getCartItems(userId: string | null | undefined): Promise<Cart[]> {

        if (!userId) {
            let user_id_local = localStorage.getItem("user_id");
            if (user_id_local) {
                userId = user_id_local;
            }
        }

        const {data, error, status} = await supabase
            .from<Cart>('Cart')
            .select(`*`)
            .eq('user_id', userId);

        if (data) return new CheckoutSystemService([]).mergeCartItems(data);

        return []
    }

    static async clearCart(cartItems: Cart[]): Promise<void> {
        const deletePromises = cartItems.map((cartItem) => {
            return supabase
                .from('Cart')
                .delete()
                .eq('sku', cartItem.sku);
        });

        await Promise.all(deletePromises);
    }

    static async addToCart(cartItem: Cart) {
        return await supabase.from('Cart').insert([cartItem,]);
    }
}
