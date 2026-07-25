---
title: "Flight Rule FR-COMM-2.3: Communications Blackout During a Main Engine Burn"
slug: fr-comm-2-3-blackout-during-burn
doc_type: Flight Rule
subsystem: Comms
components: ["High-Gain Antenna HGA-1", "Low-Gain Antenna LGA-1", "Main Engine ME-1", "Inertial Measurement Unit IMU-1", "DSRN Uplink", "Cygnus Station", "Draco Station", "Lyra Station"]
crew: ["Cmdr. Yuki Tan", "Pilot Lena Okoro", "Sci. Priya Anand"]
flight_controllers: ["CAPCOM", "GC", "PROP", "FLIGHT"]
anomaly_refs: ["ANOM-PTO-031"]
procedure_id: null
mission_phase: Mars Approach
classification: Off-Nominal
media_type: text
duration_minutes: null
published: 2041-10-12
source_url: https://helios.aurelian.mission/flight-rules/fr-comm-2-3
summary: "Flight rules for a loss of the communications link during a main-engine burn, establishing that a burn with a valid guidance solution is not aborted for loss of signal because the burn sequence executes autonomously onboard."
---

# Flight Rule FR-COMM-2.3: Communications Blackout During a Main Engine Burn

These rules govern the case where the communications link is lost — by attitude, solar conjunction, or fault — during or immediately before a main-engine burn (a trajectory correction or the Mars Orbit Insertion). They exist because a burn attitude can itself break high-gain lock, and burns may be scheduled near a solar conjunction, so a blackout during a burn is a foreseeable, not exceptional, condition.

## Rule 2.3.1 — A burn is autonomous

Every main-engine burn is executed from a **pre-loaded sequence** on the flight computers against the IMU-1 reference (NOM-PROP-03). Ignition, throttle, and cutoff do not require the ground link. Given the ~27-minute round-trip light time, real-time ground control of a burn is impossible in any case.

## Rule 2.3.2 — Loss of signal is not, by itself, a burn abort

A burn **shall not be aborted solely because of a loss of communications** if the onboard guidance solution is valid and the propulsion and vehicle state are within limits. This was demonstrated on the Ptolemy flight (ANOM-PTO-031), where a planned burn completed normally through a solar-conjunction blackout on its pre-loaded sequence.

## Rule 2.3.3 — What does abort a burn

A burn is aborted or not initiated for onboard reasons only:

- Invalid or diverging guidance solution;
- Propulsion fault or propellant-leak indication (MAL-PROP-06);
- Loss of attitude reference (MAL-GNC-05) such that the burn vector cannot be held;
- A vehicle-critical emergency (cabin depress, fire, loss of both coolant loops).

Communications state is absent from this list by design.

## Rule 2.3.4 — Blackout expected: plan for it

Where a burn is scheduled within a predicted solar-conjunction window or at an attitude known to break HGA lock, the crew shall pre-load the sequence, configure the onboard recorder, and plan to operate on LGA low rate or recorder through the event (NOM-COMM-05). The burn proceeds; the link is reacquired afterward and the recorder is dumped for ground reconstruction.

## Rule 2.3.5 — Post-burn reacquisition

After cutoff, the crew reacquires the high-rate link, confirms achieved delta-v and post-burn state to the ground, and stands by for any trajectory-correction guidance — which, being non-time-critical after the burn, can tolerate the round-trip light time.

## Rule 2.3.6 — Precedence

For the Mars Orbit Insertion specifically, completing the burn is mission-critical (a missed MOI is a flyby, not capture). The presumption is strongly toward **completing** a valid burn through a blackout rather than aborting for a communications reason.
