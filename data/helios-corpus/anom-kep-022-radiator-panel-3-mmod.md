---
title: "Anomaly Report ANOM-KEP-022: Radiator Panel 3 Micrometeoroid Puncture and Loop B Coolant Leak (Kepler)"
slug: anom-kep-022-radiator-panel-3-mmod
doc_type: Anomaly Report
subsystem: Thermal
components: ["Radiator Panel 3", "Coolant Loop B", "Accumulator ACC-2", "Isolation Valve MV-207", "Pump P-204", "Interloop Heat Exchanger IHX-1"]
crew: []
flight_controllers: ["EECOM", "GC", "FLIGHT"]
anomaly_refs: ["ANOM-KEP-022", "ANOM-HAL-011"]
procedure_id: MAL-ECLSS-07
mission_phase: Anomaly Response
classification: Off-Nominal
media_type: text
duration_minutes: null
published: 2036-08-09
source_url: https://helios.aurelian.mission/anomalies/anom-kep-022
summary: "A micrometeoroid punctured Radiator Panel 3 on the Kepler flight, producing a monotonic coolant leak on Loop B with falling accumulator quantity. The punctured panel was isolated, preserving the second Loop B panel and returning the loop to reduced service."
---

# Anomaly Report ANOM-KEP-022: Radiator Panel 3 Micrometeoroid Puncture and Loop B Coolant Leak

**Mission:** Kepler (HELIOS-1), Trans-Mars Cruise
**Date:** 2036-08-09, mission time approximately T+235 days
**Subsystem:** Thermal / ECLSS — Radiator Panel 3 on Coolant Loop B
**Severity:** Off-Nominal (contained; partial loop capacity retained)

## Summary

An external micrometeoroid (MMOD) strike punctured **Radiator Panel 3**, one of the two Loop B radiator panels, producing a **coolant leak**: Loop B pressure decayed monotonically from 310 kPa and accumulator ACC-2 fluid quantity fell in step — the leak signature. An external camera survey located coolant venting from Panel 3. The panel was isolated at its branch, stopping the leak, and Loop B continued at reduced radiator capacity on the surviving panel.

## Sequence of events

- **T+235:03** — Low caution at 285 kPa on Loop B. Trend logging began.
- **T+235:04** — Decay was smooth and monotonic at approximately 4 kPa/hr, and ACC-2 quantity was **falling with pressure** — distinguishing this from the gas-ingress events (ANOM-KEP-014). Classified as a leak.
- **T+235:05** — A single coolant make-up confirmed a true leak (pressure resumed decaying after make-up). An external camera survey of the radiator panels was commanded and located a fine coolant plume at Panel 3, with a visible impact pit.
- **T+235:06** — Rather than isolate the entire loop, the crew isolated **Panel 3 only** at its branch shutoff, preserving the second Loop B panel. Loop B pressure stabilized at 296 kPa after make-up.
- **T+235:07** — Loop B returned to service at reduced radiator capacity (one panel, ~2.1 kW instead of ~4.2 kW). Cabin thermal margin remained positive.

## Root cause

Hypervelocity impact of a micrometeoroid punctured a coolant channel in Panel 3. The strike was random and not attributable to a design or operational fault. Panel 3's location on the leading thermal face gave it a slightly higher exposure, and it is the panel now flagged for MMOD inspection in the Thermal Control specification.

## Resolution

Single-panel isolation contained the leak while retaining the other Loop B panel, avoiding a full loop isolation and the associated single-loop cabin thermal management. This is the case behind MAL-THRM-08 Section 3.3 (isolate the punctured panel rather than the whole loop where the design permits) and behind FR-ECLSS-4.1 Rule 4.1.5 (a single punctured panel isolated is a valid path to return a loop to reduced service).

## Lessons and corpus impact

1. A falling accumulator quantity is the discriminator for a leak; the radiator panels are the first external leak location to survey (MAL-ECLSS-07 Section 4.2).
2. Panel-level isolation, where available, preserves capacity — do not default to full loop isolation for a single-panel leak.
3. Panel 3 carries a documented MMOD history and is inspected during any Loop B pressure investigation; it is the same panel referenced throughout the ECLSS and Thermal specifications.
