---
title: "Malfunction Procedure MAL-ECLSS-07: Coolant Loop Pressure Drop"
slug: mal-eclss-07-coolant-loop-pressure-drop
doc_type: Malfunction Procedure
subsystem: ECLSS
components: ["Coolant Loop B", "Pump P-204", "Accumulator ACC-2", "Isolation Valve MV-207", "Interloop Heat Exchanger IHX-1", "Cabin Heat Exchanger CHX-1", "Cold Plate CP-12", "Radiator Panel 3", "Coolant Loop A"]
crew: ["Flt.Eng. Marco Reyes", "Cmdr. Yuki Tan"]
flight_controllers: ["EECOM", "FLIGHT", "CAPCOM"]
anomaly_refs: ["ANOM-HAL-011", "ANOM-KEP-014", "ANOM-KEP-022"]
procedure_id: MAL-ECLSS-07
mission_phase: Anomaly Response
classification: Emergency
media_type: text
duration_minutes: null
published: 2041-10-05
source_url: https://helios.aurelian.mission/procedures/mal-eclss-07
summary: "Emergency procedure for a falling pressure in either coolant loop, covering leak-versus-gas-ingress diagnosis, accumulator recharge, and the go/no-go criteria for isolating the loop and transferring heat to the surviving loop."
---

# Malfunction Procedure MAL-ECLSS-07: Coolant Loop Pressure Drop

**Applicability:** Either coolant loop. Text below is written for **Loop B**; substitute Loop A components (P-203, ACC-1, Panels 1/2) if Loop A is affected.
**Entry condition:** Coolant loop pressure Low caution (285 kPa) or Low warning (270 kPa), or a downtrend of more than 2 kPa/hr.
**Classification:** Emergency at Low warning; Off-Nominal at Low caution.

## 1. Safe the immediate situation

1.1 Acknowledge the caution/warning. Note the annunciated loop and the time.
1.2 Record loop pressure, accumulator ACC-2 fluid quantity, pump P-204 speed and differential pressure, coolant supply/return temperatures, and cabin temperature. These five readings, taken now and every 15 minutes, define the trend.
1.3 Confirm the opposite loop (Loop A) is healthy and in its normal operating range (pressure 290–330 kPa, flow 0.75–0.95 kg/s). **Do not touch Loop A** — it is the fallback.

## 2. Diagnose: leak versus gas ingress

The response depends entirely on the cause. Determine it before acting.

**Signature of a LEAK:**
- Pressure decays smoothly and monotonically.
- Accumulator ACC-2 fluid quantity **falls** in step with pressure (you are losing coolant mass).
- Pump differential pressure steady.

**Signature of GAS INGRESS** (GN2 permeation from the accumulator bladder, as in ANOM-KEP-014):
- Pressure **oscillates** or decays with noise.
- Accumulator quantity roughly steady (no mass loss).
- Pump differential-pressure noise, possible cavitation signature.

2.1 Compare ACC-2 quantity trend to pressure trend over three 15-minute readings.
2.2 Classify as **LEAK** or **GAS INGRESS**. If ambiguous, treat as LEAK (the conservative case).

## 3. Gas ingress path

3.1 Perform accumulator recharge per NOM-ECLSS-12: verify GN2 precharge to 340 kPa and bleed entrained gas at the high-point vent.
3.2 Re-observe for 30 minutes. If pressure recovers toward 310 kPa and stabilizes, the loop is recovered — remain on procedure and monitor for 3 hours. Log and downlink.
3.3 If oscillation persists after recharge, treat as an unrecoverable accumulator fault and proceed to Section 5 (isolation).

## 4. Leak path

4.1 Attempt one accumulator make-up per NOM-ECLSS-12 to buy time and confirm the leak rate. A true leak will resume decaying after make-up.
4.2 Localize if time permits: command an external camera survey of Radiator Panel 3 and Panel 4 (MMOD puncture, as in ANOM-KEP-022) and check cold-plate bay CP-12 for coolant presence. Localization does not change the immediate response but informs ground.
4.3 Continue to Section 5 for the isolation decision.

## 5. Go / No-Go criteria for isolation

Isolate Loop B — **NO-GO for continued Loop B operation** — if **ANY** of the following is true:

- **GO/NO-GO 1:** Loop pressure below **250 kPa**.
- **GO/NO-GO 2:** Decay rate exceeds **5 kPa/hr** sustained over three consecutive 15-minute readings.
- **GO/NO-GO 3:** Accumulator ACC-2 fluid quantity below **0.8 L** (approaching depletion).
- **GO/NO-GO 4:** Pump P-204 cavitation confirmed (differential pressure below 40 kPa with noise).

If **NONE** are true and pressure is stable at or above 270 kPa after recharge/make-up, **GO** to remain on Loop B under monitoring; re-evaluate every 30 minutes.

## 6. Isolation and heat transfer

If NO-GO, isolate Loop B:

6.1 Close isolation valve **MV-207**, separating Loop B from Radiator Panels 3 and 4.
6.2 Command pump **P-204 OFF**.
6.3 Confirm the cabin heat exchanger CHX-1 is rejecting through the **Interloop Heat Exchanger IHX-1** to Loop A. Loop A now carries approximately 70 % of nominal load.
6.4 Execute load shed per NOM-EPS-02 (shed payload/science, then galley) to remove up to 1.4 kW of heat generation.
6.5 Transition to **MAL-ECLSS-03 (Cabin Thermal Excursion)** to manage the resulting cabin temperature rise. Expected rise with load shed is **0.6 °C/hr**; the 27 °C caution is reached in approximately **7.5 hours** from the 22.5 °C setpoint.

## 7. Notify and plan

7.1 Downlink the full trend log to EECOM. Round-trip light time is ~27 minutes; do **not** wait for ground before executing Sections 5–6.
7.2 Ground assesses whether the projected single-loop timeline is compatible with the Mars approach plan and consumables margins (FR-CONS-3.2). Loop B recovery, if a leak can be located and isolated to a single panel, may permit a return to two-loop operation.

## Reference anomalies

- **ANOM-HAL-011** — Loop B accumulator bladder permeation, slow pressure decay; primary analogue.
- **ANOM-KEP-014** — Loop A pump cavitation from gas ingress; the gas-ingress path.
- **ANOM-KEP-022** — Radiator Panel 3 MMOD puncture, coolant leak; the leak-localization path.
