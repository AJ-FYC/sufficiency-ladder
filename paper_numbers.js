// Checks every model number the paper reports against a fresh run of the model.
//
//   node paper_numbers.js
//
// Runs run.js (all scenarios, writes out/results.json; about a minute), checks
// that the four classes keep their order in every year of every run, then
// compares each number in the paper with the run, rounded as the paper rounds it.
// Exit code 0 = every check passed.
const fs = require('fs');
const M = require('./model.js');

// 1. Wrap the model so every run made by run.js is checked for rank order.
const simulate = M.simulate;
let runs = 0;
const disorder = [];
M.simulate = function (params) {
  const o = simulate(params);
  runs++;
  for (let t = 0; t < o.year.length; t++) {
    if (!(o.classLow[t] < o.classMid[t] && o.classMid[t] < o.classHigh[t] && o.classHigh[t] < o.ownersPer[t])) {
      disorder.push({ params, year: t });
      break;
    }
  }
  return o;
};
fs.mkdirSync('out', { recursive: true });
require('./run.js');
const R = JSON.parse(fs.readFileSync('out/results.json', 'utf8'));

// 2. Formatting as in the paper, and the check itself.
const p0 = x => Math.round(100 * x) + '%';
const p1 = x => (100 * x).toFixed(1) + '%';
const p2 = x => (100 * x).toFixed(2) + '%';
const f1 = x => x.toFixed(1), f2 = x => x.toFixed(2), f3 = x => x.toFixed(3);
const times = x => Math.round(x) + '×';
let pass = 0, fail = 0;
function check(where, what, got, want) {
  const ok = got === want;
  if (ok) pass++; else fail++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${where.padEnd(11)} ${what.padEnd(64)} paper ${String(want).padStart(10)}   run ${String(got).padStart(10)}`);
}
const S = (reg) => R.main[reg].summary;
const F = (reg) => R.main[reg].summary.final;
const row = (arr, key, v) => arr.find(r => Math.abs(r[key] - v) < 1e-9);
const REG = ['sq', 'ladder', 'dividend', 'gross'];
const T = R.defaults.T;

console.log('\nRank order');
check('Sec. 6', 'runs in run.js (all results and sensitivity analysis)', String(runs), '248');
check('Sec. 6', 'runs in which the four classes ever change order', String(disorder.length), '0');

console.log('\nInvestment (Section 4, Abstract)');
const inv = R.main.gross.investment;
check('Sec. 4', 'cash-flow hurdle r + delta', f2(R.projectDistribution.userCost), '0.22');
check('Sec. 4', 'gross-split hurdle at c = 10%', f1(R.projectDistribution.grossThreshold10), '2.2');
check('Sec. 4', 'share of worthwhile projects built, gross split, c = 10%', p1(inv.projectShare), '1.4%');
check('Abstract', 'share of AI value built, gross split, c = 10%', p1(inv.valueShare), '7.6%');
for (const [c, want] of [[0.05, '1.3%'], [0.2, '26.8%'], [0.5, '71.3%']]) {
  check('Sec. 4', `share of AI value built, gross split, c = ${100 * c}%`, p1(row(R.companyShare, 'c', c).gross.investment.valueShare), want);
}

console.log('\nCalibration at year 0 (Section 5)');
check('Sec. 5', 'profit share of output at year 0', p0(R.main.sq.ownersShareOfOutput[0]), '35%');
check('Sec. 5', 'wage share of output at year 0', p0(R.main.sq.workersShareOfOutput[0]), '60%');
check('Sec. 5', 'fall in labor demand over 30 years, full-speed AI, lambda = 0.3', p1(1 - R.main.sq.H[T] / R.main.sq.H[0]), '12.5%');

console.log('\nMain results (Abstract, Section 6, Figures 3-6)');
check('Abstract', 'lower-paid half, yearly income growth, ladder', p1(S('ladder').growth.low), '4.1%');
check('Abstract', 'owners, yearly income growth, ladder', p1(S('ladder').growth.owners), '0.7%');
check('Abstract', 'lower-paid half, yearly income growth, status quo', p1(S('sq').growth.low), '0.5%');
check('Abstract', 'owners, yearly income growth, status quo', p1(S('sq').growth.owners), '4.2%');
check('Abstract', 'lower-paid half, spendable income growth, ladder', p1(S('ladder').growth.lowSpendable), '2.3%');
check('Sec. 6', 'lower-paid half, spendable income growth, status quo', p1(S('sq').growth.lowSpendable), '0.5%');
check('Sec. 6', 'lower-paid half: year-30 income locked in capital accounts, ladder', p0(F('ladder').lockedShareLow), '41%');
const spendRatio = S('ladder').growth.lowSpendable / S('sq').growth.lowSpendable;
check('Sec. 6', 'spendable growth, ladder vs status quo ("almost five times")', String(spendRatio > 4.5 && spendRatio < 5), 'true');
check('Sec. 6', 'lower-paid half, spendable income growth, flat dividend', p1(S('dividend').growth.lowSpendable), '3.8%');
const zeroFrom = reg => { const u = R.main[reg].unemployment; let t = u.length - 1; if (u[t] > 0) return 'never'; while (t > 0 && u[t - 1] === 0) t--; return String(t); };
check('Abstract', 'ladder: unemployment zero from year', zeroFrom('ladder'), '22');
const firstPositiveRun = (() => { const u = R.main.ladder.unemployment; let t = 1; while (t <= T && u[t] > 0) t++; return `1–${t - 1}`; })();
check('Sec. 7', 'ladder: years with unemployment before it reaches zero', firstPositiveRun, '1–21');
check('Abstract', 'status quo: unemployment in year 30, rounded', p0(F('sq').unemployment), '17%');
const ratio = (reg, t) => R.main[reg].ownersPer[t] / R.main[reg].classLow[t];
check('Sec. 6', 'owners ÷ lower-paid half, year 0', times(ratio('sq', 0)), '81×');
const lev = x => '$' + Math.round(x) + ',000', mil = x => '$' + (x / 1000).toFixed(1) + ' million';
check('Sec. 6', 'lower-paid half, income at year 0', lev(R.main.ladder.classLow[0]), '$41,000');
check('Sec. 6', 'lower-paid half, income in year 30, ladder', lev(F('ladder').classLow), '$137,000');
check('Sec. 6', 'lower-paid half, spendable income in year 30, ladder', lev(F('ladder').spendLow), '$80,000');
const gl = S('ladder').growth;
check('Sec. 11', 'ladder: lower-paid fastest in spendable income, owners slowest', String(gl.lowSpendable > gl.midSpendable && gl.midSpendable > gl.highSpendable && gl.highSpendable > gl.owners), 'true');
check('Sec. 6', 'lower-paid half, income in year 30, status quo', lev(F('sq').classLow), '$47,000');
check('Sec. 6', 'owners, income at year 0', mil(R.main.ladder.ownersPer[0]), '$3.3 million');
check('Sec. 6', 'owners, income in year 30, ladder', mil(F('ladder').ownersPer), '$4.0 million');
check('Sec. 6', 'owners, income in year 30, status quo', mil(F('sq').ownersPer), '$11.3 million');
check('Sec. 6', 'status quo: unemployment at year 0', p1(S('sq').start.unemployment), '4.4%');
check('Sec. 6', 'gross split: extra productivity growth from AI, per year', p2(R.main.gross.investment.gAI), '0.11%');
check('Sec. 6', 'full-speed extra productivity growth from AI, per year', p1(R.main.sq.investment.gAI), '1.5%');
check('Sec. 6', 'gross split: output in year 30 below the status quo', p0(1 - F('gross').outputIndex / F('sq').outputIndex), '30%');
check('Sec. 6', 'owners, yearly income growth, gross split', p2(S('gross').growth.owners), '0.48%');
check('Sec. 6', 'owners, yearly income growth, ladder', p2(S('ladder').growth.owners), '0.68%');
check('Sec. 6', 'status quo: people waiting in year 30, one in', String(Math.round(1 / R.main.sq.tierShares[T][0])), '6');
check('Sec. 6', 'ladder: share in tiers III and IV in year 30', p0(R.main.ladder.tierShares[T][2]), '47%');
check('Sec. 6', 'ladder: share graduated in year 30', p1(F('ladder').graduated), '1.1%');
check('Sec. 6', 'ladder: share graduated after 40 years', p0(R.horizon40.ladder.final.graduated), '11%');

console.log('\nTable 3 (year 30: status quo | ladder | flat dividend | gross split)');
const NAME = { sq: 'status quo', ladder: 'ladder', dividend: 'flat dividend', gross: 'gross split' };
const t3 = (what, fmt, key, wants) => REG.forEach((r, i) => check('Table 3', `${what}, ${NAME[r]}`, fmt(key(r)), wants[i]));
t3('unemployment', p1, r => F(r).unemployment, ['16.7%', '0.0%', '17.1%', '0.0%']);
t3('days worked per week', f2, r => F(r).daysPerWeek, ['5.00', '3.97', '5.00', '4.45']);
t3('owners ÷ lower-paid half', times, r => ratio(r, T), ['243×', '29×', '33×', '45×']);
check('Table 3', 'Gini coefficient at start', f3(S('sq').start.gini), '0.513');
t3('Gini coefficient', f3, r => F(r).gini, ['0.728', '0.276', '0.330', '0.368']);
check('Table 3', "workers' share of output at start", p0(R.main.sq.workersShareOfOutput[0]), '60%');
t3("workers' share of output", p0, r => F(r).workersShareOfOutput, ['34%', '73%', '74%', '68%']);
t3('output (year 0 = 1)', f2, r => F(r).outputIndex, ['1.96', '1.84', '1.96', '1.38']);
t3('output per hour (year 0 = 1)', f2, r => F(r).productivityIndex, ['2.24', '2.24', '2.24', '1.48']);
t3('labor demand left unfilled', x => (x === 0 ? '0%' : p1(x)), r => F(r).unfilled, ['0%', '5.8%', '0%', '6.0%']);
t3("workers' capital accounts ÷ (accounts + owners' stake)", p0, r => F(r).broadOwnership, ['0%', '41%', '0%', '26%']);
t3("lower-paid half: income locked in capital accounts", p0, r => F(r).lockedShareLow, ['0%', '41%', '0%', '32%']);
check('Sec. 6', "ladder: output in year 30 below the status quo", p0(1 - F('ladder').outputIndex / F('sq').outputIndex), '6%');

console.log('\nRobustness across 20 seeds (Section 6)');
const seeds = (reg, f) => R.seeds[reg].map(f);
const mean = a => a.reduce((s, x) => s + x, 0) / a.length;
const lowL = seeds('ladder', s => s.growth.low), ownL = seeds('ladder', s => s.growth.owners);
check('Sec. 6', 'ladder: lower-paid growth, mean of 20 seeds', p2(mean(lowL)), '4.22%');
check('Sec. 6', 'ladder: lower-paid growth, lowest seed', p2(Math.min(...lowL)), '4.12%');
check('Sec. 6', 'ladder: lower-paid growth, highest seed', p2(Math.max(...lowL)), '4.39%');
check('Sec. 6', 'ladder: owners growth, mean of 20 seeds', p2(mean(ownL)), '0.70%');
check('Sec. 6', 'ladder: owners growth, lowest seed', p2(Math.min(...ownL)), '0.67%');
check('Sec. 6', 'ladder: owners growth, highest seed', p2(Math.max(...ownL)), '0.73%');
const ownS = seeds('sq', s => s.growth.owners), unS = seeds('sq', s => s.final.unemployment);
check('Sec. 6', 'status quo: owners growth, lowest seed', p2(Math.min(...ownS)), '4.23%');
check('Sec. 6', 'status quo: owners growth, highest seed', p2(Math.max(...ownS)), '4.24%');
check('Sec. 6', 'status quo: unemployment in year 30, lowest seed', p1(Math.min(...unS)), '16.4%');
check('Sec. 6', 'status quo: unemployment in year 30, highest seed', p1(Math.max(...unS)), '20.8%');
check('Sec. 6', 'ladder: unemployment in year 30, highest seed', p1(Math.max(...seeds('ladder', s => s.final.unemployment))), '0.0%');

console.log('\nDisplacement (Section 7, Figure 7)');
const L = lam => row(R.lambda, 'lambda', lam);
check('Sec. 7', 'ladder: unemployment in year 30 at lambda = 0.45', p1(L(0.45).ladder.final.unemployment), '1.4%');
check('Sec. 7', 'ladder: unemployment in year 30 at lambda = 0.6', p1(L(0.6).ladder.final.unemployment), '8.3%');
check('Sec. 7', 'ladder: unemployment in year 30 at lambda = 1', p1(L(1).ladder.final.unemployment), '25.2%');
check('Sec. 7', 'status quo: unemployment in year 30 at lambda = 0.6', p1(L(0.6).sq.final.unemployment), '27.3%');
check('Sec. 7', 'status quo: unemployment in year 30 at lambda = 1', p1(L(1).sq.final.unemployment), '38.5%');
check('Sec. 7', 'admission rule: highest year-30 unemployment, any lambda', p1(Math.max(...R.lambda.map(r => r.ladderAdmit.final.unemployment))), '0.0%');
check('Sec. 7', 'admission rule: days per week at lambda = 0.6', f1(L(0.6).ladderAdmit.final.daysPerWeek), '3.7');
check('Sec. 7', 'admission rule: days per week at lambda = 1', f1(L(1).ladderAdmit.final.daysPerWeek), '3.0');
check('Sec. 7', 'admission rule, lambda = 1: unemployment in year 40', p1(R.v13.admissionLong.find(x => x.T === 40).ladderAdmit.final.unemployment), '12.2%');
const ab = R.v12.absorption;
const lastZero = Math.max(...ab.filter(r => r.unemployment30 === 0).map(r => r.lambda));
const firstPos = Math.min(...ab.filter(r => r.unemployment30 > 0).map(r => r.lambda));
check('Abstract', 'voluntary handoff holds up to lambda between', `${f2(lastZero)}–${f2(firstPos)}`, '0.42–0.44');

console.log('\nProposition 3 at the default lambda = 0.3 (Section 7)');
const a0 = row(ab, 'lambda', 0.3), eta = R.defaults.timePreference;
const tPay = eta * Math.log(a0.payIndex), tTau = Math.log(1 / a0.tauMean), tQ = Math.log(a0.laborForce);
check('Sec. 7', 'ln M_T', f3(a0.lnM), '0.447');
check('Sec. 7', 'Pi_T, pay per hour relative to w_0', f2(a0.payIndex), '2.54');
check('Sec. 7', 'average tier multiplier below "enough"', f3(a0.tauMean), '0.947');
check('Sec. 7', 'l_T, labor force wanting work relative to H_0', f3(a0.laborForce), '1.048');
check('Sec. 7', 'eta ln Pi_T', f3(tPay), '0.186');
check('Sec. 7', 'ln(1/tau_T), computed before rounding', f3(tTau), '0.055');
check('Sec. 7', 'ln l_T, computed before rounding', f3(tQ), '0.047');
check('Sec. 7', 'lambda* from the formula', f2((tPay + tTau - tQ) / a0.lnM), '0.43');
check('Sec. 7', 'overstatement if the queue term is dropped', f1(tQ / a0.lnM), '0.1');

console.log('\nCompany share (Section 7, Table 4)');
const C = c => row(R.companyShare, 'c', c);
check('Sec. 7', 'ladder at c = 30%: owners growth', p2(C(0.3).ladder.growth.owners), '1.81%');
check('Sec. 7', 'ladder at c = 30%: lower-paid growth', p2(C(0.3).ladder.growth.low), '3.71%');
const t4 = [[0.05, '1.3%', '2.37%', '4.25%', '0.32%', '0.35%', '1.34', '1.83'], [0.1, '7.6%', '2.44%', '4.14%', '0.48%', '0.68%', '1.38', '1.84'],
  [0.2, '26.8%', '2.67%', '3.93%', '0.88%', '1.27%', '1.48', '1.87'], [0.3, '45.1%', '2.81%', '3.71%', '1.36%', '1.81%', '1.59', '1.91'],
  [0.5, '71.3%', '2.72%', '3.09%', '2.38%', '2.71%', '1.79', '1.96'], [1, '100%', '0.43%', '0.43%', '4.23%', '4.23%', '1.96', '1.96']];
for (const [c, vb, lg, lc, og, oc, yg, yc] of t4) {
  const r = C(c), w = `c = ${100 * c}%:`;
  check('Table 4', `${w} AI value built, gross split`, c === 1 ? p0(r.gross.investment.valueShare) : p1(r.gross.investment.valueShare), vb);
  check('Table 4', `${w} lower-paid growth, gross`, p2(r.gross.growth.low), lg);
  check('Table 4', `${w} lower-paid growth, cash-flow`, p2(r.ladder.growth.low), lc);
  check('Table 4', `${w} owners growth, gross`, p2(r.gross.growth.owners), og);
  check('Table 4', `${w} owners growth, cash-flow`, p2(r.ladder.growth.owners), oc);
  check('Table 4', `${w} output in year 30, gross`, f2(r.gross.final.outputIndex), yg);
  check('Table 4', `${w} output in year 30, cash-flow`, f2(r.ladder.final.outputIndex), yc);
}
const better = R.companyShare.filter(r => r.c < 1).every(r => r.ladder.growth.low > r.gross.growth.low && r.ladder.growth.owners > r.gross.growth.owners);
check('Sec. 7', 'cash-flow beats gross for workers and owners at every c < 100%', String(better), 'true');

console.log('\nHow "enough" moves (Section 7, Table 5)');
const E = (nu, psi) => R.enough.find(r => r.nu === nu && r.psi === psi);
const t5 = [[0, 0, '17.4%', '3.72', '1.58', '19.4%'], [0, 1, '51.2%', '3.61', '1.30', '33.4%'], [0.5, 0, '1.1%', '3.97', '1.84', '5.8%'],
  [0.5, 0.5, '5.8%', '3.81', '1.72', '11.8%'], [0.5, 1, '25.8%', '3.68', '1.52', '22.4%'], [1, 0, '0.0%', '4.14', '1.96', '0.0%']];
for (const [nu, psi, g, d, y, u] of t5) {
  const r = E(nu, psi).ladder.final, w = `nu = ${nu}, psi = ${psi}:`;
  check('Table 5', `${w} graduated`, p1(r.graduated), g);
  check('Table 5', `${w} days per week`, f2(r.daysPerWeek), d);
  check('Table 5', `${w} output (year 0 = 1)`, f2(r.outputIndex), y);
  check('Table 5', `${w} demand unfilled`, p1(r.unfilled), u);
}
const own = R.v12.statusIncludesOwners.find(r => r.nu === 0.5 && r.psi === 1);
check('Sec. 7', 'owners included, nu = 0.5, psi = 1: graduated', p0(own.ladder.final.graduated), '34%');
check('Sec. 7', 'owners excluded, nu = 0.5, psi = 1: graduated', p0(E(0.5, 1).ladder.final.graduated), '26%');
check('Sec. 7', 'status quo, owners included: rise in "enough" by year 30', f1(own.sqSufficiency30) + '-fold', '2.6-fold');
const S0 = R.defaults.livingCost * R.defaults.sufficiencyYears;
check('Sec. 7', 'status quo, owners excluded: rise in "enough" by year 30', f2(E(0.5, 1).sq.final.sufficiency / S0) + '-fold', '1.15-fold');
check('Sec. 7', 'nu = 1: output equals the status quo', f2(E(1, 0).ladder.final.outputIndex), f2(F('sq').outputIndex));

console.log('\nPace of AI (Section 7)');
const P = g => row(R.aiPace, 'gAIMax', g);
check('Sec. 7', 'AI at 0.05%: lower-paid growth, status quo', p2(P(0.0005).sq.growth.low), '0.24%');
check('Sec. 7', 'AI at 0.05%: lower-paid growth, ladder', p2(P(0.0005).ladder.growth.low), '2.31%');
check('Sec. 7', 'AI at 3%: status-quo unemployment in year 30', p0(P(0.03).sq.final.unemployment), '27%');
check('Sec. 7', 'AI at 3%: status-quo owners growth', p1(P(0.03).sq.growth.owners), '5.8%');
check('Sec. 7', 'AI at 3%: ladder unemployment in year 30', p1(P(0.03).ladder.final.unemployment), '2.4%');
check('Sec. 7', 'AI at 3%: ladder lower-paid growth', p2(P(0.03).ladder.growth.low), '5.75%');
check('Sec. 7', 'cumulative AI productivity gain over 30 years at 1.5%', p0(Math.pow(1 + R.defaults.gAIMax, 30) - 1), '56%');
check('Sec. 7', 'cumulative AI productivity gain over 10 years at 1.5%', p0(Math.pow(1 + R.defaults.gAIMax, 10) - 1), '16%');
const W = R.v13.aiTenYears;
check('Sec. 7', 'AI for 10 years only: ladder lower-paid growth', p1(W.ladder.growth.low), '3.0%');
check('Sec. 7', 'AI for 10 years only: ladder lower-paid spendable growth', p1(W.ladder.growth.lowSpendable), '1.4%');
check('Sec. 7', 'AI for 10 years only: status-quo lower-paid growth', p1(W.sq.growth.low), '0.3%');
check('Sec. 7', 'AI for 10 years only: ladder unemployment in year 30', p1(W.ladder.final.unemployment), '0.0%');
check('Sec. 7', 'AI for 10 years only: status-quo unemployment in year 30', p1(W.sq.final.unemployment), '9.0%');
check('Sec. 7', 'AI for 10 years only: ladder days per week', f1(W.ladder.final.daysPerWeek), '4.3');

console.log('\nWhich parts matter (Section 7) and the pool rule (Section 8)');
const A = R.ablations;
check('Sec. 7', 'eta = 0: unemployment in year 30', p1(A.noTimePreference.base.final.unemployment), '10.9%');
check('Sec. 7', 'eta = 0: unemployment in year 30 at lambda = 0.6', p1(A.noTimePreference.highDisp.final.unemployment), '22.6%');
check('Sec. 7', 'no capital accounts: lower-paid growth', p2(A.noCapitalAccounts.base.growth.low), '3.68%');
check('Sec. 7', 'with capital accounts: lower-paid growth', p2(A.tuned.base.growth.low), '4.14%');
check('Sec. 7', 'no capital accounts: lower-paid spendable growth', p2(A.noCapitalAccounts.base.growth.lowSpendable), '3.68%');
check('Sec. 7', 'with capital accounts: lower-paid spendable growth', p2(A.tuned.base.growth.lowSpendable), '2.30%');
check('Sec. 7', 'no capital accounts: unemployment at lambda = 0.6', p1(A.noCapitalAccounts.highDisp.final.unemployment), '12.7%');
check('Sec. 7', 'with capital accounts: unemployment at lambda = 0.6', p1(A.tuned.highDisp.final.unemployment), '8.3%');
check('Sec. 7', 'accounts earning 3%: lower-paid growth', p2(R.v12.equalReturns.withAccounts.base.growth.low), '3.88%');
check('Sec. 7', 'accounts earning 3%: unemployment at lambda = 0.6', p1(R.v12.equalReturns.withAccounts.highDisp.final.unemployment), '9.5%');
check('Sec. 7', 'no standby share: unemployment at lambda = 0.6', p1(A.noStandby.highDisp.final.unemployment), '7.6%');
check('Sec. 8', 'full standby share: unemployment at lambda = 0.6', p1(A.fullStandby.highDisp.final.unemployment), '9.2%');
check('Sec. 7', 'no cap: lower-paid growth within 0.05 points ("cap rarely binds")', String(Math.abs(A.noCap.base.growth.low - A.tuned.base.growth.low) < 0.0005), 'true');
const bph = lam => row(R.v12.baselinePerHour, 'lambda', lam).ladder;
check('Sec. 7', 'hours worked in year 30 below the start', p0(1 - (R.main.ladder.H[T] / R.main.ladder.H[0]) * (1 - F('ladder').unfilled)), '18%');
check('Sec. 7', 'baseline scaled with hours: owners growth', p2(bph(0.3).growth.owners), '0.20%');
check('Sec. 7', 'baseline scaled with hours: lower-paid growth', p2(bph(0.3).growth.low), '4.29%');
check('Sec. 7', 'baseline scaled with hours, lambda = 0.6: owners shrink', String(bph(0.6).growth.owners < 0), 'true');

console.log('\nA dividend with the ladder\'s working-time rights (Section 7, Table 6)');
const D = lam => R.v13.dividendRights.find(r => r.lambda === lam);
const t6 = [['dividend', 'flat dividend, today\'s labor rules', '3.81%', '3.81%', '17.1%', '5.00', '27.9%'],
  ['hoursRight', '+ right to set hours and work-sharing', '3.79%', '3.79%', '12.4%', '4.73', '23.5%'],
  ['inPay', '+ dividend counted when choosing hours', '3.69%', '3.69%', '0.6%', '4.17', '14.3%'],
  ['accounts', '+ half paid into capital accounts', '4.16%', '2.21%', '0.0%', '4.04', '10.0%'],
  ['ladder', 'Sufficiency Ladder', '4.14%', '2.30%', '0.0%', '3.97', '8.3%']];
for (const [k, w, lt, ls, u, d, u6] of t6) {
  const a = D(0.3)[k], b = D(0.6)[k];
  check('Table 6', `${w}: lower-paid growth, total`, p2(a.growth.low), lt);
  check('Table 6', `${w}: lower-paid growth, spendable`, p2(a.growth.lowSpendable), ls);
  check('Table 6', `${w}: unemployment in year 30`, p1(a.final.unemployment), u);
  check('Table 6', `${w}: days per week`, f2(a.final.daysPerWeek), d);
  check('Table 6', `${w}: unemployment in year 30 at lambda = 0.6`, p1(b.final.unemployment), u6);
}

console.log('\nSpeed (Appendix C)');
const t0 = process.hrtime.bigint();
M.runAll();
console.log(`info  a default run of all four regimes took ${(Number(process.hrtime.bigint() - t0) / 1e6).toFixed(0)} ms ("about a quarter of a second")`);

console.log(`\n${pass} passed, ${fail} failed.`);
process.exit(fail ? 1 : 0);
