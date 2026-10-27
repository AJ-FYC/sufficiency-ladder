"""Figures for the Sufficiency Ladder paper and essay. Reads out/results.json."""
import json, math
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, Rectangle
from matplotlib.ticker import FuncFormatter, LogLocator, NullFormatter, FixedLocator

R = json.load(open("out/results.json"))
OUT = "figs/"

# ---- tokens (dataviz reference palette, light mode) ----
SURF, INK, INK2, MUTED, GRID, BASE = "#fcfcfb", "#0b0b0b", "#52514e", "#898781", "#e1e0d9", "#c3c2b7"
COL = {"sq": "#eb6834", "ladder": "#2a78d6", "dividend": "#1baf7a", "gross": "#eda100", "ladderAdmit": "#6250d6"}
LABEL = {"sq": "Status quo", "ladder": "Sufficiency Ladder", "dividend": "Flat dividend", "gross": "Gross split",
         "ladderAdmit": "Ladder + admission rule"}
ORDER = ["sq", "ladder", "dividend", "gross"]
BLUE_ORD = ["#86b6ef", "#3987e5", "#1c5cab", "#0d366b"]
ORANGE_ORD = ["#ef9a70", "#e9773f", "#c4501c", "#85320f"]
CLASSES = [("classLow", "Lower-paid 50%"), ("classMid", "Middle 40%"), ("classHigh", "Top-paid 10%"), ("ownersPer", "Owners (top 1%)")]
SOURCE = "Source: Sufficiency Ladder agent-based model v1.3, default parameters (2,000 people + 20 owners, 30 years). Incomes in thousands of real dollars."

plt.rcParams.update({
    "font.family": ["TeX Gyre Heros", "Liberation Sans", "DejaVu Sans"],
    "font.size": 10, "axes.edgecolor": BASE, "axes.labelcolor": INK2, "xtick.color": INK2, "ytick.color": INK2,
    "axes.facecolor": SURF, "figure.facecolor": SURF, "savefig.facecolor": SURF, "axes.titlelocation": "left",
    "xtick.major.size": 0, "ytick.major.size": 0, "xtick.minor.size": 0, "ytick.minor.size": 0,
    "axes.grid": False, "legend.frameon": False, "svg.fonttype": "none",
})


def style(ax, ygrid=True):
    for s in ("top", "right", "left"):
        ax.spines[s].set_visible(False)
    ax.spines["bottom"].set_color(BASE)
    ax.spines["bottom"].set_linewidth(0.8)
    if ygrid:
        ax.yaxis.grid(True, color=GRID, linewidth=0.7)
        ax.set_axisbelow(True)
    ax.tick_params(labelsize=9, colors=INK2)


def header(fig, title, subtitle, y=0.975):
    fig.text(0.03, y, title, fontsize=14, fontweight="bold", color=INK, va="top")
    fig.text(0.03, y - 0.055, subtitle, fontsize=10, color=INK2, va="top")


def footer(fig, text=SOURCE):
    fig.text(0.03, 0.02, text, fontsize=7.5, color=MUTED, va="bottom")


def pct(x, d=1, sign=True):
    s = f"{100 * x:+.{d}f}%" if sign else f"{100 * x:.{d}f}%"
    return s.replace("-", "−")


def legend_row(fig, keys, y, x0=0.03, kind="line", labels=None):
    """A legend row of line keys (or swatches) in text ink."""
    x = x0
    for k in keys:
        lab = (labels or LABEL)[k] if isinstance(k, str) else k[1]
        col = COL[k] if isinstance(k, str) else k[0]
        if kind == "line":
            fig.add_artist(plt.Line2D([x, x + 0.022], [y, y], color=col, lw=2.2, transform=fig.transFigure, solid_capstyle="round"))
        else:
            fig.add_artist(Rectangle((x, y - 0.009), 0.014, 0.018, color=col, transform=fig.transFigure))
        t = fig.text(x + 0.03, y, lab, fontsize=9, color=INK2, va="center")
        fig.canvas.draw()
        bb = t.get_window_extent().transformed(fig.transFigure.inverted())
        x = bb.x1 + 0.025


