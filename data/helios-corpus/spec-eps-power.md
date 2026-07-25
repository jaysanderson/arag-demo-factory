---
title: "Subsystem Specification: Electrical Power System — Buses A and B"
slug: spec-eps-power
doc_type: Subsystem Spec
subsystem: EPS
components: ["Bus A", "Bus B", "Solar Array SA-1", "Solar Array SA-2", "Battery BAT-1", "Battery BAT-2", "Cross-tie Contactor XT-1", "Pump P-203", "Pump P-204"]
crew: ["Flt.Eng. Marco Reyes", "Pilot Lena Okoro"]
flight_controllers: ["EPS", "EECOM", "FLIGHT"]
anomaly_refs: ["ANOM-HAL-003"]
procedure_id: null
mission_phase: Trans-Mars Cruise
classification: Nominal
media_type: text
duration_minutes: null
published: 2041-09-30
source_url: https://helios.aurelian.mission/specs/eps/buses-ab
summary: "Specification for the Aurelian 120 VDC dual-bus electrical power system, including solar array and battery capacity, bus load limits, the cross-tie contactor, and the power dependency of the two coolant pumps."
---

# Subsystem Specification: Electrical Power System — Buses A and B

## Architecture

The Aurelian Electrical Power System (EPS) distributes power on two independent **120 VDC** main buses, **Bus A** and **Bus B**. Each bus is fed by a dedicated solar array wing (**SA-1** to Bus A, **SA-2** to Bus B) and backed by a lithium-ion battery (**BAT-1** on Bus A, **BAT-2** on Bus B). The buses can be joined by the **cross-tie contactor XT-1** to allow either source to carry both buses during a fault.

The dual-bus split is aligned with the coolant-loop split: **Pump P-203** (Coolant Loop A) is powered from Bus A, and **Pump P-204** (Coolant Loop B) is powered from Bus B. This alignment means a single bus fault threatens one coolant loop, which is why bus and coolant contingencies are cross-referenced.

## Capacity

| Parameter | Value |
|---|---|
| Bus voltage | 120 VDC (114 – 126 VDC operating) |
| Per-bus continuous rating | 4.0 kW |
| Solar array output at 1.5 AU | 4.6 kW per wing |
| Battery capacity | 40 Ah each, 120 VDC |
| Battery reserve (each) | 4.8 kWh |
| Total continuous system rating | 8.0 kW |

At the Trans-Mars Cruise distance of approximately 1.5 AU the arrays produce reduced output relative to their near-Sun rating; the 4.6 kW-per-wing figure above is the cruise value and remains above the nominal per-bus load.

## Nominal load allocation

The nominal cruise electrical load is approximately **6.2 kW**, distributed:

| Load | Bus | Power |
|---|---|---|
| Avionics and flight computers | A / B split | 1.9 kW |
| Coolant Pump P-203 | A | 0.12 kW |
| Coolant Pump P-204 | B | 0.12 kW |
| Life support (scrubbers, water, O2) | A / B split | 1.6 kW |
| Comms (transmitter, HGA drive) | A | 0.9 kW |
| Cabin systems, lighting, galley | B | 0.9 kW |
| Payload and science | B | 0.7 kW |

## Cross-tie operation

If a bus source (array or battery) fails, XT-1 is closed to power both buses from the healthy source. Because combined load (6.2 kW) approaches the single-source rating, a cross-tie is accompanied by a load shed of non-essential equipment to keep the surviving source within its 4.6 kW continuous limit. The coolant pumps are **essential** loads and are never shed; if Loop B is isolated for a coolant reason, however, P-204 is commanded off, which frees 0.12 kW and simplifies the power picture.

## Load shed categories

Non-essential loads, in shed priority order, are: payload and science (0.7 kW), then galley and non-essential cabin systems (up to 0.5 kW), then secondary avionics (up to 0.2 kW). Full non-essential shed frees approximately **1.4 kW**, which is the same figure used in the Thermal Control specification for reducing heat generation during single-loop cooling.

## Bus fault history

A Bus A distribution fault caused by a failed power MOSFET was recorded on the Halley flight (**ANOM-HAL-003**). The fault dropped Bus A and, with it, Coolant Pump P-203, forcing a cross-tie of P-203 to Bus B and demonstrating the coupling between the EPS and ECLSS contingencies. The event is the reference case for the power-bus fault procedure MAL-EPS-04.
