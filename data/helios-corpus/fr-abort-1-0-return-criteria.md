---
title: "Flight Rule FR-ABORT-1.0: Abort and Return Criteria"
slug: fr-abort-1-0-return-criteria
doc_type: Flight Rule
subsystem: Multiple
components: ["Main Engine ME-1", "Coolant Loop A", "Coolant Loop B", "Oxygen Tank O2-1", "Water Processor", "MMH Tank", "NTO Tank"]
crew: ["Cmdr. Yuki Tan", "Pilot Lena Okoro", "Flt.Eng. Marco Reyes", "Sci. Priya Anand"]
flight_controllers: ["FLIGHT", "PROP", "EECOM", "SURGEON"]
anomaly_refs: ["ANOM-HAL-011", "ANOM-HAL-018"]
procedure_id: null
mission_phase: Contingency
classification: Emergency
media_type: text
duration_minutes: null
published: 2041-10-12
source_url: https://helios.aurelian.mission/flight-rules/fr-abort-1-0
summary: "Flight rules defining the conditions under which the mission aborts to a free-return or powered-return trajectory, based on loss of redundancy in survival systems, propellant shortfall against Mars Orbit Insertion, or consumables margin."
---

# Flight Rule FR-ABORT-1.0: Abort and Return Criteria

These rules define when the mission transitions from its nominal plan to an abort — a free-return or powered-return trajectory to Earth. Abort is a mission-level decision made jointly by the crew and ground where time permits, but the crew holds authority to initiate a survival abort autonomously.

## Rule 1.0.1 — Survival-system redundancy

The mission shall abort toward return if a survival system is reduced to zero redundancy with no credible recovery, specifically:

- **Loss of both coolant loops** with no path to restore either (the single most serious ECLSS case; the Halley bladder failure ANOM-HAL-011 threatened one loop only and did not reach this criterion);
- Loss of CO2 removal with no serviceable bed;
- Loss of the ability to maintain cabin pressure.

A single-loop-out condition (one healthy loop remaining) is **not** an abort criterion by itself; it is managed under FR-ECLSS-4.1 and FR-THRM-5.4.

## Rule 1.0.2 — Propellant against MOI

The mission shall assess abort if projected propellant at Mars arrival cannot meet the **MOI requirement (2 210 kg MMH / 3 580 kg NTO) plus reserve**. A propellant leak isolated to the RCS branch (ANOM-HAL-018) that leaves the main tanks intact does **not** trigger this criterion. Below the MOI requirement, capture is impossible and a return trajectory is preferable to an uncontrolled flyby.

## Rule 1.0.3 — Consumables margin

The mission shall abort toward return if the binding consumable margin (FR-CONS-3.2 — currently water at 74 days) falls below the time required to reach and complete the mission's next safe milestone plus reserve. Consumables abort decisions are made with maximum lead time because return transits are long.

## Rule 1.0.4 — Crew medical

The mission shall assess abort for an incapacitating crew-medical event on SURGEON's recommendation, weighed against return-transit duration and the medical capability aboard.

## Rule 1.0.5 — Abort is trajectory-dependent and time-critical to plan

Because return options depend on the vehicle's position along the transit, abort windows are pre-computed and updated continuously. The cost of an abort rises the later it is taken; therefore any condition trending toward an abort criterion is reported early so the decision is made with the widest available window.

## Rule 1.0.6 — Precedence

Crew survival takes precedence over mission completion. Where continuing the mission and protecting the crew conflict irreconcilably, the crew shall abort.
