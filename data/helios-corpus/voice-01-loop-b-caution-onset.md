---
title: "Voice Loop VOICE-248-01: Coolant Loop B Low-Pressure Caution Onset"
slug: voice-01-loop-b-caution-onset
doc_type: Voice Loop
subsystem: ECLSS
components: ["Coolant Loop B", "Accumulator ACC-2", "Pump P-204", "Cabin Heat Exchanger CHX-1", "Radiator Panel 3", "Coolant Loop A"]
crew: ["Flt.Eng. Marco Reyes", "Cmdr. Yuki Tan"]
flight_controllers: ["CAPCOM", "EECOM", "FLIGHT"]
anomaly_refs: ["ANOM-HAL-011", "ANOM-KEP-014"]
procedure_id: MAL-ECLSS-07
mission_phase: Anomaly Response
classification: Off-Nominal
media_type: audio
duration_minutes: 14
published: 2042-07-20
source_url: https://helios.aurelian.mission/voice-loops/voice-248-01
summary: "CAPCOM-crew voice loop capturing the onset of the Coolant Loop B pressure drop at T+248, from the 285 kPa Low caution through the first trend readings and the leak-versus-gas-ingress diagnosis, with the 27-minute round-trip delay evident."
---

# Voice Loop VOICE-248-01: Coolant Loop B Low-Pressure Caution Onset

**Aurelian air-to-ground, EECOM coordination loop**
**Duration: 14 minutes** · **One-way light time: 13.5 min**
**Speakers:** Flt.Eng. Marco Reyes (crew, "Aurelian"); Cmdr. Yuki Tan (crew); CAPCOM (ground); EECOM (ground, patched)

---

**T+248:02:16 — REYES (Aurelian):** Houston-equivalent, Aurelian. We have a Loop B Low caution, coolant pressure two-eight-five and dropping. No warning yet. Yuki's pulling MAL-ECLSS-oh-seven. Starting trend log now — pressure, ACC-2 quantity, P-204 delta-P, cabin temp, every fifteen.

**T+248:02:17 — TAN (Aurelian):** Confirm Loop A is clean. A pressure three-one-oh, flow point-eight-five. We're not touching Loop A. Loop A is the fallback.

**T+248:02:29 — CAPCOM:** Aurelian, EECOM copies your Loop B Low caution at two-eight-five. Concur pulling MAL-ECLSS-oh-seven. We're watching the same telemetry down here, thirteen and a half minutes behind you. Do not wait on us for the go/no-go — you run the procedure. Give us the leak-versus-gas call as soon as you have three readings.

**T+248:02:31 — REYES (Aurelian):** Copy, don't wait. Understood. We're already there — this is the whole point of the procedure, we're autonomous on the fast stuff. Reading two: pressure two-eight-two, ACC-2 quantity one-point-nine liters, holding. P-204 delta-P sixty-four, steady, no noise.

**T+248:02:33 — TAN (Aurelian):** So far the accumulator quantity is not moving with the pressure. That reads gas-side to me, not a leak. But we want three readings before we call it. Marco, what's the decay rate looking like?

**T+248:02:34 — REYES (Aurelian):** About three kilopascals an hour. Smooth, not oscillating yet. That's the part that's bugging me — gas ingress usually gives me oscillation and delta-P noise, like Kepler fourteen. This is clean decay. But the quantity's steady, which is not a leak signature.

**T+248:02:35 — TAN (Aurelian):** Then it's the Halley case. Eleven. Bladder permeation — steady quantity, smooth decay, and the recharge won't hold. That's ANOM-HAL-oh-one-one almost exactly, same loop, same everything.

**T+248:02:46 — CAPCOM:** Aurelian, EECOM. We see your reading two, two-eight-two, quantity steady. We agree the signature is trending gas-side, and we agree HAL-eleven is the closest analog — accumulator bladder. Recommend you get your third reading, then if quantity is still steady, service the accumulator per NOM-ECLSS-twelve: verify precharge three-four-zero, bleed at the high point. If the recharge won't hold, you treat it as unrecoverable, same as Halley. Do not chase it with repeated recharge.

**T+248:02:48 — REYES (Aurelian):** Copy all. Reading three: pressure two-seven-nine, ACC-2 quantity one-point-nine, still steady. Delta-P sixty-three. Decay rate holding around three per hour, well under the five-per-hour isolation line. Pressure's above two-seventy, so no warning, no isolation trigger yet.

**T+248:02:49 — TAN (Aurelian):** Calling it: classify as gas ingress, probable accumulator bladder, consistent with HAL-eleven. We're go to service ACC-2 per NOM-twelve. Marco's setting up the GN2 panel. We are staying on Loop B under monitoring — none of the four isolation criteria are met.

**T+248:02:50 — REYES (Aurelian):** For the record, isolation criteria check: pressure two-seven-nine, above two-fifty — no. Decay three per hour, under five — no. ACC-2 quantity one-point-nine, above point-eight — no. No cavitation, delta-P steady — no. All four no. We're go to stay on Loop B and service.

**T+248:03:01 — CAPCOM:** Aurelian, EECOM concurs with your classification and your go to remain on Loop B and service the accumulator. We're pulling HAL-eleven up here to walk it in parallel. Reminder for the timeline: if this is the bladder, expect the recharge not to hold and be ready to go to the isolation branch. If you isolate, you're straight into single-loop thermal — cabin rise about point-six per hour with load shed, seven and a half hours to the twenty-seven caution. You have time, but start thinking about the load-shed plan now.

**T+248:03:03 — TAN (Aurelian):** Copy the timeline. We're ahead of you on it — Priya's already staging the load-shed list, payload and galley first. If we isolate we won't be scrambling. Aurelian will call you after the first recharge attempt.

**T+248:03:04 — REYES (Aurelian):** GN2 panel configured. Starting the accumulator service now. Next call after we see whether it holds. Aurelian out.

---

*Recorded on the EECOM coordination loop. Continues in VOICE-248-02 (isolation decision).*
