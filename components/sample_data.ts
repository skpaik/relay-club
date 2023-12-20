import {Cart, PricingRules} from "./CartForm";

export class SampleData {
    pricing_rules: PricingRules[] = [
        {
            "id": 1,
            "sku": "atv",
            "rule_type": "3 for 2 deal",
            "rule_details": "Buy 3 Apple TVs, pay the price of 2",
            "price_detail": null
        },
        {
            "id": 2,
            "sku": "ipd",
            "rule_type": "Bulk discount",
            "rule_details": "$499.99 each if more than 4 Super iPads",
            "price_detail": 499.99
        },
        {
            "id": 3,
            "sku": "mbp",
            "rule_type": "Bundle deal",
            "rule_details": "Free VGA adapter bundled with each MacBook Pro sold",
            "price_detail": null
        }
    ];

    cart_data_1: Cart[] = [{
        "id": 1,
        "sku": "atv",
        "name": "Apple TV",
        "quantity": 3,
        "unit_price": 109.5,
        "total_price": null,
        "user_id": "cda07575-0452-4307-877f-9d6d3bfe9448"
    }, {
        "id": 2,
        "sku": "vga",
        "name": "VGA adapter",
        "quantity": 1,
        "unit_price": 30,
        "total_price": null,
        "user_id": "cda07575-0452-4307-877f-9d6d3bfe9448"
    }];

    cart_data_2: Cart[] = [{
        "id": 1,
        "sku": "atv",
        "name": "Apple TV",
        "quantity": 3,
        "unit_price": 109.5,
        "total_price": null,
        "user_id": "cda07575-0452-4307-877f-9d6d3bfe9448"
    }, {
        "id": 2,
        "sku": "vga",
        "name": "VGA adapter",
        "quantity": 1,
        "unit_price": 30,
        "total_price": null,
        "user_id": "cda07575-0452-4307-877f-9d6d3bfe9448"
    }];


    cart_data_3: Cart[] = [{
        "id": 1,
        "sku": "mbp",
        "name": "MacBook Pro",
        "quantity": 1,
        "unit_price": 1399.99,
        "total_price": null,
        "user_id": "cda07575-0452-4307-877f-9d6d3bfe9448"
    }, {
        "id": 2,
        "sku": "vga",
        "name": "VGA adapter",
        "quantity": 1,
        "unit_price": 30,
        "total_price": null,
        "user_id": "cda07575-0452-4307-877f-9d6d3bfe9448"
    }, {
        "id": 3,
        "sku": "ipd",
        "name": "Super iPad",
        "quantity": 1,
        "unit_price": 549.99,
        "total_price": null,
        "user_id": "cda07575-0452-4307-877f-9d6d3bfe9448"
    }];

    cart_data_4: Cart[] = [{
        "id": 1,
        "sku": "mbp",
        "name": "MacBook Pro",
        "quantity": 1,
        "unit_price": 1399.99,
        "total_price": null,
        "user_id": "cda07575-0452-4307-877f-9d6d3bfe9448"
    }, {
        "id": 3,
        "sku": "ipd",
        "name": "Super iPad",
        "quantity": 1,
        "unit_price": 549.99,
        "total_price": null,
        "user_id": "cda07575-0452-4307-877f-9d6d3bfe9448"
    }];
    cart_data_5: Cart[] = [
        {
            "id": 1,
            "sku": "atv",
            "name": "Apple TV",
            "quantity": 2,
            "unit_price": 109.5,
            "total_price": null,
            "user_id": "cda07575-0452-4307-877f-9d6d3bfe9448"
        }, {
            "id": 3,
            "sku": "ipd",
            "name": "Super iPad",
            "quantity": 5,
            "unit_price": 549.99,
            "total_price": null,
            "user_id": "cda07575-0452-4307-877f-9d6d3bfe9448"
        }];
    cart_data: Cart[] = this.cart_data_5;


    pricing_rules_data: PricingRules[] = this.pricing_rules;
}