def rounded_bar(ax, x, w, h, color, r_px=7):
    """Column with a rounded data-end and a square baseline (one path, no seams)."""
    from matplotlib.path import Path
    from matplotlib.patches import PathPatch
    if h <= 0:
        ax.add_patch(Rectangle((x, h), w, -h, color=color, lw=0))
        return
    p0 = ax.transData.transform((x, 0)); p1 = ax.transData.transform((x + w, h))
    pxw, pxh = abs(p1[0] - p0[0]), abs(p1[1] - p0[1])
    r = min(r_px, pxw / 2, pxh)
    rx, ry = r / pxw * w, (r / pxh * h if pxh > 0 else 0)
    k = 0.5523
    V = [(x, 0), (x, h - ry), (x, h - ry + k * ry), (x + rx - k * rx, h), (x + rx, h), (x + w - rx, h),
         (x + w - rx + k * rx, h), (x + w, h - ry + k * ry), (x + w, h - ry), (x + w, 0), (x, 0)]
    C = [Path.MOVETO, Path.LINETO, Path.CURVE4, Path.CURVE4, Path.CURVE4, Path.LINETO,
         Path.CURVE4, Path.CURVE4, Path.CURVE4, Path.LINETO, Path.CLOSEPOLY]
    ax.add_patch(PathPatch(Path(V, C), facecolor=color, edgecolor="none", lw=0))


# ---------------- Figure 1: who gains ----------------
def fig_growth():
    fig = plt.figure(figsize=(8, 4.8), dpi=200)
    ax = fig.add_axes([0.08, 0.17, 0.89, 0.58])
    style(ax)
    groups = [("low", "Lower-paid 50%"), ("mid", "Middle 40%"), ("high", "Top-paid 10%"), ("owners", "Owners (top 1%)")]
    nb, bw, gap = len(ORDER), 0.15, 0.025
    ax.set_xlim(-0.5, len(groups) - 0.5)
    vals = {r: [R["main"][r]["summary"]["growth"][g] for g, _ in groups] for r in ORDER}
    ymax = max(max(v) for v in vals.values())
    ax.set_ylim(0, ymax * 1.18)
    fig.canvas.draw()
    for gi, (g, glab) in enumerate(groups):
        start = gi - (nb * bw + (nb - 1) * gap) / 2
        for k, r in enumerate(ORDER):
            v = vals[r][gi]
            x = start + k * (bw + gap)
            rounded_bar(ax, x, bw, v, COL[r])
            if r in ("sq", "ladder"):
                ax.text(x + bw / 2, v + ymax * 0.02, pct(v), ha="center", va="bottom", fontsize=8, color=INK, fontweight="bold" if r == "ladder" else "normal")
    ax.set_xticks(range(len(groups)))
    ax.set_xticklabels([g for _, g in groups], fontsize=10, color=INK)
    ax.yaxis.set_major_formatter(FuncFormatter(lambda v, _: f"{100 * v:.0f}%"))
    ax.set_ylabel("Average yearly income growth, years 0–30", fontsize=9, color=INK2)
    header(fig, "Who gains: the ladder reverses the order of growth",
           "Average yearly growth of total income, savings in capital accounts included. Status quo: owners grow fastest.\nLadder: the lower-paid grow fastest, 2.3% a year in spendable income alone, and the classes keep their order.")
    legend_row(fig, ORDER, 0.80)
    footer(fig)
    fig.savefig(OUT + "fig1_growth_by_class.png")
    plt.close(fig)


