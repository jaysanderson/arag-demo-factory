---
title: "Hazard Analysis HAZ-PROP-03: Hypergolic Propellant Leak and Crew Toxic Exposure"
slug: haz-03-hypergolic-propellant-leak
doc_type: Hazard Analysis
subsystem: Propulsion
components: ["MMH Tank", "NTO Tank", "Propellant Isolation Valve PV-1", "Propellant Isolation Valve PV-2", "RCS Thruster Cluster", "Main Engine ME-1", "Cabin Isolation Hatch"]
crew: ["Pilot Lena Okoro", "Cmdr. Yuki Tan", "Flt.Eng. Marco Reyes", "Sci. Priya Anand"]
flight_controllers: ["PROP", "SURGEON", "GC", "FLIGHT"]
anomaly_refs: ["ANOM-HAL-018"]
procedure_id: MAL-PROP-06
mission_phase: Contingency
classification: Emergency
media_type: text
duration_minutes: null
published: 2041-08-20
source_url: https://helios.aurelian.mission/hazard-analyses/haz-prop-03
summary: "Hazard analysis of a monomethylhydrazine or nitrogen tetroxide leak, covering the toxic-exposure and mission-loss consequence paths and the controls of branch isolation, crew protection, and the propellant reserve protecting Mars Orbit Insertion."
---

# Hazard Analysis HAZ-PROP-03: Hypergolic Propellant Leak and Crew Toxic Exposure

**Hazard:** A leak of monomethylhydrazine (MMH) or nitrogen tetroxide (NTO) exposing the crew to toxic vapour and/or depleting propellant required for the Mars Orbit Insertion.
**Severity:** Critical to Catastrophic (crew toxic exposure; loss of orbit insertion).
**Category:** Toxic / propulsion.

## Hazard description

The Aurelian uses storable hypergolic propellants — MMH fuel and NTO oxidizer — which ignite on contact and are toxic to the crew. A leak carries two distinct consequence paths that must be considered together: a **crew-health** path (toxic vapour ingress to the pressurized volume) and a **mission** path (loss of propellant needed for the 24-minute MOI burn). The Halley RCS-fitting leak (ANOM-HAL-018) exercised both considerations and was contained.

## Consequence paths

1. **Toxic exposure.** MMH or NTO vapour reaching the cabin threatens crew health independent of any propulsion impact. Even a small leak near a pressurized interface is treated as a crew-safety emergency.
2. **Loss of attitude control.** A leaking RCS thruster imparts a continuous torque the reaction wheels must fight (rising wheel momentum — the leading indicator from ANOM-HAL-018), eroding control authority.
3. **Loss of MOI capability.** A main-tank or pressurant leak depletes the propellant reserve below the MOI requirement (2 210 kg MMH / 3 580 kg NTO), turning capture into a flyby. This is the mission-loss path.

## Controls

1. **Branch isolation.** Propellant isolation valves PV-1 (MMH) and PV-2 (NTO) separate the RCS branch from the main tanks. A leak downstream of a valve is isolated without losing the main propellant — exactly the ANOM-HAL-018 resolution, which preserved MOI (MAL-PROP-06 Section 3).
2. **Crew protection.** On any vapour detection in the cabin, crew don emergency suits and isolate the affected module (Cabin Isolation Hatch), coordinated with SURGEON. Toxic exposure is treated before the propulsion assessment.
3. **Leading-indicator monitoring.** Reaction-wheel momentum trend (NOM-GNC-04) gives early warning of an RCS leak before tank pressure moves appreciably.
4. **Propellant reserve.** The MOI reserve (730 kg MMH / 1 180 kg NTO beyond the burn requirement) absorbs a limited loss without threatening capture; a shortfall below the requirement invokes the abort criteria (FR-ABORT-1.0 Rule 1.0.2).
5. **Tank placement and shielding.** Main tanks are positioned and shielded to reduce the chance an external event (see HAZ-MMOD-02) breaches them.

## Residual risk

The controlling residual risk is a leak on the **main-tank or pressurant side**, which cannot be isolated by PV-1/PV-2 and which threatens both crew health (if near the cabin) and MOI. Its probability is low — the main tanks are the best-protected element — but it is the case that drives the abort criterion. For the far more likely **RCS-branch** leak, branch isolation reduces the event to a managed loss of some attitude-control authority with the main propellant and MOI protected, as flight experience (ANOM-HAL-018) confirmed.
