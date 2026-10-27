# The Sufficiency Ladder: Sharing AI's Productivity Gains Through Cash-Flow Profit Participation and Voluntary Work Handoff

Oct 27, 2026 · RI

Working paper, October 2026. The idea is the author's; the literature review, model, simulation and drafting were done with Claude (Anthropic). The model's code, an interactive simulator and this paper are published at [github.com/AJ-FYC/sufficiency-ladder](https://github.com/AJ-FYC/sufficiency-ladder); the simulator runs at [aj-fyc.github.io/sufficiency-ladder](https://aj-fyc.github.io/sufficiency-ladder/). A short essay on the idea for general readers is on [Substack](https://rinsite.substack.com/p/keynes-promised-us-time-ai-is-our).

## Abstract

Keynes expected a century of technical progress to bring "the economic problem" within sight of solution by about 2030, and suggested that a fifteen-hour week could then share out the work that remained. Productivity grew roughly as he predicted, but in the United States the gains went mostly to top earners and capital, and hours barely fell. Generative AI reopens that choice. This paper develops a proposal, the Sufficiency Ladder. Most of the profit added by new productivity goes to the people doing the work. People who approach financial sufficiency ("enough") hand part of their hours to the next person in line, and owners keep today's profits plus a fixed slice of the growth.

The paper makes three contributions. First, it maps each component to institutions that already exist and records how they performed: gainsharing, French mandatory profit participation, Sweden's wage-earner funds, Dutch working-time rights, German pay-or-time agreements, Danish job rotation and permanent-fund dividends. Second, it shows that the split must apply to cash-flow profit, after costs. Under a split of gross gains, a company that keeps share c of the gain but pays all costs faces an investment hurdle 1/c times higher. With a 10% company share, only 7.6% of the AI value that would otherwise be built still is (in our calibration). A cash-flow split is investment-neutral for any c > 0 when losses are shared as fully as gains, as in the Brown-tax and resource-rent literature. Third, an agent-based simulation (2,000 people, 20 owners, 30 years) finds that the ladder reverses the order of income growth. Counting savings locked in their capital accounts, the lower-paid half's income grows 4.1% a year and owners' 0.7%, against 0.5% and 4.2% under the status quo; counting only what they can spend, the lower-paid half's grows 2.3% a year. No class overtakes another. Unemployment falls to zero by year 22, where the status quo reaches 17% by year 30, and part of AI's gain becomes a four-day week. The voluntary handoff runs out once more than about 43% of AI's productivity gain shows up as fewer hours needed, a threshold that a simple absorption condition predicts. An admission rule that shares hours with people who are waiting restores full employment within the 30 years simulated. A dividend with the same working-time rights and capital accounts does about as well as the ladder, so in the model the gains come from those institutions rather than from paying the share per hour worked. We list failure modes, design responses and open questions.

## 1. Introduction

In 1930 Keynes predicted that a century of compound growth would raise living standards four to eight times, and suggested that "three-hour shifts or a fifteen-hour week" could then share out the work that remained. Once the economic problem was solved, he argued, the love of money as a possession would come to be seen as "a somewhat disgusting morbidity" (Keynes, 1930). The richer world arrived roughly on schedule. The shorter week did not, at least in the United States. Between 1979 and 2019, net productivity grew about 60% while a typical worker's hourly compensation grew about 16%, a gap that EPI attributes to growing pay inequality and a shift of income from labor to capital ([Mishel, 2021](https://www.epi.org/blog/growing-inequalities-reflecting-growing-employer-power-have-generated-a-productivity-pay-gap-since-1979-productivity-has-grown-3-5-times-as-much-as-pay-for-the-typical-worker/)). By the OECD's figures, which it says are meant for comparing trends over time rather than levels between countries, Americans still work about 1,800 hours a year, against about 1,330 in Germany ([OECD, average annual hours actually worked per worker, 2024](https://www.oecd.org/en/data/indicators/hours-worked.html)).

None of this was inevitable. From 1947 to 1973, real family income grew 117% for the bottom fifth of US families and 75% for the top 5% ([Bivens, 2014](https://www.epi.org/blog/generation-long-trend-greater-income-inequality/)). The bottom grew fastest, so relative gaps narrowed. Contracts such as the 1950 General Motors–UAW agreement, the "Treaty of Detroit", wrote yearly productivity-linked raises into wage settlements ([Levy and Temin, 2007](https://www.nber.org/papers/w13106)). Several European countries later turned part of their productivity growth into time. The Dutch, with about half of all jobs part-time ([CBS, 2007](https://web.archive.org/web/20250521103834/https://www.cbs.nl/en-gb/news/2007/47/wassenaar-agreement-marks-turning-point-for-labour-market)), produce nearly as much per hour as Americans: about $94 against $97 of GDP per hour worked in 2023, at current purchasing-power parities ([OECD, GDP per hour worked](https://www.oecd.org/en/data/indicators/gdp-per-hour-worked.html)).

Generative AI reopens the question. Task-level gains are large and concentrated among less experienced workers ([Brynjolfsson, Li and Raymond, 2025](https://doi.org/10.1093/qje/qjae044)), but so far they have not shown up in earnings or hours. Linked Danish records on 25,000 workers suggest why: the time chatbots save is still small, about 3% of work hours; most users put it into other tasks, fewer than one in ten take it as breaks or leisure, and by workers' own reports only 3–7% of the productivity gain reaches their pay ([Humlum and Vestergaard, 2025](https://bfi.uchicago.edu/wp-content/uploads/2025/04/BFI_WP_2025-56-3.pdf)). Nothing in a standard employment contract turns saved time into pay or shorter hours; this paper proposes such a channel. Policy is starting to move. California's Executive Order N-6-26 (May 2026) asks state agencies to evaluate worker-ownership models that would "build wealth from productivity gain among workers", and to propose options for directing part of AI companies' revenue to beneficial uses ([State of California, 2026](https://www.gov.ca.gov/wp-content/uploads/2026/05/5.21.26-AI-Workforce-EO-FINAL-SIGNED.pdf)). A New York legislator has proposed an "AI dividend" ([Axios, 2026](https://axios.com/2026/04/20/alex-bores-ai-dividend-plan-wealth)). Samsung's semiconductor workers won 10.5% of their division's operating profit after a strike threat, a deal that has since divided the company's workforce ([Reuters, 2026](https://kelo.com/2026/05/26/samsung-workers-approve-pay-deal-shares-surge/)).

This paper develops one specific proposal, which we call the Sufficiency Ladder. Most of the profit added by new productivity goes to the people doing the work, and the company keeps a fixed slice. As workers build wealth toward a level of financial sufficiency ("enough"), they choose shorter weeks, and the hours they release pass to the next person in line: first inside the firm, then across the economy. People move up tiers the way students move up grades, and once financial gain is moot they can keep working out of interest rather than need. Owners still grow, but more slowly than everyone below them. The hierarchy of a market economy stays; its gaps narrow.

The paper follows a simple rule: look for the mechanism that already exists before designing a new one. Section 2 maps each component to working institutions and their track records. Section 3 states the proposal. Section 4 shows that its investment incentives turn on one design choice, the basis of the split. Sections 5 to 7 build and test an agent-based model. Section 8 sets out failure modes and design responses, Section 9 discusses what is new and how the idea could be piloted, and Section 10 states the limits of the analysis.

## 2. What already exists

Every component of the proposal has a working precedent. Table 1 maps them; the paragraphs after it summarize the evidence that bears most on the design.

**Table 1. Components of the proposal and their closest working precedents**

| Component | Closest precedent | Design | What happened |
| --- | --- | --- | --- |
| Company keeps a fixed slice of added gains | Scanlon gainsharing, from the late 1930s (Lesieur, 1958; [University of Pittsburgh Library System](https://digital.library.pitt.edu/islandora/object/pitt:US-PPiU-ais200513)) | Labor-cost savings measured against a baseline ratio; workers typically get 75%, the company 25% ([Sheposh, 2020](https://www.ebsco.com/research-starters/business-and-management/scanlon-plan); Imberman, 1995) | Still in use; works because only measured gains above a baseline are shared |
| Make sharing law, not goodwill | French participation, ordonnance 67-693 of 17 August 1967 on "la participation des salariés aux fruits de l'expansion des entreprises" ([Conseil constitutionnel, 2024](https://www.conseil-constitutionnel.fr/sites/default/files/as/root/bank_mm/decisions/20231077qpc/20231077qpc_ccc.pdf)) | Reserve = ½ × (net profit − 5% of equity) × (payroll ÷ value added); mandatory at 50+ employees (Code du travail, arts. L3324-1 and L3322-2; [Conseil constitutionnel, 2024](https://www.conseil-constitutionnel.fr/sites/default/files/as/root/bank_mm/decisions/20231077qpc/20231077qpc_ccc.pdf)) | In force for nearly 60 years; under a five-year trial from 2025, firms with 11–49 employees whose net taxable profit has been at least 1% of revenue for three consecutive years must adopt at least one value-sharing scheme: participation, intéressement, a value-sharing bonus or an employer top-up to a savings plan (Loi n° 2023-1107 du 29 novembre 2023) |
| A mandatory share of profits | Mexico's PTU: 10% of taxable profit to employees (Ley Federal del Trabajo, art. 120; [ELA](https://www.ela.law/firms/blp-costa-rica/Articles/employee-profit-sharing-ptu-in-mexico)) | Firms dodged it by moving staff into separate, low-profit service companies ([Ius Laboris](https://iuslaboris.com/?p=37467)) | The 2021 reform banned the practice; the political price was a cap of three months' pay or the three-year average, whichever is higher ([Foley](https://www.foley.com/insights/publications/2021/04/ban-outsourcing-insourcing-mexican-congress/); [Basham](https://basham.com.mx/en/?p=24809)) |
| Gains paid as ownership, kept in the firm | Sweden's wage-earner (Meidner) funds (Meidner, 1978; [Pontusson and Kuruvilla, 1992](https://ideas.repec.org/a/sae/ilrrev/v45y1992i4p779-791.html)) | 1983 law ([Prop. 1983/84:50](https://lagen.nu/prop/1983/84:50)): 20% tax on real profits above an exemption, invested by five regional funds whose boards had a wage-earner majority, each kept below 8% of any listed firm's shares or votes | Between 75,000 and 100,000 people protested in Stockholm on 4 October 1983 ([Krassén, 2023](https://www.foretagarna.se/nyheter/riks/2023/oktober/dagen-da-foretagarna-rot-ifran)); the funds were abolished after the 1991 election |
| Personal capital accounts | Mondragon cooperatives ([Kelly and Massena, 2009](https://www.yesmagazine.org/issue/new-economy/2009/06/06/mondragon-worker-cooperatives-decide-how-to-ride-out-a-downturn)) | Members' profit shares held in accounts paid out at retirement; surplus members moved between cooperatives | Durable for members; temporary and subsidiary workers absorbed the shocks, including about 3,500 at Fagor's subsidiaries ([Kasmir](https://globaldialogue.isa-sociology.org/articles/the-mondragon-cooperatives-successes-and-challenges)) |
| Gains shared as stock | Samsung semiconductor agreement, 2026 ([Reuters](https://kelo.com/2026/05/26/samsung-workers-approve-pay-deal-shares-surge/)) | 10.5% of the division's operating profit as stock-based bonuses for ten years, subject to annual profit targets, plus a 6.2% raise ([Tom's Hardware](https://www.tomshardware.com/tech-industry/samsung-chip-workers-vote-to-accept-340000-average-bonus-ending-months-long-strike-threat)) | Ratified by 74% of 62,616 voters ([Reuters](https://kelo.com/2026/05/26/samsung-workers-approve-pay-deal-shares-surge/)); some memory workers may get about $400,000 this year against about $4,000 for smartphone, TV and appliance staff, and resentment has slowed work in the foundry and test-and-packaging divisions ([Tom's Hardware](https://www.tomshardware.com/tech-industry/samsung-chip-workers-vote-to-accept-340000-average-bonus-ending-months-long-strike-threat), citing Bloomberg; Reuters reports about $416,000 for some memory workers) |
| A right to work fewer hours | Dutch Part-time Employment Act, 2000 ([Eurofound](https://www.eurofound.europa.eu/en/resources/article/2000/part-time-employment-act-seeks-promote-combining-work-and-care)) | Employers may refuse a request only for serious business reasons | About half of jobs are part-time ([CBS, 2007](https://web.archive.org/web/20250521103834/https://www.cbs.nl/en-gb/news/2007/47/wassenaar-agreement-marks-turning-point-for-labour-market)); output per hour is slightly below the US level ([OECD](https://www.oecd.org/en/data/indicators/gdp-per-hour-worked.html)) |
| Taking gains as time | Deutsche Bahn and the EVG union, 2016 ([Mind](https://www.mind.eu.com/rh/en/article/germany-both-the-evg-union-and-deutsche-bahn-db-draw-positive-conclusions-from-the-2016-collective-agreement-that-allows-employees-to-choose-between-more-money-and-more-free-time)); IG Metall, 2018 ([IG Metall](https://www.igmetall.de/en/tarif/tarifrunden/metall-und-elektro/260-000-beschaeftigte-wollen-lieber-acht-tage)) | A choice of a 2.6% raise, one hour less a week, or six extra days off; an option to swap a bonus for eight days off | A majority of rail staff chose the days off; in a preliminary survey, about 260,000 eligible metalworkers wanted the eight days |
| Hours handed to others | Wassenaar Agreement, Netherlands, 1982 ([CBS, 2007](https://web.archive.org/web/20250521103834/https://www.cbs.nl/en-gb/news/2007/47/wassenaar-agreement-marks-turning-point-for-labour-market)) | Wage restraint in exchange for shorter hours and more part-time jobs | Employment up 2.5 million between 1982 and 2006 ([CBS, 2007](https://web.archive.org/web/20250521103834/https://www.cbs.nl/en-gb/news/2007/47/wassenaar-agreement-marks-turning-point-for-labour-market)); workers paid through wage restraint, and new jobs were "rarely occupied by people who have been unemployed for more than a year" ([Eurofound, 1997](https://www.eurofound.europa.eu/en/publications/all/latest-pay-claims-threat-dutch-concertation-economy)) |
| The next in line takes the slot | Danish job rotation ([Eurofound](https://static.eurofound.europa.eu/covid19db/cases/DK-2010-52_2481.html)) | An unemployed person fills the job of an employee away on training, with a subsidy | Small (about 1,300 people in 2019); a Danish agency evaluation found that, after an initial dip, substitutes' employment rate exceeded a matched comparison group's by 4 percentage points after 18 months and 5.8 points after 2½ years ([Nielsen and Nielsen, 2021](https://star.dk/media/18162/effektanalyse-af-jobrotationsordningen.pdf)) |
| Gains spill to everyone | Alaska Permanent Fund Dividend ([Jones and Marinescu, 2022](https://www.aeaweb.org/doi/10.1257/pol.20190299)) | An equal yearly dividend to every resident | No effect on employment; part-time work up 1.8 points (17%) |
| A cap on what capital keeps | OpenAI's capped-profit structure, 2019 ([OpenAI, 2019](https://openai.com/index/openai-lp/)) | Investor returns capped, with the excess going to the nonprofit | Dropped in 2025; the company said the cap made sense only when one AI effort might dominate, not "in a world of many great AGI companies" ([Altman, 2025](https://openai.com/index/evolving-our-structure/)) |

**How rents are shared today.** Firm-level studies find that a 10% rise in a firm's value added per worker raises its workers' pay by roughly 0.5% to 1.5% ([Card, Cardoso, Heining and Kline, 2018](https://www.nber.org/papers/w22850.pdf)). Pay, in other words, responds only weakly to a firm's profitability. Where profit sharing is mandated or bargained, workers' share is small too: 10% of taxable profit in Mexico, 10.5% of operating profit at Samsung. The proposal inverts that ratio. Rents have grown as a share of income: in the US nonfinancial corporate sector, the labor share fell by about 10% and the capital share by about 30% over the three decades to 2014, while the profit share rose by more than 12 percentage points ([Barkai, 2020](https://doi.org/10.1111/jofi.12909)). Rising markups and "superstar" firms with low labor shares account for much of this (De Loecker, Eeckhout and Unger, 2020; Autor, Dorn, Katz, Patterson and Van Reenen, 2020). AI rents are likely to concentrate in the same kind of firm.

**Taxing rents without stopping investment.** Public finance has long known how to take a large share of profits without deterring investment. A tax on cash flow with immediate expensing is neutral (Brown, 1948). An allowance for corporate equity achieves the same if the allowance rate equals the normal return; when the allowance is certain to be received, because losses are treated symmetrically, that rate is the risk-free interest rate (Boadway and Bruce, 1984; IFS Capital Taxes Group, 1991; Bond and Devereux, 1995; Mirrlees et al., 2011). Resource rent taxes apply the idea to mining and oil (Garnaut and Clunies Ross, 1975). Norway taxes petroleum profits at a combined marginal rate of 78%, using a cash-flow special tax with immediate expensing that is designed so that projects profitable before tax remain profitable after it ([Norsk Petroleum](https://www.norskpetroleum.no/en/economy/petroleum-tax/)). Two cautions carry over. Allowed returns set above the normal return invite over-investment (Averch and Johnson, 1962). And a proportional tax discourages risk-taking unless losses are offset as fully as gains are taxed (Domar and Musgrave, 1944); with full loss offset, a rent tax can be neutral under uncertainty (Bond and Devereux, 1995).

**Profit shares, employment and ownership.** Weitzman (1984) argued that paying part of compensation as a profit share rather than a fixed wage makes firms want to hire more, pushing the economy toward full employment. Meade (1989) proposed labor-capital partnerships with share certificates. Broad ownership has a long American lineage, from Kelso and Adler (1958) to the evidence on employee ownership and profit sharing in Kruse, Freeman and Blasi (2010) and Blasi, Freeman and Kruse (2013). Freeman (2015) put the AI version bluntly: who owns the robots rules the world.

**Hours, status and "enough".** Across countries and 150 years, hours worked fall a little under half a percent a year as wages rise, because the income effect slightly outweighs the substitution effect ([Boppart and Krusell, 2020](https://doi.org/10.1086/704071)). Three forces slow that decline. Fixed costs per worker (Oi, 1962) make longer hours cheaper than more workers (Ehrenberg, 1971); in the US, employer health insurance is a large cost of this kind, with employers paying on average about $7,900 a year toward single coverage and $20,100 toward family coverage in 2025 ([KFF, 2025](https://files.kff.org/attachment/Employer-Health-Benefits-Survey-2025-Annual-Survey-Summary-of-Findings.pdf)). Spending rises with income and resets what feels like enough (Schor, 1991; Easterlin, 1974; Hirsch, 1976). Inequality itself lengthens hours: in manufacturing in ten countries from 1963 to 1998, more inequality goes with longer hours, as Veblen (1899) would have predicted, and ordinary incentive effects do not explain it ([Bowles and Park, 2005](https://doi.org/10.1111/j.1468-0297.2005.01042.x)).

**AI and work.** In a call center, an AI assistant raised issues resolved per hour by 15% on average; less experienced and lower-skilled agents improved in both speed and quality, while the most experienced gained a little speed and lost a little quality ([Brynjolfsson, Li and Raymond, 2025](https://doi.org/10.1093/qje/qjae044)). In writing tasks, ChatGPT cut time by about 40% and raised quality by about 18%, narrowing the gap between workers (Noy and Zhang, 2023). Yet linked Danish records on 25,000 workers in 11 exposed occupations show precise null effects on earnings and hours about a year and a half after ChatGPT's launch (records through June 2024), ruling out average effects larger than 1% ([Humlum and Vestergaard, 2025](https://bfi.uchicago.edu/wp-content/uploads/2025/04/BFI_WP_2025-56-3.pdf)). The same survey shows where the gains went. Between 64% and 90% of users, depending on the occupation, report time savings, which average 2.8% of their work hours; 80% put the saved time into other tasks and fewer than 10% into breaks or leisure; chatbots created new tasks for 8.4% of workers, including some non-users; and by workers' own reports only 3–7% of the productivity gain reached earnings. Nor does compression at the task level imply compression of incomes. Acemoglu (2025) shows that AI may increase rather than reduce inequality even when it raises the productivity of low-skill workers in some tasks, if it creates no new tasks for them. Empirically, he finds AI less likely than earlier automation to widen inequality, because its effects are spread more evenly across demographic groups, but sees no evidence that it will reduce labor income inequality, and predicts that it will widen the gap between capital and labor income. Macroeconomic estimates range widely: just under 1.5 percentage points a year of extra US labor-productivity growth over a decade after widespread adoption ([Briggs and Kodnani, 2023](https://www.goldmansachs.com/insights/articles/generative-ai-could-raise-global-gdp-by-7-percent)), against no more than a 0.66% gain in total factor productivity over ten years ([Acemoglu, 2025](https://doi.org/10.1093/epolic/eiae042)). Whether AI displaces or reinstates labor depends on which tasks it automates and which new ones it creates (Acemoglu and Restrepo, 2019). Korinek and Stiglitz (2019) argue that redistribution is needed for AI to leave everyone better off.

## 3. The proposal

The Sufficiency Ladder has seven rules. The first four govern money and the last three govern work. Figure 1 shows how they connect; its dashed arrow, from capital accounts to new investment, is part of the proposal but not of the simulation (Section 5).

&#91;image: Figure 1. How the Sufficiency Ladder works: two loops, sharing the gains and handing off work. The dashed arrow is part of the proposal but is not implemented in the simulation (Section 5).\]

1. **Grandfathered baseline.** Each firm's cash-flow profit at adoption, held constant in real terms, stays with its owners. Owners keep their shares and this baseline. What they give up is most of the future growth, and since share prices already count on some of that growth, share values would fall when the rule is adopted.
2. **Split of added profit, after costs.** Added cash-flow profit is the firm's cash-flow profit minus the baseline, with all costs, including AI investment, deducted when they are paid. The company keeps share c (10% by default) and workers receive 1 − c. Losses carry forward with interest at the cost of capital, and losses a firm cannot use before it closes are refunded (Section 4).
3. **Payment per hour, half as ownership.** The workers' share is paid equally per hour worked. Half goes into personal capital accounts, which vest on graduation or retirement and finance further investment. People waiting for work draw half a share.
4. **A cap with spillover.** The share per full-time equivalent is capped at one base wage, and any excess is paid to everyone as an equal dividend. This is how the gains spill to the entire economy.
5. **A right to set hours.** Anyone may cut their hours, with benefits pro-rated. People are placed in tiers by their progress toward "enough", defined as 25 years of living costs. Tiers I and II are below half of it, tiers III and IV above half, and those past it have graduated.
6. **The next in line.** Hours released by people cutting back go first to whoever has waited longest: inside the firm, then across the economy. An optional admission rule goes further: when people are waiting, incumbents share hours, down to three days, to take them in.
7. **Same terms for newcomers.** A newcomer earns the full per-hour share from the first hour. Tiers are grades people pass through, not classes they are born into.

**What the proposal is not.** It is not a universal basic income: payments are tied to hours worked, and only the standby share and the overflow dividend go to people who are not working. People who cannot do paid work, such as many carers and disabled people, gain only through those channels and the safety net, a real limit of the design. It is not socialism: ownership stays private, owners keep their baseline profits plus share c of the growth, and the classes' order of average income is preserved. It is not a wage mandate either, since base wages are left to the market.

**A worked example.** An AI system costs $1 million and adds $3 million of gross profit. Under a gross split, the company receives 10% of $3 million, or $300,000, against a $1 million outlay. It never buys the system, and workers receive 90% of nothing. Under a cash-flow split, the added cash-flow profit is $2 million. The company keeps $200,000 on top of recovering its outlay, workers receive $1.8 million, and the system gets built. Paying for AI out of added profit before anything is shared, as the proposal does, is the cash-flow split in practice.

## 4. Investment: why the split must come after costs

Consider an AI project that costs $1 and yields a gain of ρ in its first year, decaying at rate δ thereafter. At cost of capital r, the present value of its gains is ρ/(r + δ). Suppose the firm keeps share k of the gains and pays share j of the cost. It builds the project when

```latex
k \cdot \frac{\rho}{r + \delta} \;\ge\; j
```

**Proposition 1 (gross split).** If the company keeps share c of gross gains and pays the whole cost (k = c, j = 1), it builds only projects with ρ ≥ (r + δ)/c. The hurdle rises by a factor of 1/c: tenfold at c = 10%.

**Proposition 2 (cash-flow split).** If costs are deducted before the split (k = j = c), the firm builds every project with ρ ≥ r + δ, exactly as it would with no sharing at all. This holds for any c > 0, because maximizing c × NPV selects the same projects as maximizing NPV (Brown, 1948).

**Corollary (allowance designs).** A scheme that instead deducts a normal-return allowance at rate s on capital is neutral only when s equals the normal return: r in the setting above, where each project's return is known, and the risk-free rate when returns are risky but the allowance is certain to be received (Bond and Devereux, 1995). Set above that normal return, it rewards padding the capital base (Averch and Johnson, 1962); set below it, it raises the hurdle. Immediate expensing avoids having to know the normal return. Under uncertainty, losses must also be offset as fully as gains are taxed, or the rule discourages risk-taking (Domar and Musgrave, 1944): carried forward with interest or, as in Norway's petroleum tax, refunded at their tax value the following year ([Norsk Petroleum](https://www.norskpetroleum.no/en/economy/petroleum-tax/)).

Loss offset is the condition that matters most in practice. A firm that fails can leave carried-forward losses unused, so its owners bear failures alone. Take a $1 project that returns $3 or nothing with equal odds: it is worth $0.50 before sharing, but −$0.40 to owners who keep 10% of the gain and bear the whole loss. Neutrality therefore needs a guarantee that unused losses are refunded, as Norway refunds their tax value. Under profit sharing that means a fund or public backstop for workers' share of the losses, which this paper leaves open (Section 10).

To size the effect, let first-year returns on potential AI projects be lognormal with median 0.25 and dispersion 0.9, with r = 7% and δ = 15%. The cash-flow hurdle is then 0.22 and the gross-split hurdle at c = 10% is 2.2. Only 1.4% of the projects worth building still clear it, and they carry 7.6% of the value (Figure 2). The share of AI value built rises with the company share: 1.3% at c = 5%, 26.8% at 20% and 71.3% at 50%. Under the cash-flow split it is 100% at any c. The numbers depend on the assumed distribution; the direction does not.

&#91;image: Figure 2. Which AI projects get built under a gross split and under a cash-flow split\]

The distinction matters beyond AI. Mexico's profit-sharing law already uses a profit base, and Scanlon plans share savings measured against a baseline that includes costs. The OpenAI cap shows a different risk: a voluntary cap at one firm cannot survive competition with uncapped firms, which is why the proposal is framed as a general rule.

## 5. An agent-based model

The model asks three questions. Does the ladder reverse the order of income growth without reversing the hierarchy? Can the voluntary handoff absorb AI displacement? Where does it break? It is deliberately simple, built to compare mechanisms rather than to forecast. It runs as a single deterministic program shared by this paper's figures and the public simulator (Appendix C).

**Agents and time.** There are 2,000 people and 20 owners, about the top 1%, observed yearly for 30 years. Each person has a skill level that sets their wage, drawn from a lognormal distribution with mean 1 and dispersion 0.45. People also hold wealth (cash savings plus a capital account), an age and tenure, a waiting time if unemployed, and a fixed "passion" trait: half of those who reach "enough" keep working by choice. Careers last 40 years. Each year 1/40 of people retire and are replaced by newcomers who start with no wealth and wait for work.

**Technology and labor demand.** Output per efficiency hour grows at 1.2% a year plus an AI component, g\_AI, which depends on how many AI projects firms build (Section 4). The hours firms need fall as AI advances: H\_t = H\_0 × M\_t^(−λ), where M\_t is cumulative AI productivity and λ is the share of AI's gain that shows up as fewer hours needed rather than more output. With full-speed AI and λ = 0.3, labor demand falls 12.5% over 30 years. By default AI's extra growth continues for all 30 years, which extends a forecast made for one decade (Section 7).

**Wages and profit.** The base wage grows with productivity at an elasticity of 0.3, which matches the 1979–2019 relation between typical pay and productivity in the EPI series. Profit is output minus wages, a fixed cost per employed person (5% of a base wage) and AI investment (2% of output when every worthwhile project is built). At year 0, profit is 35% of output and wages 60%.

**Hours.** Where a right to set hours exists, people in tiers I and II want five days, tier III 4.5 and tier IV four. Everyone's desired hours also fall as their pay per hour rises, with elasticity η = 0.2, roughly what the long-run fall in hours, a little under 0.5% a year against wage growth of about 2%, implies (Boppart and Krusell, 2020); no one below "enough" goes under three days. Graduates who keep working choose three days and the rest stop. Without a right to set hours, as under the status quo, the choice is five days or none.

**Who gets the hours.** If incumbents want fewer hours than firms need, the slack goes to people waiting, longest wait first. If they want more, the status quo lays off the newest hires, while the ladder first cuts hours proportionally down to three days. With the admission rule on, incumbents also share hours to take in people who are waiting.

**What counts as enough.** "Enough" starts at 25 years of living costs, the wealth that supports that spending under the 4% withdrawal rule (Bengen, 1994): $1.125 million at a living cost of $45,000 a year. It drifts with median income at elasticity ν = 0.5 and, when status pressure is on, with the ratio of the top tenth's mean income to the median among the 2,000 people, owners excluded, at elasticity ψ. That ratio is close to the measure of inequality Bowles and Park (2005) prefer, the ratio of 90th-percentile to median earnings.

**Households.** People save 25% of cash income above $30,000 and draw down savings when income falls below it. Savings earn 3% and capital accounts 5% in real terms. Both returns come from outside the model economy, as if household wealth were invested in a wider capital market, while AI investment is paid out of firm cash flow. The model therefore does not close the loop in Figure 1 by which capital accounts finance new investment, and owners' claims are never diluted. Graduates who stop working spend their current living cost out of their wealth, drawing on cash savings first and then on their capital account, which vests when they graduate; they return to work if their wealth falls back below "enough". The involuntarily unemployed receive 30% of a base wage. Income in the results is total income: wages, profit shares, dividends and interest, plus capital-account contributions and the returns accrued on them, which are locked until graduation or retirement. Section 6 also reports spendable income, which leaves out the locked part; once an account has vested, all of its income counts as spendable.

**Regimes.** All four start from the same status-quo economy at year 0.

- **Status quo:** owners keep all profit; there is no right to set hours; layoffs are last in, first out.
- **Sufficiency Ladder:** rules 1 to 7 of Section 3, with the cash-flow split.
- **Gross split:** identical to the ladder except that the company keeps c of gross added profit and pays all AI costs.
- **Flat dividend:** the ladder's pool, paid as an equal dividend to everyone, under status-quo labor rules.

Table 2 lists the main parameters; Appendix A gives the equations and Appendix B the full list.

**Table 2. Main calibration**

| Parameter | Value | Basis |
| --- | --- | --- |
| Non-AI productivity growth | 1.2% a year | US long-run trend, rounded |
| Extra productivity growth from AI when every worthwhile project is built | 1.5% a year for 30 years (sensitivity: 0.05% to 3%; 10 years only) | Briggs and Kodnani (2023): just under 1.5 points of US labor-productivity growth over the decade after widespread adoption, extended here to 30 years; Acemoglu's (2025) TFP estimate for the low end; 3% as a stress test |
| Share of AI gain that becomes fewer hours (λ) | 0.3 (sensitivity: 0 to 1) | Unknown, so varied widely |
| Pass-through of productivity to the base wage | 0.3 | Mishel (2021), 1979–2019: pay +16% against productivity +60% |
| Company share of added profit (c) | 10% (sensitivity: 5% to 100%) | The proposal |
| Elasticity of desired hours to pay per hour (η) | 0.2 | Implied by Boppart and Krusell (2020) |
| "Enough" | 25 years of living costs, drifting with median income (ν = 0.5) | The 4% withdrawal rule (Bengen, 1994); Easterlin (1974), direction only |
| Status pressure (ψ) | 0 (sensitivity: 0.5 and 1) | Bowles and Park (2005), direction only |
| AI project returns | Lognormal, median 0.25, dispersion 0.9 | Illustrative |
| Cost of capital; yearly decay of AI gains | 7%; 15% | Illustrative |

## 6. Results

The ladder reverses the order of income growth, yet no class overtakes another. Over 30 years, average income of the lower-paid half grows 4.1% a year on the ladder against 0.5% under the status quo, and owners' income grows 0.7% against 4.2% (Figure 3). Part of the lower-paid half's income is saved: by year 30, 41% of it goes into or accrues in capital accounts that are locked until graduation or retirement. Counting only what they can spend, their income grows 2.3% a year, almost five times the status quo's 0.5%; the flat dividend, paid entirely in cash, does better on that measure (3.8%) but leaves one person in six without work. In every year of all 248 runs behind this paper's results and sensitivity analysis, the four classes stay in the same order: lower-paid, middle, top-paid, owners.

&#91;image: Figure 3. Yearly growth of total income by class under four regimes, counting savings locked in capital accounts\]

The hierarchy compresses instead of inverting. Owners start at 81 times the income of the lower-paid half. Under the status quo that ratio reaches 243 by year 30; on the ladder it falls to 29 (Figure 4). In levels, the lower-paid half goes from $41,000 to $137,000 on the ladder, $80,000 of it spendable, against $47,000 under the status quo, and owners go from $3.3 million to $4.0 million against $11.3 million.

&#91;image: Figure 4. Total income paths by class under the status quo and the Sufficiency Ladder\]

Displaced hours become time instead of layoffs. Labor demand falls 12.5% over 30 years in every regime where AI runs at full speed. Under the status quo, unemployment rises from 4.4% to 16.7%, and the flat dividend does no better at 17.1%. On the ladder, unemployment falls to zero and the average working week shortens to four days as people take part of their gains as time (Figure 5).

&#91;image: Figure 5. Unemployment and days worked per week\]

The gross split stalls the engine and leaves everyone worse off. With the company keeping 10% of gross gains, only 7.6% of AI value gets built, extra productivity growth falls from 1.5% to 0.11% a year, and output after 30 years is 30% below the status quo. Every class, owners included, ends below where it does on the ladder: owners grow 0.48% a year against 0.68%.

People climb. Under the status quo the waiting room grows to one person in six, and few move past the halfway mark. On the ladder, from year 22 on, no one is left waiting; by year 30, 47% of people are in tiers III and IV and 1.1% have graduated (Figure 6). Graduation is rare within 30 years because "enough" rises with median income, so the gains show up mostly as shorter weeks rather than early exits. Over 40 years, 11% graduate.

&#91;image: Figure 6. Where people stand on the ladder\]

**Table 3. Outcomes in year 30**

| Measure | Status quo | Sufficiency Ladder | Flat dividend | Gross split |
| --- | --- | --- | --- | --- |
| Unemployment | 16.7% | 0.0% | 17.1% | 0.0% |
| Days worked per week | 5.00 | 3.97 | 5.00 | 4.45 |
| Owners ÷ lower-paid half (total income) | 243× | 29× | 33× | 45× |
| Gini coefficient of total income (0.513 at start) | 0.728 | 0.276 | 0.330 | 0.368 |
| Workers' share of output (60% at start) | 34% | 73% | 74% | 68% |
| Output (year 0 = 1) | 1.96 | 1.84 | 1.96 | 1.38 |
| Output per hour (year 0 = 1) | 2.24 | 2.24 | 2.24 | 1.48 |
| Labor demand left unfilled | 0% | 5.8% | 0% | 6.0% |
| Workers' capital accounts ÷ (accounts + owners' stake) | 0% | 41% | 0% | 26% |
| Lower-paid half: income locked in capital accounts | 0% | 41% | 0% | 32% |

The ladder and the flat dividend compress incomes about equally; they differ in work and time. Under today's labor rules, which the dividend regime keeps, it leaves one person in six without work while everyone else works five days; given the ladder's working-time rights and capital accounts, a dividend does about as well as the ladder (Section 7). The ladder keeps everyone in work at four days. The ladder's output is 6% lower than the status quo's in year 30 because people choose shorter weeks and 5.8% of the hours firms want go unfilled; output per hour is identical. Those openings could go to newcomers from outside the current workforce, including migrants, or to AI; the closed model supplies neither, and Section 9 asks who would own that AI. Workers' capital accounts reach 41% of capital wealth on the ladder by year 30, counting owners' stake at its year-30 profit capitalized at 5% (Appendix A). The accounts are invested outside the model economy, so this measures how wealth is shared, not ownership of the firms.

These results are stable across random seeds, so they are not an accident of one draw; that does not test different behavior or market responses. In 20 runs, the lower-paid half grows 4.22% a year on the ladder (range 4.12% to 4.39%) and owners 0.70% (0.67% to 0.73%). Under the status quo, owners grow 4.23% to 4.24% a year in every run and unemployment ends between 16.4% and 20.8%. Ladder unemployment ends at zero in all 20 runs.

## 7. Robustness and sensitivity

**How much work AI displaces.** The voluntary handoff holds up to about λ = 0.43; at λ = 0.45, year-30 unemployment is 1.4%. It rises to 8.3% at λ = 0.6 and 25.2% at λ = 1, against 27.3% and 38.5% under the status quo (Figure 7). The admission rule keeps unemployment at zero at every λ for the 30 years simulated, with the week shortening to 3.7 days at λ = 0.6 and to the three-day floor, 3.0 days, at λ = 1. Beyond that, sharing runs out: at λ = 1, unemployment returns to 12.2% by year 40 even with the rule, unless the floor is lowered. Making admission compulsory is also the proposal's hardest political choice, since incumbents would give up hours before they would choose to. Up to a point the handoff can be voluntary; beyond it, sharing has to be a rule.

&#91;image: Figure 7. Unemployment after 30 years as displacement rises\]

**Proposition 3 (voluntary absorption).** Let D\_T be the efficiency hours that everyone who wants work would like to supply in year T, and H\_T = H\_0 M\_T^(−λ) the hours firms need. Without an admission rule, incumbents keep the hours they choose unless demand falls below them, only the hours they release go to people waiting, and newcomers join the queue every year. Under that allocation, everyone gets the hours they want in year T if D\_T ≤ H\_T. If D\_T > H\_T, the last person admitted takes a partial job, and people are left waiting once the excess is larger than that person's desired hours. To within that one partial job, the handoff therefore absorbs displacement up to

```latex
\lambda^{*} = \frac{\ln (H_0 / D_T)}{\ln M_T} = \frac{\eta \ln \Pi_T + \ln (1/\bar{\tau}_T) - \ln \ell_T}{\ln M_T}
```

Here Π\_T is pay per hour relative to w\_0, τ̄\_T the average tier multiplier of people below "enough", and ℓ\_T the labor force wanting work relative to H\_0, all in efficiency units. The second form follows from the hours rule in Appendix A, with graduates who keep working folded into ℓ\_T; it assumes no one is at the three-day floor or the five-day cap, which holds at the default. Its three terms are the channels of the handoff: higher pay per hour, rising wealth, and the queue that has to be absorbed. In the default calibration at T = 30, ln M\_T = 0.447, Π\_T = 2.54, τ̄\_T = 0.947 and ℓ\_T = 1.048, which exceeds 1 mainly because 5% of the labor force starts out unemployed. Then λ\* = (0.186 + 0.055 − 0.047) / 0.447 ≈ 0.43, with the terms computed before rounding, in line with the simulated threshold of about 0.43; Π\_T and τ̄\_T barely move with λ near the threshold. The condition shows why the threshold exists and how it moves: it rises with η, the response of desired hours to pay per hour, and with pay per hour itself, and falls as the initial queue lengthens. Dropping the queue term would overstate the threshold by about 0.1. It is a condition on year T only; unemployment along the way can be positive even when it holds, as in years 1–21 of the default run.

**The company's share.** Under the cash-flow split, c is a distributional dial that leaves investment alone. Raising c from 10% to 30% lifts owners' growth from 0.68% to 1.81% a year and lowers the lower-paid half's from 4.14% to 3.71%, with output roughly unchanged. At every c below 100%, both workers and owners do better under the cash-flow split than under the gross split (Table 4).

**Table 4. Company share c: gross split against cash-flow split**

| c | AI value built, gross split | Lower-paid growth, gross / cash-flow | Owners' growth, gross / cash-flow | Output in year 30, gross / cash-flow |
| --- | --- | --- | --- | --- |
| 5% | 1.3% | 2.37% / 4.25% | 0.32% / 0.35% | 1.34 / 1.83 |
| 10% | 7.6% | 2.44% / 4.14% | 0.48% / 0.68% | 1.38 / 1.84 |
| 20% | 26.8% | 2.67% / 3.93% | 0.88% / 1.27% | 1.48 / 1.87 |
| 30% | 45.1% | 2.81% / 3.71% | 1.36% / 1.81% | 1.59 / 1.91 |
| 50% | 71.3% | 2.72% / 3.09% | 2.38% / 2.71% | 1.79 / 1.96 |
| 100% | 100% | 0.43% / 0.43% | 4.23% / 4.23% | 1.96 / 1.96 |

**How "enough" moves.** The ladder's character depends on whether "enough" stays put (Table 5). If it is fixed in real terms (ν = 0), 17% of people graduate within 30 years and the week falls to 3.7 days, but output reaches only 1.58 times its starting level as 19% of demand goes unfilled. Status pressure amplifies this. Once the ladder narrows inequality, the sense of what is enough falls with it, more people step back, and the loop feeds itself: with ν = 0 and ψ = 1, half of all people graduate. Measuring status pressure over everyone, owners included, strengthens the effect: with ν = 0.5 and ψ = 1, 34% graduate instead of 26%, and under the status quo "enough" rises 2.6-fold by year 30 instead of 1.15-fold as owners pull away. Status-quo outcomes barely change either way, because no one in the model can work more than five days (Section 10). If "enough" rises one-for-one with median income (ν = 1), almost no one graduates; the gains appear as a 4.1-day week, with output equal to the status quo's. Keynes's question returns in a modern form: whether people take growth as time depends on whether "enough" stays still.

**Table 5. Ladder outcomes in year 30 by how "enough" moves**

| Drift with median income (ν) | Status pressure (ψ) | Graduated | Days per week | Output (year 0 = 1) | Demand unfilled |
| --- | --- | --- | --- | --- | --- |
| 0 | 0 | 17.4% | 3.72 | 1.58 | 19.4% |
| 0 | 1 | 51.2% | 3.61 | 1.30 | 33.4% |
| 0.5 | 0 | 1.1% | 3.97 | 1.84 | 5.8% |
| 0.5 | 0.5 | 5.8% | 3.81 | 1.72 | 11.8% |
| 0.5 | 1 | 25.8% | 3.68 | 1.52 | 22.4% |
| 1 | 0 | 0.0% | 4.14 | 1.96 | 0.0% |

**The pace of AI.** The ordering of growth holds at every AI pace tested. Even if AI adds only 0.05% a year, close to Acemoglu's (2025) estimate once hard-to-learn tasks are counted (under 0.53% over ten years, a total-factor-productivity figure that implies somewhat more labor-productivity growth), the ladder raises the lower-paid half's growth from 0.24% to 2.31% a year, because it shares all added profit, not only AI's. At 3% a year, status-quo unemployment reaches 27% and owners' growth 5.8%; on the ladder unemployment is 2.4% and the lower-paid half grows 5.75% a year. The default extends Briggs and Kodnani's one-decade estimate to 30 years, which compounds to 56% more productivity from AI rather than 16%. If AI's extra growth stops after ten years, while spending on AI continues to replace obsolete systems, the ordering still holds: the lower-paid half's income grows 3.0% a year on the ladder (1.4% counting only spendable income) against 0.3% under the status quo, unemployment ends at zero against 9.0%, and the week falls to 4.3 days.

**Which parts matter.** Ablations show that the engine of the handoff is people's willingness to trade money for time. With η = 0, the ladder still compresses incomes, but unemployment reaches 10.9% in year 30, and 22.6% at λ = 0.6, because no one releases hours until they near "enough". Paying half the share into capital accounts raises the lower-paid half's total income growth from 3.68% to 4.14% a year, though their spendable income then grows 2.30% a year rather than 3.68%, and cuts unemployment under high displacement from 12.7% to 8.3%, because wealth lets people step back earlier. More than half of the growth effect, but only about a quarter of the employment effect, comes from the assumed return: if accounts earned the same 3% as cash savings, the lower-paid half's growth would rise only to 3.88% and unemployment would fall only to 9.5%. The standby share mainly supports the incomes of people who are waiting. Under high displacement it costs a little employment (8.3% unemployment against 7.6% without it), because it diverts part of the pool from workers who would otherwise cut their hours sooner. The cap rarely binds at default settings. A US-style fixed cost per worker of 30% of a base wage barely changes hours or employment in the model, though it raises owners' measured growth because their grandfathered baseline starts lower. In practice it would matter more, because it shapes whether firms offer shorter weeks at all.

**What tying the gains to work adds.** The flat dividend in Section 6 keeps today's labor rules, so its comparison with the ladder mixes two differences: how the gains are paid and whether people may set their hours. Table 6 separates them. Giving the dividend the ladder's right to set hours and work-sharing helps little on its own, because the model's hours rule responds to pay per hour, which a lump sum leaves unchanged. Letting dividend income reduce desired hours, through the same illustrative income-response rule as pay, removes most of the unemployment, and paying half of it into capital accounts brings it close to the ladder: level at the default displacement and slightly behind at λ = 0.6 (10.0% against 8.3% unemployment). In the model, then, the gains come from the right to set hours, work-sharing and capital accounts, not from paying the share per hour worked. What would distinguish the two designs lies outside the model: a per-hour share rewards working, a dividend reaches people outside paid work, and a firm can start the ladder's core, gainsharing with a pay-or-time choice, without a new tax, although the full system's economy-wide admission rule, overflow dividend and loss guarantee need public institutions.

**Table 6. A dividend with the ladder's working-time rights (year 30)**

| Regime | Lower-paid income growth, total / spendable | Unemployment | Days worked per week | Unemployment at λ = 0.6 |
| --- | --- | --- | --- | --- |
| Flat dividend, today's labor rules | 3.81% / 3.81% | 17.1% | 5.00 | 27.9% |
| + right to set hours and work-sharing | 3.79% / 3.79% | 12.4% | 4.73 | 23.5% |
| + dividend counted as income when choosing hours | 3.69% / 3.69% | 0.6% | 4.17 | 14.3% |
| + half paid into capital accounts | 4.16% / 2.21% | 0.0% | 4.04 | 10.0% |
| Sufficiency Ladder | 4.14% / 2.30% | 0.0% | 3.97 | 8.3% |

**Who bears the cost of shorter weeks.** The grandfathered baseline is a fixed sum, which makes it a senior claim. When people take time off and output falls short of demand, 90% of the shortfall comes out of the workers' pool and 10% out of the owners' slice of growth, while the baseline itself is untouched. Scaling the baseline with efficiency hours worked would move that cost to owners. Hours worked end 18% below their starting level, so owners' income would grow 0.20% a year instead of 0.68%, and shrink slightly at λ = 0.6, while the lower-paid half's growth would rise from 4.14% to 4.29%. The fixed baseline keeps the promise that existing profits are not touched; scaling it is a dial for how much of the cost of shorter weeks owners bear.

## 8. Failure modes and design responses

Each known way the proposal could fail has a precedent, and most have a tested response (Table 7).

**Table 7. Failure modes, evidence and responses**

| Failure mode | Evidence | Design response |
| --- | --- | --- |
| Investment stalls | Proposition 1; 7.6% of AI value built at c = 10% under a gross split | Cash-flow base with immediate expensing; losses carried forward with interest and refunded if never used |
| Avoidance through corporate structure | Mexico's outsourcing shells, ended in 2021 | Consolidated group accounts; anti-avoidance rules written in from day one |
| Firms and profits move abroad | OpenAI's voluntary cap dropped; intangible profits are mobile | A general rule rather than firm-by-firm virtue; destination-based measurement (Auerbach et al., 2017); start with the least mobile rents |
| Gaming the baseline | Scanlon baselines need maintenance | Baseline set as a multi-year average, indexed for inflation and audited |
| A new elite of employees at rent-rich firms | Samsung's 2026 chip deal, which may pay some memory workers about $400,000 this year against about $4,000 for smartphone, TV and appliance staff, and has slowed work in other divisions (Tom's Hardware, 2026); superstar firms | A pool that covers the whole firm, not one division; per-hour cap with overflow to an economy-wide dividend |
| Insiders and outsiders | Mondragon's temporary and subsidiary workers; Wassenaar's long-term unemployed; migrants' children judging low-rung jobs against the tier above (Piore, 1979) | Standby share; admission rule; full share from the first hour |
| Insiders gain from cutting staff | Firms run to maximize income per member employ fewer people (Ward, 1958) | Count people waiting for work when dividing the pool, and pay them that share (the model's standby share does this at half a share); when no one is waiting, hours staff give up cost them nothing |
| Shorter weeks cost firms more | Fixed per-worker costs (Oi, 1962; Ehrenberg, 1971); US employer health insurance (KFF, 2025) | Pro-rated benefits by law, as in the Netherlands; benefits less tied to the employer |
| Skill mismatch in the handoff | Most of Wassenaar's new jobs were part-time or flexible, and few reached the long-term unemployed | AI narrows skill gaps for novices; pair the handoff with training, as Danish job rotation does |
| "Enough" keeps receding | Keynes (1930); Easterlin (1974); Bowles and Park (2005) | Compression lowers status pressure; expect shorter weeks rather than early exit |
| Land rents absorb the gains | Progress raises land rents (George, 1879); rising housing prices in rich US regions have cut less-skilled workers' returns to moving there (Ganong and Shoag, 2017) | Pair the ladder with housing supply reform; part of the overflow could fund housing |
| Labor shortages and lower output | Dutch employers' difficulty finding people | Openings for newcomers, including migrants, or for AI owned within the rule (Section 9); trading some goods for time is the point |
| Workers share only the upside | Profit-linked pay falls in bad years | Reserves held back for bad years, as Scanlon plans do; loss carryforward |
| Political defeat | Meidner funds abolished; Mexico's cap was the price of reform | Individual rather than collective ownership; owners' baseline protected; pilots first |

Two failure modes deserve emphasis. The first is the insider–outsider problem. Every institution in Table 1 that protected its members did so partly at the expense of non-members, and the model reproduces this: under high displacement, the voluntary ladder leaves newcomers waiting while incumbents share in the gains. Admission must be a rule, not a hope. A related risk is that insiders gain when the firm cuts staff or leaves openings unfilled, because the pool is then split among fewer people. Counting the people waiting for work when the pool is divided, and paying them that share, removes the incentive without taxing hours that staff give up when no one is waiting. The model's standby share does this at half a share, which halves the incentive. A full share removes it but costs more employment under high displacement: 9.2% unemployment in year 30 at λ = 0.6, against 8.3% at half a share (Section 7). The second is mobility. A rent-sharing rule is safest where rents are tied to place, such as domestic customers, licenses, data centers and networks. Where profits can move, measuring them by where sales occur rather than where they are booked is the established response.

## 9. Discussion

**What is new.** Each component exists somewhere. As far as we can find, none of these institutions joins a high worker share of added profit to a voluntary handoff of hours so that the system propagates by itself. The two loops reinforce each other: the share builds wealth, wealth makes stepping back safe, and stepping back opens rungs for the next person. If the status-pressure mechanism is real, compression also lowers the sense of what is enough, which speeds the cycle. Most redistribution is a transfer; the ladder is a loop. It also inverts today's usual split. Where profit sharing is mandated or bargained, workers get about a tenth of profits (10% in Mexico, 10.5% at Samsung); on the ladder they would get about nine-tenths of added profit.

**Relation to other proposals.** The ladder sits between a universal dividend and worker ownership. It shares the aim of the AI-dividend proposals but ties payments to work and time, and it treats a dividend as the overflow and backstop rather than the main channel. The model does not show that tying payments to hours beats a dividend with the same working-time rights (Section 7); the case for it rests on incentives and on a start that firms can make on their own, though the complete system needs public institutions as well. Its cost is that people outside paid work gain only through the overflow and the safety net. It resembles the Meidner plan in paying gains partly as ownership. It differs in holding that ownership in individual accounts, protecting owners' existing profits and leaving control where it is, the features whose absence fueled the backlash against the Swedish funds. It extends Weitzman's share economy with a time dimension. Its intellectual roots cross party lines. Profit participation in France was a Gaullist project, and cash-flow business taxation has been proposed from both left and right, including in a 2016 US House Republican tax blueprint (Auerbach et al., 2017).

**Who fills the hours.** The model leaves part of labor demand unfilled, 5.8% at default settings and up to a third when "enough" stays fixed and status pressure is strong, and treats those openings as room for newcomers. In practice much of that work could be done by AI instead, and whether the ladder holds then depends on who owns the AI. Under the split, AI that a covered firm builds to fill freed hours adds profit like any other investment: 90% of it goes to that firm's workers, and where a firm has few workers the per-hour cap sends the excess to everyone as a dividend. The gap is AI owned beyond the rule's reach, abroad or inside a grandfathered baseline that already contains its rents. Its profits then re-concentrate what the split distributes, and the ladder becomes the status quo with a shorter week. One answer is to treat AI capacity as something built from everyone's work and data, and to own it more broadly, in the spirit of proposals to treat data as labor ([Arrieta-Ibarra et al., 2018](https://doi.org/10.1257/pandp.20181003)). How such ownership would be organized, and how output that people and AI produce together should be counted under the split, is left to further work.

**How it could start.** A sequence suggests itself, each step using an institution that already works:

1. Firm-level pilots: gainsharing on AI-driven productivity, measured against a baseline, combined with a pay-or-time choice of the Deutsche Bahn or IG Metall kind, with failure criteria set in advance: released hours turning into heavier workloads for colleagues rather than jobs for newcomers, newcomers getting only unstable jobs, or base wages falling enough to offset the share.
2. State programs that offer favorable tax treatment to firms adopting a cash-flow participation formula with a right to set hours. California's executive order already asks agencies to evaluate worker-ownership models and options for sharing part of AI companies' revenue. Its labor agency must also review safety nets for displaced workers, including severance and equity, with a comparison to other countries' policies, by about 17 November 2026 ([State of California, 2026](https://www.gov.ca.gov/wp-content/uploads/2026/05/5.21.26-AI-Workforce-EO-FINAL-SIGNED.pdf)); the precedents in Table 1 bear directly on that comparison.
3. Sectoral bargaining in AI-intensive industries, following the Samsung precedent but with a cash-flow base, an hours option and a pool that covers the whole firm.
4. A national framework once pilots show results, with the cap's overflow paid into a permanent fund on the Alaska model.

**What it asks of people.** The model's central behavioral assumption is that people take part of their gains as time. The German choice agreements, the Dutch experience and the long-run decline in hours all support it. The model's sharpest warning is that the ladder's character depends on how "enough" moves. A society in which "enough" chases the median gets four-day weeks and full employment. A society in which it stays put gets early graduation, labor shortages and less output. The ladder does not settle that question; it lets people choose.

## 10. Limitations and open questions

The model compares mechanisms; it is not a forecast. It omits prices and general equilibrium, so gains that competition would pass to consumers as lower prices appear here as profit. It is a closed, single-sector economy, so it cannot show between-firm inequality, profit shifting or migration. Labor demand responds to AI through a single parameter, λ, rather than through the automation of particular tasks and the creation of new ones. There is no government budget, taxation or financing of the safety net. Behavior follows simple rules whose parameters are uncertain. Base wages do not respond to the labor shortages the ladder creates, which probably overstates its output loss. No one works more than five days, so status pressure can shorten hours on the ladder but cannot lengthen them under the status quo, as Bowles and Park (2005) find rising inequality does; the model therefore understates one cost of the status quo. Household wealth earns fixed returns from outside the model economy, so the model is not stock-flow consistent: capital accounts neither finance AI investment nor dilute owners' claims. There is no housing market, so the model cannot show land rents absorbing income gains. There are no asset prices either, so it cannot show owners' share values falling as markets price in the shared growth.

Open questions include:

- When workers gain financial security and the right to cut hours, how much of the work they release becomes stable jobs for newcomers? This is the link the proposal most needs to show, and a pilot can measure it directly.
- What does tying the gains to work achieve that a dividend with the same working-time rights would not?
- Who owns the AI that fills the hours the ladder leaves unfilled, and how should output that people and AI produce together be counted under the split?
- Should capital accounts hold claims on the covered firms, tying workers' wealth to their employers' risks, or a diversified portfolio, and what wider economy supplies its returns?
- Who refunds workers' share of unused losses when a covered firm fails, and who finances that guarantee?
- How should added profit be measured in firms whose AI gains come from cutting staff rather than raising output?
- What cap and overflow design avoids an employee elite at the most profitable firms?
- How strongly do desired hours respond to pay per hour (η) when the extra pay comes as a profit share rather than a wage?
- Would incumbents accept an admission rule, and at what floor?
- How should cross-border profit shifting be handled for software-based rents?
- Would workers accept a share that can fall in bad years?

Each could be tested in pilots before any general rule is adopted.

## 11. Conclusion

Keynes's grandchildren got the productivity but not the time. AI offers a second chance at the same choice. The Sufficiency Ladder takes it with mechanisms that already exist: a share of added profit for the people doing the work, paid partly as ownership; a right to work less; and a rule that freed hours go to the next person in line. The analysis yields one clear design rule: split the profit after costs. Splitting gross gains instead raises the investment hurdle tenfold, and most AI investment never happens. Under that rule, a simple model reproduces the outcome the idea aims for. Everyone's income grows, the lower-paid half's fastest even counting only what they can spend, and owners' slowest; the classes keep their order, and part of the gains arrives as time. The model credits that outcome to the right to work less and the capital accounts more than to paying the gains per hour, which leaves open what tying them to work adds. The idea is offered to be argued with and improved.

## Appendix A. Model equations

Productivity, labor demand and the base wage, with cumulative AI productivity M\_t = (1 + g\_AI)^t:

```latex
A_t = A_0 (1+g)^t M_t, \qquad H_t = H_0 M_t^{-\lambda}, \qquad w_t = w_0 \left( A_t / A_0 \right)^{\kappa}
```

AI growth by regime, with user cost u = r + δ and project returns ρ drawn from a lognormal distribution with parameters μ and σ:

```latex
g_{AI} = g_{\max} \frac{V(\theta)}{V(u)}, \qquad V(\theta) = \Phi\!\left( \frac{\mu + \sigma^2 - \ln \theta}{\sigma} \right), \qquad \theta = \begin{cases} u & \text{cash-flow split or status quo} \\ u / c & \text{gross split} \end{cases}
```

AI investment scales with the share of projects built, P, while AI growth scales with the share of their value, V; both follow from truncating the lognormal distribution of returns at θ. Here s\_C is AI investment's share of output when every project worth building is built:

```latex
C_t = s_C \, \frac{P(\theta)}{P(u)} \, Y_t, \qquad P(\theta) = \Phi\!\left( \frac{\mu - \ln \theta}{\sigma} \right)
```

"Enough", with med the median income of the 2,000 people and R the ratio of their top-10% mean income to that median; owners are excluded by default, and Section 7 reports the effect of including them:

```latex
S_t = S_0 \left( \frac{\mathrm{med}_{t-1}}{\mathrm{med}_0} \right)^{\nu} \left( \frac{R_{t-1}}{R_0} \right)^{\psi}
```

Desired hours for person i with progress p\_i = W\_i / S\_t, in tier k = ⌊4p\_i⌋ + 1 while p\_i < 1, where σ\_{t−1} is last year's share per full-time equivalent and π\_i = 1 for the half of people who keep working by choice once they reach "enough":

```latex
h_i^{*} = \begin{cases} \min\!\left(1, \max\!\left(0.6,\; \tau_k \, \Pi_t^{-\eta} \right)\right) & p_i < 1 \\ 0.6 \, \pi_i & p_i \ge 1 \end{cases}, \qquad \Pi_t = \frac{w_t + \sigma_{t-1}}{w_0}, \qquad \tau = (1, 1, 0.9, 0.8)
```

Cash-flow profit and the pool, with F\_t the per-head costs, C\_t AI investment and K\_t ≤ 0 the loss carried forward at the cost of capital r:

```latex
CF_t = Y_t - w_t E_t - F_t - C_t, \qquad \text{Pool}_t = (1-c)\max\!\left(0,\; CF_t - CF_0 + K_t\right), \qquad K_{t+1} = (1+r)\min\!\left(0,\; CF_t - CF_0 + K_t\right)
```

The share per full-time equivalent and the overflow dividend, with U\_t the number of people waiting, N the population and k the cap in base wages:

```latex
\sigma_t = \min\!\left( \frac{\text{Pool}_t}{\sum_i h_i + 0.5\,U_t},\; k\,w_t \right), \qquad \text{dividend}_t = \frac{\text{Pool}_t - \sigma_t \left( \sum_i h_i + 0.5\,U_t \right)}{N}
```

Here E\_t is employment in efficiency units. Under the gross split the pool is (1 − c) × max(0, (Y\_t − w\_t E\_t − F\_t) − (Y\_0 − w\_0 E\_0 − F\_0)), and the company pays all AI investment. In every regime owners receive CF\_t − Pool\_t.

Table 3's capital-accounts row compares the sum of workers' capital accounts a\_i with the value of owners' stake, their income in year T capitalized at the accounts' 5% return r\_a:

```latex
\text{Capital accounts' share}_T = \frac{\sum_i a_{i,T}}{\sum_i a_{i,T} + \max\left(0,\; CF_T - \text{Pool}_T\right) / r_a}
```

Spendable income leaves out the locked part of total income, the capital-account contribution and the return accrued on the account:

```latex
y_{i,t} = \underbrace{w_t m_i h_{i,t} + (1-\beta)\, s_{i,t} + d_t + r_s\,\text{savings}_{i,t} + \text{benefit}_{i,t}}_{\text{spendable}} + \underbrace{\beta\, s_{i,t} + r_a a_{i,t}}_{\text{locked}}
```

Here s\_{i,t} is person i's share of the pool, β = 50% the part paid into the capital account a\_{i,t}, d\_t the dividend per person, and r\_s = 3% and r\_a = 5% the returns on savings and accounts. Once a person graduates, the account vests: it covers living costs after cash savings run out, and all of its income counts as spendable. Version 1.3 adds four switches, all off by default: the flat dividend can be given the ladder's right to set hours, work-sharing and admission rule; the dividend can count toward Π\_t in the hours rule; a share β of it can be paid into capital accounts, which moves that part to the locked side; and AI can add growth for only its first n years, with M\_t = (1 + g\_AI)^min(t, n).

## Appendix B. Parameters

| Parameter | Symbol | Value |
| --- | --- | --- |
| People; owners | N; – | 2,000; 20 |
| Years simulated; career length | T; – | 30; 40 |
| Output per efficiency full-time equivalent at year 0 | A₀ | $100,000 |
| Base wage at year 0 | w₀ | $60,000 |
| Skill dispersion (lognormal) | – | 0.45 |
| Non-AI productivity growth | g | 1.2% |
| AI growth when every worthwhile project is built | g\_max | 1.5% a year, for all 30 years |
| Cost of capital; decay of AI gains | r; δ | 7%; 15% |
| AI project returns (lognormal) | μ; σ | ln 0.25; 0.9 |
| AI investment at full investment | – | 2% of output |
| Labor-saving share of AI gains | λ | 0.3 |
| Wage pass-through | κ | 0.3 |
| Company share | c | 10% |
| Share paid into capital accounts | β | 50% |
| Cap on share per full-time equivalent | k | One base wage |
| Standby share for people waiting | – | Half a full-time equivalent |
| Desired hours by tier | τ | 1, 1, 0.9, 0.8 |
| Elasticity of desired hours to pay per hour | η | 0.2 |
| Minimum chosen hours; work-sharing floor | – | 0.6; 0.6 |
| Graduates who keep working; their hours | – | 50%; 0.6 |
| Fixed cost per employed person | – | 5% of a base wage |
| Income of the involuntarily unemployed | – | 30% of a base wage |
| Savings rate on income above $30,000 | – | 25% |
| Returns on savings; on capital accounts | – | 3%; 5% |
| Living cost; "enough" | – | $45,000; 25 × living cost |
| Drift of "enough" with median income | ν | 0.5 |
| Status pressure | ψ | 0 |
| Initial unemployment | – | 5% |
| Random seed | – | 7 (robustness: 1 to 20) |

## Appendix C. Reproducibility and authorship

The model is a single JavaScript file of about 500 lines (version 1.4), deterministic for a given seed. The same file runs the public simulator and generates every number and figure in this paper, so the results can be reproduced exactly. The code comes as four files, published with the simulator in the repository [github.com/AJ-FYC/sufficiency-ladder](https://github.com/AJ-FYC/sufficiency-ladder): model.js (the model), run.js (every scenario), figs.py (the figures) and paper\_numbers.js, which reruns every scenario and checks the model numbers reported here against the run (246 checks). A default run of all four regimes takes about a quarter of a second. Version 1.2 added two switches used in Section 7, status pressure measured over everyone and a baseline that scales with hours worked, and recorded the terms of Proposition 3. Version 1.3 adds the dividend variants of Table 6, a limit on how long AI adds growth, and spendable income; its switches, like version 1.2's, are off by default, so each of those versions reproduces the one before exactly. Version 1.4 lets graduates draw on their vested capital accounts, as Section 5 describes; every result it saves, and so every number and figure in this paper, is identical to version 1.3's. The interactive [Sufficiency Ladder Simulator](https://aj-fyc.github.io/sufficiency-ladder/) exposes the company share, the pace of AI, displacement, how strongly hours respond to pay, how "enough" moves, status pressure and the admission rule.

The Sufficiency Ladder is the author's idea. The literature review, the investment analysis, the model and its code, the simulations and the drafting of this paper were carried out with Claude, an AI model made by Anthropic, under the author's direction. Facts and citations were checked against the sources linked here. The paper has also been reviewed independently several times, most recently in October 2026, and the version notes that come with the code record each review and what it changed. Books and paywalled articles cited for their well-known arguments were checked against abstracts, previews and later descriptions rather than read in full. Where a specific fact or figure was read in a secondary source because the original sits behind a paywall or blocks automated access, the reference list names both the source read and the original. Corrections and improvements are welcome in later versions.

## References

- Acemoglu, D. (2025). [The Simple Macroeconomics of AI](https://doi.org/10.1093/epolic/eiae042). *Economic Policy* 40(121): 13–58. Earlier version: NBER Working Paper 32487, 2024.
- Acemoglu, D. and Restrepo, P. (2019). Automation and New Tasks: How Technology Displaces and Reinstates Labor. *Journal of Economic Perspectives* 33(2): 3–30.
- Altman, S. (2025). [Evolving OpenAI's structure](https://openai.com/index/evolving-our-structure/). OpenAI, 5 May 2025.
- Arrieta-Ibarra, I., Goff, L., Jiménez-Hernández, D., Lanier, J. and Weyl, E. G. (2018). [Should We Treat Data as Labor? Moving beyond "Free"](https://doi.org/10.1257/pandp.20181003). *AEA Papers and Proceedings* 108: 38–42.
- Auerbach, A., Devereux, M., Keen, M. and Vella, J. (2017). Destination-Based Cash Flow Taxation. Oxford University Centre for Business Taxation Working Paper 17/01.
- Autor, D., Dorn, D., Katz, L., Patterson, C. and Van Reenen, J. (2020). The Fall of the Labor Share and the Rise of Superstar Firms. *Quarterly Journal of Economics* 135(2): 645–709.
- Averch, H. and Johnson, L. (1962). Behavior of the Firm Under Regulatory Constraint. *American Economic Review* 52(5): 1052–1069.
- Axios (2026). [Alex Bores rolls out "AI dividend" plan to share AI wealth](https://axios.com/2026/04/20/alex-bores-ai-dividend-plan-wealth). 20 April 2026.
- Barkai, S. (2020). [Declining Labor and Capital Shares](https://doi.org/10.1111/jofi.12909). *Journal of Finance* 75(5): 2421–2463.
- Basham, Ringe y Correa (2024). [Profit sharing: maximum payment limit validation](https://basham.com.mx/en/?p=24809).
- Bengen, W. P. (1994). Determining Withdrawal Rates Using Historical Data. *Journal of Financial Planning* 7(4): 171–180.
- Bivens, J. (2014). [The generation-long trend towards ever-greater income inequality continues](https://www.epi.org/blog/generation-long-trend-greater-income-inequality/). Economic Policy Institute, 16 September 2014.
- Blasi, J., Freeman, R. and Kruse, D. (2013). *The Citizen's Share: Putting Ownership Back into Democracy*. Yale University Press.
- Boadway, R. and Bruce, N. (1984). A General Proposition on the Design of a Neutral Business Tax. *Journal of Public Economics* 24(2): 231–239.
- Bond, S. R. and Devereux, M. P. (1995). [On the Design of a Neutral Business Tax under Uncertainty](https://ideas.repec.org/a/eee/pubeco/v58y1995i1p57-71.html). *Journal of Public Economics* 58(1): 57–71.
- Boppart, T. and Krusell, P. (2020). [Labor Supply in the Past, Present, and Future: A Balanced-Growth Perspective](https://doi.org/10.1086/704071). *Journal of Political Economy* 128(1): 118–157.
- Bowles, S. and Park, Y. (2005). [Emulation, Inequality, and Work Hours: Was Thorsten Veblen Right?](https://doi.org/10.1111/j.1468-0297.2005.01042.x) *Economic Journal* 115(507): F397–F412.
- Briggs, J. and Kodnani, D. (2023). The Potentially Large Effects of Artificial Intelligence on Economic Growth. Goldman Sachs Global Economics Analyst, March 2023. Summary: [Generative AI could raise global GDP by 7%](https://www.goldmansachs.com/insights/articles/generative-ai-could-raise-global-gdp-by-7-percent), Goldman Sachs Insights, 5 April 2023. The full report is a client publication and was not consulted; its US estimate is quoted as reproduced in secondary coverage of the report, and the public summary gives 1.5 points over ten years.
- Brown, E. C. (1948). Business-Income Taxation and Investment Incentives. In *Income, Employment and Public Policy: Essays in Honor of Alvin H. Hansen*. Norton.
- Brynjolfsson, E., Li, D. and Raymond, L. (2025). [Generative AI at Work](https://doi.org/10.1093/qje/qjae044). *Quarterly Journal of Economics* 140(2): 889–942. Earlier version: NBER Working Paper 31161, 2023.
- Card, D., Cardoso, A. R., Heining, J. and Kline, P. (2018). [Firms and Labor Market Inequality: Evidence and Some Theory](https://www.nber.org/papers/w22850.pdf). *Journal of Labor Economics* 36(S1): S13–S70.
- CBS, Statistics Netherlands (2007). [Wassenaar Agreement marks turning point for labour market](https://web.archive.org/web/20250521103834/https://www.cbs.nl/en-gb/news/2007/47/wassenaar-agreement-marks-turning-point-for-labour-market). By H. Langenberg and J. van der Zwan, 22 November 2007; archived copy.
- Code du travail (France), arts. L3322-2 and L3324-1.
- Conseil constitutionnel (2024). [Commentaire, Décision n° 2023-1077 QPC du 24 janvier 2024 (Participation des salariés aux résultats de l'entreprise)](https://www.conseil-constitutionnel.fr/sites/default/files/as/root/bank_mm/decisions/20231077qpc/20231077qpc_ccc.pdf). Citing ordonnance 67-693 of 17 August 1967.
- De Loecker, J., Eeckhout, J. and Unger, G. (2020). The Rise of Market Power and the Macroeconomic Implications. *Quarterly Journal of Economics* 135(2): 561–644.
- Domar, E. and Musgrave, R. (1944). Proportional Income Taxation and Risk-Taking. *Quarterly Journal of Economics* 58(3): 388–422.
- Easterlin, R. A. (1974). Does Economic Growth Improve the Human Lot? Some Empirical Evidence. In David, P. A. and Reder, M. W. (eds.), *Nations and Households in Economic Growth: Essays in Honor of Moses Abramovitz*, 89–125. Academic Press.
- Ehrenberg, R. G. (1971). *Fringe Benefits and Overtime Behavior: Theoretical and Econometric Analysis*. Lexington Books.
- ELA, Employment Law Alliance (2024). [Employee Profit Sharing (PTU) in Mexico](https://www.ela.law/firms/blp-costa-rica/Articles/employee-profit-sharing-ptu-in-mexico). BLP, 13 May 2024.
- Eurofound (1997). [Latest pay claims: a threat to the Dutch concertation economy?](https://www.eurofound.europa.eu/en/publications/all/latest-pay-claims-threat-dutch-concertation-economy) By M. van Velzen, 28 October 1997.
- Eurofound (2000). [Part-time Employment Act seeks to promote combining work and care](https://www.eurofound.europa.eu/en/resources/article/2000/part-time-employment-act-seeks-promote-combining-work-and-care).
- Eurofound (2022). [Job rotation, Denmark (measure DK-2010-52/2481)](https://static.eurofound.europa.eu/covid19db/cases/DK-2010-52_2481.html).
- Foley & Lardner (2021). [Ban to General Outsourcing/Insourcing Is Approved by Mexican Congress](https://www.foley.com/insights/publications/2021/04/ban-outsourcing-insourcing-mexican-congress/). 23 April 2021.
- Freeman, R. (2015). Who Owns the Robots Rules the World. *IZA World of Labor* 5.
- Ganong, P. and Shoag, D. (2017). [Why Has Regional Income Convergence in the U.S. Declined?](https://www.nber.org/papers/w23609) *Journal of Urban Economics* 102: 76–90.
- Garnaut, R. and Clunies Ross, A. (1975). Uncertainty, Risk Aversion and the Taxing of Natural Resource Projects. *Economic Journal* 85(338): 272–287.
- George, H. (1879). *Progress and Poverty*. San Francisco: W. M. Hinton & Co. (author's edition); New York: D. Appleton, 1880.
- Hirsch, F. (1976). *Social Limits to Growth*. Harvard University Press.
- Humlum, A. and Vestergaard, E. (2025). [Large Language Models, Small Labor Market Effects](https://bfi.uchicago.edu/wp-content/uploads/2025/04/BFI_WP_2025-56-3.pdf). NBER Working Paper 33777 and BFI Working Paper 2025-56, May 2025 version; later revised as "Still Waters, Rapid Currents: Early Labor Market Transformation under Generative AI".
- IFS Capital Taxes Group (1991). *Equity for Companies: A Corporation Tax for the 1990s*. Institute for Fiscal Studies.
- IG Metall (2019). [260,000 employees would rather have eight days](https://www.igmetall.de/en/tarif/tarifrunden/metall-und-elektro/260-000-beschaeftigte-wollen-lieber-acht-tage). 21 January 2019.
- Imberman, W. (1995). Is Gainsharing the Wave of the Future? *Management Accounting*, November: 35–39. Not consulted, as it sits in a subscription archive; its 75/25 split is read in a [summary on Management and Accounting Web](https://maaw.info/ArticleSummaries/ArtSumImberman95.htm).
- Ius Laboris (2021). [Mexico has reformed its outsourcing and subcontracting rules: what will change for employers?](https://iuslaboris.com/?p=37467) Basham, Ringe y Correa, 19 May 2021.
- JILPT, Japan Institute for Labour Policy and Training (2026). [Databook of International Labour Statistics 2026, Table 6-1: Average annual hours actually worked per person in employment](https://www.jil.go.jp/kokunai/statistics/databook/2026/06/d2026_6T-01.pdf). Compiled from OECD data, as of August 2025.
- Jones, D. and Marinescu, I. (2022). [The Labor Market Impacts of Universal and Permanent Cash Transfers: Evidence from the Alaska Permanent Fund](https://www.aeaweb.org/doi/10.1257/pol.20190299). *American Economic Journal: Economic Policy* 14(2): 315–340.
- Kasmir, S. (2016). [The Mondragon Cooperatives: Successes and Challenges](https://globaldialogue.isa-sociology.org/articles/the-mondragon-cooperatives-successes-and-challenges). *Global Dialogue* 6(1).
- Kelly, G. and Massena, S. (2009). [Mondragón Worker-Cooperatives Decide How to Ride Out a Downturn](https://www.yesmagazine.org/issue/new-economy/2009/06/06/mondragon-worker-cooperatives-decide-how-to-ride-out-a-downturn). *YES! Magazine*, 6 June 2009.
- Kelso, L. and Adler, M. (1958). *The Capitalist Manifesto*. Random House.
- Keynes, J. M. (1930). Economic Possibilities for Our Grandchildren. Reprinted in *Essays in Persuasion* (1931). Macmillan.
- KFF (2025). [2025 Employer Health Benefits Survey: Summary of Findings](https://files.kff.org/attachment/Employer-Health-Benefits-Survey-2025-Annual-Survey-Summary-of-Findings.pdf).
- Korinek, A. and Stiglitz, J. (2019). Artificial Intelligence and Its Implications for Income Distribution and Unemployment. In Agrawal, A., Gans, J. and Goldfarb, A. (eds.), *The Economics of Artificial Intelligence: An Agenda*. University of Chicago Press.
- Krassén, P. (2023). [Dagen då företagarna röt ifrån](https://www.foretagarna.se/nyheter/riks/2023/oktober/dagen-da-foretagarna-rot-ifran). Företagarna, 4 October 2023.
- Kruse, D., Freeman, R. and Blasi, J. (eds.) (2010). *Shared Capitalism at Work*. University of Chicago Press.
- Lesieur, F. G. (ed.) (1958). *The Scanlon Plan: A Frontier in Labor-Management Cooperation*. Technology Press of MIT and Wiley.
- Levy, F. and Temin, P. (2007). [Inequality and Institutions in 20th Century America](https://www.nber.org/papers/w13106). NBER Working Paper 13106.
- Ley Federal del Trabajo (Mexico), art. 120.
- Loi n° 2023-1107 du 29 novembre 2023 portant transposition de l'accord national interprofessionnel relatif au partage de la valeur au sein de l'entreprise (France).
- Meade, J. (1989). *Agathotopia: The Economics of Partnership*. Aberdeen University Press.
- Meidner, R. (1978). *Employee Investment Funds: An Approach to Collective Capital Formation*. Allen and Unwin.
- Mind (2018). [Both the EVG union and Deutsche Bahn draw positive conclusions from the 2016 collective agreement](https://www.mind.eu.com/rh/en/article/germany-both-the-evg-union-and-deutsche-bahn-db-draw-positive-conclusions-from-the-2016-collective-agreement-that-allows-employees-to-choose-between-more-money-and-more-free-time). 10 October 2018.
- Mirrlees, J. et al. (2011). *Tax by Design*. Oxford University Press. Chapter 17 on the allowance for corporate equity.
- Mishel, L. (2021). [Growing inequalities, reflecting growing employer power, have generated a productivity–pay gap since 1979](https://www.epi.org/blog/growing-inequalities-reflecting-growing-employer-power-have-generated-a-productivity-pay-gap-since-1979-productivity-has-grown-3-5-times-as-much-as-pay-for-the-typical-worker/). Economic Policy Institute, 2 September 2021.
- Nielsen, J. M. and Nielsen, L. P. (2021). [Jobrotationsvikarers beskæftigelse: En kvantitativ analyse af hvorvidt jobrotationsvikariater fører til øget beskæftigelse](https://star.dk/media/18162/effektanalyse-af-jobrotationsordningen.pdf). Styrelsen for Arbejdsmarked og Rekruttering (STAR), April 2021.
- Norsk Petroleum. [The petroleum tax system](https://www.norskpetroleum.no/en/economy/petroleum-tax/).
- Noy, S. and Zhang, W. (2023). Experimental Evidence on the Productivity Effects of Generative Artificial Intelligence. *Science* 381(6654): 187–192.
- OECD (2026). [Hours worked](https://www.oecd.org/en/data/indicators/hours-worked.html) and [GDP per hour worked](https://www.oecd.org/en/data/indicators/gdp-per-hour-worked.html) (indicators). Average annual hours actually worked per worker, 2024; GDP per hour worked at current purchasing-power parities, 2023. The OECD's data portal blocks automated access, so it was not consulted directly. The values were read where they are reproduced: hours in JILPT (2026), Table 6-1, and GDP per hour in [Wikipedia's compilation of the OECD series](https://en.wikipedia.org/wiki/List_of_countries_by_labour_productivity) (accessed 26 October 2026). The OECD's note that the hours series is meant for comparing trends over time and is unsuitable for comparing levels between countries is read in a [reproduction of the series' explanatory notes](https://www.allthatstats.com/de/statistics/oecd_anhrs/average-annual-hours-actually-worked-per-worker/explanatory).
- Oi, W. (1962). Labor as a Quasi-Fixed Factor. *Journal of Political Economy* 70(6).
- OpenAI (2019). [OpenAI LP](https://openai.com/index/openai-lp/). 11 March 2019.
- Piore, M. (1979). *Birds of Passage: Migrant Labor and Industrial Societies*. Cambridge University Press.
- Pontusson, J. and Kuruvilla, S. (1992). [Swedish Wage-Earner Funds: An Experiment in Economic Democracy](https://ideas.repec.org/a/sae/ilrrev/v45y1992i4p779-791.html). *Industrial and Labor Relations Review* 45(4): 779–791.
- Prop. 1983/84:50. [Regeringens proposition om löntagarfonder](https://lagen.nu/prop/1983/84:50) \[Government bill on wage-earner funds\]. Swedish Government, 4 November 1983.
- Reuters (2026). [Samsung workers approve pay deal but management still has trying times ahead](https://kelo.com/2026/05/26/samsung-workers-approve-pay-deal-shares-surge/). By Hyunjoo Jin, with Heejin Kim, 27 May 2026. Read in the copy syndicated by KELO; the original on reuters.com, a subscription site, was not consulted.
- Schor, J. (1991). *The Overworked American*. Basic Books.
- Sheposh, R. (2020). [Scanlon plan](https://www.ebsco.com/research-starters/business-and-management/scanlon-plan). EBSCO Research Starters. An encyclopedia entry, read for the plan's typical 75/25 split and its continued use.
- State of California (2026). [Executive Order N-6-26](https://www.gov.ca.gov/wp-content/uploads/2026/05/5.21.26-AI-Workforce-EO-FINAL-SIGNED.pdf). 21 May 2026.
- Tom's Hardware (2026). [Samsung chip workers vote to accept $340,000 average bonus, ending months-long strike threat](https://www.tomshardware.com/tech-industry/samsung-chip-workers-vote-to-accept-340000-average-bonus-ending-months-long-strike-threat). By Luke James, 27 May 2026. Its figures come from a Bloomberg report, behind a paywall, which was not consulted.
- University of Pittsburgh Library System. [Guide to the Joseph N. Scanlon Papers, 1940–1964](https://digital.library.pitt.edu/islandora/object/pitt:US-PPiU-ais200513), AIS.2005.13.
- Veblen, T. (1899). *The Theory of the Leisure Class*. Macmillan.
- Ward, B. (1958). The Firm in Illyria: Market Syndicalism. *American Economic Review* 48(4): 566–589.
- Weitzman, M. (1984). *The Share Economy: Conquering Stagflation*. Harvard University Press.
