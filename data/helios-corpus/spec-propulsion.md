---
title: "Subsystem Specification: Main Propulsion and Reaction Control"
slug: spec-propulsion
doc_type: Subsystem Spec
subsystem: Propulsion
components: ["Main Engine ME-1", "RCS Thruster Cluster", "MMH Tank", "NTO Tank", "Propellant Isolation Valve PV-1", "Propellant Isolation Valve PV-2", "Helium Pressurant Tank"]
crew: ["Pilot Lena Okoro", "Cmdr. Yuki Tan"]
flight_controllers: ["PROP", "GC", "FLIGHT"]
anomaly_refs: ["ANOM-HAL-018"]
procedure_id: null
mission_phase: Mars Approach
classification: Nominal
media_type: text
duration_minutes: null
published: 2041-09-30
source_url: https://helios.aurelian.mission/specs/propulsion/main-and-rcs
summary: "Specification for the Aurelian bipropellant main engine and reaction control system, including thrust, Isp, propellant load, the Mars Orbit Insertion burn requirement, and propellant isolation for leak response."
---

# Subsystem Specification: Main Propulsion and Reaction Control

## Overview

The Aurelian propulsion system performs trajectory correction maneuvers (TCMs) during cruise and the **Mars Orbit Insertion (MOI)** burn on arrival. It uses a storable bipropellant combination of monomethylhydrazine (**MMH**) fuel and nitrogen tetroxide (**NTO**) oxidizer, pressure-fed from a common helium pressurant tank. A single gimballed **Main Engine ME-1** provides primary thrust; a cluster of sixteen **RCS thrusters** provides attitude control and small translation.

## Main engine

| Parameter | Value |
|---|---|
| Thrust (ME-1) | 6.7 kN |
| Specific impulse | 320 s |
| Propellant feed | Helium pressure-fed |
| Gimbal range | ±6° |
| Nominal chamber pressure | 1.2 MPa |
| MOI burn duration (planned) | 24 min |
| MOI delta-v requirement | 1 180 m/s |

The MOI burn is the single most critical propulsive event of the mission. It is long (24 minutes), it must occur at a precise point on the approach trajectory, and a failure to complete it results in a flyby rather than capture. Because the burn attitude and its timing can coincide with a communications blackout, MOI is governed by dedicated flight rules (FR-COMM-2.3) and a burn-preparation procedure (NOM-PROP-03).

## Propellant load and margin

| Propellant | Load at T+248 | MOI requirement | Reserve after MOI |
|---|---|---|---|
| MMH | 2 940 kg | 2 210 kg | 730 kg |
| NTO | 4 760 kg | 3 580 kg | 1 180 kg |

Reserve propellant covers post-MOI orbit trim and contingency. Propellant margin is one of the parameters tracked against the consumables flight rules (FR-CONS-3.2); a propellant leak (see below) directly threatens the MOI capability and therefore mission success.

## Reaction control

The sixteen RCS thrusters (also MMH/NTO) provide three-axis attitude control, momentum management for the reaction wheels, and translation for rendezvous and station-keeping. RCS shares the main propellant tanks through the propellant isolation valves **PV-1** (MMH) and **PV-2** (NTO).

## Leak response and isolation

A propellant leak is detected by falling tank pressure, unexplained mass-property change, or direct sensing of MMH/NTO vapour. Because MMH and NTO are hypergolic and toxic, a suspected leak is a serious event. The response (MAL-PROP-06) isolates the affected propellant by closing **PV-1** or **PV-2**, which separates the RCS branch from the main tanks and localizes the leak. A slow MMH leak at a valve fitting was recorded on the Halley flight (**ANOM-HAL-018**); it was isolated to the RCS branch and did not compromise that mission's orbit insertion, and it is the reference case for the leak procedure.

## Attitude coupling

Main-engine and RCS activity change vehicle attitude, which affects both HGA pointing (see the Comms specification) and radiator view to space (see the Thermal Control specification). Burn planning therefore accounts for thermal and communications effects, not propulsion alone.
