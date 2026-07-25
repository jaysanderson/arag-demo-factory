---
title: "Anomaly Report ANOM-KEP-009: Star Tracker ST-1 Stuck Bright-Object Flag and Attitude Excursion (Kepler)"
slug: anom-kep-009-star-tracker-stuck-flag
doc_type: Anomaly Report
subsystem: GNC
components: ["Star Tracker ST-1", "Star Tracker ST-2", "Inertial Measurement Unit IMU-1", "High-Gain Antenna HGA-1", "Low-Gain Antenna LGA-1", "Reaction Wheel RW-1"]
crew: []
flight_controllers: ["GC", "CAPCOM", "FLIGHT"]
anomaly_refs: ["ANOM-KEP-009"]
procedure_id: MAL-GNC-05
mission_phase: Anomaly Response
classification: Off-Nominal
media_type: text
duration_minutes: null
published: 2036-04-03
source_url: https://helios.aurelian.mission/anomalies/anom-kep-009
summary: "A stuck bright-object flag on star tracker ST-1 dropped it from the attitude solution on the Kepler flight, causing a brief attitude excursion and secondary loss of the high-gain link. Recovered on single-tracker operation and by clearing the flag."
---

# Anomaly Report ANOM-KEP-009: Star Tracker ST-1 Stuck Bright-Object Flag and Attitude Excursion

**Mission:** Kepler (HELIOS-1), Trans-Mars Cruise
**Date:** 2036-04-03, mission time approximately T+107 days
**Subsystem:** GNC — Star Tracker ST-1; secondary effect on Comms
**Severity:** Off-Nominal (recovered; no safe-mode entry)

## Summary

Star tracker **ST-1** raised a **bright-object flag** — normally a valid protection when a bright body is in its field of view — but the flag **stuck** after the body had cleared, keeping ST-1 out of the attitude solution. Operating briefly on **ST-2 alone** with IMU-1 propagation, the attitude-hold error grew beyond the 0.2° high-gain pointing requirement during a subsequent maneuver, causing a **short loss of the Ka-band link**. The crew continued on single-tracker operation, restored attitude, reacquired the link, and later cleared the stuck flag to restore two-tracker operation.

## Sequence of events

- **T+107:00** — A bright body transited ST-1's field of view; ST-1 correctly raised its bright-object flag and dropped out. ST-2 carried the solution.
- **T+107:00 +6 min** — The body cleared, but the ST-1 flag did **not** reset. ST-1 remained excluded, leaving the system on ST-2 plus IMU-1.
- **T+107:01** — During a routine attitude adjustment, single-tracker performance and accumulating IMU drift let the attitude-hold error exceed **0.2°**. HGA-1 lost Ka-band lock — a secondary comms LOS.
- **T+107:01 +3 min** — Recognizing an attitude-driven LOS, the crew fell back to **LGA low rate** to maintain contact, worked the GNC fault, and re-tightened attitude on ST-2 + IMU. Ka-band lock was reacquired.
- **T+107:02** — The ST-1 bright-object flag was commanded to reset; ST-1 re-entered the solution and two-tracker agreement was confirmed.

## Root cause

A software latch handling the ST-1 bright-object flag failed to clear the flag once the triggering body left the field of view. The star tracker hardware was healthy; the fault was in the flag-reset logic. Because two trackers are carried, the fault degraded rather than lost the attitude reference.

## Resolution

Single-tracker operation on ST-2 with IMU propagation maintained attitude through the event; the LGA maintained communications while the high-gain link was recovered; and resetting the stuck flag restored full two-tracker operation. No safe-mode entry was required.

## Lessons and corpus impact

1. This event is the reference case for **MAL-GNC-05** (star-tracker fault, single-tracker operation) and illustrates the **GNC–Comms coupling**: an attitude excursion beyond 0.2° drops the high-gain link (MAL-COMM-02 attitude-LOS path).
2. Checking for and clearing a stuck bright-object flag is now part of routine attitude-reference updates (NOM-GNC-04 Section 1.2).
3. The LGA low-rate fallback is the correct action for an attitude-driven LOS while attitude is being recovered, rather than any subsystem safing.
