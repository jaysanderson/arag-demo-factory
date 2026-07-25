---
title: "Nominal Procedure NOM-ECLSS-15: Coolant Loop Flow Balancing"
slug: nom-eclss-15-coolant-flow-balancing
doc_type: Nominal Procedure
subsystem: ECLSS
components: ["Coolant Loop B", "Coolant Loop A", "Cabin Heat Exchanger CHX-1", "Cold Plate CP-12", "Flow Control Valve", "Pump P-204", "Interloop Heat Exchanger IHX-1"]
crew: ["Flt.Eng. Marco Reyes", "Sci. Priya Anand"]
flight_controllers: ["EECOM", "FLIGHT"]
anomaly_refs: ["ANOM-PTO-007"]
procedure_id: NOM-ECLSS-15
mission_phase: Trans-Mars Cruise
classification: Nominal
media_type: text
duration_minutes: null
published: 2041-10-08
source_url: https://helios.aurelian.mission/procedures/nom-eclss-15
summary: "Routine procedure for rebalancing coolant flow between cold plates and the cabin heat exchanger to correct uneven cooling or a mild flow restriction, as used to recover from the CHX-1 fouling event on the Ptolemy flight."
---

# Nominal Procedure NOM-ECLSS-15: Coolant Loop Flow Balancing

**Purpose:** Rebalance coolant flow among the cold plates, cabin heat exchanger CHX-1, and radiator branch to correct uneven cooling, a mild flow restriction, or a localized hot spot without isolating the loop. Called by MAL-ECLSS-03 and MAL-THRM-08 when a flow restriction (not a leak) is suspected.

## 1. Characterize the imbalance

1.1 Record flow and inlet/outlet temperatures at CHX-1, the CP-12 flight-computer cold plate, and the radiator branch. An underserved branch shows a high temperature rise for its flow.
1.2 Confirm loop pressure is nominal (310 kPa) and there is **no leak** indication — flow balancing addresses distribution, not loss. A falling pressure means MAL-ECLSS-07, not this procedure.

## 2. Identify the restriction

2.1 A gradually developing restriction with rising cabin temperature and nominal loop pressure is the CHX-1 fouling signature seen on the Ptolemy flight (ANOM-PTO-007).
2.2 Confirm whether the restriction is at CHX-1 (cabin cooling suffers) or at a cold plate (local avionics temperature rises).

## 3. Rebalance

3.1 Adjust the flow control valves to increase flow to the underserved branch, in small steps, watching temperatures settle between steps.
3.2 Prioritize the **CP-12 flight-computer cold plate** and **CHX-1** — the two branches whose loss most directly threatens avionics and crew.
3.3 Confirm total loop flow remains within 0.75–0.95 kg/s; do not starve one branch to feed another beyond limits.

## 4. Verify

4.1 Confirm cabin temperature returns toward the 22.5 °C setpoint and CP-12 inlet is within the avionics limit.
4.2 Confirm no branch is above its temperature limit and loop pressure is unchanged.

## 5. If balancing fails

5.1 If a restriction cannot be cleared by rebalancing and cabin temperature continues to rise, escalate to MAL-ECLSS-03; a hard blockage may ultimately require isolating the loop and reverting to single-loop cooling on Loop A.

## 6. Log

6.1 Record valve positions, branch flows and temperatures before and after. Downlink to EECOM.

## Related
- Called by **MAL-ECLSS-03**, **MAL-THRM-08**.
- Reference event: **ANOM-PTO-007** (CHX-1 fouling).
