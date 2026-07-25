---
title: "Anomaly Report ANOM-HAL-003: Bus A Distribution Fault and Loss of Pump P-203 (Halley)"
slug: anom-hal-003-bus-a-mosfet-fault
doc_type: Anomaly Report
subsystem: EPS
components: ["Bus A", "Bus B", "Cross-tie Contactor XT-1", "Pump P-203", "Coolant Loop A", "Battery BAT-1", "Solar Array SA-1"]
crew: []
flight_controllers: ["EPS", "EECOM", "FLIGHT"]
anomaly_refs: ["ANOM-HAL-003", "ANOM-HAL-011"]
procedure_id: MAL-EPS-04
mission_phase: Anomaly Response
classification: Off-Nominal
media_type: text
duration_minutes: null
published: 2039-12-05
source_url: https://helios.aurelian.mission/anomalies/anom-hal-003
summary: "A failed power MOSFET dropped Bus A on the Halley flight, taking Coolant Pump P-203 with it. The fault was isolated, Bus A cross-tied to Bus B with load shed, and P-203 repowered, preventing a coolant-loop loss."
---

# Anomaly Report ANOM-HAL-003: Bus A Distribution Fault and Loss of Pump P-203

**Mission:** Halley (HELIOS-3), Trans-Mars Cruise
**Date:** 2039-12-05, mission time approximately T+097 days
**Subsystem:** EPS — Bus A distribution; secondary effect on ECLSS Coolant Loop A
**Severity:** Off-Nominal (recovered by cross-tie; no loss of loop)

## Summary

A **power MOSFET in the Bus A distribution unit failed**, causing an overcurrent trip that dropped Bus A. Because **Coolant Pump P-203 is powered from Bus A**, the pump stopped and Coolant Loop A lost forced circulation. The crew isolated the faulted feeder, closed the **cross-tie contactor XT-1** to feed Bus A loads from Bus B, applied load shed to stay within the single-source rating, and **repowered P-203**, restoring Loop A before any thermal excursion developed.

## Sequence of events

- **T+097:00** — Bus A overcurrent trip and undervoltage. Bus A dropped; P-203 current went to zero and Loop A flow decayed. Cabin temperature began a slow rise.
- **T+097:00 +4 min** — The crew recognized the coolant-pump loss as a **power-side fault**, not a pump mechanical fault (Bus A voltage abnormal, pump otherwise healthy), and worked it under the power-bus procedure rather than the coolant-pump procedure.
- **T+097:00 +10 min** — The faulted feeder was identified and opened to clear the short **before** cross-tie, so the fault would not propagate to Bus B.
- **T+097:00 +14 min** — XT-1 closed, feeding both buses from Bus B / SA-1 / BAT-1's counterpart. Non-essential loads (payload, galley) were shed to hold the surviving source within its 4.6 kW continuous limit.
- **T+097:00 +16 min** — P-203 repowered; Loop A flow returned to 0.85 kg/s and the brief cabin rise reversed. Total elapsed time under 20 minutes.

## Root cause

A latent manufacturing defect in a power MOSFET led to its failure under nominal load, shorting a Bus A feeder and tripping the bus. The fault was in distribution, not in the array or battery source, which is why cross-tie recovery was available once the faulted feeder was isolated.

## Resolution

Cross-tie with load shed restored both buses from the healthy source and repowered the coolant pump. The mission continued on the cross-tied configuration with non-essential loads managed until the affected distribution unit could be reconfigured.

## Lessons and corpus impact

1. This event is the reference case for **MAL-EPS-04** and demonstrates the **EPS–ECLSS coupling**: a bus fault can remove a coolant pump, so bus and coolant contingencies are cross-referenced.
2. **Isolate the faulted feeder before cross-tie** — otherwise the cross-tie propagates the short to the healthy bus (MAL-EPS-04 Section 2.2).
3. Restoring the coolant pump takes priority over restoring non-essential loads (FR-PWR-6.1 Rule 6.1.4). The prompt cross-tie is why this did not become a single-loop thermal event like ANOM-HAL-011 later on the same flight.
