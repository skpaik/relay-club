import {Cart, PricingRule, Product} from "./models";

export class SampleData {
    product_list: Product[] = [
        {
            id: 1,
            sku: "ipd",
            name: "Super iPad",
            price: 549.99,
            quantity: 1
        }, {
            id: 2,
            sku: "mbp",
            name: "MacBook Pro",
            price: 1399.99,
            quantity: 15
        }, {
            id: 3,
            sku: "atv",
            name: "Apple TV",
            price: 109.5,
            quantity: 4
        }, {
            id: 4,
            sku: "vga",
            name: "VGA adapter",
            price: 30,
            quantity: 18
        }
    ];

    pricing_rules: PricingRule[] = [
        {
            id: 1,
            sku: "atv",
            "rule_type": "3 for 2 deal",
            "rule_details": "Buy 3 Apple TVs, pay the price of 2",
            "price_detail": null
        },
        {
            id: 2,
            sku: "ipd",
            rule_type: "Bulk discount",
            rule_details: "$499.99 each if more than 4 Super iPads",
            discountQuantity: 4,
            discountPrice: 499.99
        },
        {
            id: 3,
            sku: "mbp",
            "rule_type": "Bundle deal",
            "rule_details": "Free VGA adapter bundled with each MacBook Pro sold",
            freeVga: true
        }
    ];

    cart_data_1: Cart[] = [{
        id: 1,
        sku: "atv",
        "name": "Apple TV",
        "quantity": 3,
        "unit_price": 109.5,
        "total_price": 0,
        "user_id": "cda07575-0452-4307-877f-9d6d3bfe9448",
        "product_id": 7
    }, {
        id: 2,
        sku: "vga",
        "name": "VGA adapter",
        "quantity": 1,
        "unit_price": 30,
        "total_price": 0,
        "user_id": "cda07575-0452-4307-877f-9d6d3bfe9448",
        "product_id": 7
    }];

    cart_data_2: Cart[] = [{
        id: 1,
        sku: "atv",
        "name": "Apple TV",
        "quantity": 3,
        "unit_price": 109.5,
        "total_price": null,
        "user_id": "cda07575-0452-4307-877f-9d6d3bfe9448",
        "product_id": 7
    }, {
        id: 2,
        sku: "vga",
        "name": "VGA adapter",
        "quantity": 1,
        "unit_price": 30,
        "total_price": null,
        "user_id": "cda07575-0452-4307-877f-9d6d3bfe9448",
        "product_id": 7
    }];


    cart_data_3: Cart[] = [{
        id: 1,
        sku: "mbp",
        "name": "MacBook Pro",
        "quantity": 1,
        "unit_price": 1399.99,
        "total_price": null,
        "user_id": "cda07575-0452-4307-877f-9d6d3bfe9448",
        "product_id": 7
    }, {
        id: 2,
        sku: "vga",
        "name": "VGA adapter",
        "quantity": 1,
        "unit_price": 30,
        "total_price": null,
        "user_id": "cda07575-0452-4307-877f-9d6d3bfe9448",
        "product_id": 7
    }, {
        id: 3,
        sku: "ipd",
        "name": "Super iPad",
        "quantity": 1,
        "unit_price": 549.99,
        "total_price": null,
        "user_id": "cda07575-0452-4307-877f-9d6d3bfe9448",
        "product_id": 7
    }];

    cart_data_4: Cart[] = [{
        id: 1,
        sku: "mbp",
        "name": "MacBook Pro",
        "quantity": 1,
        "unit_price": 1399.99,
        "total_price": null,
        "user_id": "cda07575-0452-4307-877f-9d6d3bfe9448",
        "product_id": 7
    }, {
        id: 3,
        sku: "ipd",
        "name": "Super iPad",
        "quantity": 1,
        "unit_price": 549.99,
        "total_price": null,
        "user_id": "cda07575-0452-4307-877f-9d6d3bfe9448",
        "product_id": 7
    }];

    cart_data_5: Cart[] = [
        {
            id: 1,
            sku: "atv",
            "name": "Apple TV",
            "quantity": 2,
            "unit_price": 109.5,
            "total_price": null,
            "user_id": "cda07575-0452-4307-877f-9d6d3bfe9448",
            "product_id": 2
        }, {
            id: 3,
            sku: "ipd",
            "name": "Super iPad",
            "quantity": 5,
            "unit_price": 549.99,
            "total_price": null,
            "user_id": "cda07575-0452-4307-877f-9d6d3bfe9448",
            "product_id": 7
        }];

    cart_data_6: Cart[] = [
        {
            id: 2,
            sku: "ipd",
            "name": "Super iPad",
            "quantity": 1,
            "unit_price": 549.99,
            "total_price": null,
            "user_id": "cda07575-0452-4307-877f-9d6d3bfe9448",
            "product_id": 4
        },
        {
            id: 3,
            sku: "mbp",
            "name": "Product Nam2",
            "quantity": 1,
            "unit_price": 23,
            "total_price": null,
            "user_id": "cda07575-0452-4307-877f-9d6d3bfe9448",
            "product_id": 3
        },
        {
            id: 4,
            sku: "mbp",
            "name": "Product Nam2",
            "quantity": 1,
            "unit_price": 23,
            "total_price": null,
            "user_id": "cda07575-0452-4307-877f-9d6d3bfe9448",
            "product_id": 3
        },
        {
            id: 5,
            sku: "mbp",
            "name": "MacBook Pro",
            "quantity": 1,
            "unit_price": 1399.99,
            "total_price": null,
            "user_id": "cda07575-0452-4307-877f-9d6d3bfe9448",
            "product_id": 5
        },
        {
            id: 6,
            sku: "vga",
            "name": "VGA adapter",
            "quantity": 1,
            "unit_price": 30,
            "total_price": null,
            "user_id": "cda07575-0452-4307-877f-9d6d3bfe9448",
            "product_id": 7
        },
        {
            id: 7,
            sku: "mbp",
            "name": "MacBook Pro",
            "quantity": 1,
            "unit_price": 1399.99,
            "total_price": null,
            "user_id": "cda07575-0452-4307-877f-9d6d3bfe9448",
            "product_id": 5
        }
    ];

    cart_data_7: Cart[] = [
        {
            sku: "ipd",
            "name": "Super iPad",
            "quantity": 1,
            "product_id": 4,
            unit_price: 25
        },
        {
            sku: "mbp",
            "name": "Product Nam2",
            "quantity": 1,
            "product_id": 3,
            unit_price: 25
        },
        {
            sku: "mbp",
            "name": "Product Nam2",
            "quantity": 1,
            "product_id": 3,
            unit_price: 25
        },
        {
            sku: "mbp",
            "name": "MacBook Pro",
            "quantity": 1,
            "product_id": 5,
            unit_price: 25
        },
        {
            sku: "vga",
            "name": "VGA adapter",
            "quantity": 1,
            "product_id": 7,
            unit_price: 25
        },
        {
            sku: "mbp",
            "name": "MacBook Pro",
            "quantity": 1,
            "product_id": 5,
            unit_price: 25
        }
    ];

    cart_data: Cart[] = this.cart_data_5;

    pricing_rules_data: PricingRule[] = this.pricing_rules;
}