---
title: "Subsystem Specification: Guidance, Navigation and Control"
slug: spec-gnc
doc_type: Subsystem Spec
subsystem: GNC
components: ["Star Tracker ST-1", "Star Tracker ST-2", "Inertial Measurement Unit IMU-1", "Reaction Wheel RW-1", "Reaction Wheel RW-2", "Reaction Wheel RW-3", "Reaction Wheel RW-4", "Sun Sensor", "RCS Thruster Cluster"]
crew: ["Pilot Lena Okoro", "Cmdr. Yuki Tan"]
flight_controllers: ["GC", "PROP", "FLIGHT"]
anomaly_refs: ["ANOM-KEP-009"]
procedure_id: null
mission_phase: Trans-Mars Cruise
classification: Nominal
media_type: text
duration_minutes: null
published: 2041-09-30
source_url: https://helios.aurelian.mission/specs/gnc/gnc-overview
summary: "Specification for the Aurelian guidance, navigation and control system, including star trackers, the inertial measurement unit, four reaction wheels, and the attitude-hold requirements that couple GNC to thermal and communications performance."
---

# Subsystem Specification: Guidance, Navigation and Control

## Overview

The Guidance, Navigation and Control (GNC) system determines the Aurelian's attitude and trajectory and commands the reaction wheels and RCS thrusters to hold or change attitude. Accurate attitude is not a GNC-internal concern only: it sets **High-Gain Antenna** pointing for communications and the **radiator panels'** view to deep space for heat rejection, so a GNC fault can cascade into comms and thermal problems.

## Sensors

- **Star Trackers ST-1 and ST-2** — primary attitude reference, each imaging a star field and computing an inertial attitude quaternion. Two units provide redundancy; agreement between them is continuously checked.
- **Inertial Measurement Unit IMU-1** — measures angular rate and acceleration; propagates attitude between star-tracker updates and provides the reference during burns when star trackers may be blinded by engine plume or bright bodies.
- **Sun Sensor** — coarse attitude for safe-mode Sun pointing.

## Effectors

- **Reaction Wheels RW-1 through RW-4** — four wheels in a redundant pyramid provide precise, propellant-free attitude control for cruise. Momentum accumulated by external torques is periodically dumped using RCS.
- **RCS thrusters** — coarse control, momentum dumping, and control authority during main-engine burns.

## Nominal parameters

| Parameter | Value |
|---|---|
| Attitude-hold accuracy (cruise) | 0.05° per axis |
| Star-tracker update rate | 4 Hz |
| Reaction wheel max momentum (each) | 12 N·m·s |
| Momentum dump cadence | every 36 hours nominal |
| HGA pointing requirement | within 0.2° for Ka-band lock |

The **0.2° HGA pointing requirement** is tighter than the routine attitude-hold accuracy allows margin for, which is why an attitude excursion promptly threatens the high-rate link; loss of pointing lock is a recognized cause of communications LOS (see the Comms specification).

## Fault handling

A star-tracker disagreement or a single tracker failure is handled by MAL-GNC-05. The system continues on the healthy tracker and IMU propagation; a full loss of attitude reference commands **safe mode**, in which the Sun sensor points the vehicle for power and thermal safety and the LGA maintains a low-rate link. A star-tracker fault caused by a stuck bright-object flag was recorded on the Kepler flight (**ANOM-KEP-009**), which briefly dropped ST-1 and forced single-tracker operation; it is the reference case for the GNC fault procedure.

## Burn attitude and coupling

During a main-engine burn the vehicle holds a burn attitude that may not be optimal for HGA pointing or radiator view. Burn planning (NOM-PROP-03) and the burn-blackout flight rule (FR-COMM-2.3) both account for the GNC-driven attitude and its downstream effect on comms and cooling.