# ---------------- Figure 2: income paths, log scale ----------------
def fig_paths():
    fig = plt.figure(figsize=(8, 5.0), dpi=200)
    axes = [fig.add_axes([0.08, 0.15, 0.40, 0.55]), fig.add_axes([0.56, 0.15, 0.40, 0.55])]
    for ax, reg, ramp in zip(axes, ["sq", "ladder"], [ORANGE_ORD, BLUE_ORD]):
        style(ax)
        o = R["main"][reg]
        yrs = o["year"]
        for (key, lab), col in zip(CLASSES, ramp):
            ys = o[key]
            ax.plot(yrs, ys, color=col, lw=1.6, solid_capstyle="round", solid_joinstyle="round")
            ax.plot([yrs[-1]], [ys[-1]], "o", ms=5.5, color=col, mec=SURF, mew=1.4, zorder=5)
            ax.annotate(f"{ys[-1]:,.0f}", (yrs[-1], ys[-1]), xytext=(6, 0), textcoords="offset points", va="center", fontsize=8, color=INK2)
        ax.set_yscale("log")
        ax.set_ylim(25, 30000)
        ax.yaxis.set_major_locator(FixedLocator([50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000]))
        ax.yaxis.set_minor_formatter(NullFormatter())
        ax.yaxis.set_major_formatter(FuncFormatter(lambda v, _: f"{v / 1000:.0f}K" if v >= 1000 else f"{v:.0f}"))
        ax.set_xlim(0, 33.5)
        ax.set_xticks([0, 10, 20, 30])
        ax.set_xticklabels(["0", "10", "20", "30"]); ax.set_xlabel("Years from now", fontsize=9, color=INK2)
        s = o["summary"]
        ratio0 = o["ownersPer"][0] / o["classLow"][0]
        ratioT = o["ownersPer"][-1] / o["classLow"][-1]
        ax.set_title(f"{LABEL[reg]}", fontsize=11, color=INK, fontweight="bold", pad=22)
        ax.text(0, 1.03, f"Owners earn {ratio0:.0f}× the lower-paid half at year 0, {ratioT:.0f}× at year 30", transform=ax.transAxes, fontsize=8.5, color=INK2)
    axes[1].set_yticklabels([])
    axes[0].set_ylabel("Average income per person ($K, log scale)", fontsize=9, color=INK2)
    header(fig, "The hierarchy holds, the gaps change",
           "Average total income by class, log scale. The lines never cross; gaps widen under the status quo and narrow on the ladder.")
    # legend: class keys use the ladder ramp shade + label (identity is the class order)
    x = 0.03; y = 0.845
    for (key, lab), cb, co in zip(CLASSES, BLUE_ORD, ORANGE_ORD):
        fig.add_artist(plt.Line2D([x, x + 0.011], [y, y], color=co, lw=2.2, transform=fig.transFigure))
        fig.add_artist(plt.Line2D([x + 0.012, x + 0.023], [y, y], color=cb, lw=2.2, transform=fig.transFigure))
        t = fig.text(x + 0.03, y, lab, fontsize=9, color=INK2, va="center"); fig.canvas.draw()
        x = t.get_window_extent().transformed(fig.transFigure.inverted()).x1 + 0.025
    footer(fig)
    fig.savefig(OUT + "fig2_class_paths.png")
    plt.close(fig)


# ---------------- Figure 3: work and time ----------------
def fig_labor():
    fig = plt.figure(figsize=(8, 4.6), dpi=200)
    a1 = fig.add_axes([0.08, 0.14, 0.39, 0.58]); a2 = fig.add_axes([0.58, 0.14, 0.39, 0.58])
    for ax in (a1, a2):
        style(ax)
    for r in ORDER:
        o = R["main"][r]
        a1.plot(o["year"], [100 * u for u in o["unemployment"]], color=COL[r], lw=1.6, solid_capstyle="round")
        a2.plot(o["year"], o["daysPerWeek"], color=COL[r], lw=1.6, solid_capstyle="round")
        a1.plot([30], [100 * o["unemployment"][-1]], "o", ms=5, color=COL[r], mec=SURF, mew=1.3, zorder=5)
        a2.plot([30], [o["daysPerWeek"][-1]], "o", ms=5, color=COL[r], mec=SURF, mew=1.3, zorder=5)
    a1.set_ylim(0, 20); a1.set_yticks([0, 5, 10, 15, 20]); a1.yaxis.set_major_formatter(FuncFormatter(lambda v, _: f"{v:.0f}%"))
    a2.set_ylim(3.5, 5.1); a2.set_yticks([3.5, 4.0, 4.5, 5.0])
    for ax in (a1, a2):
        ax.set_xlim(0, 30.8); ax.set_xticks([0, 10, 20, 30]); ax.set_xticklabels(["0", "10", "20", "30"]); ax.set_xlabel("Years from now", fontsize=9, color=INK2)
    a1.set_title("People who want work but have none", fontsize=10.5, color=INK, fontweight="bold", pad=8)
    a2.set_title("Average days worked per week", fontsize=10.5, color=INK, fontweight="bold", pad=8)
    sq, la, dv = R["main"]["sq"], R["main"]["ladder"], R["main"]["dividend"]
    a1.annotate(f"{100 * sq['unemployment'][-1]:.0f}%", (30, 100 * sq["unemployment"][-1]), xytext=(-4, 8), textcoords="offset points", ha="right", fontsize=8, color=INK2)
    a1.annotate("0% on the ladder", (30, 0), xytext=(-4, 7), textcoords="offset points", ha="right", fontsize=8, color=INK2)
    a2.annotate("Status quo and flat dividend: 5 days", (30, 5.0), xytext=(-4, -12), textcoords="offset points", ha="right", fontsize=8, color=INK2)
    a2.annotate(f"{la['daysPerWeek'][-1]:.1f} days", (30, la["daysPerWeek"][-1]), xytext=(-4, -12), textcoords="offset points", ha="right", fontsize=8, color=INK2)
    header(fig, "AI displaces hours either way. The ladder turns them into time, not layoffs",
           "Labor demand falls 12.5% over 30 years wherever AI runs at full speed. Unemployment rises under the status quo\nand the flat dividend; on the ladder people trade part of their gains for shorter weeks and the freed hours go to the next in line.")
    legend_row(fig, ORDER, 0.795)
    footer(fig)
    fig.savefig(OUT + "fig3_work_and_time.png")
    plt.close(fig)


