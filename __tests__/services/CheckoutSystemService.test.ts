// __tests__/services/CheckoutSystemService.test.ts
import { CheckoutSystemService } from '@/src/services/CheckoutSystemService';
import {SampleData} from "@/src/sample_data";

describe('CheckoutSystemService', () => {
    const mockPricingRules = new SampleData().pricing_rules_data;

    it('scans items and applies pricing rules', () => {
        const checkoutSystem = new CheckoutSystemService(mockPricingRules);

        // Mock cart items
        const cartItems = new SampleData().cart_data;

        cartItems.forEach((item) => {
            checkoutSystem.scan(item);
        });

        const newPriceSum = checkoutSystem.applyPricingRules();

        // Adjust the expected results based on your pricing rules and cart items
        expect(newPriceSum).toBe(/* Expected total after applying pricing rules */);
    });

    it('applies pricing rules correctly for different scenarios', () => {
        // Test different scenarios with various cart items and pricing rules
        // Ensure that the pricing rules are applied correctly and the results match expectations
    });

    it('returns correct results for get methods', () => {
        const checkoutSystem = new CheckoutSystemService(mockPricingRules);

        // Mock cart items
        const cartItems = [
            { sku: 'ipd', name: 'Super iPad', quantity: 3, unit_price: 549.99 },
            { sku: 'mbp', name: 'MacBook Pro', quantity: 1, unit_price: 1399.99 },
        ];

        cartItems.forEach((item) => {
            checkoutSystem.scan(item);
        });

        const offerApplied = checkoutSystem.getOfferApplied();
        const cartItemsResult = checkoutSystem.getCartItems();

        // Adjust the expected results based on your pricing rules and cart items
        expect(offerApplied).toEqual(/* Expected offer applied array */);
        expect(cartItemsResult).toEqual(/* Expected cart items array */);
    });
});
