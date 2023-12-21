// services/PriceRuleService.ts
import {PricingRule} from "../../src/models";
import {supabase} from "../../utils/supabaseClient";

export class PriceRuleService {
    static async getPriceRuleItems(sku_list: string[]): Promise<PricingRule[]> {
        const {data, error, status} = await supabase
            .from<PricingRule>('PricingRule')
            .select(`*`)
            .in('sku', sku_list);


        if (data) return data;
        return []
    }
}
