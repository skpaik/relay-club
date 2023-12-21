// services/ProductService.ts
import {Cart, Product} from "@/src/models";
import {supabase} from "@/utils/supabaseClient";

export class ProductService {
    static async getProductList(): Promise<Product[]> {
        const {data, error, status} = await supabase
            .from<Product>('Product')
            .select(`*`);

        if (data) return data;

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

    static async deleteProduct(item: Product) {
        return supabase
            .from('Product')
            .delete()
            .eq('id', item.id);
    }

    static async updateProduct(product: Product) {
        return supabase
            .from('Product')
            .update(product)
            .eq('id', product.id)
            .select();
    }

    static async addProduct(product: any) {
        return supabase.from('Product').insert([product,]);
    }

    static async getProductById(id: string | string[] | undefined) {
        return supabase
            .from('Product')
            .select("*")
            .eq('id', id).single();

    }
}
