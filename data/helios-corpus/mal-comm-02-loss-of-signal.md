---
title: "Malfunction Procedure MAL-COMM-02: Loss of Signal / Comms Blackout"
slug: mal-comm-02-loss-of-signal
doc_type: Malfunction Procedure
subsystem: Comms
components: ["High-Gain Antenna HGA-1", "Low-Gain Antenna LGA-1", "Low-Gain Antenna LGA-2", "X-band Transponder", "Ka-band Transmitter", "DSRN Uplink", "Cygnus Station", "Draco Station", "Lyra Station"]
crew: ["Sci. Priya Anand", "Cmdr. Yuki Tan"]
flight_controllers: ["CAPCOM", "GC", "FLIGHT"]
anomaly_refs: ["ANOM-PTO-031", "ANOM-KEP-009"]
procedure_id: MAL-COMM-02
mission_phase: Anomaly Response
classification: Off-Nominal
media_type: text
duration_minutes: null
published: 2041-10-05
source_url: https://helios.aurelian.mission/procedures/mal-comm-02
summary: "Procedure for loss of signal, distinguishing attitude loss, solar conjunction, station gap, and onboard fault, and the actions to reacquire including the fallback to low-gain omnidirectional links."
---

# Malfunction Procedure MAL-COMM-02: Loss of Signal / Comms Blackout

**Entry condition:** Loss of the Ka-band high-rate downlink lock, loss of uplink command, or no acquisition of signal at a scheduled station handover.
**Classification:** Off-Nominal. Comms LOS does **not** by itself trigger any subsystem safing — the vehicle and its malfunction procedures are designed to run autonomously (round-trip light time ~27 minutes).

## 1. Confirm the outage

1.1 Confirm loss on the actual link, not a display fault: check both Ka-band (HGA) and X-band, and confirm whether uplink, downlink, or both are lost.
1.2 Note the time relative to the scheduled station handover (NOM-COMM-05) and relative to any burn or maneuver in progress.

## 2. Classify the cause

- **Attitude LOS** — coincides with a maneuver or attitude excursion; HGA lost pointing lock (requires within 0.2°). Most common cause. Go to Section 3.
- **Solar conjunction** — predicted from the trajectory; the Sun is near the Earth–vehicle line, corrupting the link (ANOM-PTO-031). Expected and time-bounded. Go to Section 4.
- **Station gap** — a DSRN station (Cygnus/Draco/Lyra) outage; onboard recorder captures telemetry for playback. Go to Section 5.
- **Onboard fault** — transponder, transmitter, or HGA drive failure with attitude nominal. Go to Section 6.

## 3. Attitude LOS

3.1 Coordinate with GC to reacquire the commanded attitude (0.05° hold) and re-point HGA-1.
3.2 If attitude cannot be immediately restored, switch to **LGA (LGA-1/LGA-2)** for a low-rate omnidirectional X-band link (4 kbps) to maintain contact while attitude is recovered. A GNC fault behind the attitude loss is worked under MAL-GNC-05 (as in ANOM-KEP-009).

## 4. Solar conjunction

4.1 Conjunction blackout is expected and self-clears as geometry changes. Confirm the outage matches the predicted conjunction window.
4.2 Continue mission autonomously. If a burn is scheduled in the window, it executes on the pre-loaded sequence per FR-COMM-2.3 — **do not abort a burn for conjunction LOS**.

## 5. Station gap

5.1 Confirm the onboard recorder is capturing all telemetry. No action beyond monitoring; data plays back on next acquisition of signal at the next DSRN station.

## 6. Onboard fault

6.1 With attitude confirmed good, fail over: HGA to LGA, primary transponder to backup.
6.2 If the high-gain chain is lost, operate on LGA low rate and downlink an abbreviated critical-telemetry set until the fault is worked.

## 7. Reacquisition

7.1 On restoration, dump the onboard-recorded telemetry so ground reconstructs the gap, and re-establish the station handover schedule.

## Reference anomalies
- **ANOM-PTO-031** — solar-conjunction blackout during a planned burn; burn completed on pre-loaded sequence.
- **ANOM-KEP-009** — star-tracker fault caused an attitude excursion and secondary comms LOS.
