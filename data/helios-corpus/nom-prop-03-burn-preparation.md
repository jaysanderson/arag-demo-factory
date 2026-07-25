---
title: "Nominal Procedure NOM-PROP-03: Main Engine Burn Preparation"
slug: nom-prop-03-burn-preparation
doc_type: Nominal Procedure
subsystem: Propulsion
components: ["Main Engine ME-1", "MMH Tank", "NTO Tank", "Propellant Isolation Valve PV-1", "Propellant Isolation Valve PV-2", "Helium Pressurant Tank", "Reaction Wheel RW-1", "Inertial Measurement Unit IMU-1", "High-Gain Antenna HGA-1", "Radiator Panel 1"]
crew: ["Pilot Lena Okoro", "Cmdr. Yuki Tan"]
flight_controllers: ["PROP", "GC", "CAPCOM", "FLIGHT"]
anomaly_refs: ["ANOM-PTO-031"]
procedure_id: NOM-PROP-03
mission_phase: Mars Approach
classification: Nominal
media_type: text
duration_minutes: null
published: 2041-10-08
source_url: https://helios.aurelian.mission/procedures/nom-prop-03
summary: "Routine preparation for a main-engine burn — trajectory correction or Mars Orbit Insertion — including propellant and pressurization checks, burn-sequence load, attitude setup, and the communications and thermal effects of the burn attitude."
---

# Nominal Procedure NOM-PROP-03: Main Engine Burn Preparation

**Purpose:** Configure the vehicle for a main-engine burn (TCM or the Mars Orbit Insertion, MOI) and pre-load the burn sequence so it executes autonomously, independent of the ground link.

## 1. Propellant and pressurization

1.1 Verify MMH and NTO quantities against the burn requirement. For **MOI** the requirement is **2 210 kg MMH / 3 580 kg NTO**; confirm the load with reserve.
1.2 Confirm helium pressurant tank pressure and that isolation valves PV-1 (MMH) and PV-2 (NTO) are open to the main engine feed.
1.3 Confirm no active propellant-leak indication (MAL-PROP-06). A suspected leak defers the burn pending assessment.

## 2. Burn parameters and sequence load

2.1 Load the burn parameters — ignition time, duration, and target delta-v. MOI nominal is **24 minutes** for **1 180 m/s**.
2.2 **Pre-load the full burn sequence to the flight computers** so ignition, throttle, and cutoff execute onboard on the IMU-1 reference. This is what allows the burn to complete through a communications blackout (ANOM-PTO-031, FR-COMM-2.3).

## 3. Attitude and control

3.1 Maneuver to the burn attitude and confirm the IMU-1 reference; star trackers may be blinded at the burn attitude, so IMU propagation carries the solution.
3.2 Configure reaction wheels and RCS for burn control authority; confirm momentum is dumped so wheels are not near saturation at ignition.

## 4. Communications and thermal setup

4.1 Assess the burn attitude against **HGA-1 pointing**: if the attitude breaks the 0.2° lock, plan for LGA low rate or recorder through the burn. Coordinate station handover (NOM-COMM-05) around the burn.
4.2 Assess the burn attitude against **radiator view**: a burn attitude can reduce panel view to space and add a transient thermal load. For a long burn (MOI), confirm the thermal timeline (MAL-ECLSS-03) tolerates the attitude, especially if a coolant loop is degraded.

## 5. Go / No-Go poll

5.1 Complete the go/no-go poll against the applicable flight rules: propellant margin (FR-CONS-3.2), comms-blackout-during-burn (FR-COMM-2.3), and abort criteria (FR-ABORT-1.0).
5.2 A valid guidance solution and adequate propellant are GO. Communications loss alone is **not** a no-go for a burn with a valid solution.

## 6. Execute and confirm

6.1 Arm the sequence. The burn ignites, throttles, and cuts off autonomously. Confirm cutoff, achieved delta-v, and post-burn attitude, then reacquire the high-rate link.

## Related
- Off-nominal: **MAL-PROP-06** (propellant leak), **MAL-COMM-02** (LOS).
- Governing rules: **FR-COMM-2.3**, **FR-ABORT-1.0**, **FR-CONS-3.2**.
