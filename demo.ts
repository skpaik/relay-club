type Product = {
    sku: string;
    name: string;
    price: number;
};

type PricingRule = {
    sku: string;
    type: string;
    details?: string;
};

class CheckoutSystem2 {
    private pricingRules: PricingRule[] = [];
    private cart: Product[] = [];

    constructor(pricingRules: PricingRule[]) {
        this.pricingRules = pricingRules;
    }

    scan(item: Product) {
        this.cart.push(item);
    }

    applyPricingRules(): number {
        let totalPrice = 0;

        // Iterate through the cart and apply pricing rules
        this.cart.forEach((item) => {
            const rule = this.pricingRules.find((r) => r.sku === item.sku);

            if (rule) {
                switch (rule.type) {
                    case '3 for 2 deal':
                        // Apply 3 for 2 deal for Apple TV
                        const discountedQuantity = Math.floor(this.cart.filter((i) => i.sku === 'atv').length / 3) * 2;
                        if (item.sku === 'atv' && discountedQuantity > 0) {
                            if (this.cart.filter((i) => i.sku === 'atv').indexOf(item) < discountedQuantity) {
                                totalPrice += 0; // Skip the price for the discounted items
                                break;
                            }
                        }
                        totalPrice += item.price;
                        break;

                    case 'Bulk discount':
                        // Apply bulk discount for Super iPad
                        const bulkDiscountQuantity = parseInt(rule.details || '0', 10);
                        if (item.sku === 'ipd' && this.cart.filter((i) => i.sku === 'ipd').length >= bulkDiscountQuantity) {
                            totalPrice += parseFloat(rule.details || '0');
                        } else {
                            totalPrice += item.price;
                        }
                        break;

                    case 'Bundle deal':
                        // Apply bundle deal for MacBook Pro
                        if (item.sku === 'mbp') {
                            totalPrice += item.price;

                            // Check if a VGA adapter is not already in the cart
                            const vgaAdapterInCart = this.cart.some((cartItem) => cartItem.sku === 'vga');
                            if (!vgaAdapterInCart) {
                                // Add the free VGA adapter to the cart
                                const vgaAdapter: Product = { sku: 'vga', name: 'VGA adapter', price: 0 };
                                this.cart.push(vgaAdapter);
                            }
                        } else {
                            // For other products, simply add the regular price to the total
                            totalPrice += item.price;
                        }
                        break;

                    // Add other cases for different pricing rules as needed

                    default:
                        // For products with no special pricing rule, add the regular price to the total
                        totalPrice += item.price;
                }
            } else {
                // If no pricing rule is found, add the regular price to the total
                totalPrice += item.price;
            }
        });

        return totalPrice;
    }
}

// Example Usage:

const pricingRules: PricingRule[] = [
    { sku: 'atv', type: '3 for 2 deal' },
    { sku: 'ipd', type: 'Bulk discount', details: '499.99' },
    { sku: 'mbp', type: 'Bundle deal' },
    // Add other pricing rules as needed
];

const checkoutSystem = new CheckoutSystem2(pricingRules);

// Scan items during checkout
const products: Product[] = [
    { sku: 'atv', name: 'Apple TV', price: 109.50 },
    { sku: 'ipd', name: 'Super iPad', price: 549.99 },
    { sku: 'mbp', name: 'MacBook Pro', price: 1399.99 },
    // Add other scanned items as needed
];

products.forEach((product) => checkoutSystem.scan(product));

// Calculate total price after applying pricing rules
const totalPrice = checkoutSystem.applyPricingRules();

console.log(`Total Price: $${totalPrice.toFixed(2)}`);
