---
title: "Malfunction Procedure MAL-LIFE-01: Life Support Consumables Contingency"
slug: mal-life-01-consumables-contingency
doc_type: Malfunction Procedure
subsystem: Life Support
components: ["Oxygen Tank O2-1", "Nitrogen Tank N2-1", "Water Processor", "CO2 Scrubber Bed A", "CO2 Scrubber Bed B", "Cabin Heat Exchanger CHX-1"]
crew: ["Sci. Priya Anand", "Cmdr. Yuki Tan", "Flt.Eng. Marco Reyes", "Pilot Lena Okoro"]
flight_controllers: ["SURGEON", "EECOM", "FLIGHT"]
anomaly_refs: ["ANOM-PTO-045"]
procedure_id: MAL-LIFE-01
mission_phase: Contingency
classification: Off-Nominal
media_type: text
duration_minutes: null
published: 2041-10-05
source_url: https://helios.aurelian.mission/procedures/mal-life-01
summary: "Procedure for a consumables shortfall — a water processor fault, scrubber degradation, or an oxygen/nitrogen loss — including the conservation actions and the tie to the consumables and abort flight rules."
---

# Malfunction Procedure MAL-LIFE-01: Life Support Consumables Contingency

**Entry condition:** A consumable margin projected to fall below plan-plus-contingency: water processor recovery below spec, scrubber capacity loss, or an O2/N2 loss event.
**Classification:** Off-Nominal; escalates per the consumables and abort flight rules.

## 1. Establish the shortfall

1.1 Identify the affected consumable and re-project days of margin for the four-person crew. Baseline margins at T+248 are oxygen 96 days, water 74 days, food 88 days; **water is the binding consumable at 74 days**.
1.2 Determine the cause: equipment fault (water processor recovery drop, scrubber bed degradation) versus a loss event (repressurization after a leak, as in ANOM-PTO-045).

## 2. Water shortfall

2.1 If water-processor recovery has dropped below 85 %, service or swap to the redundant processing string.
2.2 Institute water conservation: reduce hygiene water, prioritize potable and coolant make-up needs. Every litre recovered extends the binding margin.

## 3. Atmosphere shortfall

3.1 **CO2 scrubbers:** if a bed (A or B) degrades, run the healthy bed on a shortened swing cycle and monitor CO2 partial pressure against the 0.7 kPa alarm. CO2 removal is a survival function and is shed only as the last resort.
3.2 **Oxygen/nitrogen:** after any repress event (MAL-ECLSS-11), account for N2/O2 used and re-project margins. Supplement O2 from the generation capability where available.

## 4. Conservation and rate reduction

4.1 Reduce metabolic load: lower crew activity levels, which also reduces cabin heat generation (helpful during any concurrent thermal event, MAL-ECLSS-03).
4.2 Reduce non-essential water and power uses that indirectly consume stores.

## 5. Flight-rule assessment

5.1 Re-project all consumables against planned mission duration plus contingency (FR-CONS-3.2). Planned duration plus contingency must not exceed the binding margin.
5.2 If the shortfall drives the binding margin below the remaining mission duration plus reserve, invoke the abort/return criteria (FR-ABORT-1.0) with ground.

## 6. Notify

6.1 Downlink consumables projections to SURGEON/EECOM for the mission-level margin assessment.

## Reference anomaly
- **ANOM-PTO-045** — cabin seal leak whose repressurization consumed N2/O2 stores and moved the atmosphere margin.