# ---------------- Figure 4: which AI projects get built ----------------
def fig_investment():
    fig = plt.figure(figsize=(8, 4.6), dpi=200)
    a1 = fig.add_axes([0.07, 0.15, 0.42, 0.56]); a2 = fig.add_axes([0.60, 0.15, 0.37, 0.56])
    style(a1, ygrid=False); style(a2)
    d = R["projectDistribution"]; mu, s = math.log(d["median"]), d["sigma"]; u = d["userCost"]; g10 = d["grossThreshold10"]
    x = np.logspace(math.log10(0.01), math.log10(12), 600)
    pdf = np.exp(-(np.log(x) - mu) ** 2 / (2 * s * s)) / (s * math.sqrt(2 * math.pi))  # density per unit log(x)
    a1.plot(x, pdf, color=INK2, lw=1.2)
    a1.fill_between(x, 0, pdf, where=x >= u, color=COL["ladder"], alpha=0.16, lw=0)
    a1.fill_between(x, 0, pdf, where=x >= g10, color=COL["gross"], alpha=0.85, lw=0)
    a1.set_xscale("log"); a1.set_xlim(0.01, 12); a1.set_ylim(0, pdf.max() * 1.35); a1.set_yticks([])
    a1.xaxis.set_major_locator(FixedLocator([0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10]))
    a1.xaxis.set_minor_formatter(NullFormatter())
    a1.xaxis.set_major_formatter(FuncFormatter(lambda v, _: f"{v:g}"))
    a1.set_xlabel("First-year gain per $1 spent on an AI project", fontsize=9, color=INK2)
    for xv, lab, col in [(u, f"Costs shared: build if gain ≥ {u:.2f}", COL["ladder"]), (g10, f"Gross split, c = 10%:\nbuild only if gain ≥ {g10:.1f}", "#b07a00")]:
        a1.axvline(xv, color=col, lw=1)
    a1.text(u / 1.1, pdf.max() * 1.28, f"Cash-flow split or status quo:\nbuilt if gain ≥ {u:.2f}", fontsize=8, color=INK2, va="top", ha="right")
    a1.text(g10 * 1.08, pdf.max() * 0.62, f"Gross split, c = 10%:\nbuilt only if ≥ {g10:.1f}", fontsize=8, color=INK2, va="top")
    a1.set_title("Distribution of possible AI projects", fontsize=10.5, color=INK, fontweight="bold", pad=8)
    # panel b
    cs = [r["c"] for r in R["investmentCurve"]]; vs = [r["grossValueShare"] for r in R["investmentCurve"]]
    a2.plot(cs, [100] * len(cs), color=COL["ladder"], lw=1.8)
    a2.plot(cs, [100 * v for v in vs], color=COL["gross"], lw=1.8)
    v10 = next(r["grossValueShare"] for r in R["investmentCurve"] if abs(r["c"] - 0.1) < 1e-9)
    a2.plot([0.1], [100 * v10], "o", ms=5.5, color=COL["gross"], mec=SURF, mew=1.4, zorder=5)
    a2.annotate(f"c = 10%: {100 * v10:.0f}% of AI value built", (0.1, 100 * v10), xytext=(8, -2), textcoords="offset points", fontsize=8, color=INK2, va="center")
    a2.text(0.98, 103, "Cash-flow split: 100% at any c", fontsize=8, color=INK2, ha="right", va="bottom")
    a2.text(0.62, 58, "Gross split", fontsize=8, color=INK2)
    a2.set_xlim(0, 1); a2.set_ylim(0, 115); a2.set_yticks([0, 25, 50, 75, 100])
    a2.yaxis.set_major_formatter(FuncFormatter(lambda v, _: f"{v:.0f}%"))
    a2.xaxis.set_major_formatter(FuncFormatter(lambda v, _: f"{100 * v:.0f}%"))
    a2.set_xlabel("Company's share of added profit (c)", fontsize=9, color=INK2)
    a2.set_title("Share of AI value that gets built", fontsize=10.5, color=INK, fontweight="bold", pad=8)
    header(fig, "Split the profit after costs, or the engine stops",
           "If the company keeps 10% of the gain but pays 100% of the cost, a project must clear ten times the normal hurdle.\nDeducting costs first (a cash-flow split) keeps every profitable project worth building, whatever the split.")
    footer(fig, "Source: investment rule in Section 4. Project returns lognormal (median 0.25, σ = 0.9); cost of capital 7%, yearly decay of gains 15%.")
    fig.savefig(OUT + "fig4_investment.png")
    plt.close(fig)


