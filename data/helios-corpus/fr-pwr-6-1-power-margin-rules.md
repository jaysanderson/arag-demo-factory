---
title: "Flight Rule FR-PWR-6.1: Power Margin Rules"
slug: fr-pwr-6-1-power-margin-rules
doc_type: Flight Rule
subsystem: EPS
components: ["Bus A", "Bus B", "Battery BAT-1", "Battery BAT-2", "Solar Array SA-1", "Solar Array SA-2", "Cross-tie Contactor XT-1", "Pump P-203", "Pump P-204"]
crew: ["Flt.Eng. Marco Reyes", "Pilot Lena Okoro"]
flight_controllers: ["EPS", "EECOM", "FLIGHT"]
anomaly_refs: ["ANOM-HAL-003"]
procedure_id: null
mission_phase: Anomaly Response
classification: Off-Nominal
media_type: text
duration_minutes: null
published: 2041-10-12
source_url: https://helios.aurelian.mission/flight-rules/fr-pwr-6-1
summary: "Flight rules for electrical power margins, defining the single-source load limit during cross-tie, the essential loads that are never shed, and the battery reserve that must be protected."
---

# Flight Rule FR-PWR-6.1: Power Margin Rules

These rules govern electrical power margins on Buses A and B and the constraints on cross-tie operation, in coordination with MAL-EPS-04 and NOM-EPS-02.

## Rule 6.1.1 — Single-source load limit

During cross-tie operation (both buses fed from one source via XT-1), total load shall not exceed the surviving source's continuous rating of **4.6 kW**. Because the nominal combined load (~6.2 kW) exceeds this, a cross-tie **requires** load shed of non-essential equipment (up to 1.4 kW) per NOM-EPS-02. This rule was validated in the ANOM-HAL-003 bus-fault recovery.

## Rule 6.1.2 — Essential loads never shed

The following are essential and shall not be shed under any power contingency: coolant pumps P-203/P-204, CO2 scrubbers, water processor, core flight computers, GNC, and atmosphere control. If the surviving source cannot carry the essential load set, the condition escalates to a survival contingency (FR-ABORT-1.0).

## Rule 6.1.3 — Battery reserve

Each battery reserve (4.8 kWh) shall be protected for the survival load set. Non-essential loads shall be timed to favourable array-output attitudes so batteries are charged, not depleted, during routine operation. A battery falling in state of charge under a healthy source indicates a fault and is investigated.

## Rule 6.1.4 — Coolant-pump priority

Because Pump P-204 is on Bus B and P-203 on Bus A, a bus fault threatens a coolant loop. Restoring a coolant pump (by cross-tie) takes priority over restoring any non-essential load. If a pump cannot be repowered, the loss-of-loop thermal rules (FR-ECLSS-4.1, FR-THRM-5.4) apply.

## Rule 6.1.5 — Restoration order

After a contingency clears, non-essential loads are restored in reverse priority order (secondary avionics, then galley, then payload), confirming bus margin and battery charge at each step, so that a partial recovery never re-exceeds the single-source limit.

## Rule 6.1.6 — Precedence

Protecting the essential load set — above all the coolant pumps and life support — takes precedence over payload, science, and crew-comfort loads in every power contingency.
