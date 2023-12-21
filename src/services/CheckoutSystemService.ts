import { PricingRule, Cart } from "@/src/models";

export class CheckoutSystemService {
    private pricingRules: PricingRule[] | null = [];
    private cart: Cart[] = [];
    private offerApplied: string[] = [];

    constructor(pricingRules: PricingRule[] | null) {
        this.pricingRules = pricingRules;
    }



    scan(item: Cart) {
        this.cart.push(item);
    }

    getCartItems(): Cart[] {
        return this.cart;
    }

    getOfferApplied(): string[] {
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

            if (rule) {
                switch (rule.rule_type) {
                    case '3 for 2 deal':
                        // Apply 3 for 2 deal for Apple TV

                        const discountedQuantity = Math.floor(cartItem.quantity / 3) * 2 + (cartItem.quantity % 3);
                        totalPrice += discountedQuantity * cartItem.unit_price;
                        this.set_offer_applied(rule.rule_details)

                        break;

                    case 'Bulk discount':
                        // Apply bulk discount for Super iPad

                        totalPrice += cartItem.quantity >= 4 ? cartItem.quantity * parseFloat(rule.price_detail || '0') : cartItem.quantity * cartItem.unit_price;

                        this.set_offer_applied(rule.rule_details)

                        break;

                    case 'Bundle deal':
                        // Apply bundle deal for MacBook Pro

                        if (cartItem.sku === 'mbp') {
                            totalPrice += cartItem.unit_price;

                            // Check if a VGA adapter is not already in the cart
                            //const vgaAdapterInCart = this.cart.some((cartItem) => cartItem.sku === 'vga');
                            const vgaAdapterInCart = this.cart.find(cartItem => {
                                return cartItem.sku === 'vga'
                            });

                            if (!vgaAdapterInCart) {
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