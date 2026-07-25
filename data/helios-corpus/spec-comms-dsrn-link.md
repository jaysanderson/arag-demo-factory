---
title: "Subsystem Specification: Communications and the Deep Space Relay Network Link"
slug: spec-comms-dsrn-link
doc_type: Subsystem Spec
subsystem: Comms
components: ["High-Gain Antenna HGA-1", "Low-Gain Antenna LGA-1", "Low-Gain Antenna LGA-2", "X-band Transponder", "Ka-band Transmitter", "DSRN Uplink", "Cygnus Station", "Draco Station", "Lyra Station"]
crew: ["Sci. Priya Anand", "Cmdr. Yuki Tan"]
flight_controllers: ["CAPCOM", "GC", "FLIGHT"]
anomaly_refs: ["ANOM-PTO-031"]
procedure_id: null
mission_phase: Trans-Mars Cruise
classification: Nominal
media_type: text
duration_minutes: null
published: 2041-09-30
source_url: https://helios.aurelian.mission/specs/comms/dsrn-link
summary: "Specification for the Aurelian X-band and Ka-band communications system and its link to the three-station Deep Space Relay Network, including the T+248 one-way light time of 13.5 minutes and the causes and handling of loss of signal."
---

# Subsystem Specification: Communications and the Deep Space Relay Network Link

## Overview

The Aurelian communicates with the flight control team through the **Deep Space Relay Network (DSRN)**, a set of three ground stations — **Cygnus**, **Draco**, and **Lyra** — spaced roughly 120° apart in longitude so that at least one station has line of sight to the vehicle at all times. The spacecraft carries a steerable **High-Gain Antenna HGA-1** for routine high-rate traffic and two body-fixed **Low-Gain Antennas (LGA-1, LGA-2)** that provide omnidirectional coverage for emergency and safe-mode communication.

## Light time and its operational consequence

Communication is not real time. At **T+248 days** the Aurelian is approximately **1.5 AU** from Earth, giving a **one-way light time of 13.5 minutes** and a **round-trip light time of about 27 minutes**. A question from the crew cannot receive an answer in less than 27 minutes. This is the single most important operational fact about the comms system: **during any fast-developing malfunction, the crew is autonomous.** Ground provides analysis, trend confirmation, and considered recommendations, but the time-critical decisions — isolating a coolant loop, safing a bus, aborting a burn — are made onboard against pre-published go/no-go criteria. Every malfunction procedure is written to be executed without waiting for ground.

## Link parameters

| Parameter | Value |
|---|---|
| Primary band (high rate) | Ka-band, HGA-1 |
| Command / safe-mode band | X-band, HGA-1 and LGA |
| Downlink rate (HGA, Ka, T+248) | 2.0 Mbps |
| Downlink rate (LGA, X-band) | 4 kbps |
| Uplink command rate | 2 kbps |
| One-way light time at T+248 | 13.5 min |
| Round-trip light time at T+248 | 27 min |
| Station handover cadence | every 8 hours nominal |

Routine telemetry, including all ECLSS coolant-loop parameters, is downlinked continuously on the HGA Ka-band link and recorded onboard for playback if a station handover gaps.

## Station handover

Coverage is handed between Cygnus, Draco, and Lyra approximately every 8 hours as the Earth rotates. Handover is a scripted procedure (NOM-COMM-05) with a brief planned overlap during which both stations receive; there is no data loss in a nominal handover. An unplanned gap — a station weather outage or an antenna fault — triggers onboard recording and playback on the next acquisition of signal.

## Loss of signal — causes

Loss of signal (LOS) has several distinct causes that the crew and Guidance controller (GC) must distinguish:

- **Attitude LOS** — the HGA has lost pointing lock, often during a maneuver or an attitude excursion. Recovered by reacquiring attitude or switching to LGA.
- **Solar conjunction** — when the Sun lies near the Earth–vehicle line, solar plasma corrupts the link. This is predictable from the trajectory and is the cause recorded on the Ptolemy flight (**ANOM-PTO-031**), where a planned main-engine burn was executed through a conjunction blackout on a pre-loaded sequence.
- **Occultation** — the vehicle passes behind a body; not a factor in cruise.
- **Onboard fault** — transponder, transmitter, or HGA drive failure; handled by MAL-COMM-02.

Because a main-engine burn can itself induce an attitude that breaks HGA lock, and because burns are sometimes scheduled near conjunction, the flight rules address communications blackout during a burn explicitly (see FR-COMM-2.3): a burn is **not** aborted solely for loss of signal if the guidance solution is valid, because the burn sequence is pre-loaded and executes onboard.
