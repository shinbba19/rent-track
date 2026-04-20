const XLSX = require('./rent-track/node_modules/xlsx');

const wb = XLSX.utils.book_new();

// Sheet 1: Properties
const props = [
  ['name', 'location'],
  ['Ideo', 'Ramkhamhaeng, Bangkok'],
  ['Life', 'Sukhumvit, Bangkok'],
  ['KNB', 'Bangkok'],
  ['Ando', 'Bangkok'],
  ['Origin', 'Bangkok'],
];
XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(props), 'Properties');

// Sheet 2: Units
const units = [
  ['property', 'unit_number', 'rent_price'],
  ['Ideo', '1208', 22000],
  ['Ideo', '1705', 22000],
  ['Ideo', '1706', 22000],
  ['Ideo', '1708', 23000],
  ['Life', '500',  25000],
  ['Life', '317',  25000],
  ['Life', '374',  27000],
  ['KNB',  '4209', 18500],
  ['Ando', '27F5', 50000],
  ['Origin','2022',16500],
];
XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(units), 'Units');

// Sheet 3: Tenants
const tenants = [
  ['property', 'unit_number', 'tenant_name', 'phone', 'contract_start', 'contract_end'],
  ['Ideo',   '1208', 'พูนลาภ',          'xxx-xxx-x426', '2025-06-30', '2026-06-29'],
  ['Ideo',   '1705', 'Narong',           'xxx-xxx-x056', '2025-02-15', '2026-02-14'],
  ['Ideo',   '1706', 'Sumatra / Nithit', 'xxx-xxx-x056', '2025-06-01', '2026-05-31'],
  ['Ideo',   '1708', 'Montha / Peem',    'xxx-xxx-x056', '2025-02-26', '2026-02-25'],
  ['Life',   '500',  'Pimchanok',        'xxx-xxx-x056', '2025-05-05', '2026-05-04'],
  ['Life',   '317',  'ภรณ์ชนก',         'xxx-xxx-x056', '2025-09-13', '2026-09-12'],
  ['Life',   '374',  'Donald',           'xxx-xxx-x426', '2025-05-01', '2026-04-30'],
  ['KNB',    '4209', 'Torfun',           'xxx-xxx-x056', '2025-05-21', '2026-05-20'],
  ['Ando',   '27F5', 'Richard',          'xxx-xxx-x056', '2025-10-07', '2026-10-06'],
  ['Origin', '2022', 'Emma',             'xxx-xxx-x056', '2025-08-07', '2026-08-06'],
];
XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(tenants), 'Tenants');

