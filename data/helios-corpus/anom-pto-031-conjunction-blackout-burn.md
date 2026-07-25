---
title: "Anomaly Report ANOM-PTO-031: Solar Conjunction Blackout During a Trajectory Correction Burn (Ptolemy)"
slug: anom-pto-031-conjunction-blackout-burn
doc_type: Anomaly Report
subsystem: Comms
components: ["High-Gain Antenna HGA-1", "Low-Gain Antenna LGA-1", "Main Engine ME-1", "Inertial Measurement Unit IMU-1", "DSRN Uplink", "Draco Station", "Onboard Recorder"]
crew: []
flight_controllers: ["CAPCOM", "GC", "PROP", "FLIGHT"]
anomaly_refs: ["ANOM-PTO-031"]
procedure_id: null
mission_phase: Anomaly Response
classification: Off-Nominal
media_type: text
duration_minutes: null
published: 2038-09-02
source_url: https://helios.aurelian.mission/anomalies/anom-pto-031
summary: "A trajectory correction burn on the Ptolemy flight was executed through a solar-conjunction communications blackout on a pre-loaded sequence. The burn completed nominally with no ground link, validating the burn-blackout flight rule."
---

# Anomaly Report ANOM-PTO-031: Solar Conjunction Blackout During a Trajectory Correction Burn

**Mission:** Ptolemy (HELIOS-2), Trans-Mars Cruise
**Date:** 2038-09-02, mission time approximately T+198 days
**Subsystem:** Comms / Propulsion
**Severity:** Off-Nominal by classification only — the event was foreseen and the outcome nominal

## Summary

A planned trajectory correction burn fell within a predicted **solar conjunction** window, during which solar plasma corrupted the Earth–vehicle link and the communications went dark across all DSRN stations. The burn was executed from its **pre-loaded sequence** on the IMU-1 reference with no ground contact and **completed nominally**, achieving the target delta-v. This event is the validating precedent for the flight rule that a valid burn is not aborted for loss of signal.

## Sequence of events

- **T+198, burn minus 40 min** — The burn sequence was pre-loaded to the flight computers per the burn-preparation procedure. The conjunction window was known from the trajectory; the crew configured the onboard recorder and expected LOS.
- **Burn minus 12 min** — Ka-band high-rate link degraded and dropped as the Sun neared the Earth–vehicle line. The vehicle switched to LGA low rate; that too became unreliable inside the plasma.
- **Ignition** — The burn ignited on schedule on the pre-loaded sequence, holding attitude on IMU-1. No ground link was present.
- **Burn complete** — Cutoff occurred on schedule at the commanded delta-v. Attitude, chamber pressure, and propellant use were all nominal in the recorded data.
- **T+198, AOS +2 hr** — As conjunction geometry cleared, the link was reacquired at Draco Station and the onboard recorder was dumped, allowing ground to reconstruct the entire burn after the fact.

## Root cause

Not a fault. Solar conjunction is a predictable trajectory geometry in which the Sun lies close to the Earth–vehicle line and its plasma disrupts radio propagation. The "anomaly" designation reflects the loss of the nominal real-time link, not any vehicle malfunction.

## Resolution

None required. The burn's autonomous design — pre-loaded sequence executed against the IMU reference — is exactly what the situation demands, given that the ~27-minute round-trip light time makes real-time ground control of a burn impossible regardless of conjunction.

## Lessons and corpus impact

1. This event is the direct precedent for **FR-COMM-2.3**: a burn with a valid guidance solution is **not** aborted for loss of signal.
2. It reinforced pre-loading the full burn sequence and configuring the onboard recorder as standard burn preparation (NOM-PROP-03).
3. It sharpened the operational point emphasized throughout the comms material: during any fast event, the crew is autonomous; ground provides after-the-fact reconstruction and considered recommendations, not real-time control.
