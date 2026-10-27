// Runs every scenario used in the paper and writes out/results.json.
const fs = require('fs');
const M = require('./model.js');

const KEEP = ['year', 'A', 'Y', 'H', 'wage', 'sufficiency', 'classLow', 'classMid', 'classHigh', 'ownersPer',
  'wealthLow', 'wealthMid', 'wealthHigh', 'daysLow', 'daysMid', 'daysHigh', 'bottom50', 'middle40', 'top10', 'median',
  'meanIncome', 'top1ToBottom50', 'gini', 'unemployment', 'daysPerWeek', 'partTimeShare', 'employmentRate', 'graduated',
  'tierShares', 'unfilled', 'pool', 'perFTEShare', 'dividendPerPerson', 'workersShareOfOutput', 'ownersShareOfOutput', 'broadOwnership',
  'spendLow', 'spendMid', 'spendHigh'];
const slim = o => { const s = {}; for (const k of KEEP) s[k] = o[k]; s.summary = o.summary; s.investment = o.investment; return s; };
const summ = o => ({ ...o.summary, investment: o.investment });

const results = { defaults: M.DEFAULTS, generated: new Date().toISOString() };

// 1. Main scenario: four regimes, full time series
results.main = {};
for (const r of M.REGIMES) results.main[r] = slim(M.simulate({ regime: r }));
results.main.ladderAdmit = slim(M.simulate({ regime: 'ladder', admitQueue: true }));

// 2. Displacement (lambda) sweep
results.lambda = [];
for (const lam of [0, 0.15, 0.3, 0.45, 0.6, 0.8, 1.0]) {
  const row = { lambda: lam };
  for (const r of M.REGIMES) row[r] = summ(M.simulate({ regime: r, laborSaving: lam }));
  row.ladderAdmit = summ(M.simulate({ regime: 'ladder', laborSaving: lam, admitQueue: true }));
  results.lambda.push(row);
}

// 3. Company share (c) sweep: gross vs cash-flow split
results.companyShare = [];
for (const c of [0.05, 0.1, 0.2, 0.3, 0.5, 0.75, 1.0]) {
  results.companyShare.push({ c, gross: summ(M.simulate({ regime: 'gross', companyShare: c })), ladder: summ(M.simulate({ regime: 'ladder', companyShare: c })) });
}

// 4. Investment curve (analytical)
results.investmentCurve = [];
for (let c = 0.02; c <= 1.0001; c += 0.02) {
  const g = M.investment({ ...M.DEFAULTS, regime: 'gross', companyShare: c });
  results.investmentCurve.push({ c: +c.toFixed(2), grossValueShare: g.valueShare, grossThreshold: g.threshold, rentValueShare: 1 });
}
const u = M.DEFAULTS.costOfCapital + M.DEFAULTS.aiObsolescence;
results.projectDistribution = { median: M.DEFAULTS.projMedianReturn, sigma: M.DEFAULTS.projSigma, userCost: u, grossThreshold10: u / 0.1 };

// 5. How "enough" moves: norm drift (nu) and status pressure (psi)
results.enough = [];
for (const nu of [0, 0.5, 1]) for (const psi of [0, 0.5, 1]) {
  results.enough.push({ nu, psi, sq: summ(M.simulate({ regime: 'sq', normDrift: nu, statusPressure: psi })), ladder: summ(M.simulate({ regime: 'ladder', normDrift: nu, statusPressure: psi })) });
}
results.enoughSeries = {};
for (const psi of [0, 0.5, 1]) {
  const o = M.simulate({ regime: 'ladder', statusPressure: psi, normDrift: 0.5, T: 40 });
  const s = M.simulate({ regime: 'sq', statusPressure: psi, normDrift: 0.5, T: 40 });
  results.enoughSeries['psi' + psi] = { ladder: { year: o.year, graduated: o.graduated, sufficiency: o.sufficiency, daysPerWeek: o.daysPerWeek }, sq: { year: s.year, graduated: s.graduated, sufficiency: s.sufficiency } };
}

// 6. Per-head friction
results.friction = [];
for (const f of [0, 0.05, 0.15, 0.3]) results.friction.push({ headCost: f, ladder: summ(M.simulate({ regime: 'ladder', headCost: f })), sq: summ(M.simulate({ regime: 'sq', headCost: f })) });

// 7. Pace of AI
results.aiPace = [];
for (const gA of [0.0005, 0.0075, 0.015, 0.03]) {
  const row = { gAIMax: gA };
  for (const r of M.REGIMES) row[r] = summ(M.simulate({ regime: r, gAIMax: gA }));
  results.aiPace.push(row);
}

