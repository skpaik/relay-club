import {Cart, PricingRule} from "./models";

export class CheckoutSystem {
    private pricingRules: PricingRule[] | null = [];
    private cart: Cart[] = [];
    private offerApplied: string[] = [];

    constructor(pricingRules: PricingRule[] | null) {
        this.pricingRules = pricingRules;
    }

    scan(item: Cart) {
        this.cart.push(item);
    }

    get_cart_items(): Cart[] {
        return this.cart;
    }

    get_offer_applied(): string[] {
        return this.offerApplied;
    }

    set_offer_applied(offer: string | undefined): void {
        if (offer != null && this.offerApplied.indexOf(offer) === -1) {
            this.offerApplied.push(offer);
        }
    }

    applyPricingRules(): number {
        let totalPrice = 0;

        // Iterate through the cart and apply pricing rules
        this.cart.forEach((cartItem) => {
            const rule = this.pricingRules?.find((r) => r.sku === cartItem.sku);

            console.log("\n\nrule")
            console.log(rule)

            if (rule) {
                switch (rule.rule_type) {
                    case '3 for 2 deal':
                        // Apply 3 for 2 deal for Apple TV
                        console.log("\n\n3 for 2 deal")
                        const discountedQuantity = Math.floor(cartItem.quantity / 3) * 2 + (cartItem.quantity % 3);
                        totalPrice += discountedQuantity * cartItem.unit_price;
                        this.set_offer_applied(rule.rule_details)
                        break;

                    case 'Bulk discount':
                        // Apply bulk discount for Super iPad
                        console.log("\n\nBulk discount")

                        console.log("\n\ntotalPrice before")
                        console.log(totalPrice)

                        totalPrice += cartItem.quantity >= 4 ? cartItem.quantity * parseFloat(rule.price_detail || '0') : cartItem.quantity * cartItem.unit_price;
                        console.log("\n\ntotalPrice after")
                        console.log(totalPrice)
                        this.set_offer_applied(rule.rule_details)
                        break;

                    case 'Bundle deal':
                        // Apply bundle deal for MacBook Pro
                        console.log("\n\nBundle deal")
                        console.log(cartItem)
                        console.log(totalPrice)
                        if (cartItem.sku === 'mbp') {
                            totalPrice += cartItem.unit_price;

                            // Check if a VGA adapter is not already in the cart
                            //const vgaAdapterInCart = this.cart.some((cartItem) => cartItem.sku === 'vga');
                            const vgaAdapterInCart = this.cart.find(cartItem => {
                                return cartItem.sku === 'vga'
                            });

                            console.log("\n\nvgaAdapterInCart")
                            console.log(vgaAdapterInCart)
                            console.log("\n\ntotalPrice")
                            console.log(totalPrice)

                            if (!vgaAdapterInCart) {
                                console.log("\n!vgaAdapterInCart2")
                                console.log(this.cart)
                                // Add the free VGA adapter to the cart
                                const vgaAdapter: Cart = {
                                    sku: 'vga',
                                    name: 'VGA adapter',
                                    unit_price: 0,
                                    quantity: cartItem.quantity,
                                    product_id: 1
                                };
                                this.cart.push(vgaAdapter);
                            } else {
                                vgaAdapterInCart.unit_price = 0;
                            }
                            console.log(this.cart)
                        } else {
                            // For other products, simply add the regular price to the total
                            totalPrice += cartItem.unit_price;
                        }
                        this.set_offer_applied(rule.rule_details)
                        break;

                    // Add other cases for different pricing rules as needed

                    default:
                        // For products with no special pricing rule, add the regular price to the total
                        totalPrice += cartItem.unit_price;
                }
            } else {
                // If no pricing rule is found, add the regular price to the total
                totalPrice += cartItem.unit_price;
            }
        });

        return totalPrice;
    }

    mergeCartItems(cartItems: Cart[]): Cart[] {
        const mergedProducts: Record<number, Cart> = {};

        for (const cartItem of cartItems) {
            const existingProduct = mergedProducts[cartItem.product_id];

            if (existingProduct) {
                // If the product with the same product_id already exists, update the quantity
                mergedProducts[cartItem.product_id] = {
                    ...existingProduct,
                    quantity: existingProduct.quantity + cartItem.quantity,
                };
            } else {
                // If the product with the given product_id does not exist, add it to the mergedProducts object
                mergedProducts[cartItem.product_id] = {...cartItem};
            }
        }

        // Convert the mergedProducts object back to an array
        return Object.values(mergedProducts);
    };
}

export class CheckoutSystem3 {
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


                case 'Bundle deal':
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
                    const discountedQuantity = Math.floor(cartItem.quantity / 3) * 2 + (cartItem.quantity % 3);
                    return discountedQuantity * cartItem.unit_price;

                case 'Bulk discount':
                    // Apply bulk discount for Super iPad
                    return cartItem.quantity >= 4 ? cartItem.quantity * parseFloat(rule.price_detail || '0') : cartItem.quantity * cartItem.unit_price;

                case 'Bundle deal':
                    // Apply bulk discount for Super iPad
                    return cartItem.quantity >= 4 ? cartItem.quantity * parseFloat(rule.price_detail || '0') : cartItem.quantity * cartItem.unit_price;

                // Add other cases for different pricing rules as needed

                default:
                    return cartItem.quantity * cartItem.unit_price;
            }
        }

        return cartItem.quantity * cartItem.unit_price;
    }
}

/*
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
*/