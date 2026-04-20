export type PaymentStatus = "paid" | "paid_late" | "late" | "pending";
export type PortfolioStatus = "rented" | "vacant" | "sold";

export interface PortfolioItem {
  name: string;
  unit: string;
  province: string;
  sqm: number;
  purchasePrice: number;
  rentPrice: number | null;
  status: PortfolioStatus;
  owner: string;
}

export interface User     { id: string; name: string; email: string; role: string; }
export interface Property { id: string; name: string; location: string; ownerId: string; }
export interface Unit     { id: string; propertyId: string; unitNumber: string; rentPrice: number; purchasePrice: number; sqm: number; }
export interface Tenant   { id: string; name: string; phone: string; unitId: string; contractStart: string; contractEnd: string; }
export interface Payment  { id: string; tenantId: string; month: string; amountDue: number; amountPaid: number; paymentDate: string | null; status: PaymentStatus; }

export const currentUser: User = { id: "u1", name: "Owner", email: "owner@example.com", role: "owner" };

export const properties: Property[] = [
  { id: "ideo",     name: "Ideo",            location: "กทม",      ownerId: "u1" },
  { id: "life",     name: "Life",            location: "กทม",      ownerId: "u1" },
  { id: "knb",      name: "KNB",             location: "กทม",      ownerId: "u1" },
  { id: "ando",     name: "Ando",            location: "พัทยา",    ownerId: "u1" },
  { id: "origin",   name: "Origin",          location: "กทม",      ownerId: "u1" },
  { id: "silom",    name: "Silom Terrace",   location: "กทม",      ownerId: "u1" },
  { id: "diamond",  name: "Diamond",         location: "กทม",      ownerId: "u1" },
  { id: "ihouse",   name: "I-House RCA",     location: "กทม",      ownerId: "u1" },
  { id: "lumphini", name: "Lumphini Ville",  location: "กทม",      ownerId: "u1" },
  { id: "phattara", name: "ภัทร ศรีพัฒน์",  location: "กทม",      ownerId: "u1" },
  { id: "tiwkao",   name: "ทิวเขา",          location: "เขาใหญ่",  ownerId: "u1" },
];

export const units: Unit[] = [
  { id: "u_ideo1208",    propertyId: "ideo",     unitNumber: "A1208",   rentPrice: 22000, purchasePrice: 4576276,  sqm: 28.86 },
  { id: "u_ideo1705",    propertyId: "ideo",     unitNumber: "A1705",   rentPrice: 22000, purchasePrice: 4667196,  sqm: 28.79 },
  { id: "u_ideo1706",    propertyId: "ideo",     unitNumber: "A1706",   rentPrice: 22000, purchasePrice: 4661742,  sqm: 28.79 },
  { id: "u_ideo1708",    propertyId: "ideo",     unitNumber: "A1708",   rentPrice: 23000, purchasePrice: 4661677,  sqm: 28.86 },
  { id: "u_life500",     propertyId: "life",     unitNumber: "996/500", rentPrice: 25000, purchasePrice: 5250917,  sqm: 35    },
  { id: "u_life317",     propertyId: "life",     unitNumber: "996/317", rentPrice: 25000, purchasePrice: 5022669,  sqm: 35    },
  { id: "u_life374",     propertyId: "life",     unitNumber: "996/374", rentPrice: 27000, purchasePrice: 5063542,  sqm: 35    },
  { id: "u_knb4209",     propertyId: "knb",      unitNumber: "4209",    rentPrice: 18500, purchasePrice: 4000000,  sqm: 26.92 },
  { id: "u_ando27f5",    propertyId: "ando",     unitNumber: "27F5",    rentPrice: 50000, purchasePrice: 10930320, sqm: 75    },
  { id: "u_origin2022",  propertyId: "origin",   unitNumber: "2022",    rentPrice: 16500, purchasePrice: 2800000,  sqm: 22    },
  { id: "u_silom5789",   propertyId: "silom",    unitNumber: "57/89",   rentPrice: 15000, purchasePrice: 2500000,  sqm: 32    },
  { id: "u_diamond3006", propertyId: "diamond",  unitNumber: "3006",    rentPrice: 14000, purchasePrice: 2907240,  sqm: 34.61 },
  { id: "u_diamond3012", propertyId: "diamond",  unitNumber: "3012",    rentPrice: 13000, purchasePrice: 2966880,  sqm: 35.32 },
  { id: "u_diamond3109", propertyId: "diamond",  unitNumber: "3109",    rentPrice: 12000, purchasePrice: 2946515,  sqm: 34.87 },
  { id: "u_diamond3111", propertyId: "diamond",  unitNumber: "3111",    rentPrice: 13000, purchasePrice: 2946515,  sqm: 34.87 },
  { id: "u_ihouse601",   propertyId: "ihouse",   unitNumber: "39/601",  rentPrice: 6500,  purchasePrice: 1022000,  sqm: 24.87 },
  { id: "u_lumphini5553",propertyId: "lumphini", unitNumber: "55/53",   rentPrice: 8500,  purchasePrice: 1700000,  sqm: 28    },
  { id: "u_phattara1540",propertyId: "phattara", unitNumber: "15/40",   rentPrice: 3500,  purchasePrice: 550000,   sqm: 31    },
  { id: "u_tiwkao98",    propertyId: "tiwkao",   unitNumber: "98",      rentPrice: 7000,  purchasePrice: 1829000,  sqm: 28.6  },
  { id: "u_tiwkao112",   propertyId: "tiwkao",   unitNumber: "112",     rentPrice: 14000, purchasePrice: 3356250,  sqm: 50.09 },
  { id: "u_tiwkao113",   propertyId: "tiwkao",   unitNumber: "113",     rentPrice: 7000,  purchasePrice: 1849000,  sqm: 28.6  },
];

