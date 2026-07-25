---
title: "Anomaly Report ANOM-HAL-011: Coolant Loop B Slow Pressure Decay — Accumulator Bladder Permeation (Halley)"
slug: anom-hal-011-loop-b-accumulator-bladder
doc_type: Anomaly Report
subsystem: ECLSS
components: ["Coolant Loop B", "Accumulator ACC-2", "Pump P-204", "Isolation Valve MV-207", "Interloop Heat Exchanger IHX-1", "Cabin Heat Exchanger CHX-1"]
crew: []
flight_controllers: ["EECOM", "FLIGHT"]
anomaly_refs: ["ANOM-HAL-011", "ANOM-KEP-014"]
procedure_id: MAL-ECLSS-07
mission_phase: Anomaly Response
classification: Off-Nominal
media_type: text
duration_minutes: null
published: 2040-03-18
source_url: https://helios.aurelian.mission/anomalies/anom-hal-011
summary: "On the Halley flight, Coolant Loop B pressure decayed slowly from 310 to 261 kPa over eleven hours. Root cause was GN2 permeation and partial bladder failure in accumulator ACC-2. The loop was isolated and the mission completed on single-loop cooling."
---

# Anomaly Report ANOM-HAL-011: Coolant Loop B Slow Pressure Decay — Accumulator Bladder Permeation

**Mission:** Halley (HELIOS-3), Trans-Mars Cruise
**Date:** 2040-03-18, mission time approximately T+201 days
**Subsystem:** ECLSS — Active Thermal Coolant Loop B
**Severity:** Off-Nominal (managed; no loss of survival function)

## Summary

Coolant Loop B pressure decayed slowly from its nominal **310 kPa** to **261 kPa over approximately eleven hours**, tripping the Low caution at 285 kPa and later the Low warning at 270 kPa. The accumulator ACC-2 GN2 precharge would not hold after repeated recharge, and the decay resumed each time. The failure was ultimately classified as gas-side accumulator bladder permeation with partial bladder failure. Loop B was isolated per the pressure-drop procedure and the remainder of the cruise was flown on single-loop cooling with load shed.

## Sequence of events

- **T+201:02** — Low caution at 285 kPa. Crew began 15-minute trend logging of pressure, ACC-2 quantity, pump P-204 differential pressure, and cabin temperature.
- **T+201:05** — Decay rate measured at approximately 3 kPa/hr. Accumulator fluid quantity was roughly steady while pressure fell — the **gas-ingress signature**, not a coolant leak. An accumulator recharge to the 340 kPa precharge was performed (the era's equivalent of NOM-ECLSS-12).
- **T+201:07** — Pressure recovered briefly, then resumed decaying. A second recharge held for less than an hour.
- **T+201:09** — Low warning at 270 kPa. Pump differential pressure began showing noise consistent with early gas entrainment (the same mechanism seen in the Kepler cavitation event ANOM-KEP-014).
- **T+201:11** — Pressure reached 261 kPa with decay accelerating. With the precharge unable to hold and cavitation developing, the crew isolated the loop: MV-207 closed, P-204 commanded off.

## Root cause

Post-flight teardown found the ACC-2 bladder had lost elasticity and developed micro-porosity, allowing GN2 to permeate from the gas side into the coolant. This raised no coolant mass loss (quantity steady) but reduced the effective gas charge, so loop pressure fell and gas entrained into the coolant, threatening pump cavitation. The repeated recharges masked the fault only briefly because the bladder could not retain the added gas. Root cause was assigned to bladder material aging beyond its qualified life under thermal cycling.

## Resolution

The loop was isolated and the vehicle transitioned to single-loop cooling on Loop A through the interloop heat exchanger. Load shed of payload and galley (approximately 1.3 kW on that flight) held the cabin rise near 0.6 °C/hr, and cabin temperature was managed below the 27 °C caution for the remainder of cruise by cycling non-essential loads. Loop B was not returned to service; the bladder fault was unrecoverable in flight.

## Lessons and corpus impact

ANOM-HAL-011 is the **primary design reference** for the current coolant-loop alarm thresholds and for procedure MAL-ECLSS-07. Three points carried forward:

1. A steady accumulator quantity with falling pressure is gas ingress, not a leak — but an accumulator that will not hold precharge is an **unrecoverable** fault and must not be masked by repeated recharge (now codified in FR-ECLSS-4.1 Rule 4.1.5 and NOM-ECLSS-12 Section 2).
2. The 5 kPa/hr sustained-decay isolation criterion was set so that a slow decay like this one is isolated before pump cavitation develops.
3. Single-loop cooling with load shed is a survivable, sustained configuration — it does not by itself meet any abort criterion (FR-ABORT-1.0).
