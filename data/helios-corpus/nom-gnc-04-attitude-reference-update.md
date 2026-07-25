---
title: "Nominal Procedure NOM-GNC-04: Attitude Reference Update and Star Tracker Calibration"
slug: nom-gnc-04-attitude-reference-update
doc_type: Nominal Procedure
subsystem: GNC
components: ["Star Tracker ST-1", "Star Tracker ST-2", "Inertial Measurement Unit IMU-1", "Reaction Wheel RW-1", "Reaction Wheel RW-2", "Reaction Wheel RW-3", "Reaction Wheel RW-4", "High-Gain Antenna HGA-1", "Sun Sensor"]
crew: ["Pilot Lena Okoro", "Cmdr. Yuki Tan"]
flight_controllers: ["GC", "PROP", "FLIGHT"]
anomaly_refs: ["ANOM-KEP-009"]
procedure_id: NOM-GNC-04
mission_phase: Trans-Mars Cruise
classification: Nominal
media_type: text
duration_minutes: null
published: 2041-10-08
source_url: https://helios.aurelian.mission/procedures/nom-gnc-04
summary: "Routine procedure for updating the attitude reference, calibrating the star trackers against the IMU, and dumping reaction-wheel momentum, keeping HGA pointing within the 0.2 degree lock requirement."
---

# Nominal Procedure NOM-GNC-04: Attitude Reference Update and Star Tracker Calibration

**Purpose:** Maintain an accurate attitude reference in cruise by cross-checking the two star trackers, calibrating the IMU drift, and dumping accumulated reaction-wheel momentum. Performed on the 36-hour momentum-dump cadence and before any burn (NOM-PROP-03).

## 1. Star-tracker cross-check

1.1 Read the attitude solutions from ST-1 and ST-2 and confirm agreement within tolerance. Persistent disagreement is worked under MAL-GNC-05 (as in the ANOM-KEP-009 stuck-flag event).
1.2 Confirm neither tracker is flagged for a bright object; a stuck bright-object flag is the ANOM-KEP-009 failure mode and is cleared before relying on that tracker.

## 2. IMU calibration

2.1 Use the two-tracker solution to update the IMU-1 bias and drift terms so that IMU propagation is accurate during periods when trackers are unavailable (for example at a burn attitude).
2.2 Confirm propagated attitude matches the tracker solution within the 0.05° cruise hold requirement.

## 3. Momentum dump

3.1 Read reaction-wheel momentum on RW-1 through RW-4. External torques accumulate momentum over roughly 36 hours.
3.2 Perform an RCS momentum dump to bring wheels back toward zero, keeping margin below the 12 N·m·s per-wheel limit. Rapid re-accumulation after a dump indicates an external torque — investigate for a propellant leak (MAL-PROP-06) or stuck thruster.

## 4. HGA pointing check

4.1 Confirm HGA-1 pointing is within the **0.2°** Ka-band lock requirement after the update. The tighter comms requirement, versus the 0.05° attitude hold, is the reason attitude quality is checked against comms as well as GNC.

## 5. Safe-mode readiness

5.1 Confirm the Sun sensor and safe-mode logic are healthy so that a loss of attitude reference (MAL-GNC-05) will correctly command Sun pointing for power and thermal safety.

## 6. Log

6.1 Record tracker agreement, IMU calibration deltas, wheel momentum before and after the dump, and HGA pointing. Downlink to GC.

## Related
- Off-nominal: **MAL-GNC-05** (GNC fault).
- Reference event: **ANOM-KEP-009** (star-tracker stuck flag).
