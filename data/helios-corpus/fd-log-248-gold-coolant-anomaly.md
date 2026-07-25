---
title: "Flight Director Log — Gold Shift, T+248: Coolant Loop B Pressure Drop and Isolation"
slug: fd-log-248-gold-coolant-anomaly
doc_type: Flight Director Log
subsystem: ECLSS
components: ["Coolant Loop B", "Accumulator ACC-2", "Pump P-204", "Isolation Valve MV-207", "Coolant Loop A", "Interloop Heat Exchanger IHX-1", "Cabin Heat Exchanger CHX-1"]
crew: ["Cmdr. Yuki Tan", "Flt.Eng. Marco Reyes", "Sci. Priya Anand"]
flight_controllers: ["FLIGHT", "EECOM", "CAPCOM", "SURGEON"]
anomaly_refs: ["ANOM-HAL-011", "ANOM-KEP-014"]
procedure_id: MAL-ECLSS-07
mission_phase: Anomaly Response
classification: Emergency
media_type: text
duration_minutes: null
published: 2042-07-20
source_url: https://helios.aurelian.mission/fd-logs/248-gold
summary: "Gold-shift flight director narrative of the T+248 Coolant Loop B pressure drop: the leak-versus-gas diagnosis, the failed accumulator recharges, the isolation at the sustained-decay criterion, and the transition to a stable single-loop condition."
---

# Flight Director Log — Gold Shift, T+248

**Flight Director:** Gold (E. Marchetti)
**Mission Elapsed Time at shift start:** T+248:00:00
**Vehicle:** Aurelian, Trans-Mars Cruise
**Crew on console:** Cmdr. Yuki Tan, Flt.Eng. Marco Reyes, Sci. Priya Anand

## Shift summary

This shift owned the most significant ECLSS event of the cruise to date: a pressure drop on Coolant Loop B that resolved to an accumulator bladder failure and ended in a planned loop isolation. The crew ran MAL-ECLSS-07 cleanly and the vehicle is stable on single-loop cooling. No abort criterion was approached at any point.

## Timeline

**T+248:02:16** — Loop B Low caution at 285 kPa. Crew opened MAL-ECLSS-07 and began 15-minute trend logging. EECOM confirmed Loop A healthy and untouched — the correct instinct, protect the fallback loop first (FR-ECLSS-4.1 Rule 4.1.1).

**T+248:02:30–02:50** — Diagnosis. Three readings showed smooth pressure decay (~3 kPa/hr) with **steady accumulator quantity** — the gas-ingress signature, not a leak. Crew and EECOM converged on the Halley precedent, ANOM-HAL-011, an accumulator bladder permeation on this same loop. I want to note for the record how fast the crew reached the right analog; the corpus work pairing HAL-011 to this failure mode paid off. Distinguished from the Kepler cavitation case ANOM-KEP-014 by the absence of oscillation.

**T+248:03:00–05:40** — Crew remained on Loop B under monitoring (no isolation criterion met) and serviced ACC-2 twice per NOM-ECLSS-12. Neither recharge held — first ~40 min, second under 20. That is diagnostic: a serviceable gas pocket clears and stays cleared; a failed bladder does not hold precharge. This is exactly the HAL-011 behavior and the reason FR-ECLSS-4.1 forbids chasing a failed bladder with repeated recharge.

**T+248:05:43** — Loop B crossed the Low warning at 270 kPa and, more importantly, hit a **sustained decay of 5.4 kPa/hr** over three readings — isolation criterion (go/no-go 2). Crew called NO-GO for continued Loop B operation.

**T+248:05:46** — Isolation executed: MV-207 closed, P-204 off. Heat transferred to Loop A through IHX-1; Loop A absorbed the load with pressure and flow unchanged. Load shed of ~1.4 kW applied per NOM-EPS-02. Transitioned to MAL-ECLSS-03 for the thermal timeline.

## Assessment

The vehicle is in a **stable, survivable, indefinite configuration**: one healthy loop covering survival cooling with margin, cabin managed at a controlled rise of 0.6 °C/hr, never having reached the 27 °C caution. Per FR-ABORT-1.0, a single-loop-out condition is not an abort criterion, and we are not close to one. Loop B is unrecoverable (failed bladder) and stays isolated per FR-ECLSS-4.1 Rule 4.1.5.

## Handover items for Silver

1. Continue MAL-ECLSS-03 cabin management; downlink thermal and consumables trends each shift.
2. Begin the single-loop assessment against the Mars approach and MOI timeline — first look is no impact, but confirm the MOI burn-attitude thermal transient fits single-loop capacity.
3. Crew is in good shape; SURGEON monitoring the warmer cabin. No action pending from the ground that the crew must wait on.

**— Gold Flight, out.**
