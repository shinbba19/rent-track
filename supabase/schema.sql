-- ============================================================
-- Rent Track — full schema + seed data
-- Run this once in Supabase SQL Editor (Project → SQL Editor)
-- ============================================================

-- ── Tables ───────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS properties (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  location    TEXT,
  owner_id    TEXT
);

CREATE TABLE IF NOT EXISTS units (
  id               TEXT PRIMARY KEY,
  property_id      TEXT,
  unit_number      TEXT NOT NULL,
  rent_price       INTEGER NOT NULL,
  purchase_price   BIGINT NOT NULL DEFAULT 0,
  sqm              DECIMAL(10,2)
);

CREATE TABLE IF NOT EXISTS tenants (
  id               TEXT PRIMARY KEY,
  name             TEXT NOT NULL,
  phone            TEXT,
  unit_id          TEXT,
  contract_start   DATE,
  contract_end     DATE
);

CREATE TABLE IF NOT EXISTS payments (
  id             TEXT PRIMARY KEY,
  tenant_id      TEXT NOT NULL,
  month          TEXT NOT NULL,
  amount_due     INTEGER NOT NULL,
  amount_paid    INTEGER NOT NULL DEFAULT 0,
  payment_date   DATE,
  status         TEXT NOT NULL CHECK (status IN ('paid','paid_late','late','pending'))
);

CREATE TABLE IF NOT EXISTS portfolio_items (
  id               BIGSERIAL PRIMARY KEY,
  name             TEXT NOT NULL,
  unit             TEXT NOT NULL,
  province         TEXT,
  sqm              DECIMAL(10,2),
  purchase_price   BIGINT NOT NULL DEFAULT 0,
  rent_price       INTEGER,
  status           TEXT NOT NULL DEFAULT 'vacant' CHECK (status IN ('rented','vacant','sold')),
  owner            TEXT
);