# ---------------- Figure 5: where people stand on the ladder ----------------
def fig_tiers():
    fig = plt.figure(figsize=(8, 4.6), dpi=200)
    axes = [fig.add_axes([0.08, 0.15, 0.40, 0.50]), fig.add_axes([0.56, 0.15, 0.40, 0.50])]
    cats = ["Waiting for work", "Climbing (tiers I–II)", "Approaching enough (III–IV)", "Graduated, working by choice", "Graduated, not working"]
    cols = [COL["sq"]] + BLUE_ORD
    for ax, reg in zip(axes, ["sq", "ladder"]):
        style(ax)
        o = R["main"][reg]
        yrs = np.array(o["year"]); arr = np.array(o["tierShares"]) * 100
        ax.stackplot(yrs, arr.T, colors=cols, edgecolor=SURF, linewidth=0.9)
        ax.set_xlim(0, 30); ax.set_ylim(0, 100); ax.set_xticks([0, 10, 20, 30]); ax.set_xticklabels(["0", "10", "20", "30"]); ax.set_xlabel("Years from now", fontsize=9, color=INK2)
        ax.yaxis.set_major_formatter(FuncFormatter(lambda v, _: f"{v:.0f}%"))
        ax.set_title(LABEL[reg], fontsize=11, color=INK, fontweight="bold", pad=8)
    axes[1].set_yticklabels([])
    axes[0].set_ylabel("Share of people", fontsize=9, color=INK2)
    header(fig, "Climbing the ladder",
           "Where people stand relative to 'enough' (25 years of living costs). On the ladder nobody is left waiting, and by year 30\nnearly half are past the halfway mark; under the status quo the waiting room grows.")
    legend_row(fig, [(c, l) for c, l in zip(cols, cats)][:3], 0.80, kind="box")
    legend_row(fig, [(c, l) for c, l in zip(cols, cats)][3:], 0.755, kind="box")
    footer(fig)
    fig.savefig(OUT + "fig5_tiers.png")
    plt.close(fig)


# ---------------- Figure 6: robustness to displacement ----------------
def fig_lambda():
    fig = plt.figure(figsize=(8, 4.4), dpi=200)
    ax = fig.add_axes([0.08, 0.15, 0.72, 0.56])
    style(ax)
    lams = [row["lambda"] for row in R["lambda"]]
    for key in ["sq", "dividend", "ladder", "ladderAdmit"]:
        ys = [100 * row[key]["final"]["unemployment"] for row in R["lambda"]]
        ax.plot(lams, ys, color=COL[key], lw=1.7, marker="o", ms=4.5, mec=SURF, mew=1.2)
        if key == "sq":
            continue
        lab = "Status quo and\nflat dividend" if key == "dividend" else LABEL[key]
        ax.annotate(lab, (lams[-1], ys[-1]), xytext=(8, -4 if key == "dividend" else 0), textcoords="offset points", va="center", fontsize=8.5, color=INK2, annotation_clip=False)
    ax.set_xlim(0, 1); ax.set_ylim(0, 45); ax.set_yticks([0, 10, 20, 30, 40])
    ax.yaxis.set_major_formatter(FuncFormatter(lambda v, _: f"{v:.0f}%"))
    ax.xaxis.set_major_formatter(FuncFormatter(lambda v, _: f"{100 * v:.0f}%"))
    ax.set_xlabel("Share of AI's productivity gain that shows up as fewer hours needed (λ)", fontsize=9, color=INK2)
    ax.set_ylabel("Unemployment in year 30", fontsize=9, color=INK2)
    ax.axvline(0.3, color=BASE, lw=0.8)
    ax.text(0.305, 43, "default", fontsize=8, color=MUTED, va="top")
    header(fig, "When AI displaces more work, the voluntary handoff runs out",
           "Unemployment after 30 years as displacement rises. The voluntary ladder holds to about λ = 0.43; adding an admission rule\n(incumbents share hours, down to three days, with those waiting) keeps everyone in work for 30 years, even at λ = 1.")
    legend_row(fig, ["sq", "dividend", "ladder", "ladderAdmit"], 0.80)
    footer(fig)
    fig.savefig(OUT + "fig6_displacement.png")
    plt.close(fig)


for f in (fig_growth, fig_paths, fig_labor, fig_investment, fig_tiers, fig_lambda):
    f()
print("figures written")
