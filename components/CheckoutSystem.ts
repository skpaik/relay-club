import {Cart, PricingRule} from "./models";

export class CheckoutSystem {
    private pricingRules: PricingRule[] = [];

    constructor(pricingRules: PricingRule[]) {
        this.pricingRules = pricingRules;
    }

    applyPricingRule(sku: string, originalPrice: number, quantity: number): number {
        const rule = this.pricingRules.find((r) => r.sku === sku);

        if (rule) {
            switch (rule.rule_type) {
                case '3 for 2 deal':
                    // Apply 3 for 2 deal for Apple TV
                    const discountedQuantity = Math.floor(quantity / 3) * 2 + (quantity % 3);
                    return discountedQuantity * originalPrice;

                case 'Bulk discount':
                    // Apply bulk discount for Super iPad
                    return quantity >= 4 ? quantity * parseFloat(rule.price_detail || '0') : quantity * originalPrice;

                // Add other cases for different pricing rules as needed

                default:
                    return quantity * originalPrice;
            }
        }

        return quantity * originalPrice;
    }

    applyPricingRule2(cartItem: Cart): number {
        const rule = this.pricingRules.find((r) => r.sku === cartItem.sku);

        if (rule) {
            switch (rule.rule_type) {
                case '3 for 2 deal':
                    // Apply 3 for 2 deal for Apple TV
                    const discountedQuantity = Math.floor(cartItem.quantity / 3) * 2 + (quantity % 3);
                    return discountedQuantity * cartItem.unit_price;

                case 'Bulk discount':
                    // Apply bulk discount for Super iPad
                    return cartItem.quantity >= 4 ? quantity * parseFloat(rule.price_detail || '0') : quantity * cartItem.unit_price;

                // Add other cases for different pricing rules as needed

                default:
                    return cartItem.quantity * cartItem.unit_price;
            }
        }

        return cartItem.quantity * cartItem.unit_price;
    }
}

// Example Usage:

const pricingRules: PricingRule[] = [
    {sku: 'atv', rule_type: '3 for 2 deal'},
    {sku: 'ipd', rule_type: 'Bulk discount', price_detail: "499.99"},
    // Add other pricing rules as needed
];

const checkoutSystem = new CheckoutSystem(pricingRules);

// Example scenario: Calculate the total price for 4 Super iPads
const skuToCheck = 'ipd';
const originalPrice = 549.99;
const quantity = 4;
const totalPrice = checkoutSystem.applyPricingRule(skuToCheck, originalPrice, quantity);

console.log(`Total Price for ${quantity} ${skuToCheck}s: $${totalPrice.toFixed(2)}`);