CREATE TABLE IF NOT EXISTS building_tax_items (
  id                BIGSERIAL PRIMARY KEY,
  province          TEXT,
  property          TEXT NOT NULL,
  unit              TEXT NOT NULL,
  sqm               DECIMAL(10,2),
  assessment_value  BIGINT,
  tax_amount        DECIMAL(10,2),
  paid              BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS land_tax_items (
  id                      BIGSERIAL PRIMARY KEY,
  province                TEXT,
  property                TEXT NOT NULL,
  deed                    TEXT,
  size                    TEXT,
  assessment_value_2569   BIGINT,
  tax_amount_2569         DECIMAL(10,2),
  paid                    BOOLEAN NOT NULL DEFAULT false
);

-- ── Disable RLS (single-user personal app) ───────────────────────────────────
ALTER TABLE properties       DISABLE ROW LEVEL SECURITY;
ALTER TABLE units            DISABLE ROW LEVEL SECURITY;
ALTER TABLE tenants          DISABLE ROW LEVEL SECURITY;
ALTER TABLE payments         DISABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_items  DISABLE ROW LEVEL SECURITY;
ALTER TABLE building_tax_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE land_tax_items   DISABLE ROW LEVEL SECURITY;

-- ── Seed: properties ─────────────────────────────────────────────────────────
INSERT INTO properties (id, name, location, owner_id) VALUES
  ('ideo',     'Ideo',           'กทม',     'u1'),
  ('life',     'Life',           'กทม',     'u1'),
  ('knb',      'KNB',            'กทม',     'u1'),
  ('ando',     'Ando',           'พัทยา',   'u1'),
  ('origin',   'Origin',         'กทม',     'u1'),
  ('silom',    'Silom Terrace',  'กทม',     'u1'),
  ('diamond',  'Diamond',        'กทม',     'u1'),
  ('ihouse',   'I-House RCA',    'กทม',     'u1'),
  ('lumphini', 'Lumphini Ville', 'กทม',     'u1'),
  ('phattara', 'ภัทร ศรีพัฒน์', 'กทม',     'u1'),
  ('tiwkao',   'ทิวเขา',         'เขาใหญ่', 'u1')
ON CONFLICT (id) DO NOTHING;

-- ── Seed: units ──────────────────────────────────────────────────────────────
INSERT INTO units (id, property_id, unit_number, rent_price, purchase_price, sqm) VALUES
  ('u_ideo1208',     'ideo',     'A1208',   22000,  4576276,  28.86),
  ('u_ideo1705',     'ideo',     'A1705',   22000,  4667196,  28.79),
  ('u_ideo1706',     'ideo',     'A1706',   22000,  4661742,  28.79),
  ('u_ideo1708',     'ideo',     'A1708',   23000,  4661677,  28.86),
  ('u_life500',      'life',     '996/500', 25000,  5250917,  35.00),
  ('u_life317',      'life',     '996/317', 25000,  5022669,  35.00),
  ('u_life374',      'life',     '996/374', 27000,  5063542,  35.00),
  ('u_knb4209',      'knb',      '4209',    18500,  4000000,  26.92),
  ('u_ando27f5',     'ando',     '27F5',    50000, 10930320,  75.00),
  ('u_origin2022',   'origin',   '2022',    16500,  2800000,  22.00),
  ('u_silom5789',    'silom',    '57/89',   15000,  2500000,  32.00),
  ('u_diamond3006',  'diamond',  '3006',    14000,  2907240,  34.61),
  ('u_diamond3012',  'diamond',  '3012',    13000,  2966880,  35.32),
  ('u_diamond3109',  'diamond',  '3109',    12000,  2946515,  34.87),
  ('u_diamond3111',  'diamond',  '3111',    13000,  2946515,  34.87),
  ('u_ihouse601',    'ihouse',   '39/601',   6500,  1022000,  24.87),
  ('u_lumphini5553', 'lumphini', '55/53',    8500,  1700000,  28.00),
  ('u_phattara1540', 'phattara', '15/40',    3500,   550000,  31.00),
  ('u_tiwkao98',     'tiwkao',   '98',       7000,  1829000,  28.60),
  ('u_tiwkao112',    'tiwkao',   '112',     14000,  3356250,  50.09),
  ('u_tiwkao113',    'tiwkao',   '113',      7000,  1849000,  28.60)
ON CONFLICT (id) DO NOTHING;

-- ── Seed: tenants ────────────────────────────────────────────────────────────
INSERT INTO tenants (id, name, phone, unit_id, contract_start, contract_end) VALUES
  ('t1',  'พูนลาภ',          'xxx-xxx-x426', 'u_ideo1208',     '2025-06-30', '2026-06-29'),
  ('t2',  'Narong',           'xxx-xxx-x056', 'u_ideo1705',     '2026-02-25', '2027-02-25'),
  ('t3',  'Sumatra / Nithit', 'xxx-xxx-x056', 'u_ideo1706',     '2025-06-01', '2026-05-31'),
  ('t4',  'Montha / Peem',    'xxx-xxx-x056', 'u_ideo1708',     '2025-02-26', '2026-02-25'),
  ('t5',  'Pimchanok',        'xxx-xxx-x056', 'u_life500',      '2025-05-05', '2026-05-04'),
  ('t6',  'ภรณ์ชนก',         'xxx-xxx-x056', 'u_life317',      '2025-09-13', '2026-09-12'),
  ('t7',  'Donald',           'xxx-xxx-x426', 'u_life374',      '2025-05-01', '2026-04-30'),
  ('t8',  'Torfun',           'xxx-xxx-x056', 'u_knb4209',      '2025-05-21', '2026-05-20'),
  ('t9',  'Richard',          'xxx-xxx-x056', 'u_ando27f5',     '2025-10-07', '2026-10-06'),
  ('t10', 'Emma',             'xxx-xxx-x056', 'u_origin2022',   '2025-08-07', '2026-08-06'),
  ('t11', 'Chayapa',          'xxx-xxx-x056', 'u_silom5789',    '2026-04-01', '2026-05-31'),
  ('t12', 'Diamond B',        'xxx-xxx-x426', 'u_diamond3012',  '2025-07-01', '2026-06-30'),
  ('t13', 'Diamond C',        'xxx-xxx-x426', 'u_diamond3109',  '2025-11-01', '2026-10-31'),
  ('t14', 'Diamond D',        'xxx-xxx-x426', 'u_diamond3111',  '2025-03-23', '2026-03-22'),
  ('t15', 'Diamond A',        'xxx-xxx-x426', 'u_diamond3006',  '2025-08-09', '2026-08-08'),
  ('t16', 'Somebody',         'xxx-xxx-x426', 'u_ihouse601',    '2025-08-26', '2026-08-25'),
  ('t17', 'Praparat',         'xxx-xxx-x426', 'u_lumphini5553', '2025-10-01', '2026-09-29'),
  ('t18', 'Pat A',            'xxx-xxx-x426', 'u_phattara1540', '2025-06-01', '2026-05-31'),
  ('t19', 'T1',               'xxx-xxx-x426', 'u_tiwkao98',     '2025-05-01', '2026-04-30'),
  ('t20', 'T2',               'xxx-xxx-x426', 'u_tiwkao112',    '2026-01-11', '2026-03-05'),
  ('t21', 'T3',               'xxx-xxx-x426', 'u_tiwkao113',    '2025-07-01', '2026-06-30')
ON CONFLICT (id) DO NOTHING;

-- ── Seed: payments ───────────────────────────────────────────────────────────
INSERT INTO payments (id, tenant_id, month, amount_due, amount_paid, payment_date, status) VALUES
  -- Nov 2025
  ('p001','t6', '2025-11',25000,25000,'2025-11-12','paid_late'),
  ('p002','t7', '2025-11',27000,0,    NULL,         'late'),
  ('p003','t5', '2025-11',25000,25000,'2025-11-06','paid_late'),
  ('p004','t1', '2025-11',22000,0,    NULL,         'late'),
  ('p005','t2', '2025-11',22000,22000,'2025-11-16','paid_late'),
  ('p006','t3', '2025-11',22000,22000,'2025-11-01','paid'),
  ('p007','t4', '2025-11',23000,23000,'2025-11-15','paid_late'),
  ('p008','t10','2025-11',16500,16500,'2025-11-08','paid_late'),
  ('p009','t8', '2025-11',18500,18500,'2025-11-24','paid_late'),
  ('p010','t9', '2025-11',50000,50000,'2025-11-07','paid_late'),
  -- Dec 2025
  ('p011','t6', '2025-12',25000,25000,'2025-12-14','paid_late'),
  ('p012','t7', '2025-12',27000,0,    NULL,         'late'),
  ('p013','t5', '2025-12',25000,25000,'2025-12-06','paid_late'),
  ('p014','t1', '2025-12',22000,0,    NULL,         'late'),
  ('p015','t2', '2025-12',22000,22000,'2026-01-10','paid_late'),
  ('p016','t3', '2025-12',22000,22000,'2025-12-02','paid'),
  ('p017','t4', '2025-12',23000,23000,'2025-12-20','paid_late'),
  ('p018','t10','2025-12',16500,16500,'2025-12-08','paid_late'),
  ('p019','t8', '2025-12',18500,18500,'2025-12-23','paid_late'),
  ('p020','t9', '2025-12',50000,50000,'2025-12-07','paid_late'),
  -- Jan 2026
  ('p021','t6', '2026-01',25000,25000,'2026-01-14','paid_late'),
  ('p022','t7', '2026-01',27000,27000,'2026-01-01','paid'),
  ('p023','t5', '2026-01',25000,25000,'2026-01-06','paid_late'),
  ('p024','t1', '2026-01',22000,22000,'2026-01-04','paid'),
  ('p025','t2', '2026-01',22000,22000,'2026-01-10','paid_late'),
  ('p026','t3', '2026-01',22000,22000,'2026-01-01','paid'),
  ('p027','t4', '2026-01',23000,23000,'2026-01-26','paid_late'),
  ('p028','t10','2026-01',16500,16500,'2026-01-08','paid_late'),
  ('p029','t8', '2026-01',18500,18500,'2026-01-23','paid_late'),
  ('p030','t9', '2026-01',50000,49000,'2026-01-08','paid_late'),
  ('p031','t16','2026-01',6500, 6500, '2025-12-25','paid'),
  ('p032','t17','2026-01',8500, 8500, '2026-01-03','paid'),
  ('p033','t15','2026-01',14000,14000,'2026-01-06','paid_late'),
  ('p034','t12','2026-01',13000,13000,'2026-01-09','paid_late'),
  ('p035','t13','2026-01',12000,12000,'2026-01-05','paid'),
  ('p036','t14','2026-01',13000,13000,'2026-01-03','paid'),
  ('p037','t19','2026-01',7000, 7000, '2026-01-03','paid'),
  ('p038','t20','2026-01',42000,42000,'2026-01-13','paid_late'),
  ('p039','t21','2026-01',7000, 7000, '2026-01-01','paid'),
  ('p040','t18','2026-01',3500, 3500, '2025-12-29','paid'),
  -- Feb 2026
  ('p041','t6', '2026-02',25000,25000,'2026-02-15','paid_late'),
  ('p042','t7', '2026-02',27000,27000,'2026-02-01','paid'),
  ('p043','t5', '2026-02',25000,25000,'2026-02-06','paid_late'),
  ('p044','t1', '2026-02',22000,22000,'2026-02-04','paid'),
  ('p045','t2', '2026-02',22000,22000,'2026-02-20','paid_late'),
  ('p046','t3', '2026-02',22000,22000,'2026-02-04','paid'),
  ('p047','t4', '2026-02',23000,23000,'2026-02-21','paid_late'),
  ('p048','t10','2026-02',16500,16500,'2026-02-08','paid_late'),
  ('p049','t8', '2026-02',18500,18500,'2026-02-27','paid_late'),
  ('p050','t9', '2026-02',50000,51000,'2026-02-07','paid_late'),
  ('p051','t16','2026-02',6500, 6500, '2026-01-13','paid'),
  ('p052','t17','2026-02',8500, 8500, '2026-02-02','paid'),
  ('p053','t15','2026-02',14000,0,    NULL,         'late'),
  ('p054','t12','2026-02',13000,13000,'2026-02-09','paid_late'),
  ('p055','t13','2026-02',12000,12000,'2026-02-05','paid'),
  ('p056','t14','2026-02',13000,13000,'2026-02-02','paid'),
  ('p057','t19','2026-02',7000, 7000, '2026-01-31','paid'),
  ('p058','t20','2026-02',14000,14000,'2026-02-01','paid'),
  ('p059','t21','2026-02',7000, 7000, '2026-02-02','paid'),
  ('p060','t18','2026-02',3500, 3500, '2026-01-30','paid'),
  -- Mar 2026
  ('p061','t6', '2026-03',25000,25000,'2026-03-14','paid_late'),
  ('p062','t7', '2026-03',27000,27000,'2026-03-01','paid'),
  ('p063','t5', '2026-03',25000,25000,'2026-03-06','paid_late'),
  ('p064','t1', '2026-03',22000,22000,'2026-03-01','paid'),
  ('p065','t2', '2026-03',22000,22000,'2026-03-19','paid_late'),
  ('p066','t3', '2026-03',22000,22000,'2026-03-01','paid'),
  ('p067','t11','2026-03',15000,15000,'2026-03-03','paid'),
  ('p068','t4', '2026-03',23000,23000,'2026-03-28','paid_late'),
  ('p069','t11','2026-04',15000,15000,'2026-03-27','paid'),
  ('p070','t10','2026-03',16500,16500,'2026-03-08','paid_late'),
  ('p071','t8', '2026-03',18500,18500,'2026-03-22','paid_late'),
  ('p072','t9', '2026-03',50000,50000,'2026-03-07','paid_late'),
  ('p073','t16','2026-03',6500, 6500, '2026-02-25','paid'),
  ('p074','t17','2026-03',8500, 8500, '2026-03-02','paid'),
  ('p075','t12','2026-03',13000,13000,'2026-03-09','paid_late'),
  ('p076','t13','2026-03',12000,12000,'2026-03-05','paid'),
  ('p077','t14','2026-03',13000,13000,'2026-03-01','paid'),
  ('p078','t19','2026-03',7000, 7000, '2026-03-01','paid'),
  ('p079','t21','2026-03',7000, 7000, '2026-03-01','paid'),
  ('p080','t18','2026-03',3500, 3500, '2026-02-27','paid'),
  -- Apr 2026
  ('p081','t6', '2026-04',25000,25000,'2026-04-14','paid_late'),
  ('p082','t7', '2026-04',27000,27000,'2026-04-01','paid'),
  ('p083','t5', '2026-04',25000,25000,'2026-04-06','paid_late'),
  ('p084','t1', '2026-04',22000,22000,'2026-04-01','paid'),
  ('p085','t2', '2026-04',22000,0,    NULL,         'late'),
  ('p086','t3', '2026-04',22000,22000,'2026-04-01','paid'),
  ('p087','t4', '2026-04',23000,0,    NULL,         'late'),
  ('p088','t10','2026-04',16500,16500,'2026-04-08','paid_late'),
  ('p089','t8', '2026-04',18500,0,    NULL,         'late'),
  ('p090','t9', '2026-04',50000,50000,'2026-04-08','paid_late'),
  ('p091','t16','2026-04',6500, 6500, '2026-03-25','paid'),
  ('p092','t17','2026-04',8500, 8500, '2026-04-02','paid'),
  ('p093','t12','2026-04',13000,13000,'2026-04-09','paid_late'),
  ('p094','t13','2026-04',12000,12000,'2026-04-05','paid'),
  ('p095','t19','2026-04',7000, 7000, '2026-04-03','paid'),
  ('p096','t21','2026-04',7000, 7000, '2026-04-01','paid'),
  ('p097','t18','2026-04',3500, 3500, '2026-03-31','paid')
ON CONFLICT (id) DO NOTHING;

-- ── Seed: portfolio_items ────────────────────────────────────────────────────
INSERT INTO portfolio_items (name, unit, province, sqm, purchase_price, rent_price, status, owner) VALUES
  -- BKK
  ('Silom Terrace',  '57/89',   'กทม',     32,    2500000,   15000, 'rented',  'ศิริวรรณ'),
  ('I-House RCA',    '39/601',  'กทม',     24.87, 1022000,   6500,  'rented',  'ศิริวรรณ'),
  ('Diamond',        '3006',    'กทม',     34.61, 2907240,   14000, 'vacant',  'ศิริวรรณ'),
  ('Diamond',        '3012',    'กทม',     35.32, 2966880,   13000, 'rented',  'ศิริวรรณ'),
  ('Diamond',        '3109',    'กทม',     34.87, 2946515,   12000, 'rented',  'ศิริวรรณ'),
  ('Diamond',        '3111',    'กทม',     34.87, 2946515,   13000, 'vacant',  'ศิริวรรณ'),
  ('Lumphini Ville', '55/53',   'กทม',     28,    1700000,   8500,  'rented',  '-'),
  ('ภัทร ศรีพัฒน์', '15/40',   'กทม',     31,    550000,    3500,  'rented',  'ไพโรจน์'),
  ('ภัทร ศรีพัฒน์', '15/334',  'กทม',     31,    520000,    3500,  'vacant',  'ไพโรจน์'),
  ('พีคทาวเวอร์',   '17/112',  'กทม',     58.38, 1500000,   NULL,  'vacant',  'ไพโรจน์'),
  ('พีคทาวเวอร์',   '17/299',  'กทม',     55.48, 1500000,   NULL,  'vacant',  'ไพโรจน์'),
  ('พีคทาวเวอร์',   '17/39',   'กทม',     60.15, 2100000,   NULL,  'sold',    'ไพโรจน์'),
  ('KNB',            '4209',    'กทม',     26.92, 4000000,   18500, 'rented',  'ชินวัฒน์'),
  ('Ideo',           'A1208',   'กทม',     28.86, 4576276,   22000, 'rented',  'ณภัทร์'),
  ('Ideo',           'A1705',   'กทม',     28.79, 4667196,   22000, 'rented',  'ณภัทร์'),
  ('Ideo',           'A1706',   'กทม',     28.79, 4661742,   22000, 'rented',  'ชินวัฒน์'),
  ('Ideo',           'A1708',   'กทม',     28.86, 4661677,   23000, 'rented',  'ชินวัฒน์'),
  ('Life',           '996/317', 'กทม',     35,    5022669,   25000, 'rented',  'ชินวัฒน์'),
  ('Life',           '996/374', 'กทม',     35,    5063542,   27000, 'rented',  'ณภัทร์'),
  ('Life',           '996/500', 'กทม',     35,    5250917,   25000, 'rented',  'ชินวัฒน์'),
  ('Origin',         '2022',    'กทม',     22,    2800000,   16500, 'rented',  'ชินวัฒน์'),
  -- Pattaya
  ('The Palm',       'A 4207',  'พัทยา',   82,    12300000,  NULL,  'sold',    '-'),
  ('The Palm',       'A 4407',  'พัทยา',   82,    11606388,  NULL,  'sold',    '-'),
  ('The Palm',       'A 1901',  'พัทยา',   33,    2669997,   NULL,  'sold',    '-'),
  ('Cetus',          '3004',    'พัทยา',   54.5,  0,         NULL,  'sold',    '-'),
  ('The Palm',       'A 3102',  'พัทยา',   97.52, 15389826,  NULL,  'sold',    'ชินวัฒน์'),
  ('Andromedra',     '26F5',    'พัทยา',   75,    10892160,  50000, 'vacant',  '-'),
  ('Andromedra',     '27F5',    'พัทยา',   75,    10930320,  50000, 'rented',  'ชินวัฒน์'),
  ('Florida',        'B 103',   'พัทยา',   46,    5949000,   25000, 'vacant',  'ชินวัฒน์'),
  ('Florida',        'B 104',   'พัทยา',   46,    5949000,   25000, 'vacant',  '-'),
  -- Khaoyai
  ('ทิวเขา',         '97',      'เขาใหญ่', 50.09, 3336250,   NULL,  'sold',    'SH,N'),
  ('ทิวเขา',         '98',      'เขาใหญ่', 28.6,  1829000,   7000,  'rented',  'SH,N'),
  ('ทิวเขา',         '112',     'เขาใหญ่', 50.09, 3356250,   14000, 'vacant',  'SH,N'),
  ('ทิวเขา',         '113',     'เขาใหญ่', 28.6,  1849000,   7000,  'rented',  'SH,N'),
  ('Romantic',       'A 302',   'เขาใหญ่', 50,    3650000,   NULL,  'vacant',  'ชินวัฒน์'),
  ('Romantic',       'B 501',   'เขาใหญ่', 80,    5840000,   NULL,  'vacant',  'ณภัทร์'),
  ('Romantic',       'B 502',   'เขาใหญ่', 50,    3650000,   NULL,  'vacant',  'ณภัทร์'),
  ('Romantic',       'B 503',   'เขาใหญ่', 50,    3650000,   NULL,  'vacant',  'ชินวัฒน์'),
  ('Romantic',       'B 504',   'เขาใหญ่', 80,    5840000,   NULL,  'vacant',  'ชินวัฒน์'),
  ('Romantic',       'B 506',   'เขาใหญ่', 50,    3650000,   NULL,  'vacant',  'ณภัทร์'),
  ('Romantic',       'B 507',   'เขาใหญ่', 50,    3650000,   NULL,  'vacant',  'ณภัทร์'),
  ('Romantic',       'B 508',   'เขาใหญ่', 80,    5840000,   NULL,  'vacant',  'ชินวัฒน์');

-- ── Seed: building_tax_items ─────────────────────────────────────────────────
INSERT INTO building_tax_items (province, property, unit, sqm, assessment_value, tax_amount, paid) VALUES
  ('BKK',     'Silom Terrace',  '57/89',    32,    2297484,  459.50,  false),
  ('BKK',     'I-House RCA',    '39/601',   24.87, 1099254,  219.85,  false),
  ('BKK',     'Diamond',        '3006',     34.61, 2929328,  585.87,  false),
  ('BKK',     'Diamond',        '3012',     35.32, 2998012,  599.60,  false),
  ('BKK',     'Diamond',        '3109',     34.87, 2983422,  596.68,  false),
  ('BKK',     'Diamond',        '3111',     34.87, 2983422,  596.68,  false),
  ('BKK',     'LPN ราม16',      '55/53',    32.21, 1111689,  222.34,  false),
  ('BKK',     'ภัทร ศรีพัฒน์', '15/40',    31,    536300,   107.26,  true),
  ('BKK',     'ภัทร ศรีพัฒน์', '15/334',   31,    523900,   104.78,  true),
  ('BKK',     'พีคทาวเวอร์',   '17/112',   58.38, 1331064,  266.21,  true),
  ('BKK',     'พีคทาวเวอร์',   '17/299',   55.48, 1337068,  267.41,  true),
  ('BKK',     'พีคทาวเวอร์',   '17/39',    60.15, 1347360,  269.47,  true),
  ('BKK',     'KNB',            '4209',     26.97, 3534596,  706.00,  true),
  ('BKK',     'Ideo',           'A1208',    28,    4258041,  851.00,  false),
  ('BKK',     'Ideo',           'A1705',    28,    4268394,  853.00,  false),
  ('BKK',     'Ideo',           'A1706',    28.79, 4258041,  851.00,  true),
  ('BKK',     'Ideo',           'A1708',    28.86, 4268394,  853.00,  true),
  ('BKK',     'Life',           '996/317',  34,    4601628,  920.33,  true),
  ('BKK',     'Life',           '996/384',  34,    NULL,     NULL,    false),
  ('BKK',     'Life',           '996/500',  34,    4935754,  987.15,  true),
  ('BKK',     'Plug & Play',    '1155/459', 22.24, 2408592,  481.72,  true),
  ('Khaoyai', 'Romantic',       'A 302',    50,    3887295,  777.46,  true),
  ('Khaoyai', 'Romantic',       'B 501',    80,    6290253,  1258.05, true),
  ('Khaoyai', 'Romantic',       'B 502',    50,    4049055,  809.81,  true),
  ('Khaoyai', 'Romantic',       'B 503',    50,    4049856,  809.07,  false),
  ('Khaoyai', 'Romantic',       'B 504',    80,    6504120,  1300.82, true),
  ('Khaoyai', 'Romantic',       'B 506',    50,    4049856,  809.07,  false),
  ('Khaoyai', 'Romantic',       'B 507',    50,    4049856,  809.07,  false),
  ('Khaoyai', 'Romantic',       'B 508',    80,    6528150,  1305.63, false),
  ('Pattaya', 'Andromedra',     '27 F5',    75,    NULL,     1294.91, false),
  ('Pattaya', 'Florida',        'B 103',    46,    NULL,     NULL,    false),
  ('Pattaya', 'Florida',        'B 104',    46,    NULL,     NULL,    false);

-- ── Seed: land_tax_items ─────────────────────────────────────────────────────
INSERT INTO land_tax_items (province, property, deed, size, assessment_value_2569, tax_amount_2569, paid) VALUES
  ('BKK',     'SIAM KINIK',     '4465',   '0-2-58',    4386000,  13158,    true),
  ('BKK',     'SIAM KINIK',     '4472',   '0-2-54',    4318000,  12954,    true),
  ('BKK',     'SIAM KINIK',     '140739', '0-0-94',    3760000,  11280,    true),
  ('BKK',     'SIAM KINIK',     '140740', '0-0-43',    731000,   2193,     true),
  ('BKK',     'SIAM KINIK',     '140741', '0-0-43',    731000,   2193,     true),
  ('BKK',     'SIAM KINIK',     '140742', '0-0-43',    731000,   2193,     true),
  ('BKK',     'SIAM KINIK',     '140743', '0-0-44',    748000,   2244,     true),
  ('BKK',     'SIAM KINIK',     '140744', '0-0-44',    748000,   2244,     true),
  ('BKK',     'SIAM KINIK',     '101941', '0-3-98',    13930000, 41790,    true),
  ('BKK',     'ซอย 18',         '75858',  '1-0-0',     8000000,  0,        true),
  ('BKK',     'กาญจนาพิเศก',   '1328',   '30747 ตรว.',34861200, 0,        true),
  ('BKK',     'กาญจนาพิเศก',   '—',      '—',         26400000, 79200,    true),
  ('Khaoyai', 'ภูผาธารา B2',   '78756',  '36568 ตรว.',2891180,  578.24,   false),
  ('Khaoyai', 'Golden Oak',     '50877',  '15713 ตรว.',1677510,  0,        false),
  ('Khaoyai', 'Golden Oak',     '52850',  '30717 ตรว.',571000,   0,        false),
  ('Khaoyai', 'Golden Oak',     '52851',  '10-0-7',    1963430,  0,        false),
  ('Khaoyai', 'Golden Oak',     '53021',  '17904 ตรว.',1452930,  0,        false),
  ('Khaoyai', 'Golden Oak',     '53022',  '1-0-26',    276900,   0,        false),
  ('Khaoyai', 'Golden Oak',     '99298',  '43526 ตรว.',637830,   0,        false),
  ('Khaoyai', 'ลุงศีลชัย',     '50965',  '46082 ตรว.',181500,   0,        false),
  ('Khaoyai', 'ลุงศีลชัย',     '58976',  '6-0-0',     1056000,  0,        false),
  ('Khaoyai', 'ลุงศีลชัย',     '58980',  '36601 ตรว.',79000,    0,        false),
  ('Khaoyai', 'ลุงศีลชัย',     '58979',  '9-0-9',     1587960,  0,        false),
  ('Khaoyai', 'ลุงศีลชัย',     '75590',  '42770 ตรว.',908500,   0,        false),
  ('Khaoyai', 'นุช 41 ไร่',    '74885',  '41-2-80',   5504400,  0,        false),
  ('Khaoyai', '5 ไร่ หมูสี',   '97744',  '5-0-0',     1500000,  4500,     false),
  ('Khaoyai', '7 ไร่ ป้าวิภา', '104892', '3-3-73.6',  3068520,  9205.56,  false);