export const tenants: Tenant[] = [
  // ── Ideo ────────────────────────────────────────────────────────────────────
  { id: "t1",  name: "พูนลาภ",          phone: "xxx-xxx-x426", unitId: "u_ideo1208",    contractStart: "2025-06-30", contractEnd: "2026-06-29" },
  { id: "t2",  name: "Narong",           phone: "xxx-xxx-x056", unitId: "u_ideo1705",    contractStart: "2026-02-25", contractEnd: "2027-02-25" },
  { id: "t3",  name: "Sumatra / Nithit", phone: "xxx-xxx-x056", unitId: "u_ideo1706",    contractStart: "2025-06-01", contractEnd: "2026-05-31" },
  { id: "t4",  name: "Montha / Peem",    phone: "xxx-xxx-x056", unitId: "u_ideo1708",    contractStart: "2025-02-26", contractEnd: "2026-02-25" },
  // ── Life ────────────────────────────────────────────────────────────────────
  { id: "t5",  name: "Pimchanok",        phone: "xxx-xxx-x056", unitId: "u_life500",     contractStart: "2025-05-05", contractEnd: "2026-05-04" },
  { id: "t6",  name: "ภรณ์ชนก",         phone: "xxx-xxx-x056", unitId: "u_life317",     contractStart: "2025-09-13", contractEnd: "2026-09-12" },
  { id: "t7",  name: "Donald",           phone: "xxx-xxx-x426", unitId: "u_life374",     contractStart: "2025-05-01", contractEnd: "2026-04-30" },
  // ── KNB / Ando / Origin ─────────────────────────────────────────────────────
  { id: "t8",  name: "Torfun",           phone: "xxx-xxx-x056", unitId: "u_knb4209",     contractStart: "2025-05-21", contractEnd: "2026-05-20" },
  { id: "t9",  name: "Richard",          phone: "xxx-xxx-x056", unitId: "u_ando27f5",    contractStart: "2025-10-07", contractEnd: "2026-10-06" },
  { id: "t10", name: "Emma",             phone: "xxx-xxx-x056", unitId: "u_origin2022",  contractStart: "2025-08-07", contractEnd: "2026-08-06" },
  // ── Silom Terrace ───────────────────────────────────────────────────────────
  { id: "t11", name: "Chayapa",          phone: "xxx-xxx-x056", unitId: "u_silom5789",   contractStart: "2026-04-01", contractEnd: "2026-05-31" },
  // ── Diamond ─────────────────────────────────────────────────────────────────
  { id: "t12", name: "Diamond B",        phone: "xxx-xxx-x426", unitId: "u_diamond3012", contractStart: "2025-07-01", contractEnd: "2026-06-30" },
  { id: "t13", name: "Diamond C",        phone: "xxx-xxx-x426", unitId: "u_diamond3109", contractStart: "2025-11-01", contractEnd: "2026-10-31" },
  { id: "t14", name: "Diamond D",        phone: "xxx-xxx-x426", unitId: "u_diamond3111", contractStart: "2025-03-23", contractEnd: "2026-03-22" },
  { id: "t15", name: "Diamond A",        phone: "xxx-xxx-x426", unitId: "u_diamond3006", contractStart: "2025-08-09", contractEnd: "2026-08-08" },
  // ── I-House / Lumphini / ภัทร ────────────────────────────────────────────────
  { id: "t16", name: "Somebody",         phone: "xxx-xxx-x426", unitId: "u_ihouse601",   contractStart: "2025-08-26", contractEnd: "2026-08-25" },
  { id: "t17", name: "Praparat",         phone: "xxx-xxx-x426", unitId: "u_lumphini5553",contractStart: "2025-10-01", contractEnd: "2026-09-29" },
  { id: "t18", name: "Pat A",            phone: "xxx-xxx-x426", unitId: "u_phattara1540",contractStart: "2025-06-01", contractEnd: "2026-05-31" },
  // ── ทิวเขา ──────────────────────────────────────────────────────────────────
  { id: "t19", name: "T1",              phone: "xxx-xxx-x426", unitId: "u_tiwkao98",    contractStart: "2025-05-01", contractEnd: "2026-04-30" },
  { id: "t20", name: "T2",              phone: "xxx-xxx-x426", unitId: "u_tiwkao112",   contractStart: "2026-01-11", contractEnd: "2026-03-05" },
  { id: "t21", name: "T3",              phone: "xxx-xxx-x426", unitId: "u_tiwkao113",   contractStart: "2025-07-01", contractEnd: "2026-06-30" },
];

