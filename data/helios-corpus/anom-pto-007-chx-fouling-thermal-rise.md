---
title: "Anomaly Report ANOM-PTO-007: Cabin Thermal Rise from CHX-1 Fouling (Ptolemy)"
slug: anom-pto-007-chx-fouling-thermal-rise
doc_type: Anomaly Report
subsystem: Thermal
components: ["Cabin Heat Exchanger CHX-1", "Coolant Loop A", "Cold Plate CP-12", "Flow Control Valve", "Flight Computer FC-B"]
crew: []
flight_controllers: ["EECOM", "SURGEON", "FLIGHT"]
anomaly_refs: ["ANOM-PTO-007", "ANOM-HAL-011"]
procedure_id: MAL-ECLSS-03
mission_phase: Anomaly Response
classification: Off-Nominal
media_type: text
duration_minutes: null
published: 2038-06-14
source_url: https://helios.aurelian.mission/anomalies/anom-pto-007
summary: "On the Ptolemy flight, cabin temperature climbed to 28.9 C with coolant loop pressures nominal. Root cause was progressive fouling of the cabin heat exchanger CHX-1 restricting coolant flow. Resolved by flow balancing, not loop isolation."
---

# Anomaly Report ANOM-PTO-007: Cabin Thermal Rise from CHX-1 Fouling

**Mission:** Ptolemy (HELIOS-2), Trans-Mars Cruise
**Date:** 2038-06-14, mission time approximately T+118 days
**Subsystem:** Thermal — Cabin Heat Exchanger CHX-1
**Severity:** Off-Nominal (recovered without loop isolation)

## Summary

Cabin air temperature climbed slowly over two days from the 22.5 °C setpoint to a peak of **28.9 °C**, passing the 27 °C caution, **while both coolant loops held nominal pressure (310 kPa) and flow**. Because the loops looked healthy, the cause was not immediately obvious. Root cause was progressive **fouling of the cabin heat exchanger CHX-1**, which restricted coolant flow through the cabin-air branch and starved cabin cooling even though total loop pressure was unaffected. The condition was resolved by **flow balancing** — increasing flow to the CHX-1 branch — not by isolating a loop.

## Sequence of events

- **Day 116** — Cabin temperature began a slow upward drift of about 0.1 °C/hr. Loop pressures, pump differential pressures, and accumulator quantities were all nominal, so a coolant leak or gas ingress was ruled out early.
- **Day 117** — Temperature passed 27 °C. Investigation focused on heat rejection and distribution. Radiator panel outlet temperatures were normal, ruling out a radiator view problem. The CHX-1 branch showed an abnormally **high air-side temperature rise for its measured coolant flow** — the flow-restriction signature.
- **Day 118, T+118 peak** — Temperature reached 28.9 °C, approaching the 30 °C avionics limit; avionics inlet air at the FC-B and CP-12 stack was watched closely. Flow balancing was performed, opening the CHX-1 branch flow-control valve in steps.
- **Post-balance** — Cabin temperature fell back below 25 °C within four hours and returned to the 22.5 °C setpoint by the next shift. No loop was isolated.

## Root cause

Particulate and biofilm accumulation on the CHX-1 coolant passages progressively reduced flow through that branch. Total loop pressure was unaffected because the restriction merely redistributed flow within the loop; the cabin-air branch was starved while other branches ran slightly high. This is why loop pressure — normally the first coolant health indicator — gave no warning.

## Resolution

Flow balancing restored cabin cooling immediately and the fouling was later cleared during a servicing cycle. No hardware was replaced in flight.

## Lessons and corpus impact

1. **A cabin thermal rise is not always a coolant-loss event.** A restriction inside a healthy loop can starve cabin cooling with loop pressure nominal. This is the founding case for MAL-ECLSS-03 Section 2.2 and NOM-ECLSS-15 (flow balancing).
2. The discriminator is the **branch temperature rise versus flow**, not loop pressure. A high air-side rise at nominal loop pressure points to a restriction, not a leak.
3. The event reinforced the avionics rule (FR-THRM-5.4): as cabin temperature approached 30 °C the CP-12 flight-computer stack was the protected priority, even though the underlying cause was benign.
