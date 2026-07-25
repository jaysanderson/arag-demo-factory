---
title: "Flight Rule FR-ECLSS-4.1: Coolant Loop Go / No-Go"
slug: fr-eclss-4-1-coolant-loop-go-nogo
doc_type: Flight Rule
subsystem: ECLSS
components: ["Coolant Loop A", "Coolant Loop B", "Accumulator ACC-2", "Pump P-204", "Isolation Valve MV-207", "Interloop Heat Exchanger IHX-1"]
crew: ["Flt.Eng. Marco Reyes", "Cmdr. Yuki Tan"]
flight_controllers: ["EECOM", "FLIGHT"]
anomaly_refs: ["ANOM-HAL-011", "ANOM-KEP-022"]
procedure_id: null
mission_phase: Anomaly Response
classification: Off-Nominal
media_type: text
duration_minutes: null
published: 2041-10-12
source_url: https://helios.aurelian.mission/flight-rules/fr-eclss-4-1
summary: "Flight rules governing coolant-loop operation and isolation, including the pressure and decay-rate thresholds for loop isolation and the requirement to preserve one healthy loop at all times."
---

# Flight Rule FR-ECLSS-4.1: Coolant Loop Go / No-Go

These rules govern operation and isolation of the two coolant loops. They are the go/no-go authority behind procedure MAL-ECLSS-07 and are binding onboard without ground concurrence, given the ~27-minute round-trip light time.

## Rule 4.1.1 — One loop is always protected

At least one coolant loop shall be maintained healthy and available at all times. No planned or contingency action shall knowingly place both loops out of service. When one loop is degraded, the other shall not be taken off line for maintenance or troubleshooting.

## Rule 4.1.2 — Isolation thresholds

A coolant loop **shall be isolated** (isolation valve closed, pump commanded off) if **any** of the following is met:

- Loop pressure below **250 kPa**; or
- Sustained pressure decay exceeding **5 kPa/hr** over three consecutive 15-minute readings; or
- Accumulator fluid quantity below **0.8 L**; or
- Confirmed pump cavitation (differential pressure below 40 kPa with noise).

A loop **may remain in service under monitoring** if pressure is stable at or above **270 kPa** after accumulator servicing and none of the isolation criteria are met.

## Rule 4.1.3 — Leak versus gas ingress

Before isolating, the failure shall be classified as a leak (falling accumulator quantity) or gas ingress (oscillation without mass loss). Gas ingress is first corrected by accumulator servicing (NOM-ECLSS-12); a confirmed leak proceeds to isolation. When the classification is ambiguous, the loop shall be treated as leaking (the conservative case).

## Rule 4.1.4 — Post-isolation cooling

Following isolation, cabin heat rejection shall transfer to the surviving loop through the interloop heat exchanger, load shed shall be applied (NOM-EPS-02), and cabin temperature shall be managed under FR-THRM-5.4 and MAL-ECLSS-03. Single-loop capacity is approximately 3.8 kW against a 5.5 kW nominal load.

## Rule 4.1.5 — Return to two-loop operation

An isolated loop may be returned to service only after the cause is identified and corrected — for example a single punctured radiator panel isolated (ANOM-KEP-022) or a serviceable accumulator restored. A loop that failed by an unrecoverable accumulator/bladder fault (ANOM-HAL-011) shall not be returned to service by repeated make-up.

## Rule 4.1.6 — Precedence

Crew safety and avionics protection (FR-THRM-5.4) take precedence over preserving two-loop operation. Where the two conflict, protect the crew and the voting flight computers first.