// ── Payments: Nov 2025 – Apr 2026 ────────────────────────────────────────────
// status "paid_late" = paid but after the 5th of the month
// t20 (T2/ทิวเขา 112) paid Jan 42000 = 3 months prepaid (Jan–Mar contract)
export const payments: Payment[] = [
  // Nov 2025 — original 10 properties only
  { id: "p001", tenantId: "t6",  month: "2025-11", amountDue: 25000, amountPaid: 25000, paymentDate: "2025-11-12", status: "paid_late" },
  { id: "p002", tenantId: "t7",  month: "2025-11", amountDue: 27000, amountPaid: 0,     paymentDate: null,         status: "late"      },
  { id: "p003", tenantId: "t5",  month: "2025-11", amountDue: 25000, amountPaid: 25000, paymentDate: "2025-11-06", status: "paid_late" },
  { id: "p004", tenantId: "t1",  month: "2025-11", amountDue: 22000, amountPaid: 0,     paymentDate: null,         status: "late"      },
  { id: "p005", tenantId: "t2",  month: "2025-11", amountDue: 22000, amountPaid: 22000, paymentDate: "2025-11-16", status: "paid_late" },
  { id: "p006", tenantId: "t3",  month: "2025-11", amountDue: 22000, amountPaid: 22000, paymentDate: "2025-11-01", status: "paid"      },
  { id: "p007", tenantId: "t4",  month: "2025-11", amountDue: 23000, amountPaid: 23000, paymentDate: "2025-11-15", status: "paid_late" },
  { id: "p008", tenantId: "t10", month: "2025-11", amountDue: 16500, amountPaid: 16500, paymentDate: "2025-11-08", status: "paid_late" },
  { id: "p009", tenantId: "t8",  month: "2025-11", amountDue: 18500, amountPaid: 18500, paymentDate: "2025-11-24", status: "paid_late" },
  { id: "p010", tenantId: "t9",  month: "2025-11", amountDue: 50000, amountPaid: 50000, paymentDate: "2025-11-07", status: "paid_late" },
  // Dec 2025
  { id: "p011", tenantId: "t6",  month: "2025-12", amountDue: 25000, amountPaid: 25000, paymentDate: "2025-12-14", status: "paid_late" },
  { id: "p012", tenantId: "t7",  month: "2025-12", amountDue: 27000, amountPaid: 0,     paymentDate: null,         status: "late"      },
  { id: "p013", tenantId: "t5",  month: "2025-12", amountDue: 25000, amountPaid: 25000, paymentDate: "2025-12-06", status: "paid_late" },
  { id: "p014", tenantId: "t1",  month: "2025-12", amountDue: 22000, amountPaid: 0,     paymentDate: null,         status: "late"      },
  { id: "p015", tenantId: "t2",  month: "2025-12", amountDue: 22000, amountPaid: 22000, paymentDate: "2026-01-10", status: "paid_late" },
  { id: "p016", tenantId: "t3",  month: "2025-12", amountDue: 22000, amountPaid: 22000, paymentDate: "2025-12-02", status: "paid"      },
  { id: "p017", tenantId: "t4",  month: "2025-12", amountDue: 23000, amountPaid: 23000, paymentDate: "2025-12-20", status: "paid_late" },
  { id: "p018", tenantId: "t10", month: "2025-12", amountDue: 16500, amountPaid: 16500, paymentDate: "2025-12-08", status: "paid_late" },
  { id: "p019", tenantId: "t8",  month: "2025-12", amountDue: 18500, amountPaid: 18500, paymentDate: "2025-12-23", status: "paid_late" },
  { id: "p020", tenantId: "t9",  month: "2025-12", amountDue: 50000, amountPaid: 50000, paymentDate: "2025-12-07", status: "paid_late" },
  // Jan 2026 — all properties
  { id: "p021", tenantId: "t6",  month: "2026-01", amountDue: 25000, amountPaid: 25000, paymentDate: "2026-01-14", status: "paid_late" },
  { id: "p022", tenantId: "t7",  month: "2026-01", amountDue: 27000, amountPaid: 27000, paymentDate: "2026-01-01", status: "paid"      },
  { id: "p023", tenantId: "t5",  month: "2026-01", amountDue: 25000, amountPaid: 25000, paymentDate: "2026-01-06", status: "paid_late" },
  { id: "p024", tenantId: "t1",  month: "2026-01", amountDue: 22000, amountPaid: 22000, paymentDate: "2026-01-04", status: "paid"      },
  { id: "p025", tenantId: "t2",  month: "2026-01", amountDue: 22000, amountPaid: 22000, paymentDate: "2026-01-10", status: "paid_late" },
  { id: "p026", tenantId: "t3",  month: "2026-01", amountDue: 22000, amountPaid: 22000, paymentDate: "2026-01-01", status: "paid"      },
  { id: "p027", tenantId: "t4",  month: "2026-01", amountDue: 23000, amountPaid: 23000, paymentDate: "2026-01-26", status: "paid_late" },
  { id: "p028", tenantId: "t10", month: "2026-01", amountDue: 16500, amountPaid: 16500, paymentDate: "2026-01-08", status: "paid_late" },
  { id: "p029", tenantId: "t8",  month: "2026-01", amountDue: 18500, amountPaid: 18500, paymentDate: "2026-01-23", status: "paid_late" },
  { id: "p030", tenantId: "t9",  month: "2026-01", amountDue: 50000, amountPaid: 49000, paymentDate: "2026-01-08", status: "paid_late" },
  { id: "p031", tenantId: "t16", month: "2026-01", amountDue: 6500,  amountPaid: 6500,  paymentDate: "2025-12-25", status: "paid"      },
  { id: "p032", tenantId: "t17", month: "2026-01", amountDue: 8500,  amountPaid: 8500,  paymentDate: "2026-01-03", status: "paid"      },
  { id: "p033", tenantId: "t15", month: "2026-01", amountDue: 14000, amountPaid: 14000, paymentDate: "2026-01-06", status: "paid_late" },
  { id: "p034", tenantId: "t12", month: "2026-01", amountDue: 13000, amountPaid: 13000, paymentDate: "2026-01-09", status: "paid_late" },
  { id: "p035", tenantId: "t13", month: "2026-01", amountDue: 12000, amountPaid: 12000, paymentDate: "2026-01-05", status: "paid"      },
  { id: "p036", tenantId: "t14", month: "2026-01", amountDue: 13000, amountPaid: 13000, paymentDate: "2026-01-03", status: "paid"      },
  { id: "p037", tenantId: "t19", month: "2026-01", amountDue: 7000,  amountPaid: 7000,  paymentDate: "2026-01-03", status: "paid"      },
  { id: "p038", tenantId: "t20", month: "2026-01", amountDue: 42000, amountPaid: 42000, paymentDate: "2026-01-13", status: "paid_late" },
  { id: "p039", tenantId: "t21", month: "2026-01", amountDue: 7000,  amountPaid: 7000,  paymentDate: "2026-01-01", status: "paid"      },
  { id: "p040", tenantId: "t18", month: "2026-01", amountDue: 3500,  amountPaid: 3500,  paymentDate: "2025-12-29", status: "paid"      },
  // Feb 2026 — t20 (T2) covered by Jan bulk; t15 (Diamond A) take deposit = no payment
  { id: "p041", tenantId: "t6",  month: "2026-02", amountDue: 25000, amountPaid: 25000, paymentDate: "2026-02-15", status: "paid_late" },
  { id: "p042", tenantId: "t7",  month: "2026-02", amountDue: 27000, amountPaid: 27000, paymentDate: "2026-02-01", status: "paid"      },
  { id: "p043", tenantId: "t5",  month: "2026-02", amountDue: 25000, amountPaid: 25000, paymentDate: "2026-02-06", status: "paid_late" },
  { id: "p044", tenantId: "t1",  month: "2026-02", amountDue: 22000, amountPaid: 22000, paymentDate: "2026-02-04", status: "paid"      },
  { id: "p045", tenantId: "t2",  month: "2026-02", amountDue: 22000, amountPaid: 22000, paymentDate: "2026-02-20", status: "paid_late" },
  { id: "p046", tenantId: "t3",  month: "2026-02", amountDue: 22000, amountPaid: 22000, paymentDate: "2026-02-04", status: "paid"      },
  { id: "p047", tenantId: "t4",  month: "2026-02", amountDue: 23000, amountPaid: 23000, paymentDate: "2026-02-21", status: "paid_late" },
  { id: "p048", tenantId: "t10", month: "2026-02", amountDue: 16500, amountPaid: 16500, paymentDate: "2026-02-08", status: "paid_late" },
  { id: "p049", tenantId: "t8",  month: "2026-02", amountDue: 18500, amountPaid: 18500, paymentDate: "2026-02-27", status: "paid_late" },
  { id: "p050", tenantId: "t9",  month: "2026-02", amountDue: 50000, amountPaid: 51000, paymentDate: "2026-02-07", status: "paid_late" },
  { id: "p051", tenantId: "t16", month: "2026-02", amountDue: 6500,  amountPaid: 6500,  paymentDate: "2026-01-13", status: "paid"      },
  { id: "p052", tenantId: "t17", month: "2026-02", amountDue: 8500,  amountPaid: 8500,  paymentDate: "2026-02-02", status: "paid"      },
  { id: "p053", tenantId: "t15", month: "2026-02", amountDue: 14000, amountPaid: 0,     paymentDate: null,         status: "late"      },
  { id: "p054", tenantId: "t12", month: "2026-02", amountDue: 13000, amountPaid: 13000, paymentDate: "2026-02-09", status: "paid_late" },
  { id: "p055", tenantId: "t13", month: "2026-02", amountDue: 12000, amountPaid: 12000, paymentDate: "2026-02-05", status: "paid"      },
  { id: "p056", tenantId: "t14", month: "2026-02", amountDue: 13000, amountPaid: 13000, paymentDate: "2026-02-02", status: "paid"      },
  { id: "p057", tenantId: "t19", month: "2026-02", amountDue: 7000,  amountPaid: 7000,  paymentDate: "2026-01-31", status: "paid"      },
  { id: "p058", tenantId: "t20", month: "2026-02", amountDue: 14000, amountPaid: 14000, paymentDate: "2026-02-01", status: "paid"      },
  { id: "p059", tenantId: "t21", month: "2026-02", amountDue: 7000,  amountPaid: 7000,  paymentDate: "2026-02-02", status: "paid"      },
  { id: "p060", tenantId: "t18", month: "2026-02", amountDue: 3500,  amountPaid: 3500,  paymentDate: "2026-01-30", status: "paid"      },
  // Mar 2026 — t20 (T2) contract ended Mar 5; t15 (Diamond A) vacated; t11 (Chayapa) first month
  { id: "p061", tenantId: "t6",  month: "2026-03", amountDue: 25000, amountPaid: 25000, paymentDate: "2026-03-14", status: "paid_late" },
  { id: "p062", tenantId: "t7",  month: "2026-03", amountDue: 27000, amountPaid: 27000, paymentDate: "2026-03-01", status: "paid"      },
  { id: "p063", tenantId: "t5",  month: "2026-03", amountDue: 25000, amountPaid: 25000, paymentDate: "2026-03-06", status: "paid_late" },
  { id: "p064", tenantId: "t1",  month: "2026-03", amountDue: 22000, amountPaid: 22000, paymentDate: "2026-03-01", status: "paid"      },
  { id: "p065", tenantId: "t2",  month: "2026-03", amountDue: 22000, amountPaid: 22000, paymentDate: "2026-03-19", status: "paid_late" },
  { id: "p066", tenantId: "t3",  month: "2026-03", amountDue: 22000, amountPaid: 22000, paymentDate: "2026-03-01", status: "paid"      },
  { id: "p067", tenantId: "t11", month: "2026-03", amountDue: 15000, amountPaid: 15000, paymentDate: "2026-03-03", status: "paid"      },
  { id: "p068", tenantId: "t4",  month: "2026-03", amountDue: 23000, amountPaid: 23000, paymentDate: "2026-03-28", status: "paid_late" },
  { id: "p069", tenantId: "t11", month: "2026-04", amountDue: 15000, amountPaid: 15000, paymentDate: "2026-03-27", status: "paid"      },
  { id: "p070", tenantId: "t10", month: "2026-03", amountDue: 16500, amountPaid: 16500, paymentDate: "2026-03-08", status: "paid_late" },
  { id: "p071", tenantId: "t8",  month: "2026-03", amountDue: 18500, amountPaid: 18500, paymentDate: "2026-03-22", status: "paid_late" },
  { id: "p072", tenantId: "t9",  month: "2026-03", amountDue: 50000, amountPaid: 50000, paymentDate: "2026-03-07", status: "paid_late" },
  { id: "p073", tenantId: "t16", month: "2026-03", amountDue: 6500,  amountPaid: 6500,  paymentDate: "2026-02-25", status: "paid"      },
  { id: "p074", tenantId: "t17", month: "2026-03", amountDue: 8500,  amountPaid: 8500,  paymentDate: "2026-03-02", status: "paid"      },
  { id: "p075", tenantId: "t12", month: "2026-03", amountDue: 13000, amountPaid: 13000, paymentDate: "2026-03-09", status: "paid_late" },
  { id: "p076", tenantId: "t13", month: "2026-03", amountDue: 12000, amountPaid: 12000, paymentDate: "2026-03-05", status: "paid"      },
  { id: "p077", tenantId: "t14", month: "2026-03", amountDue: 13000, amountPaid: 13000, paymentDate: "2026-03-01", status: "paid"      },
  { id: "p078", tenantId: "t19", month: "2026-03", amountDue: 7000,  amountPaid: 7000,  paymentDate: "2026-03-01", status: "paid"      },
  { id: "p079", tenantId: "t21", month: "2026-03", amountDue: 7000,  amountPaid: 7000,  paymentDate: "2026-03-01", status: "paid"      },
  { id: "p080", tenantId: "t18", month: "2026-03", amountDue: 3500,  amountPaid: 3500,  paymentDate: "2026-02-27", status: "paid"      },
  // Apr 2026 — t14 (Diamond D) done; t20 (T2) done; t15 (Diamond A) vacated; t11 Apr prepaid in Mar
  { id: "p081", tenantId: "t6",  month: "2026-04", amountDue: 25000, amountPaid: 25000, paymentDate: "2026-04-14", status: "paid_late" },
  { id: "p082", tenantId: "t7",  month: "2026-04", amountDue: 27000, amountPaid: 27000, paymentDate: "2026-04-01", status: "paid"      },
  { id: "p083", tenantId: "t5",  month: "2026-04", amountDue: 25000, amountPaid: 25000, paymentDate: "2026-04-06", status: "paid_late" },
  { id: "p084", tenantId: "t1",  month: "2026-04", amountDue: 22000, amountPaid: 22000, paymentDate: "2026-04-01", status: "paid"      },
  { id: "p085", tenantId: "t2",  month: "2026-04", amountDue: 22000, amountPaid: 0,     paymentDate: null,         status: "late"      },
  { id: "p086", tenantId: "t3",  month: "2026-04", amountDue: 22000, amountPaid: 22000, paymentDate: "2026-04-01", status: "paid"      },
  { id: "p087", tenantId: "t4",  month: "2026-04", amountDue: 23000, amountPaid: 0,     paymentDate: null,         status: "late"      },
  { id: "p088", tenantId: "t10", month: "2026-04", amountDue: 16500, amountPaid: 16500, paymentDate: "2026-04-08", status: "paid_late" },
  { id: "p089", tenantId: "t8",  month: "2026-04", amountDue: 18500, amountPaid: 0,     paymentDate: null,         status: "late"      },
  { id: "p090", tenantId: "t9",  month: "2026-04", amountDue: 50000, amountPaid: 50000, paymentDate: "2026-04-08", status: "paid_late" },
  { id: "p091", tenantId: "t16", month: "2026-04", amountDue: 6500,  amountPaid: 6500,  paymentDate: "2026-03-25", status: "paid"      },
  { id: "p092", tenantId: "t17", month: "2026-04", amountDue: 8500,  amountPaid: 8500,  paymentDate: "2026-04-02", status: "paid"      },
  { id: "p093", tenantId: "t12", month: "2026-04", amountDue: 13000, amountPaid: 13000, paymentDate: "2026-04-09", status: "paid_late" },
  { id: "p094", tenantId: "t13", month: "2026-04", amountDue: 12000, amountPaid: 12000, paymentDate: "2026-04-05", status: "paid"      },
  { id: "p095", tenantId: "t19", month: "2026-04", amountDue: 7000,  amountPaid: 7000,  paymentDate: "2026-04-03", status: "paid"      },
  { id: "p096", tenantId: "t21", month: "2026-04", amountDue: 7000,  amountPaid: 7000,  paymentDate: "2026-04-01", status: "paid"      },
  { id: "p097", tenantId: "t18", month: "2026-04", amountDue: 3500,  amountPaid: 3500,  paymentDate: "2026-03-31", status: "paid"      },
];

