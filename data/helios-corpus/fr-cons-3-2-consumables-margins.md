---
title: "Flight Rule FR-CONS-3.2: Consumables Margins"
slug: fr-cons-3-2-consumables-margins
doc_type: Flight Rule
subsystem: Life Support
components: ["Oxygen Tank O2-1", "Nitrogen Tank N2-1", "Water Processor", "CO2 Scrubber Bed A", "CO2 Scrubber Bed B", "MMH Tank", "NTO Tank"]
crew: ["Cmdr. Yuki Tan", "Sci. Priya Anand", "Flt.Eng. Marco Reyes", "Pilot Lena Okoro"]
flight_controllers: ["SURGEON", "EECOM", "PROP", "FLIGHT"]
anomaly_refs: ["ANOM-PTO-045"]
procedure_id: null
mission_phase: Contingency
classification: Off-Nominal
media_type: text
duration_minutes: null
published: 2041-10-12
source_url: https://helios.aurelian.mission/flight-rules/fr-cons-3-2
summary: "Flight rules defining required consumables margins for oxygen, water, food, and propellant, identifying water as the binding consumable at 74 days at T+248, and the accounting that feeds the abort criteria."
---

# Flight Rule FR-CONS-3.2: Consumables Margins

These rules define the required margins for crew consumables and propellant and the accounting that supports the abort criteria (FR-ABORT-1.0).

## Rule 3.2.1 — Standing margins at T+248

For the four-person crew, the margins above the nominal plan are:

| Consumable | Margin above plan |
|---|---|
| Oxygen | 96 days |
| Water | **74 days (binding)** |
| Food | 88 days |
| CO2 scrubbing | regenerable, not consumable-limited |

**Water is the binding consumable.** All duration and contingency assessments are made against the water margin unless a specific event moves another consumable below it.

## Rule 3.2.2 — The margin rule

Planned mission duration plus contingency reserve shall not exceed the binding-consumable margin. Any contingency that extends the timeline (a coolant/thermal event forcing a slower approach, a trajectory change) shall be re-assessed against the binding margin before it is adopted.

## Rule 3.2.3 — Event accounting

Every event that consumes stores shall be logged and the margin re-projected:

- **Repressurization** after a cabin leak (MAL-ECLSS-11, as in ANOM-PTO-045) consumes N2 and O2 and can move the atmosphere margin materially.
- **Water-processor degradation** below 85 % recovery directly erodes the binding margin.
- **Scrubber degradation** shortens swing-cycle life; monitored against the 0.7 kPa CO2 alarm.

## Rule 3.2.4 — Propellant margin

Propellant is accounted separately because it bounds **mission success (MOI)** rather than crew survival. Projected propellant at Mars arrival shall exceed the MOI requirement (2 210 kg MMH / 3 580 kg NTO) plus reserve. A shortfall is a propulsion/abort matter (FR-ABORT-1.0, MAL-PROP-06), not a crew-survival consumable.

## Rule 3.2.5 — Conservation precedence

When conservation is required (MAL-LIFE-01), reduce discretionary uses first — hygiene water, crew activity level, non-essential power — and protect the survival functions (CO2 removal, potable water, coolant make-up) last.

## Rule 3.2.6 — Reporting cadence

Consumables margins are re-projected each shift by the Flight Engineer and reported to SURGEON/EECOM, and immediately after any consuming event. Early visibility of a declining margin preserves the widest abort window (FR-ABORT-1.0).