// Sheet 4: Payments
const payments = [
  ['property', 'unit_number', 'tenant_name', 'month', 'amount_due', 'amount_paid', 'payment_date', 'status'],
  // Apr 2026
  ['Ideo',   '1208', 'พูนลาภ',          '2026-04', 22000, 0, '', 'late'],
  ['Ideo',   '1705', 'Narong',           '2026-04', 22000, 0, '', 'late'],
  ['Ideo',   '1706', 'Sumatra / Nithit', '2026-04', 22000, 0, '', 'late'],
  ['Ideo',   '1708', 'Montha / Peem',    '2026-04', 23000, 0, '', 'late'],
  ['Life',   '500',  'Pimchanok',        '2026-04', 25000, 0, '', 'late'],
  ['Life',   '317',  'ภรณ์ชนก',         '2026-04', 25000, 0, '', 'late'],
  ['Life',   '374',  'Donald',           '2026-04', 27000, 0, '', 'late'],
  ['KNB',    '4209', 'Torfun',           '2026-04', 18500, 0, '', 'late'],
  ['Ando',   '27F5', 'Richard',          '2026-04', 50000, 0, '', 'late'],
  ['Origin', '2022', 'Emma',             '2026-04', 16500, 0, '', 'late'],
  // Mar 2026
  ['Ideo',   '1208', 'พูนลาภ',          '2026-03', 22000, 0, '', 'late'],
  ['Ideo',   '1705', 'Narong',           '2026-03', 22000, 0, '', 'late'],
  ['Ideo',   '1706', 'Sumatra / Nithit', '2026-03', 22000, 0, '', 'late'],
  ['Ideo',   '1708', 'Montha / Peem',    '2026-03', 23000, 0, '', 'late'],
  ['Life',   '500',  'Pimchanok',        '2026-03', 25000, 0, '', 'late'],
  ['Life',   '317',  'ภรณ์ชนก',         '2026-03', 25000, 0, '', 'late'],
  ['Life',   '374',  'Donald',           '2026-03', 27000, 0, '', 'late'],
  ['KNB',    '4209', 'Torfun',           '2026-03', 18500, 0, '', 'late'],
  ['Ando',   '27F5', 'Richard',          '2026-03', 50000, 0, '', 'late'],
  ['Origin', '2022', 'Emma',             '2026-03', 16500, 0, '', 'late'],
  // Feb 2026
  ['Ideo',   '1208', 'พูนลาภ',          '2026-02', 22000, 0, '', 'late'],
  ['Ideo',   '1705', 'Narong',           '2026-02', 22000, 0, '', 'late'],
  ['Ideo',   '1706', 'Sumatra / Nithit', '2026-02', 22000, 0, '', 'late'],
  ['Ideo',   '1708', 'Montha / Peem',    '2026-02', 23000, 0, '', 'late'],
  ['Life',   '500',  'Pimchanok',        '2026-02', 25000, 0, '', 'late'],
  ['Life',   '317',  'ภรณ์ชนก',         '2026-02', 25000, 0, '', 'late'],
  ['Life',   '374',  'Donald',           '2026-02', 27000, 0, '', 'late'],
  ['KNB',    '4209', 'Torfun',           '2026-02', 18500, 0, '', 'late'],
  ['Ando',   '27F5', 'Richard',          '2026-02', 50000, 0, '', 'late'],
  ['Origin', '2022', 'Emma',             '2026-02', 16500, 0, '', 'late'],
  // Jan 2026
  ['Ideo',   '1208', 'พูนลาภ',          '2026-01', 22000, 0,     '',           'late'],
  ['Ideo',   '1705', 'Narong',           '2026-01', 22000, 22000, '2026-01-10', 'paid'],
  ['Ideo',   '1706', 'Sumatra / Nithit', '2026-01', 22000, 22000, '2026-01-01', 'paid'],
  ['Ideo',   '1708', 'Montha / Peem',    '2026-01', 23000, 23000, '2026-01-26', 'paid'],
  ['Life',   '500',  'Pimchanok',        '2026-01', 25000, 25000, '2026-01-06', 'paid'],
  ['Life',   '317',  'ภรณ์ชนก',         '2026-01', 25000, 25000, '2026-01-14', 'paid'],
  ['Life',   '374',  'Donald',           '2026-01', 27000, 0,     '',           'late'],
  ['KNB',    '4209', 'Torfun',           '2026-01', 18500, 18500, '2026-01-23', 'paid'],
  ['Ando',   '27F5', 'Richard',          '2026-01', 50000, 49000, '2026-01-08', 'late'],
  ['Origin', '2022', 'Emma',             '2026-01', 16500, 16500, '2026-01-08', 'paid'],
  // Dec 2025
  ['Ideo',   '1208', 'พูนลาภ',          '2025-12', 22000, 0,     '',           'late'],
  ['Ideo',   '1705', 'Narong',           '2025-12', 22000, 22000, '2026-01-10', 'paid'],
  ['Ideo',   '1706', 'Sumatra / Nithit', '2025-12', 22000, 22000, '2025-12-02', 'paid'],
  ['Ideo',   '1708', 'Montha / Peem',    '2025-12', 23000, 23000, '2025-12-20', 'paid'],
  ['Life',   '500',  'Pimchanok',        '2025-12', 25000, 25000, '2025-12-06', 'paid'],
  ['Life',   '317',  'ภรณ์ชนก',         '2025-12', 25000, 25000, '2025-12-14', 'paid'],
  ['Life',   '374',  'Donald',           '2025-12', 27000, 0,     '',           'late'],
  ['KNB',    '4209', 'Torfun',           '2025-12', 18500, 18500, '2025-12-23', 'paid'],
  ['Ando',   '27F5', 'Richard',          '2025-12', 50000, 50000, '2025-12-07', 'paid'],
  ['Origin', '2022', 'Emma',             '2025-12', 16500, 16500, '2025-12-08', 'paid'],
  // Nov 2025
  ['Ideo',   '1208', 'พูนลาภ',          '2025-11', 22000, 0,     '',           'late'],
  ['Ideo',   '1705', 'Narong',           '2025-11', 22000, 22000, '2025-11-16', 'paid'],
  ['Ideo',   '1706', 'Sumatra / Nithit', '2025-11', 22000, 22000, '2025-11-01', 'paid'],
  ['Ideo',   '1708', 'Montha / Peem',    '2025-11', 23000, 23000, '2025-11-15', 'paid'],
  ['Life',   '500',  'Pimchanok',        '2025-11', 25000, 25000, '2025-11-06', 'paid'],
  ['Life',   '317',  'ภรณ์ชนก',         '2025-11', 25000, 25000, '2025-11-12', 'paid'],
  ['Life',   '374',  'Donald',           '2025-11', 27000, 0,     '',           'late'],
  ['KNB',    '4209', 'Torfun',           '2025-11', 18500, 18500, '2025-11-24', 'paid'],
  ['Ando',   '27F5', 'Richard',          '2025-11', 50000, 50000, '2025-11-07', 'paid'],
  ['Origin', '2022', 'Emma',             '2025-11', 16500, 16500, '2025-11-08', 'paid'],
];
XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(payments), 'Payments');

XLSX.writeFile(wb, 'rent-data-template.xlsx');
console.log('Created: rent-data-template.xlsx');
