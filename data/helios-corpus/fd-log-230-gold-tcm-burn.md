---
title: "Flight Director Log — Gold Shift, T+230: TCM-4 Trajectory Correction Burn"
slug: fd-log-230-gold-tcm-burn
doc_type: Flight Director Log
subsystem: Propulsion
components: ["Main Engine ME-1", "MMH Tank", "NTO Tank", "Inertial Measurement Unit IMU-1", "High-Gain Antenna HGA-1", "Onboard Recorder", "Reaction Wheel RW-1"]
crew: ["Pilot Lena Okoro", "Cmdr. Yuki Tan"]
flight_controllers: ["FLIGHT", "PROP", "GC", "CAPCOM"]
anomaly_refs: ["ANOM-PTO-031"]
procedure_id: NOM-PROP-03
mission_phase: Trans-Mars Cruise
classification: Nominal
media_type: text
duration_minutes: null
published: 2042-07-02
source_url: https://helios.aurelian.mission/fd-logs/230-gold
summary: "Gold-shift narrative of the TCM-4 mid-course correction, a routine burn executed through a planned high-gain dropout on a pre-loaded sequence, exercising FR-COMM-2.3 ahead of the Mars Orbit Insertion."
---

# Flight Director Log — Gold Shift, T+230

**Flight Director:** Gold (E. Marchetti)
**Mission Elapsed Time at shift start:** T+230:00:00
**Vehicle:** Aurelian, Trans-Mars Cruise
**Crew on console:** Pilot Lena Okoro, Cmdr. Yuki Tan

## Shift summary

Executed TCM-4, the fourth mid-course trajectory correction: a small 42-second, 11 m/s burn. Nominal in every respect. The value of this shift was less the burn itself than the rehearsal it gave us of a communications dropout during a burn, ahead of the far higher-stakes Mars Orbit Insertion.

## Timeline

**T+230:11:30** — Crew at burn minus 40, running NOM-PROP-03. Burn sequence pre-loaded to the flight computers on the IMU-1 reference. Propellant nominal against the MOI budget; no leak indications (tanks steady, no anomalous reaction-wheel momentum — the leading indicator we watch for after ANOM-HAL-018).

**T+230:11:44** — PROP confirmed the burn attitude would break HGA-1 lock; we would go dark through the burn. Reinforced to the crew per FR-COMM-2.3 that loss of signal is **not** a burn abort — a valid, pre-loaded burn completes autonomously, exactly as Ptolemy demonstrated through a conjunction blackout (ANOM-PTO-031). Only a bad guidance solution, a propulsion fault, or loss of attitude reference stops the burn.

**T+230:11:47** — Crew ran the onboard go/no-go poll: guidance valid, propellant margin go (FR-CONS-3.2), comms-blackout go (FR-COMM-2.3), no abort triggers (FR-ABORT-1.0). Aurelian GO for TCM-4.

**T+230:12:00** — Ignition. Vehicle went over the horizon as expected; we lost the high-rate link. Onboard recorder captured the burn.

**T+230:12:10** — Cutoff, link reacquired. Achieved delta-v 11.0 m/s, dead on target. HGA relocked inside 0.2°. Recorder dumped and the full burn reconstructed on the ground after the fact.

## Assessment

A clean, undramatic burn. The point I want in the log: the crew treated the comms dropout as the non-event it is. Given the ~27-minute round-trip light time, no burn is ever ground-controlled in real time; the autonomy is designed in, and the crew is comfortable with it. This is the correct mindset going into MOI, where completing the burn is mission-critical (a missed MOI is a flyby, not capture) and where a blackout is again possible.

## Handover items for Silver

1. Trajectory nominal post-TCM-4; next planned event is the Mars approach sequence.
2. No open faults. Both coolant loops nominal at this point in the mission (this predates the T+248 Loop B event).
3. Carry the TCM-4 recorder-dump reconstruction into the MOI planning as a reference for expected blackout handling.

**— Gold Flight, out.**
