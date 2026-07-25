---
title: "Voice Loop VOICE-248-02: Coolant Loop B Isolation and Transition to Single-Loop Cooling"
slug: voice-02-loop-b-isolation-decision
doc_type: Voice Loop
subsystem: ECLSS
components: ["Coolant Loop B", "Accumulator ACC-2", "Pump P-204", "Isolation Valve MV-207", "Interloop Heat Exchanger IHX-1", "Coolant Loop A", "Cabin Heat Exchanger CHX-1", "Cold Plate CP-12"]
crew: ["Flt.Eng. Marco Reyes", "Cmdr. Yuki Tan", "Sci. Priya Anand"]
flight_controllers: ["CAPCOM", "EECOM", "FLIGHT", "SURGEON"]
anomaly_refs: ["ANOM-HAL-011"]
procedure_id: MAL-ECLSS-07
mission_phase: Anomaly Response
classification: Emergency
media_type: audio
duration_minutes: 18
published: 2042-07-20
source_url: https://helios.aurelian.mission/voice-loops/voice-248-02
summary: "The isolation decision voice loop: after two accumulator recharges fail to hold, the crew hits the sustained decay criterion, closes MV-207, commands P-204 off, transfers heat to Loop A, and begins load shed under MAL-ECLSS-07 and MAL-ECLSS-03."
---

# Voice Loop VOICE-248-02: Coolant Loop B Isolation and Transition to Single-Loop Cooling

**Aurelian air-to-ground, EECOM coordination loop**
**Duration: 18 minutes** · **One-way light time: 13.5 min**
**Speakers:** Flt.Eng. Marco Reyes (crew, "Aurelian"); Cmdr. Yuki Tan (crew); Sci. Priya Anand (crew); CAPCOM (ground); EECOM (ground, patched)

---

**T+248:05:42 — REYES (Aurelian):** EECOM, Aurelian. Update on Loop B. We did two accumulator recharges per NOM-twelve. First one held about forty minutes, second one held under twenty. Precharge is not staying at three-four-zero. This is the bladder. It's HAL-eleven.

**T+248:05:43 — TAN (Aurelian):** And the numbers have crossed. Pressure is two-six-eight, below the two-seventy Low warning — we have the master alarm. Decay rate is now five-point-four kilopascals an hour, sustained over the last three readings. That's the isolation criterion, go/no-go two. We are NO-GO for continued Loop B operation.

**T+248:05:44 — REYES (Aurelian):** Confirming the criteria for the log: decay five-point-four, over five per hour sustained — that's the trigger. Pressure two-six-eight, still above two-fifty but we don't need it, one criterion is enough. ACC-2 quantity now one-point-one and starting to drop as the bladder lets go. We are isolating Loop B.

**T+248:05:45 — TAN (Aurelian):** Marco, on my mark, close MV-two-oh-seven, then P-204 off. Priya, stand by for load shed on my call. Mark.

**T+248:05:46 — REYES (Aurelian):** MV-two-oh-seven commanded closed. Confirm valve closed, Loop B isolated from Panels three and four. P-204 commanded off. Pump's spinning down. Loop B is safed.

**T+248:05:47 — ANAND (Aurelian):** Confirming heat transfer. CHX-one is rejecting through IHX-one to Loop A. Loop A pressure holding three-one-oh, flow point-eight-six — Loop A took the load. Cabin's at twenty-two-point-six, basically setpoint. CP-twelve flight-computer cold plate is on Loop A now through the interloop exchanger, inlet's nominal.

**T+248:05:48 — TAN (Aurelian):** Good. Priya, execute load shed per NOM-EPS-oh-two — payload and science first, then galley. Let's pull that fourteen hundred watts of heat generation out and hold the rise to point-six.

**T+248:05:49 — ANAND (Aurelian):** Load shed in work. Payload and science off — that's seven hundred watts. Galley and non-essential cabin — another five hundred. Secondary avionics string — two hundred. Total about fourteen hundred watts shed. Not touching pumps, scrubbers, water processor, or the flight computers. Confirm.

**T+248:05:50 — REYES (Aurelian):** Concur, essentials all up. We are on single-loop cooling, Loop A only, load shed applied. Transitioning to MAL-ECLSS-oh-three for the thermal timeline. Priya, log start time — cabin twenty-two-point-six at five-fifty. Projected point-six per hour. That's the twenty-seven caution around thirteen-twenty, call it seven and a half hours out.

**T+248:05:59 — CAPCOM:** Aurelian, EECOM. We copy your NO-GO on Loop B — we see the five-point-four decay and the quantity starting to fall, agreed, that's the bladder giving up exactly like Halley. Concur isolation. When you get this we expect you've already closed MV-two-oh-seven; do not wait for us. SURGEON's on the loop for the thermal timeline.

**T+248:06:01 — TAN (Aurelian):** EECOM, Aurelian — affirmative, Loop B is already isolated, single-loop cooling established, load shed done. We're twelve minutes ahead of your transmission. Cabin twenty-two-point-seven, rise reading right at point-six per hour as advertised. We have roughly seven and a half hours to the twenty-seven caution and about twelve to the thirty-degree avionics limit. That's plenty of margin to work the recovery options.

**T+248:06:12 — CAPCOM:** Aurelian, EECOM and SURGEON copy — single loop, load shed, cabin nominal, point-six per hour. That matches our projection. This is a stable, survivable configuration — you are nowhere near an abort criterion, one healthy loop is fine per the flight rules. Here's the plan from the ground: we work whether Loop B can ever come back. Per FR-ECLSS-four-point-one you can't return it on a failed bladder, so realistically Loop B is done for the cruise. We'll assess the single-loop config against the Mars approach timeline and consumables and get you a recommendation. No rush at your end.

**T+248:06:14 — REYES (Aurelian):** Copy all. Loop B stays isolated, we don't chase the bladder. We'll hold single-loop, keep the cabin managed under MAL-oh-three, and stand by for your approach assessment. Cabin twenty-two-point-eight, tracking point-six. Aurelian's in good shape. Out.

---

*Recorded on the EECOM coordination loop. Continues from VOICE-248-01.*