// 8. Ablations of the tuned ladder
const abl = {
  tuned: {},
  noCapitalAccounts: { stockShare: 0 },
  noCap: { shareCap: 1e9 },
  noStandby: { standbyFTE: 0 },
  fullStandby: { standbyFTE: 1 },
  noTimePreference: { timePreference: 0 },
  admissionRule: { admitQueue: true },
  usStyleFriction: { headCost: 0.3 }
};
results.ablations = {};
for (const [k, v] of Object.entries(abl)) results.ablations[k] = { base: summ(M.simulate({ regime: 'ladder', ...v })), highDisp: summ(M.simulate({ regime: 'ladder', laborSaving: 0.6, ...v })) };

// 9. Seed robustness (20 seeds)
results.seeds = {};
for (const r of M.REGIMES) {
  const arr = [];
  for (let sd = 1; sd <= 20; sd++) arr.push(summ(M.simulate({ regime: r, seed: sd })));
  results.seeds[r] = arr;
}

// 10. 40-year horizon
results.horizon40 = {};
for (const r of M.REGIMES) results.horizon40[r] = summ(M.simulate({ regime: r, T: 40 }));

// 11. Model v1.2 sensitivity checks (added after external review)
results.v12 = { statusIncludesOwners: [], baselinePerHour: [], equalReturns: {}, absorption: [] };
for (const nu of [0, 0.5]) for (const psi of [0.5, 1]) {
  results.v12.statusIncludesOwners.push({ nu, psi,
    ladder: summ(M.simulate({ regime: 'ladder', normDrift: nu, statusPressure: psi, statusIncludesOwners: true })),
    sqSufficiency30: (s => s.sufficiency[30] / s.sufficiency[0])(M.simulate({ regime: 'sq', normDrift: nu, statusPressure: psi, statusIncludesOwners: true })) });
}
for (const lam of [0.3, 0.6]) results.v12.baselinePerHour.push({ lambda: lam, ladder: summ(M.simulate({ regime: 'ladder', laborSaving: lam, baselinePerHour: true })) });
for (const [k, v] of Object.entries({ withAccounts: {}, noAccounts: { stockShare: 0 } })) {
  results.v12.equalReturns[k] = { base: summ(M.simulate({ regime: 'ladder', rEquity: 0.03, ...v })), highDisp: summ(M.simulate({ regime: 'ladder', rEquity: 0.03, laborSaving: 0.6, ...v })) };
}
for (let i = 0; i <= 15; i++) {
  const lam = +(0.30 + 0.02 * i).toFixed(2);
  const o = M.simulate({ regime: 'ladder', laborSaving: lam });
  const T = o.params.T, k = o.diag.year.indexOf(T), lnM = T * Math.log(1 + o.investment.gAI);
  results.v12.absorption.push({ lambda: lam, unemployment30: o.summary.final.unemployment, lnM,
    lambdaStar: Math.log(o.H0 / o.diag.wanted[k]) / lnM, payIndex: o.diag.payIndex[k], tauMean: o.diag.tauMean[k],
    laborForce: o.diag.wanted[k] / (o.diag.tauMean[k] * Math.pow(o.diag.payIndex[k], -o.params.timePreference) * o.H0) });
}

// 12. Model v1.3 checks (added after the third review)
results.v13 = { dividendRights: [], aiTenYears: {}, admissionLong: [] };
for (const lam of [0.3, 0.6]) {
  const d = { regime: 'dividend', laborSaving: lam };
  results.v13.dividendRights.push({ lambda: lam,
    dividend: summ(M.simulate(d)),
    hoursRight: summ(M.simulate({ ...d, dividendHoursRight: true })),
    inPay: summ(M.simulate({ ...d, dividendHoursRight: true, dividendInPay: true })),
    accounts: summ(M.simulate({ ...d, dividendHoursRight: true, dividendInPay: true, dividendAccounts: true })),
    ladder: summ(M.simulate({ regime: 'ladder', laborSaving: lam })) });
}
for (const r of M.REGIMES) results.v13.aiTenYears[r] = summ(M.simulate({ regime: r, aiYears: 10 }));
for (const T of [30, 40]) results.v13.admissionLong.push({ T, ladderAdmit: summ(M.simulate({ regime: 'ladder', laborSaving: 1, admitQueue: true, T })) });

fs.writeFileSync('out/results.json', JSON.stringify(results));
console.log('wrote out/results.json', (fs.statSync('out/results.json').size / 1024).toFixed(0), 'KB');
