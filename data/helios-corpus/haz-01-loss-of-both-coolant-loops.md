---
title: "Hazard Analysis HAZ-ECLSS-01: Loss of Both Coolant Loops and Cabin Thermal Runaway"
slug: haz-01-loss-of-both-coolant-loops
doc_type: Hazard Analysis
subsystem: ECLSS
components: ["Coolant Loop A", "Coolant Loop B", "Pump P-203", "Pump P-204", "Accumulator ACC-1", "Accumulator ACC-2", "Interloop Heat Exchanger IHX-1", "Cold Plate CP-12", "Bus A", "Bus B"]
crew: ["Cmdr. Yuki Tan", "Flt.Eng. Marco Reyes"]
flight_controllers: ["EECOM", "EPS", "FLIGHT"]
anomaly_refs: ["ANOM-HAL-011", "ANOM-KEP-022", "ANOM-KEP-014", "ANOM-HAL-003"]
procedure_id: null
mission_phase: Contingency
classification: Emergency
media_type: text
duration_minutes: null
published: 2041-08-20
source_url: https://helios.aurelian.mission/hazard-analyses/haz-eclss-01
summary: "Hazard analysis of the loss of both coolant loops leading to cabin thermal runaway, tracing the credible common-cause paths (power, gas ingress, MMOD) and the controls — loop and bus independence, isolation criteria, and the abort criterion of last resort."
---

# Hazard Analysis HAZ-ECLSS-01: Loss of Both Coolant Loops and Cabin Thermal Runaway

**Hazard:** Simultaneous or cascading loss of both coolant loops, removing active heat rejection and driving cabin and avionics temperatures past survivable limits.
**Severity:** Catastrophic (loss of crew if unmitigated).
**Category:** Thermal / life-critical.

## Hazard description

The Aurelian rejects a nominal 5.5 kW heat load through two coolant loops to four radiator panels. Loss of a single loop is survivable indefinitely on the survivor (see the Thermal Control specification and FR-THRM-5.4). Loss of **both** loops removes active heat rejection entirely; with cabin thermal mass alone, temperature rises past the 30 °C avionics limit and toward the 35 °C survivability bound, endangering the flight computers and then the crew. This is the only ECLSS single-hazard that reaches an abort criterion (FR-ABORT-1.0 Rule 1.0.1).

## Credible causes

1. **Independent double failure.** Two unrelated loop failures in sequence — e.g., a Loop B accumulator bladder failure (ANOM-HAL-011) followed later by a Loop A leak (ANOM-KEP-022-type MMOD). Low probability but the design basis.
2. **Common-cause via power.** Because Pump P-203 is on Bus A and P-204 on Bus B, a power event that takes both buses would stop both pumps. Mitigated by bus independence and cross-tie (ANOM-HAL-003).
3. **Common-cause via gas/coolant chemistry.** A systemic coolant contamination or a servicing error affecting both loops (gas ingress, ANOM-KEP-014, if mishandled on both).
4. **Common-cause via MMOD.** A debris event large enough to breach both loops' external plumbing simultaneously.

## Consequences

- Cabin temperature rise of ~0.9 °C/hr or worse with no load shed relief available; ~12–20 hr to the survivability bound from setpoint.
- Loss of active avionics cooling at CP-12; forced power-down of flight computers.
- If unrecovered, forced abort (FR-ABORT-1.0) or loss of crew.

## Controls

1. **Loop independence** — physically separated loops on independent buses so no single failure disables both (ECLSS Coolant Loops spec).
2. **Isolation criteria and procedures** — MAL-ECLSS-07 isolates a failing loop *before* it can contaminate or endanger the other, and FR-ECLSS-4.1 Rule 4.1.1 prohibits taking the healthy loop off line while the other is degraded.
3. **Power cross-tie** — a bus fault threatening a pump is recovered by cross-tie with load shed (MAL-EPS-04, FR-PWR-6.1), breaking the power common-cause path.
4. **Servicing discipline** — NOM-ECLSS-12 requires gas bleed verification and prohibits masking a failed bladder, preventing a servicing-induced common-cause.
5. **MMOD design** — separated external plumbing and panel-level isolation (ANOM-KEP-022) reduce the chance a single strike breaches both loops.
6. **Abort of last resort** — if both loops are genuinely unrecoverable, FR-ABORT-1.0 commands a return trajectory while the thermal timeline still permits.

## Residual risk

With one loop isolated (the T+248 case), the vehicle is one failure from this hazard, which is why FR-ECLSS-4.1 Rule 4.1.1 becomes absolutely binding in that state: the surviving loop is protected above all else. Residual risk after controls is assessed **low but not negligible**, dominated by the independent-double-failure and MMOD paths. The single most important operational control is the prohibition on jeopardizing the healthy loop.
