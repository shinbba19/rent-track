const XLSX = require('./rent-track/node_modules/xlsx');
const wb = XLSX.readFile('./rent-data-template.xlsx', { cellDates: true, cellNF: true, cellText: true });

// ── Payments sheet ──────────────────────────────────────────────────────────
const ws = wb.Sheets['Payments'];
const rows = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false });

// deduplicate: property+unit+month key
const seen = new Set();
const payments = [];
let id = 1;
rows.slice(1).forEach(r => {
  if (!r[0]) return;
  const key = `${r[0]}|${r[1]}|${r[3]}`;
  if (seen.has(key)) return; // skip duplicate month entries
  seen.add(key);

  const amountDue  = parseInt(String(r[4]).replace(/[^0-9]/g, '')) || 0;
  const amountPaid = parseInt(String(r[5]).replace(/[^0-9]/g, '')) || 0;
  const excelStatus = String(r[7] || '').trim().toLowerCase();

  // Derive richer status
  let status;
  if (amountPaid >= amountDue && excelStatus === 'late') status = 'paid_late';
  else if (amountPaid >= amountDue) status = 'paid';
  else status = 'late';

  payments.push({
    id: `p${String(id++).padStart(2,'0')}`,
    property:    r[0], unitNumber: r[1], tenantName: r[2],
    month:       r[3],
    amountDue, amountPaid,
    paymentDate: r[6] || null,
    status,
  });
});

// ── Tenants sheet ───────────────────────────────────────────────────────────
const wt = wb.Sheets['Tenants'];
const tRows = XLSX.utils.sheet_to_json(wt, { header: 1, raw: false });
const tenants = tRows.slice(1).filter(r => r[0]).map((r, i) => ({
  id: `t${i+1}`,
  property: r[0], unitNumber: r[1], name: r[2],
  phone: r[3] || '',
  contractStart: r[4] || '', contractEnd: r[5] || '',
}));

// Add Silom Terrace / Chayapa if not already in tenants
const hasSilom = tenants.some(t => t.property === 'Silom Terrace');
if (!hasSilom) {
  tenants.push({
    id: `t${tenants.length+1}`,
    property: 'Silom Terrace', unitNumber: '57/89', name: 'Chayapa',
    phone: '', contractStart: '2026-03-01', contractEnd: '2027-02-28',
  });
}

// ── Rent Price sheet ────────────────────────────────────────────────────────
const wr = wb.Sheets['Rent Price'];
const rRows = XLSX.utils.sheet_to_json(wr, { header: 1, raw: false });
const rentMap = {};
rRows.slice(1).forEach(r => {
  if (r[0] && r[1]) rentMap[`${r[0]}|${r[1]}`] = parseInt(String(r[2]).replace(/[^0-9]/g,'')) || 0;
});
// Add Silom
rentMap['Silom Terrace|57/89'] = 15000;

// ── Monthly chart (from payments) ───────────────────────────────────────────
const monthMap = {};
payments.forEach(p => {
  if (!monthMap[p.month]) monthMap[p.month] = { due: 0, paid: 0 };
  monthMap[p.month].due  += p.amountDue;
  monthMap[p.month].paid += p.amountPaid;
});

const output = { tenants, rentMap, payments, monthMap };
console.log(JSON.stringify(output, null, 2));
