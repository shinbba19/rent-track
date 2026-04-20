import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, key);

// ── DB row types (snake_case, matching Postgres columns) ─────────────────────
export interface DbPayment {
  id: string;
  tenant_id: string;
  month: string;
  amount_due: number;
  amount_paid: number;
  payment_date: string | null;
  status: "paid" | "paid_late" | "late" | "pending";
}

export interface DbTenant {
  id: string;
  name: string;
  phone: string | null;
  unit_id: string | null;
  contract_start: string | null;
  contract_end: string | null;
}

export interface DbUnit {
  id: string;
  property_id: string | null;
  unit_number: string;
  rent_price: number;
  purchase_price: number;
  sqm: number | null;
}

export interface DbProperty {
  id: string;
  name: string;
  location: string | null;
  owner_id: string | null;
}

export interface DbPortfolioItem {
  id: number;
  name: string;
  unit: string;
  province: string | null;
  sqm: number | null;
  purchase_price: number;
  rent_price: number | null;
  status: "rented" | "vacant" | "sold";
  owner: string | null;
}

export interface DbBuildingTaxItem {
  id: number;
  province: string | null;
  property: string;
  unit: string;
  sqm: number | null;
  assessment_value: number | null;
  tax_amount: number | null;
  paid: boolean;
}

export interface DbLandTaxItem {
  id: number;
  province: string | null;
  property: string;
  deed: string | null;
  size: string | null;
  assessment_value_2569: number | null;
  tax_amount_2569: number | null;
  paid: boolean;
}
