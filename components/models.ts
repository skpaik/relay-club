import {AuthSession} from "@supabase/supabase-js";

export interface SbSessionProps {
    session?: AuthSession
}

export interface Product {
    id: number
    sku: string;
    /** Format: text */
    name: string;
    /** Format: number */
    price: number;
    /** Format: number */
    quantity: number;
}
export interface Cart {
    id?: number
    sku: string;
    /** Format: text */
    name: string;
    /** Format: number */
    quantity: number;
    /** Format: number */
    unit_price: number;
    /** Format: number */
    total_price?: number | 0;
    /** Format: text */
    user_id?: string;
    product_id: number;
    new_price?: number | 0;
}

export interface PricingRule {
    id?: number;
    /** Format: timestamp with time zone */
    sku: string;
    /** Format: text */
    rule_type: string;
    /** Format: text */
    rule_details?: string;
    /** Format: number */
    price_detail?: string | null;
}