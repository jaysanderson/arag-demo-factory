---
title: "Malfunction Procedure MAL-GNC-05: Attitude Control / GNC Fault"
slug: mal-gnc-05-attitude-control-fault
doc_type: Malfunction Procedure
subsystem: GNC
components: ["Star Tracker ST-1", "Star Tracker ST-2", "Inertial Measurement Unit IMU-1", "Reaction Wheel RW-1", "Reaction Wheel RW-2", "Reaction Wheel RW-3", "Reaction Wheel RW-4", "Sun Sensor", "High-Gain Antenna HGA-1", "Radiator Panel 1"]
crew: ["Pilot Lena Okoro", "Cmdr. Yuki Tan"]
flight_controllers: ["GC", "PROP", "FLIGHT"]
anomaly_refs: ["ANOM-KEP-009"]
procedure_id: MAL-GNC-05
mission_phase: Anomaly Response
classification: Off-Nominal
media_type: text
duration_minutes: null
published: 2041-10-05
source_url: https://helios.aurelian.mission/procedures/mal-gnc-05
summary: "Procedure for a GNC fault — star tracker disagreement, reaction wheel saturation, or loss of attitude reference — including the fallback to single-tracker and IMU propagation and the entry to Sun-pointing safe mode."
---

# Malfunction Procedure MAL-GNC-05: Attitude Control / GNC Fault

**Entry condition:** Star-tracker disagreement or single-tracker failure, reaction wheel saturation, attitude-hold error exceeding 0.2°, or loss of attitude reference.
**Classification:** Off-Nominal; escalates to Emergency on loss of attitude reference (threatens power, thermal, and comms).

## 1. Characterize

1.1 Record ST-1 and ST-2 attitude solutions, IMU-1 rates, reaction wheel momentum (RW-1..4), and attitude-hold error.
1.2 Note downstream effects: an attitude excursion degrades HGA pointing (comms LOS, see MAL-COMM-02) and radiator view (thermal, see MAL-ECLSS-03).

## 2. Star-tracker fault

2.1 If ST-1 and ST-2 disagree, identify the faulted unit (bright-object flag stuck, as in ANOM-KEP-009, or a hardware fault) and continue on the healthy tracker with IMU propagation.
2.2 If a tracker is recoverable (clear a stuck flag, wait out a bright body), restore two-tracker operation and confirm agreement.

## 3. Reaction wheel saturation

3.1 If a wheel approaches its 12 N·m·s momentum limit, perform an RCS momentum dump to offload the wheels.
3.2 Persistent rapid saturation implies an external torque — check for a propellant leak producing thrust (MAL-PROP-06) or a stuck thruster.

## 4. Loss of attitude reference

4.1 If both trackers are lost and IMU propagation has degraded, the system commands **safe mode**: the Sun sensor points the vehicle Sun-relative for power and thermal safety, and comms fall back to LGA low rate.
4.2 In safe mode, prioritize re-establishing a star-tracker solution to recover full attitude. Confirm arrays and radiators are in acceptable Sun/space geometry.

## 5. Restore mission attitude

5.1 With attitude reference restored, return to the commanded cruise attitude (0.05° hold), re-point HGA-1 (within 0.2° for Ka-band lock), and confirm radiator panels have their view to space.
5.2 Coordinate with CAPCOM/GC to re-establish the high-rate link if it dropped during the excursion.

## 6. Notify

6.1 Downlink GNC state to GC. Attitude recovery is executed onboard; safe mode is autonomous and does not wait for the ~27-minute round trip.

## Reference anomaly
- **ANOM-KEP-009** — ST-1 stuck bright-object flag forced single-tracker operation and a brief attitude excursion with secondary comms LOS.