// Monthly chart — collected = sum(amountPaid), expected = sum(amountDue) per month
// Jan 26 collected includes t20's ฿42,000 bulk prepayment covering Jan–Mar
export const monthlyChartData = [
  { month: "Nov 25", collected: 202000, expected: 251000 },
  { month: "Dec 25", collected: 202000, expected: 251000 },
  { month: "Jan 26", collected: 376500, expected: 377500 },
  { month: "Feb 26", collected: 336500, expected: 349500 },
  { month: "Mar 26", collected: 336500, expected: 336500 },
  { month: "Apr 26", collected: 260000, expected: 323500 },
];

// ── Full portfolio (all 42 properties from Properties sheet) ─────────────────
// status: "rented" = active tenant tracked in this app
//         "vacant" = no current tenant (or contract ended/cancelled)
//         "sold"   = unit has been sold
// rentPrice: actual negotiated rent for tracked units; Rent-sheet listed price for others; null if sold/unknown
export const portfolioItems: PortfolioItem[] = [
  // ── กทม ──────────────────────────────────────────────────────────────────
  { name: "Silom Terrace",  unit: "57/89",   province: "กทม",      sqm: 32,    purchasePrice: 2500000,     rentPrice: 15000, status: "rented",  owner: "ศิริวรรณ"  },
  { name: "I-House RCA",    unit: "39/601",  province: "กทม",      sqm: 24.87, purchasePrice: 1022000,     rentPrice: 6500,  status: "rented",  owner: "ศิริวรรณ"  },
  { name: "Diamond",        unit: "3006",    province: "กทม",      sqm: 34.61, purchasePrice: 2907240,     rentPrice: 14000, status: "vacant",  owner: "ศิริวรรณ"  },
  { name: "Diamond",        unit: "3012",    province: "กทม",      sqm: 35.32, purchasePrice: 2966880,     rentPrice: 13000, status: "rented",  owner: "ศิริวรรณ"  },
  { name: "Diamond",        unit: "3109",    province: "กทม",      sqm: 34.87, purchasePrice: 2946515,     rentPrice: 12000, status: "rented",  owner: "ศิริวรรณ"  },
  { name: "Diamond",        unit: "3111",    province: "กทม",      sqm: 34.87, purchasePrice: 2946515,     rentPrice: 13000, status: "vacant",  owner: "ศิริวรรณ"  },
  { name: "Lumphini Ville", unit: "55/53",   province: "กทม",      sqm: 28,    purchasePrice: 1700000,     rentPrice: 8500,  status: "rented",  owner: "-"         },
  { name: "ภัทร ศรีพัฒน์", unit: "15/40",   province: "กทม",      sqm: 31,    purchasePrice: 550000,      rentPrice: 3500,  status: "rented",  owner: "ไพโรจน์"   },
  { name: "ภัทร ศรีพัฒน์", unit: "15/334",  province: "กทม",      sqm: 31,    purchasePrice: 520000,      rentPrice: 3500,  status: "vacant",  owner: "ไพโรจน์"   },
  { name: "พีคทาวเวอร์",   unit: "17/112",  province: "กทม",      sqm: 58.38, purchasePrice: 1500000,     rentPrice: null,  status: "vacant",  owner: "ไพโรจน์"   },
  { name: "พีคทาวเวอร์",   unit: "17/299",  province: "กทม",      sqm: 55.48, purchasePrice: 1500000,     rentPrice: null,  status: "vacant",  owner: "ไพโรจน์"   },
  { name: "พีคทาวเวอร์",   unit: "17/39",   province: "กทม",      sqm: 60.15, purchasePrice: 2100000,     rentPrice: null,  status: "sold",    owner: "ไพโรจน์"   },
  { name: "KNB",            unit: "4209",    province: "กทม",      sqm: 26.92, purchasePrice: 4000000,     rentPrice: 18500, status: "rented",  owner: "ชินวัฒน์"  },
  { name: "Ideo",           unit: "A1208",   province: "กทม",      sqm: 28.86, purchasePrice: 4576276,     rentPrice: 22000, status: "rented",  owner: "ณภัทร์"    },
  { name: "Ideo",           unit: "A1705",   province: "กทม",      sqm: 28.79, purchasePrice: 4667196,     rentPrice: 22000, status: "rented",  owner: "ณภัทร์"    },
  { name: "Ideo",           unit: "A1706",   province: "กทม",      sqm: 28.79, purchasePrice: 4661742,     rentPrice: 22000, status: "rented",  owner: "ชินวัฒน์"  },
  { name: "Ideo",           unit: "A1708",   province: "กทม",      sqm: 28.86, purchasePrice: 4661677,     rentPrice: 23000, status: "rented",  owner: "ชินวัฒน์"  },
  { name: "Life",           unit: "996/317", province: "กทม",      sqm: 35,    purchasePrice: 5022669,     rentPrice: 25000, status: "rented",  owner: "ชินวัฒน์"  },
  { name: "Life",           unit: "996/374", province: "กทม",      sqm: 35,    purchasePrice: 5063542,     rentPrice: 27000, status: "rented",  owner: "ณภัทร์"    },
  { name: "Life",           unit: "996/500", province: "กทม",      sqm: 35,    purchasePrice: 5250917,     rentPrice: 25000, status: "rented",  owner: "ชินวัฒน์"  },
  { name: "Origin",         unit: "2022",    province: "กทม",      sqm: 22,    purchasePrice: 2800000,     rentPrice: 16500, status: "rented",  owner: "ชินวัฒน์"  },
  // ── พัทยา ─────────────────────────────────────────────────────────────────
  { name: "The Palm",       unit: "A 4207",  province: "พัทยา",    sqm: 82,    purchasePrice: 12300000,    rentPrice: null,  status: "sold",    owner: "-"         },
  { name: "The Palm",       unit: "A 4407",  province: "พัทยา",    sqm: 82,    purchasePrice: 11606388,    rentPrice: null,  status: "sold",    owner: "-"         },
  { name: "The Palm",       unit: "A 1901",  province: "พัทยา",    sqm: 33,    purchasePrice: 2669997,     rentPrice: null,  status: "sold",    owner: "-"         },
  { name: "Cetus",          unit: "3004",    province: "พัทยา",    sqm: 54.5,  purchasePrice: 0,           rentPrice: null,  status: "sold",    owner: "-"         },
  { name: "The Palm",       unit: "A 3102",  province: "พัทยา",    sqm: 97.52, purchasePrice: 15389826,    rentPrice: null,  status: "sold",    owner: "ชินวัฒน์"  },
  { name: "Andromedra",     unit: "26F5",    province: "พัทยา",    sqm: 75,    purchasePrice: 10892160,    rentPrice: 50000, status: "vacant",  owner: "-"         },
  { name: "Andromedra",     unit: "27F5",    province: "พัทยา",    sqm: 75,    purchasePrice: 10930320,    rentPrice: 50000, status: "rented",  owner: "ชินวัฒน์"  },
  { name: "Florida",        unit: "B 103",   province: "พัทยา",    sqm: 46,    purchasePrice: 5949000,     rentPrice: 25000, status: "vacant",  owner: "ชินวัฒน์"  },
  { name: "Florida",        unit: "B 104",   province: "พัทยา",    sqm: 46,    purchasePrice: 5949000,     rentPrice: 25000, status: "vacant",  owner: "-"         },
  // ── เขาใหญ่ ───────────────────────────────────────────────────────────────
  { name: "ทิวเขา",         unit: "97",      province: "เขาใหญ่",  sqm: 50.09, purchasePrice: 3336250,     rentPrice: null,  status: "sold",    owner: "SH,N"      },
  { name: "ทิวเขา",         unit: "98",      province: "เขาใหญ่",  sqm: 28.6,  purchasePrice: 1829000,     rentPrice: 7000,  status: "rented",  owner: "SH,N"      },
  { name: "ทิวเขา",         unit: "112",     province: "เขาใหญ่",  sqm: 50.09, purchasePrice: 3356250,     rentPrice: 14000, status: "vacant",  owner: "SH,N"      },
  { name: "ทิวเขา",         unit: "113",     province: "เขาใหญ่",  sqm: 28.6,  purchasePrice: 1849000,     rentPrice: 7000,  status: "rented",  owner: "SH,N"      },
  { name: "Romantic",       unit: "A 302",   province: "เขาใหญ่",  sqm: 50,    purchasePrice: 3650000,     rentPrice: null,  status: "vacant",  owner: "ชินวัฒน์"  },
  { name: "Romantic",       unit: "B 501",   province: "เขาใหญ่",  sqm: 80,    purchasePrice: 5840000,     rentPrice: null,  status: "vacant",  owner: "ณภัทร์"    },
  { name: "Romantic",       unit: "B 502",   province: "เขาใหญ่",  sqm: 50,    purchasePrice: 3650000,     rentPrice: null,  status: "vacant",  owner: "ณภัทร์"    },
  { name: "Romantic",       unit: "B 503",   province: "เขาใหญ่",  sqm: 50,    purchasePrice: 3650000,     rentPrice: null,  status: "vacant",  owner: "ชินวัฒน์"  },
  { name: "Romantic",       unit: "B 504",   province: "เขาใหญ่",  sqm: 80,    purchasePrice: 5840000,     rentPrice: null,  status: "vacant",  owner: "ชินวัฒน์"  },
  { name: "Romantic",       unit: "B 506",   province: "เขาใหญ่",  sqm: 50,    purchasePrice: 3650000,     rentPrice: null,  status: "vacant",  owner: "ณภัทร์"    },
  { name: "Romantic",       unit: "B 507",   province: "เขาใหญ่",  sqm: 50,    purchasePrice: 3650000,     rentPrice: null,  status: "vacant",  owner: "ณภัทร์"    },
  { name: "Romantic",       unit: "B 508",   province: "เขาใหญ่",  sqm: 80,    purchasePrice: 5840000,     rentPrice: null,  status: "vacant",  owner: "ชินวัฒน์"  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────
export function getTenantByUnit(unitId: string) { return tenants.find((t) => t.unitId === unitId); }
export function getUnitById(unitId: string)      { return units.find((u) => u.id === unitId); }
export function getPropertyById(id: string)      { return properties.find((p) => p.id === id); }
export function getPaymentsForMonth(month: string) { return payments.filter((p) => p.month === month); }

export function formatCurrency(amount: number): string {
  return `฿${amount.toLocaleString()}`;
}

export function getStatusColor(status: PaymentStatus): string {
  switch (status) {
    case "paid":      return "text-green-700 bg-green-50";
    case "paid_late": return "text-amber-700 bg-amber-50";
    case "late":      return "text-red-600 bg-red-50";
    case "pending":   return "text-yellow-600 bg-yellow-50";
  }
}

export function getStatusLabel(status: PaymentStatus): string {
  switch (status) {
    case "paid":      return "paid";
    case "paid_late": return "paid late";
    case "late":      return "late";
    case "pending":   return "pending";
  }
}

// ── Tax Data 2569 ─────────────────────────────────────────────────────────────
export interface BuildingTaxItem {
  province: string;
  property: string;
  unit: string;
  sqm: number | null;
  assessmentValue: number | null;
  taxAmount: number | null;
  paid: boolean;
}

export interface LandTaxItem {
  province: string;
  property: string;
  deed: string;
  size: string;
  assessmentValue2569: number | null;
  taxAmount2569: number | null;
  paid: boolean;
}

export const buildingTaxItems: BuildingTaxItem[] = [
  // ── BKK ──────────────────────────────────────────────────────────────────
  { province: "BKK",     property: "Silom Terrace",  unit: "57/89",    sqm: 32,    assessmentValue: 2297484,  taxAmount: 459.50,   paid: false },
  { province: "BKK",     property: "I-House RCA",    unit: "39/601",   sqm: 24.87, assessmentValue: 1099254,  taxAmount: 219.85,   paid: false },
  { province: "BKK",     property: "Diamond",        unit: "3006",     sqm: 34.61, assessmentValue: 2929328,  taxAmount: 585.87,   paid: false },
  { province: "BKK",     property: "Diamond",        unit: "3012",     sqm: 35.32, assessmentValue: 2998012,  taxAmount: 599.60,   paid: false },
  { province: "BKK",     property: "Diamond",        unit: "3109",     sqm: 34.87, assessmentValue: 2983422,  taxAmount: 596.68,   paid: false },
  { province: "BKK",     property: "Diamond",        unit: "3111",     sqm: 34.87, assessmentValue: 2983422,  taxAmount: 596.68,   paid: false },
  { province: "BKK",     property: "LPN ราม16",      unit: "55/53",    sqm: 32.21, assessmentValue: 1111689,  taxAmount: 222.34,   paid: false },
  { province: "BKK",     property: "ภัทร ศรีพัฒน์",  unit: "15/40",    sqm: 31,    assessmentValue: 536300,   taxAmount: 107.26,   paid: true  },
  { province: "BKK",     property: "ภัทร ศรีพัฒน์",  unit: "15/334",   sqm: 31,    assessmentValue: 523900,   taxAmount: 104.78,   paid: true  },
  { province: "BKK",     property: "พีคทาวเวอร์",    unit: "17/112",   sqm: 58.38, assessmentValue: 1331064,  taxAmount: 266.21,   paid: true  },
  { province: "BKK",     property: "พีคทาวเวอร์",    unit: "17/299",   sqm: 55.48, assessmentValue: 1337068,  taxAmount: 267.41,   paid: true  },
  { province: "BKK",     property: "พีคทาวเวอร์",    unit: "17/39",    sqm: 60.15, assessmentValue: 1347360,  taxAmount: 269.47,   paid: true  },
  { province: "BKK",     property: "KNB",            unit: "4209",     sqm: 26.97, assessmentValue: 3534596,  taxAmount: 706.00,   paid: true  },
  { province: "BKK",     property: "Ideo",           unit: "A1208",    sqm: 28,    assessmentValue: 4258041,  taxAmount: 851.00,   paid: false },
  { province: "BKK",     property: "Ideo",           unit: "A1705",    sqm: 28,    assessmentValue: 4268394,  taxAmount: 853.00,   paid: false },
  { province: "BKK",     property: "Ideo",           unit: "A1706",    sqm: 28.79, assessmentValue: 4258041,  taxAmount: 851.00,   paid: true  },
  { province: "BKK",     property: "Ideo",           unit: "A1708",    sqm: 28.86, assessmentValue: 4268394,  taxAmount: 853.00,   paid: true  },
  { province: "BKK",     property: "Life",           unit: "996/317",  sqm: 34,    assessmentValue: 4601628,  taxAmount: 920.33,   paid: true  },
  { province: "BKK",     property: "Life",           unit: "996/384",  sqm: 34,    assessmentValue: null,     taxAmount: null,     paid: false },
  { province: "BKK",     property: "Life",           unit: "996/500",  sqm: 34,    assessmentValue: 4935754,  taxAmount: 987.15,   paid: true  },
  { province: "BKK",     property: "Plug & Play",    unit: "1155/459", sqm: 22.24, assessmentValue: 2408592,  taxAmount: 481.72,   paid: true  },
  // ── Khaoyai ───────────────────────────────────────────────────────────────
  { province: "Khaoyai", property: "Romantic",       unit: "A 302",    sqm: 50,    assessmentValue: 3887295,  taxAmount: 777.46,   paid: true  },
  { province: "Khaoyai", property: "Romantic",       unit: "B 501",    sqm: 80,    assessmentValue: 6290253,  taxAmount: 1258.05,  paid: true  },
  { province: "Khaoyai", property: "Romantic",       unit: "B 502",    sqm: 50,    assessmentValue: 4049055,  taxAmount: 809.81,   paid: true  },
  { province: "Khaoyai", property: "Romantic",       unit: "B 503",    sqm: 50,    assessmentValue: 4049856,  taxAmount: 809.07,   paid: false },
  { province: "Khaoyai", property: "Romantic",       unit: "B 504",    sqm: 80,    assessmentValue: 6504120,  taxAmount: 1300.82,  paid: true  },
  { province: "Khaoyai", property: "Romantic",       unit: "B 506",    sqm: 50,    assessmentValue: 4049856,  taxAmount: 809.07,   paid: false },
  { province: "Khaoyai", property: "Romantic",       unit: "B 507",    sqm: 50,    assessmentValue: 4049856,  taxAmount: 809.07,   paid: false },
  { province: "Khaoyai", property: "Romantic",       unit: "B 508",    sqm: 80,    assessmentValue: 6528150,  taxAmount: 1305.63,  paid: false },
  // ── Pattaya ───────────────────────────────────────────────────────────────
  { province: "Pattaya", property: "Andromedra",     unit: "27 F5",    sqm: 75,    assessmentValue: null,     taxAmount: 1294.91,  paid: false },
  { province: "Pattaya", property: "Florida",        unit: "B 103",    sqm: 46,    assessmentValue: null,     taxAmount: null,     paid: false },
  { province: "Pattaya", property: "Florida",        unit: "B 104",    sqm: 46,    assessmentValue: null,     taxAmount: null,     paid: false },
];

export const landTaxItems: LandTaxItem[] = [
  // ── BKK ──────────────────────────────────────────────────────────────────
  { province: "BKK",     property: "SIAM KINIK",     deed: "4465",   size: "0-2-58",  assessmentValue2569: 4386000,  taxAmount2569: 13158,   paid: true  },
  { province: "BKK",     property: "SIAM KINIK",     deed: "4472",   size: "0-2-54",  assessmentValue2569: 4318000,  taxAmount2569: 12954,   paid: true  },
  { province: "BKK",     property: "SIAM KINIK",     deed: "140739", size: "0-0-94",  assessmentValue2569: 3760000,  taxAmount2569: 11280,   paid: true  },
  { province: "BKK",     property: "SIAM KINIK",     deed: "140740", size: "0-0-43",  assessmentValue2569: 731000,   taxAmount2569: 2193,    paid: true  },
  { province: "BKK",     property: "SIAM KINIK",     deed: "140741", size: "0-0-43",  assessmentValue2569: 731000,   taxAmount2569: 2193,    paid: true  },
  { province: "BKK",     property: "SIAM KINIK",     deed: "140742", size: "0-0-43",  assessmentValue2569: 731000,   taxAmount2569: 2193,    paid: true  },
  { province: "BKK",     property: "SIAM KINIK",     deed: "140743", size: "0-0-44",  assessmentValue2569: 748000,   taxAmount2569: 2244,    paid: true  },
  { province: "BKK",     property: "SIAM KINIK",     deed: "140744", size: "0-0-44",  assessmentValue2569: 748000,   taxAmount2569: 2244,    paid: true  },
  { province: "BKK",     property: "SIAM KINIK",     deed: "101941", size: "0-3-98",  assessmentValue2569: 13930000, taxAmount2569: 41790,   paid: true  },
  { province: "BKK",     property: "ซอย 18",         deed: "75858",  size: "1-0-0",   assessmentValue2569: 8000000,  taxAmount2569: 0,       paid: true  },
  { province: "BKK",     property: "กาญจนาพิเศก",   deed: "1328",   size: "30747 ตรว.", assessmentValue2569: 34861200, taxAmount2569: 0,    paid: true  },
  { province: "BKK",     property: "กาญจนาพิเศก",   deed: "—",      size: "—",       assessmentValue2569: 26400000, taxAmount2569: 79200,   paid: true  },
  // ── Khaoyai ───────────────────────────────────────────────────────────────
  { province: "Khaoyai", property: "ภูผาธารา B2",   deed: "78756",  size: "36568 ตรว.", assessmentValue2569: 2891180, taxAmount2569: 578.24, paid: false },
  { province: "Khaoyai", property: "Golden Oak",     deed: "50877",  size: "15713 ตรว.", assessmentValue2569: 1677510, taxAmount2569: 0,      paid: false },
  { province: "Khaoyai", property: "Golden Oak",     deed: "52850",  size: "30717 ตรว.", assessmentValue2569: 571000,  taxAmount2569: 0,      paid: false },
  { province: "Khaoyai", property: "Golden Oak",     deed: "52851",  size: "10-0-7",     assessmentValue2569: 1963430, taxAmount2569: 0,      paid: false },
  { province: "Khaoyai", property: "Golden Oak",     deed: "53021",  size: "17904 ตรว.", assessmentValue2569: 1452930, taxAmount2569: 0,      paid: false },
  { province: "Khaoyai", property: "Golden Oak",     deed: "53022",  size: "1-0-26",     assessmentValue2569: 276900,  taxAmount2569: 0,      paid: false },
  { province: "Khaoyai", property: "Golden Oak",     deed: "99298",  size: "43526 ตรว.", assessmentValue2569: 637830,  taxAmount2569: 0,      paid: false },
  { province: "Khaoyai", property: "ลุงศีลชัย",     deed: "50965",  size: "46082 ตรว.", assessmentValue2569: 181500,  taxAmount2569: 0,      paid: false },
  { province: "Khaoyai", property: "ลุงศีลชัย",     deed: "58976",  size: "6-0-0",      assessmentValue2569: 1056000, taxAmount2569: 0,      paid: false },
  { province: "Khaoyai", property: "ลุงศีลชัย",     deed: "58980",  size: "36601 ตรว.", assessmentValue2569: 79000,   taxAmount2569: 0,      paid: false },
  { province: "Khaoyai", property: "ลุงศีลชัย",     deed: "58979",  size: "9-0-9",      assessmentValue2569: 1587960, taxAmount2569: 0,      paid: false },
  { province: "Khaoyai", property: "ลุงศีลชัย",     deed: "75590",  size: "42770 ตรว.", assessmentValue2569: 908500,  taxAmount2569: 0,      paid: false },
  { province: "Khaoyai", property: "นุช 41 ไร่",     deed: "74885",  size: "41-2-80",    assessmentValue2569: 5504400, taxAmount2569: 0,      paid: false },
  { province: "Khaoyai", property: "5 ไร่ หมูสี",   deed: "97744",  size: "5-0-0",      assessmentValue2569: 1500000, taxAmount2569: 4500,   paid: false },
  { province: "Khaoyai", property: "7 ไร่ ป้าวิภา", deed: "104892", size: "3-3-73.6",   assessmentValue2569: 3068520, taxAmount2569: 9205.56, paid: false },
];
