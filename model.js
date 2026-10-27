/*
 * The Sufficiency Ladder - agent-based model, v1.4
 *
 * v1.4 makes capital accounts vest when a person graduates, as the paper
 * describes: a graduate who stops working draws on the account once cash
 * savings run out, and a vested account's contributions and returns count as
 * spendable income. Every result run.js saves is identical to v1.3's, so no
 * number or figure in the paper changes; the difference shows only where many
 * people graduate, as in a 40-year run with status pressure.
 *
 * v1.3 adds four switches, all off by default, so every v1.2 result is unchanged:
 *   dividendHoursRight    the flat dividend gets the ladder's right to set hours,
 *                         work-sharing and, with admitQueue, the admission rule
 *   dividendInPay         the dividend counts toward pay per hour in the hours rule
 *   dividendAccounts      a share stockShare of the dividend goes into capital accounts
 *   aiYears               AI adds growth only in the first aiYears years (0 = every year)
 * It also records spendable income: income less capital-account contributions
 * and the returns accrued on the accounts, which are locked until graduation.
 *
 * v1.2 added two sensitivity switches (both off by default, so every v1.1
 * result is unchanged) and recorded the terms of the absorption condition:
 *   statusIncludesOwners  status pressure measures the top tenth of ALL
 *                         incomes, owners included (v1.1: the 2,000 people only)
 *   baselinePerHour       the grandfathered baseline scales with efficiency
 *                         hours worked, CF0 * L_t / H0 (v1.1: a fixed sum)
 * Household wealth earns exogenous returns (rSave, rEquity), as if invested in
 * a wider capital market; AI investment is paid from firm cash flow.
 *
 * One file, shared by the interactive page (browser global `LadderModel`)
 * and by the paper's figure scripts (Node `require`). Deterministic for a
 * given seed. Units: thousands of real dollars per year ($k), hours in FTE
 * (1.0 = a five-day week), time in years.
 *
 * Regimes (all start from the same status-quo economy at t = 0)
 *   sq       Status quo. Owners keep all profit. No right to cut hours;
 *            falling labour demand is handled by layoffs (last in, first out).
 *   gross    The ladder with the split applied to GROSS added profit: the
 *            company keeps share c of the gain but pays all AI costs. Every
 *            other rule is identical to `ladder`, so the two differ only in
 *            the split basis.
 *   ladder   The tuned ladder. The split applies to added CASH-FLOW profit
 *            (AI costs deducted first, losses carried forward with interest).
 *            The worker pool is paid per hour worked (people waiting for work
 *            count as `standbyFTE`), part of it into personal capital accounts,
 *            capped per FTE with the excess paid as an equal dividend. Workers
 *            may cut hours as they near "enough"; falling demand is absorbed by
 *            work-sharing before any layoff.
 *   dividend Comparator. The same rent pool as `ladder`, paid as an equal
 *            dividend to everyone, under status-quo labour-market rules.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.LadderModel = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var DEFAULTS = Object.freeze({
    N: 2000,                // non-owner people
    owners: 20,             // capital owners (about the top 1%)
    T: 30,                  // years simulated
    seed: 7,
    regime: 'ladder',
    // Technology
    A0: 100,                // output per efficiency-FTE-year at t = 0 ($k)
    gBase: 0.012,           // non-AI productivity growth per year
    gAIMax: 0.015,          // extra growth when every positive-NPV AI project is built
    costOfCapital: 0.07,    // r
    aiObsolescence: 0.15,   // delta: yearly decay of an AI project's gains
    projMedianReturn: 0.25, // median first-year gain per $1 of AI capex
    projSigma: 0.9,         // lognormal dispersion of project returns
    capexShareSQ: 0.02,     // AI capex as a share of output when every positive-NPV project is built
    laborSaving: 0.3,       // lambda: share of AI's productivity gain that shows up as fewer hours needed
    // Wages
    w0: 60,                 // base wage per efficiency FTE ($k)
    passThrough: 0.3,       // elasticity of the base wage to productivity
    skillSigma: 0.45,       // lognormal dispersion of skill (wage multiplier)
    // Sharing rule
    companyShare: 0.10,     // c: the company's share of added profit
    stockShare: 0.5,        // beta: part of each worker's share paid into a personal capital account
    shareCap: 1.0,          // max share per FTE, as a multiple of the base wage; excess becomes an equal dividend
    standbyFTE: 0.5,        // people waiting for work draw the share as if working this many FTE
    // Hours and behaviour (apply only where a right to set hours exists)
    passionShare: 0.5,      // graduates who keep working by choice
    passionHours: 0.6,      // their hours (3 days)
    tierHours: [1.0, 1.0, 0.9, 0.8], // desired hours in tiers I-IV
    timePreference: 0.2,    // eta: desired hours fall as pay per hour rises, hours ~ payIndex^-eta
    minHours: 0.6,          // nobody below sufficiency chooses fewer than 3 days
    shareFloor: 0.6,        // work-sharing floor before anyone is laid off
    admitQueue: false,      // admission rule: when people are waiting, incumbents share hours (down to the floor) to take them in
    minHire: 0.2,           // smallest partial job offered to a newcomer
    // Frictions and safety net
    headCost: 0.05,         // fixed cost per employed head, as a share of the base wage
    safetyNet: 0.3,         // income of the involuntarily unemployed, as a share of the base wage
    // Households
    cMin: 30,               // consumption floor; savings come out of income above it
    saveRate: 0.25,
    rSave: 0.03,            // real return on cash savings
    rEquity: 0.05,          // real return on capital-account holdings
    livingCost: 45,         // yearly spending of someone living off their wealth, at t = 0
    sufficiencyYears: 25,   // "enough" = 25 x living cost (a 4% withdrawal rule)
    normDrift: 0.5,         // nu: elasticity of "enough" to median income
    statusPressure: 0.0,    // psi: elasticity of "enough" to the top-10%/median income ratio
    statusIncludesOwners: false, // true: that ratio is measured over everyone, owners included
    baselinePerHour: false, // true: the grandfathered baseline scales with efficiency hours worked
    dividendHoursRight: false, // dividend regime: true gives it the ladder's right to set hours and work-sharing
    dividendInPay: false,   // dividend regime: true counts the dividend toward pay per hour in the hours rule
    dividendAccounts: false, // dividend regime: true pays stockShare of the dividend into capital accounts
    aiYears: 0,             // AI adds growth only in the first aiYears years; 0 = every year
    careerYears: 40,
    initUnemp: 0.05
  });

  var REGIMES = ['sq', 'gross', 'ladder', 'dividend'];
  var REGIME_LABELS = {
    sq: 'Status quo',
    gross: 'Gross split',
    ladder: 'Sufficiency Ladder',
    dividend: 'Flat dividend'
  };

  // ---------- numerics ----------
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function erf(x) { // Abramowitz & Stegun 7.1.26, |error| < 1.5e-7
    var s = x < 0 ? -1 : 1; x = Math.abs(x);
    var t = 1 / (1 + 0.3275911 * x);
    var y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
    return s * y;
  }
  function Phi(z) { return 0.5 * (1 + erf(z / Math.SQRT2)); }
  function mean(arr, a, b) { var s = 0; for (var i = a; i < b; i++) s += arr[i]; return b > a ? s / (b - a) : 0; }
  function gini(sorted) {
    var n = sorted.length, num = 0, den = 0;
    for (var i = 0; i < n; i++) { num += (2 * (i + 1) - n - 1) * sorted[i]; den += sorted[i]; }
    return den > 0 ? num / (n * den) : 0;
  }

  // ---------- investment rule (Section 4 of the paper) ----------
  // An AI project: a $1 outlay returns rho in year 1, decaying at delta per
  // year, so PV(gains) = rho / (r + delta). A firm that keeps share k of the
  // gains and pays share j of the cost builds it iff k * rho / (r + delta) >= j.
  //   status quo, or a cash-flow split (k = j = c): threshold u = r + delta
  //   gross split (k = c, j = 1):                   threshold u / c
  // rho ~ Lognormal(ln median, sigma). Value built = E[rho; rho >= threshold].
  function investment(p) {
    var u = p.costOfCapital + p.aiObsolescence;
    var mu = Math.log(p.projMedianReturn), s = p.projSigma;
    function V(th) { return isFinite(th) ? Phi((mu + s * s - Math.log(th)) / s) : 0; }
    function P(th) { return isFinite(th) ? Phi((mu - Math.log(th)) / s) : 0; }
    var c = Math.min(1, Math.max(0, p.companyShare));
    var th = u;
    if (p.regime === 'gross') th = c > 0 ? u / c : Infinity;
    var valueShare = V(th) / V(u);
    return {
      userCost: u,
      threshold: th,
      valueShare: valueShare,
      projectShare: P(th) / P(u),
      gAI: p.gAIMax * valueShare,
      capexShare: p.capexShareSQ * (P(th) / P(u))
    };
  }

  // ---------- the simulation ----------
  function simulate(userParams) {
    var p = Object.assign({}, DEFAULTS, userParams || {});
    if (REGIMES.indexOf(p.regime) < 0) throw new Error('Unknown regime: ' + p.regime);
    var rng = mulberry32(p.seed >>> 0);
    var spare = null;
    function randn() {
      if (spare !== null) { var v = spare; spare = null; return v; }
      var u1 = 0;
      while (u1 <= 1e-12) u1 = rng();
      var u2 = rng(), r = Math.sqrt(-2 * Math.log(u1));
      spare = r * Math.sin(2 * Math.PI * u2);
      return r * Math.cos(2 * Math.PI * u2);
    }
    function newSkill() { return Math.exp(p.skillSigma * randn() - 0.5 * p.skillSigma * p.skillSigma); }

    var N = p.N, c = p.companyShare;
    var hoursRight = (p.regime === 'ladder' || p.regime === 'gross' || (p.regime === 'dividend' && p.dividendHoursRight));
    var m = new Float64Array(N), sv = new Float64Array(N), ca = new Float64Array(N);
    var h = new Float64Array(N), want = new Float64Array(N), share = new Float64Array(N), inc = new Float64Array(N), spend = new Float64Array(N);
    var age = new Int32Array(N), tenure = new Int32Array(N), wait = new Int32Array(N);
    var passion = new Uint8Array(N), vested = new Uint8Array(N); // vested: capital account open since graduation
    var S0 = p.livingCost * p.sufficiencyYears;

    // --- initial state: a status-quo economy ---
    for (var i = 0; i < N; i++) {
      age[i] = Math.floor(rng() * p.careerYears);
      m[i] = newSkill();
      passion[i] = rng() < p.passionShare ? 1 : 0;
      var save0 = p.saveRate * Math.max(0, p.w0 * m[i] - p.cMin);
      sv[i] = age[i] > 0 ? save0 * (Math.pow(1 + p.rSave, age[i]) - 1) / p.rSave : 0;
    }
    var H0 = 0, heads0 = 0;
    for (i = 0; i < N; i++) {
      want[i] = (sv[i] + ca[i]) / S0 >= 1 ? (passion[i] ? 1 : 0) : 1;
      vested[i] = (sv[i] + ca[i]) / S0 >= 1 ? 1 : 0;
      if (want[i] > 0 && rng() >= p.initUnemp) { h[i] = 1; tenure[i] = age[i]; H0 += m[i]; heads0++; }
      else if (want[i] > 0) { wait[i] = Math.floor(rng() * 3); }
    }
    var Y0 = p.A0 * H0, WB0 = p.w0 * H0, F0 = p.headCost * p.w0 * heads0;
    var C0 = p.capexShareSQ * Y0;
    var CF0 = Y0 - WB0 - F0 - C0;     // grandfathered cash-flow profit
    var GG0 = Y0 - WB0 - F0;          // grandfathered gross profit (before AI capex)

    var inv = investment(p);
    var out = {
      params: p, investment: inv, H0: H0, Y0: Y0, CF0: CF0,
      year: [], A: [], Y: [], H: [], wage: [], sufficiency: [],
      // classes by earning power (skill rank): lower 50%, middle 40%, upper 10%; plus owners
      classLow: [], classMid: [], classHigh: [], ownersPer: [],
      spendLow: [], spendMid: [], spendHigh: [],
      wealthLow: [], wealthMid: [], wealthHigh: [],
      daysLow: [], daysMid: [], daysHigh: [],
      // income-ranked distribution
      bottom50: [], middle40: [], top10: [], median: [], meanIncome: [],
      top1ToBottom50: [], gini: [],
      unemployment: [], avgHoursEmployed: [], daysPerWeek: [], partTimeShare: [], employmentRate: [],
      graduated: [], tierShares: [], slack: [], unfilled: [],
      pool: [], perFTEShare: [], dividendPerPerson: [], workersShareOfOutput: [], ownersShareOfOutput: [],
      broadOwnership: [], capexShare: [], carry: [],
      // terms of the absorption condition (Proposition 3), recorded from year 1
      diag: { year: [], payIndex: [], wanted: [], fullNonGrad: [], tauMean: [], gradWanted: [] }
    };

    var carry = 0, ineq0 = null, ineqPrev = null, med0 = null, medPrev = null, S = S0, lastPerFTE = 0;
    var order = new Int32Array(N);

    function record(t, A, Y, H, w, pool, perFTE, divPer, ownersIncome, slack, WB, L) {
      var sorted = Array.prototype.slice.call(inc).sort(function (a, b) { return a - b; });
      var half = Math.floor(N / 2), p90 = Math.round(0.9 * N);
      var b50 = mean(sorted, 0, half), m40 = mean(sorted, half, p90), t10 = mean(sorted, p90, N);
      var med = N % 2 ? sorted[half] : 0.5 * (sorted[half - 1] + sorted[half]);
      var ownersPer = ownersIncome / p.owners;
      var all = sorted.slice();
      for (var k = 0; k < p.owners; k++) all.push(Math.max(0, ownersPer));
      all.sort(function (a, b) { return a - b; });
      // classes by skill rank
      var idx = new Array(N); for (k = 0; k < N; k++) idx[k] = k;
      idx.sort(function (a, b) { return m[a] - m[b]; });
      var cls = [[0, half], [half, p90], [p90, N]], ci = [], cs = [], cw = [], cd = [];
      for (var g = 0; g < 3; g++) {
        var si = 0, ss = 0, sw = 0, sh = 0, nh = 0;
        for (k = cls[g][0]; k < cls[g][1]; k++) { var q0 = idx[k]; si += inc[q0]; ss += spend[q0]; sw += sv[q0] + ca[q0]; if (h[q0] > 0) { sh += h[q0]; nh++; } }
        var n = cls[g][1] - cls[g][0];
        ci.push(si / n); cs.push(ss / n); cw.push(sw / n); cd.push(nh > 0 ? 5 * sh / nh : 0);
      }
      var lf = 0, unemp = 0, heads = 0, Lh = 0, pt = 0, grad = 0, sumCA = 0;
      var tiers = [0, 0, 0, 0, 0]; // waiting, climbing (I-II), approaching (III-IV), graduated & working, graduated & not working
      for (var q = 0; q < N; q++) {
        var prog = (sv[q] + ca[q]) / S;
        sumCA += ca[q];
        if (prog >= 1) grad++;
        if (want[q] > 0) lf++;
        if (want[q] > 0 && h[q] === 0) { unemp++; tiers[0]++; }
        else if (h[q] > 0) {
          heads++; Lh += h[q]; if (h[q] < 0.999) pt++;
          if (prog >= 1) tiers[3]++; else if (prog < 0.5) tiers[1]++; else tiers[2]++;
        } else tiers[4]++;
      }
      var meanInc = 0; for (q = 0; q < N; q++) meanInc += inc[q]; meanInc /= N;
      out.year.push(t); out.A.push(A); out.Y.push(Y); out.H.push(H); out.wage.push(w); out.sufficiency.push(S);
      out.classLow.push(ci[0]); out.classMid.push(ci[1]); out.classHigh.push(ci[2]); out.ownersPer.push(ownersPer);
      out.spendLow.push(cs[0]); out.spendMid.push(cs[1]); out.spendHigh.push(cs[2]);
      out.wealthLow.push(cw[0]); out.wealthMid.push(cw[1]); out.wealthHigh.push(cw[2]);
      out.daysLow.push(cd[0]); out.daysMid.push(cd[1]); out.daysHigh.push(cd[2]);
      out.bottom50.push(b50); out.middle40.push(m40); out.top10.push(t10); out.median.push(med); out.meanIncome.push(meanInc);
      out.top1ToBottom50.push(ownersPer / b50); out.gini.push(gini(all));
      out.unemployment.push(lf > 0 ? unemp / lf : 0);
      out.avgHoursEmployed.push(heads > 0 ? Lh / heads : 0);
      out.daysPerWeek.push(heads > 0 ? 5 * Lh / heads : 0);
      out.partTimeShare.push(heads > 0 ? pt / heads : 0);
      out.employmentRate.push(heads / N);
      out.graduated.push(grad / N);
      out.tierShares.push(tiers.map(function (x) { return x / N; }));
      out.slack.push(slack);
      out.unfilled.push(H > 0 ? Math.max(0, H - L) / H : 0);
      out.pool.push(pool); out.perFTEShare.push(perFTE); out.dividendPerPerson.push(divPer);
      out.workersShareOfOutput.push(Y > 0 ? (WB + pool) / Y : 0);
      out.ownersShareOfOutput.push(Y > 0 ? ownersIncome / Y : 0);
      var ownersValue = Math.max(0, ownersIncome) / p.rEquity;
      out.broadOwnership.push(sumCA + ownersValue > 0 ? sumCA / (sumCA + ownersValue) : 0);
      out.capexShare.push(t === 0 ? p.capexShareSQ : inv.capexShare);
      out.carry.push(carry);
      var ratio = t10 / Math.max(1e-9, med);
      if (p.statusIncludesOwners) {
        var nA = all.length, p90A = Math.round(0.9 * nA), hA = Math.floor(nA / 2);
        var medA = nA % 2 ? all[hA] : 0.5 * (all[hA - 1] + all[hA]);
        ratio = mean(all, p90A, nA) / Math.max(1e-9, medA);
      }
      if (ineq0 === null) { ineq0 = ratio; med0 = med; }
      ineqPrev = ratio; medPrev = med;
    }

    // --- year 0 incomes (status-quo distribution) ---
    for (i = 0; i < N; i++) {
      var unemp0 = want[i] > 0 && h[i] === 0;
      inc[i] = p.w0 * m[i] * h[i] + p.rSave * sv[i] + (unemp0 ? p.safetyNet * p.w0 : 0);
      spend[i] = inc[i];
    }
    record(0, p.A0, Y0, H0, p.w0, 0, 0, 0, CF0, 0, WB0, H0);

    // --- years 1..T ---
    for (var t = 1; t <= p.T; t++) {
      // careers end; newcomers arrive with nothing
      for (i = 0; i < N; i++) {
        age[i]++;
        if (age[i] >= p.careerYears) {
          age[i] = 0; m[i] = newSkill(); passion[i] = rng() < p.passionShare ? 1 : 0;
          sv[i] = 0; ca[i] = 0; h[i] = 0; tenure[i] = 0; wait[i] = 0; vested[i] = 0;
        }
      }
      // technology, wages, and what counts as "enough"
      var Mt = Math.pow(1 + inv.gAI, p.aiYears > 0 ? Math.min(t, p.aiYears) : t);
      var A = p.A0 * Math.pow(1 + p.gBase, t) * Mt;
      var H = H0 * Math.pow(Mt, -p.laborSaving);
      var w = p.w0 * Math.pow(A / p.A0, p.passThrough);
      S = S0 * Math.pow(medPrev / med0, p.normDrift) * Math.pow(ineqPrev / ineq0, p.statusPressure);
      var livingNow = S / p.sufficiencyYears;
      var payIndex = (w + lastPerFTE) / p.w0;
      var hoursFactor = Math.pow(payIndex, -p.timePreference);

      // desired hours
      var dWanted = 0, dFull = 0, dTau = 0, dGrad = 0;
      for (i = 0; i < N; i++) {
        var prog = (sv[i] + ca[i]) / S;
        if (prog >= 1) vested[i] = 1;
        if (prog >= 1) want[i] = passion[i] ? (hoursRight ? p.passionHours : 1) : 0;
        else want[i] = hoursRight ? Math.max(p.minHours, Math.min(1, p.tierHours[Math.min(3, Math.floor(prog * 4))] * hoursFactor)) : 1;
        if (h[i] > 0 && want[i] === 0) h[i] = 0; // graduates who choose to stop
        if (want[i] > 0) {
          dWanted += m[i] * want[i];
          if (prog >= 1) dGrad += m[i] * want[i];
          else { dFull += m[i]; dTau += m[i] * p.tierHours[Math.min(3, Math.floor(prog * 4))]; }
        }
      }
      out.diag.year.push(t); out.diag.payIndex.push(payIndex); out.diag.wanted.push(dWanted);
      out.diag.fullNonGrad.push(dFull); out.diag.tauMean.push(dFull > 0 ? dTau / dFull : 1); out.diag.gradWanted.push(dGrad);

      // labour allocation
      var D = 0, nInc = 0;
      for (i = 0; i < N; i++) if (h[i] > 0) { D += m[i] * want[i]; order[nInc++] = i; }
      var slack = H - D;
      if (hoursRight && p.admitQueue) {
        // one pool of everyone who wants work: incumbents by seniority, then the queue
        var incA = Array.prototype.slice.call(order, 0, nInc).sort(function (a, b) { return tenure[b] - tenure[a]; });
        var qA = [];
        for (i = 0; i < N; i++) if (h[i] === 0 && want[i] > 0) qA.push(i);
        qA.sort(function (a, b) { return (wait[b] - wait[a]) || ((sv[a] + ca[a]) - (sv[b] + ca[b])); });
        var E = incA.concat(qA), fsum = 0, nE = 0;
        for (k = 0; k < E.length; k++) { var fk = m[E[k]] * Math.min(want[E[k]], p.shareFloor); if (fsum + fk > H) break; fsum += fk; nE++; }
        var inE = E.slice(0, nE), full = 0;
        for (k = 0; k < inE.length; k++) full += m[inE[k]] * want[inE[k]];
        var sA = 1;
        if (full > H) {
          var aa = 0, bb = 1;
          for (var it2 = 0; it2 < 50; it2++) {
            var ss = 0.5 * (aa + bb), sp = 0;
            for (k = 0; k < inE.length; k++) { var qq = inE[k]; sp += m[qq] * Math.max(Math.min(want[qq], p.shareFloor), want[qq] * ss); }
            if (sp > H) bb = ss; else aa = ss;
          }
          sA = aa;
        }
        for (k = 0; k < inE.length; k++) {
          var e = inE[k], wasOut = h[e] === 0;
          h[e] = Math.max(Math.min(want[e], p.shareFloor), want[e] * sA);
          if (wasOut) { tenure[e] = 0; wait[e] = 0; }
        }
        for (k = nE; k < E.length; k++) { if (h[E[k]] > 0) wait[E[k]] = 0; h[E[k]] = 0; }
      } else if (D <= H) {
        for (var k = 0; k < nInc; k++) h[order[k]] = want[order[k]];
        // hire the next in line: longest wait first, then least wealth
        var queue = [];
        for (i = 0; i < N; i++) if (h[i] === 0 && want[i] > 0) queue.push(i);
        queue.sort(function (a, b) { return (wait[b] - wait[a]) || ((sv[a] + ca[a]) - (sv[b] + ca[b])); });
        var room = H - D;
        for (k = 0; k < queue.length && room > 1e-9; k++) {
          var j = queue[k], eff = m[j] * want[j];
          if (eff <= room) { h[j] = want[j]; room -= eff; tenure[j] = 0; wait[j] = 0; }
          else { var part = room / m[j]; if (part >= p.minHire) { h[j] = part; tenure[j] = 0; wait[j] = 0; } room = 0; }
        }
      } else {
        // demand has fallen below what incumbents want to supply
        var incs = Array.prototype.slice.call(order, 0, nInc);
        incs.sort(function (a, b) { return tenure[a] - tenure[b]; }); // last in, first out
        if (hoursRight) {
          // work-sharing: cut hours proportionally, down to a floor, before any layoff
          var floorSupply = 0;
          for (k = 0; k < incs.length; k++) floorSupply += m[incs[k]] * Math.min(want[incs[k]], p.shareFloor);
          var cut = 0;
          while (floorSupply > H && cut < incs.length) {
            var lo = incs[cut++]; floorSupply -= m[lo] * Math.min(want[lo], p.shareFloor); h[lo] = 0; wait[lo] = 0;
          }
          var keep = incs.slice(cut), a = 0, b = 1;
          for (var it = 0; it < 50; it++) {
            var s = 0.5 * (a + b), sup = 0;
            for (k = 0; k < keep.length; k++) { var q = keep[k]; sup += m[q] * Math.max(Math.min(want[q], p.shareFloor), want[q] * s); }
            if (sup > H) b = s; else a = s;
          }
          for (k = 0; k < keep.length; k++) { q = keep[k]; h[q] = Math.max(Math.min(want[q], p.shareFloor), want[q] * a); }
        } else {
          var supply = D, ix = 0;
          while (supply > H && ix < incs.length) { var lo2 = incs[ix++]; supply -= m[lo2] * want[lo2]; h[lo2] = 0; wait[lo2] = 0; }
          for (k = ix; k < incs.length; k++) h[incs[k]] = want[incs[k]];
        }
      }
      for (i = 0; i < N; i++) {
        if (h[i] > 0) tenure[i]++;
        else if (want[i] > 0) wait[i]++;
      }

      // production and the profit pool
      var L = 0, Lh = 0, heads = 0, waiting = 0;
      for (i = 0; i < N; i++) {
        if (h[i] > 0) { L += m[i] * h[i]; Lh += h[i]; heads++; }
        else if (want[i] > 0) waiting++;
      }
      var Y = A * L, WB = w * L, F = p.headCost * w * heads, C = inv.capexShare * Y;
      var CF = Y - WB - F - C;
      var pool = 0;
      if (p.regime === 'gross') {
        pool = (1 - c) * Math.max(0, (Y - WB - F) - GG0);
      } else if (p.regime === 'ladder' || p.regime === 'dividend') {
        var base = CF - (p.baselinePerHour ? CF0 * L / H0 : CF0) + carry;
        if (base < 0) { carry = base * (1 + p.costOfCapital); pool = 0; }
        else { carry = 0; pool = (1 - c) * base; }
      }
      var ownersIncome = CF - pool;

      // paying out the pool
      var perFTE = 0, divPer = 0;
      share.fill(0);
      if (hoursRight && p.regime !== 'dividend') {
        var units = Lh + p.standbyFTE * waiting;
        var raw = units > 0 ? pool / units : 0;
        perFTE = Math.min(raw, p.shareCap * w);
        for (i = 0; i < N; i++) {
          if (h[i] > 0) share[i] = perFTE * h[i];
          else if (want[i] > 0) share[i] = perFTE * p.standbyFTE;
        }
        divPer = (pool - perFTE * units) / N;
      } else if (p.regime === 'dividend') {
        divPer = pool / N;
      }
      lastPerFTE = (p.regime === 'dividend' && p.dividendInPay) ? divPer : perFTE;

      // household incomes and saving
      for (i = 0; i < N; i++) {
        var wage = w * m[i] * h[i];
        var interest = p.rSave * sv[i];
        var unemployed = want[i] > 0 && h[i] === 0;
        var benefit = unemployed ? p.safetyNet * w : 0;
        var stock = p.stockShare * share[i];
        var divStock = (p.regime === 'dividend' && p.dividendAccounts) ? p.stockShare * divPer : 0;
        var cash = wage + (share[i] - stock) + (divPer - divStock) + interest + benefit;
        spend[i] = vested[i] ? cash + stock + divStock + p.rEquity * ca[i] : cash; // a vested account is spendable
        inc[i] = cash + stock + divStock + p.rEquity * ca[i];
        var dSave;
        if (want[i] === 0) dSave = cash - livingNow;
        else { var surplus = cash - p.cMin; dSave = surplus > 0 ? p.saveRate * surplus : surplus; }
        var draw = 0; // a graduate living off wealth draws on the vested account once cash savings run out
        if (want[i] === 0 && sv[i] + dSave < 0) draw = Math.min(ca[i], -(sv[i] + dSave));
        sv[i] = Math.max(0, sv[i] + dSave + draw);
        ca[i] = (ca[i] - draw) * (1 + p.rEquity) + stock + divStock;
      }
      record(t, A, Y, H, w, pool, perFTE, divPer, ownersIncome, slack, WB, L);
    }

    // summary: annualised growth of each class's mean income, year 0 to year T
    function g(arr) { var a0 = arr[0], aT = arr[arr.length - 1]; return (a0 > 0 && aT > 0) ? Math.pow(aT / a0, 1 / p.T) - 1 : NaN; }
    var Tn = p.T;
    out.summary = {
      growth: { low: g(out.classLow), mid: g(out.classMid), high: g(out.classHigh), owners: g(out.ownersPer), median: g(out.median), bottom50: g(out.bottom50),
        lowSpendable: g(out.spendLow), midSpendable: g(out.spendMid), highSpendable: g(out.spendHigh) },
      final: {
        unemployment: out.unemployment[Tn], daysPerWeek: out.daysPerWeek[Tn], graduated: out.graduated[Tn],
        top1ToBottom50: out.top1ToBottom50[Tn], gini: out.gini[Tn], outputIndex: out.Y[Tn] / out.Y[0],
        productivityIndex: out.A[Tn] / out.A[0], broadOwnership: out.broadOwnership[Tn],
        dividendPerPerson: out.dividendPerPerson[Tn], perFTEShare: out.perFTEShare[Tn], wage: out.wage[Tn],
        workersShareOfOutput: out.workersShareOfOutput[Tn], median: out.median[Tn], ownersPer: out.ownersPer[Tn],
        classLow: out.classLow[Tn], classMid: out.classMid[Tn], classHigh: out.classHigh[Tn], unfilled: out.unfilled[Tn],
        sufficiency: out.sufficiency[Tn], spendLow: out.spendLow[Tn], lockedShareLow: 1 - out.spendLow[Tn] / out.classLow[Tn]
      },
      peakUnemployment: Math.max.apply(null, out.unemployment),
      start: {
        top1ToBottom50: out.top1ToBottom50[0], gini: out.gini[0], unemployment: out.unemployment[0], median: out.median[0],
        ownersPer: out.ownersPer[0], classLow: out.classLow[0], classMid: out.classMid[0], classHigh: out.classHigh[0]
      }
    };
    return out;
  }

  function runAll(params) {
    var res = {};
    REGIMES.forEach(function (r) { res[r] = simulate(Object.assign({}, params || {}, { regime: r })); });
    return res;
  }

  return { DEFAULTS: DEFAULTS, REGIMES: REGIMES, REGIME_LABELS: REGIME_LABELS, simulate: simulate, runAll: runAll, investment: investment, Phi: Phi };
});
