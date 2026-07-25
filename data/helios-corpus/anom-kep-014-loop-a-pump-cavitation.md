---
title: "Anomaly Report ANOM-KEP-014: Coolant Loop A Pump Cavitation from Gas Ingress (Kepler)"
slug: anom-kep-014-loop-a-pump-cavitation
doc_type: Anomaly Report
subsystem: ECLSS
components: ["Coolant Loop A", "Pump P-203", "Accumulator ACC-1", "High-point Vent", "Interloop Heat Exchanger IHX-1"]
crew: []
flight_controllers: ["EECOM", "FLIGHT"]
anomaly_refs: ["ANOM-KEP-014", "ANOM-HAL-011"]
procedure_id: MAL-ECLSS-09
mission_phase: Anomaly Response
classification: Off-Nominal
media_type: text
duration_minutes: null
published: 2036-05-22
source_url: https://helios.aurelian.mission/anomalies/anom-kep-014
summary: "On the Kepler flight, Pump P-203 on Coolant Loop A developed cavitation from GN2 entrained after an accumulator recharge. Root cause was a high-point gas pocket not bled before restart. Resolved by gas bleed at the high-point vent."
---

# Anomaly Report ANOM-KEP-014: Coolant Loop A Pump Cavitation from Gas Ingress

**Mission:** Kepler (HELIOS-1), Trans-Mars Cruise
**Date:** 2036-05-22, mission time approximately T+156 days
**Subsystem:** ECLSS — Active Thermal Coolant Loop A, Pump P-203
**Severity:** Off-Nominal (recovered; loop returned to service)

## Summary

Following a routine accumulator ACC-1 recharge, Pump **P-203** on Coolant Loop A developed cavitation: differential pressure fell below 40 kPa with pronounced noise, coolant flow became unsteady, and loop pressure oscillated around 300 kPa. Root cause was a **gas pocket entrained during the recharge and not bled** before the loop was returned to normal flow. The condition was resolved by bleeding the trapped gas at the high-point vent, after which the pump and loop returned to nominal.

## Sequence of events

- **T+156:00** — A scheduled ACC-1 recharge was performed. Precharge was restored to the 340 kPa nominal, but the high-point vent bleed step was cut short.
- **T+156:01** — On return to normal flow, P-203 differential pressure began oscillating and dropped intermittently below 40 kPa. Flow varied between 0.6 and 0.9 kg/s. Loop pressure oscillated ±8 kPa around 300 kPa — the classic gas-ingress signature (no coolant mass loss; accumulator quantity steady).
- **T+156:02** — Cavitation was confirmed acoustically and by the differential-pressure noise. The crew recognized the pattern as gas entrainment rather than a leak and did **not** isolate the loop.
- **T+156:03** — The high-point vent was opened until liquid, not gas, appeared, confirming the trapped gas was cleared.
- **T+156:04** — Pump differential pressure returned to a steady 65 kPa, flow to 0.85 kg/s, and loop pressure to a stable 310 kPa. Loop A remained in service.

## Root cause

The recharge introduced GN2 to restore accumulator precharge; a pocket of that gas migrated to a loop high point and was drawn into the pump inlet, collapsing pump head and causing cavitation. The proximate cause was an incomplete gas-bleed step during servicing. There was no hardware failure — the accumulator, pump, and loop were all serviceable.

## Resolution

Bleeding the high-point gas pocket fully restored the loop. No components were replaced. The event demonstrated that cavitation with a steady accumulator quantity is a **serviceable gas-ingress condition**, distinct from the unrecoverable bladder failure later seen on Halley (ANOM-HAL-011), where recharge could not hold.

## Lessons and corpus impact

1. The gas-bleed step in coolant servicing was made explicit and verification-gated (bleed until liquid appears at the vent) — now NOM-ECLSS-12 Section 3.
2. Cavitation is added to the coolant-pump procedure (MAL-ECLSS-09) as a distinct fault class treated first by accumulator servicing, not isolation.
3. The leak-versus-gas-ingress diagnosis in MAL-ECLSS-07 draws directly on this event: **oscillation with steady accumulator quantity is gas; monotonic decay with falling quantity is a leak.**
