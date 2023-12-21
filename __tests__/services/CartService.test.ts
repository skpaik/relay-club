// __tests__/services/CartService.test.ts
import { CartService } from '@/src/services/CartService';
import { supabase } from '@/utils/supabaseClient';
import {SampleData} from "@/src/sample_data";

jest.mock('@/utils/supabaseClient');

describe('CartService', () => {
    const mockUser = { id: 'mockUserId' };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('fetches cart items from Supabase based on user ID', async () => {
        const mockCartItems = new SampleData().cart_data;

        (supabase.from as jest.Mock).mockReturnValueOnce({
            select: jest.fn().mockResolvedValueOnce({ data: mockCartItems }),
        });

        const cartItems = await CartService.getCartItems(mockUser.id);

        expect(cartItems).toEqual(mockCartItems);
        expect(supabase.from).toHaveBeenCalledWith('Cart');
        expect(supabase.from().select).toHaveBeenCalledWith('*');
        expect(supabase.from().select().eq).toHaveBeenCalledWith('user_id', mockUser.id);
    });

    it('clears cart items in Supabase based on the provided items', async () => {
        const mockCartItems = [
            { id: 1, name: 'Product 1', quantity: 2, unit_price: 10 },
            { id: 2, name: 'Product 2', quantity: 1, unit_price: 15 },
        ];

        await CartService.clearCart(mockCartItems);

        mockCartItems.forEach((item) => {
            expect(supabase.from().delete).toHaveBeenCalledWith().eq('id', item.id);
        });
    });
});
