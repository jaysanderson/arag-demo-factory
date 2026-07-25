---
title: "Flight Rule FR-THRM-5.4: Cabin Thermal Limits"
slug: fr-thrm-5-4-cabin-thermal-limits
doc_type: Flight Rule
subsystem: Thermal
components: ["Cabin Heat Exchanger CHX-1", "Cold Plate CP-12", "Coolant Loop A", "Coolant Loop B", "Radiator Panel 1", "Radiator Panel 2", "Flight Computer FC-A"]
crew: ["Flt.Eng. Marco Reyes", "Sci. Priya Anand", "Cmdr. Yuki Tan"]
flight_controllers: ["EECOM", "SURGEON", "FLIGHT"]
anomaly_refs: ["ANOM-PTO-007", "ANOM-HAL-011"]
procedure_id: null
mission_phase: Anomaly Response
classification: Off-Nominal
media_type: text
duration_minutes: null
published: 2041-10-12
source_url: https://helios.aurelian.mission/flight-rules/fr-thrm-5-4
summary: "Flight rules for cabin temperature, defining the 27 C caution, 30 C avionics limit, and 35 C survivability bound, and the actions required at each threshold during degraded cooling."
---

# Flight Rule FR-THRM-5.4: Cabin Thermal Limits

These rules define the cabin thermal thresholds and the mandatory actions at each, in coordination with MAL-ECLSS-03.

## Rule 5.4.1 — Thresholds

| Threshold | Temperature | Meaning |
|---|---|---|
| Setpoint | 22.5 °C | Nominal target |
| Comfort band | 18 – 27 °C | Routine operation |
| **Caution** | **27 °C** | Active thermal management required |
| **Avionics limit** | **30 °C** | Protect voting flight computers |
| **Survivability bound** | **35 °C** | Crew-safety limit, not an operating target |

## Rule 5.4.2 — At the 27 °C caution

At 27 °C the crew shall be actively managing the thermal condition under MAL-ECLSS-03: load shed applied (NOM-EPS-02), heat-rejection restored where possible, and the temperature trend tracked. Above 27 °C, avionics inlet air is approaching cold-plate design margins.

## Rule 5.4.3 — At the 30 °C avionics limit

At 30 °C, non-essential avionics **shall be powered down** to protect the two-of-three voting flight computers (the CP-12 stack on Loop B). Reaching this threshold is treated as a mission-level contingency requiring a planned change — deeper load shed, timeline adjustment, or crew relocation — not merely continued monitoring.

## Rule 5.4.4 — The 35 °C bound

35 °C is a crew short-term survivability limit. The mission shall never plan to operate near it; it exists to bound the worst case. Approaching 35 °C implies the avionics have already been protected under 5.4.3 and a survival contingency is in progress.

## Rule 5.4.5 — Single-loop timeline

With one coolant loop isolated and load shed applied, cabin temperature rises at approximately **0.6 °C/hr** (0.9 °C/hr without shed). From the 22.5 °C setpoint this gives roughly 7.5 hr to the 27 °C caution and 12.5 hr to the 30 °C avionics limit. These figures set the time available to recover the isolated loop (FR-ECLSS-4.1) before a mission-level contingency is forced. A thermal rise can also originate inside a healthy loop (CHX-1 fouling, ANOM-PTO-007), which is corrected by flow balancing (NOM-ECLSS-15) rather than loop isolation.

## Rule 5.4.6 — Precedence

Protecting the voting flight computers (5.4.3) takes precedence over crew comfort and over preserving non-essential loads. Crew survival (5.4.4) takes precedence over everything.
