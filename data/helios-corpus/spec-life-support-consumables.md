---
title: "Subsystem Specification: Life Support and Consumables"
slug: spec-life-support-consumables
doc_type: Subsystem Spec
subsystem: Life Support
components: ["CO2 Scrubber Bed A", "CO2 Scrubber Bed B", "Oxygen Tank O2-1", "Nitrogen Tank N2-1", "Water Processor", "Cabin Heat Exchanger CHX-1", "Coolant Loop A", "Coolant Loop B"]
crew: ["Sci. Priya Anand", "Flt.Eng. Marco Reyes", "Cmdr. Yuki Tan", "Pilot Lena Okoro"]
flight_controllers: ["SURGEON", "EECOM", "FLIGHT"]
anomaly_refs: ["ANOM-PTO-045"]
procedure_id: null
mission_phase: Trans-Mars Cruise
classification: Nominal
media_type: text
duration_minutes: null
published: 2041-09-30
source_url: https://helios.aurelian.mission/specs/life-support/consumables
summary: "Specification for the Aurelian atmosphere, water and consumables systems, including the regenerable CO2 scrubbers, oxygen and nitrogen partial-pressure setpoints, and the consumables margins that anchor the abort and go/no-go flight rules."
---

# Subsystem Specification: Life Support and Consumables

## Overview

The Life Support system maintains a breathable cabin atmosphere, recovers water, and manages the crew consumables that ultimately bound mission duration for the four-person crew. It shares the coolant loops for equipment cooling and shares the **Cabin Heat Exchanger CHX-1** for atmosphere conditioning, so a coolant-loop failure degrades both cabin temperature and the equipment that maintains air quality.

## Atmosphere

| Parameter | Setpoint | Range |
|---|---|---|
| Total cabin pressure | 101.3 kPa | 96 – 104 kPa |
| Oxygen partial pressure | 21.3 kPa | 19 – 23 kPa |
| Nitrogen partial pressure | 79.0 kPa | — |
| CO2 partial pressure | < 0.4 kPa | alarm at 0.7 kPa |
| Relative humidity | 45 % | 30 – 60 % |

Carbon dioxide is removed by two **regenerable amine scrubber beds** (Bed A, Bed B) operating in a swing cycle: one bed adsorbs while the other desorbs to space. The scrubbers are among the largest life-support electrical and thermal loads and are on the load-shed list only as a last resort — CO2 removal is a survival function.

## Water and oxygen

The **Water Processor** recovers humidity condensate and wastewater to potable standard at approximately 85 % recovery. Oxygen is supplied from stored high-pressure **O2-1** and replenished nitrogen from **N2-1**; a small oxygen-generation capability supplements stores.

## Consumables margins

Consumables are the ultimate driver of the abort and duration flight rules (FR-CONS-3.2). At **T+248 days** the standing margins for the four-person crew are:

| Consumable | Onboard | Days of margin above plan |
|---|---|---|
| Oxygen | — | 96 days |
| Water | — | 74 days |
| CO2 scrubber capacity | regenerable | not consumable-limited |
| Food | — | 88 days |
| Propellant (see Propulsion) | — | mission-limiting for MOI, not crew survival |

The binding consumable is **water at 74 days of margin**. The consumables flight rules require that planned mission duration plus contingency never exceed the binding-consumable margin, and a coolant or thermal contingency that extends the timeline is assessed against this number.

## Coupling to thermal and coolant systems

The scrubbers, water processor, and oxygen systems all reject heat to the coolant loops. During single-loop degraded cooling (see the Thermal Control specification), life-support equipment is the **last** category to be load-shed because it protects crew survival; payload, galley, and secondary avionics are shed first. A cabin depressurization event affects both atmosphere and thermal balance and is handled by MAL-ECLSS-11; a slow cabin seal leak was recorded on the Ptolemy flight (**ANOM-PTO-045**).
