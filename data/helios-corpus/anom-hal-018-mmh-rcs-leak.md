---
title: "Anomaly Report ANOM-HAL-018: Slow MMH Leak at an RCS Valve Fitting (Halley)"
slug: anom-hal-018-mmh-rcs-leak
doc_type: Anomaly Report
subsystem: Propulsion
components: ["MMH Tank", "Propellant Isolation Valve PV-1", "RCS Thruster Cluster", "Main Engine ME-1", "Reaction Wheel RW-2"]
crew: []
flight_controllers: ["PROP", "GC", "SURGEON", "FLIGHT"]
anomaly_refs: ["ANOM-HAL-018"]
procedure_id: MAL-PROP-06
mission_phase: Anomaly Response
classification: Off-Nominal
media_type: text
duration_minutes: null
published: 2040-01-27
source_url: https://helios.aurelian.mission/anomalies/anom-hal-018
summary: "A slow MMH leak at an RCS valve fitting on the Halley flight was isolated to the RCS branch by closing PV-1, protecting the main propellant tanks and preserving the Mars Orbit Insertion capability."
---

# Anomaly Report ANOM-HAL-018: Slow MMH Leak at an RCS Valve Fitting

**Mission:** Halley (HELIOS-3), Trans-Mars Cruise
**Date:** 2040-01-27, mission time approximately T+150 days
**Subsystem:** Propulsion — RCS branch, MMH side
**Severity:** Off-Nominal (isolated; MOI capability preserved)

## Summary

A slow **monomethylhydrazine (MMH) leak** developed at an **RCS valve fitting**. It was first noticed as a small, persistent attitude-control torque that the reaction wheels were fighting (rising RW-2 momentum), corroborated by a slow MMH tank pressure trend and a trace vapour detection near the RCS module. The leak was **isolated to the RCS branch by closing propellant isolation valve PV-1**, which separated the RCS feed from the main MMH tank and stopped the loss. The main tanks remained intact and the Mars Orbit Insertion capability was preserved.

## Sequence of events

- **T+150:00** — Reaction wheel RW-2 momentum accumulated faster than the 36-hour dump cadence would explain, implying a small external torque. A stuck or leaking RCS thruster was suspected.
- **T+150:02** — MMH tank pressure showed a slow decay and a trace MMH vapour reading appeared near the affected RCS module. The signs together indicated a fuel-side leak on the RCS branch rather than a main-tank leak.
- **T+150:03** — Because MMH is toxic and hypergolic, the crew verified cabin atmosphere was clear (no cabin vapour) and confirmed the leak was external to the pressurized volume; no suit donning was required.
- **T+150:04** — **PV-1 (MMH) was closed**, isolating the RCS branch from the main MMH tank. The tank pressure decay stopped and the residual torque ceased once the leaking line depleted.
- **T+150:05** — Attitude control reverted to reaction wheels with reduced RCS authority (opposite branch and remaining thrusters intact). Main-engine capability, which draws from the isolated-and-protected main tanks, was confirmed unaffected.

## Root cause

A fitting on the MMH RCS feed line developed a slow seep, attributed to vibration-induced loosening over the cruise. The leak was downstream of PV-1, which is precisely why branch isolation could stop it without touching the main tanks.

## Resolution

Branch isolation stopped the leak and protected the main propellant. The projected propellant at Mars arrival remained above the MOI requirement (2 210 kg MMH / 3 580 kg NTO) with reserve, so no abort assessment was triggered. The MOI burn later completed nominally.

## Lessons and corpus impact

1. This is the reference case for **MAL-PROP-06**: a leak downstream of PV-1/PV-2 is isolated to the RCS branch, protecting the main tanks and the MOI capability.
2. A rising reaction-wheel momentum with no attitude command is a **leading indicator** of a propellant/thruster leak (MAL-GNC-05 Section 3.2, NOM-GNC-04 Section 3).
3. A propellant leak isolated to the RCS branch does **not** meet the propellant abort criterion (FR-ABORT-1.0 Rule 1.0.2), because the main tanks remain intact.
