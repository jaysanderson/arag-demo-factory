---
title: "Subsystem Specification: Avionics and Flight Computer Architecture"
slug: spec-avionics
doc_type: Subsystem Spec
subsystem: Avionics
components: ["Flight Computer FC-A", "Flight Computer FC-B", "Flight Computer FC-C", "Cold Plate CP-12", "Data Bus", "Caution and Warning Unit", "Coolant Loop A", "Coolant Loop B"]
crew: ["Sci. Priya Anand", "Flt.Eng. Marco Reyes"]
flight_controllers: ["EECOM", "GC", "FLIGHT"]
anomaly_refs: ["ANOM-PTO-007"]
procedure_id: null
mission_phase: Trans-Mars Cruise
classification: Nominal
media_type: text
duration_minutes: null
published: 2041-09-30
source_url: https://helios.aurelian.mission/specs/avionics/flight-computers
summary: "Specification for the Aurelian triple-redundant flight computer architecture, the caution and warning system, and the cold-plate cooling dependency that ties avionics health to the coolant loops and cabin thermal limits."
---

# Subsystem Specification: Avionics and Flight Computer Architecture

## Overview

The Aurelian avionics comprise three voting **flight computers** — **FC-A**, **FC-B**, and **FC-C** — a redundant data bus, and the **Caution and Warning Unit** that annunciates subsystem alarms to the crew. The flight computers host the GNC, thermal control (TCU), power management, and life-support control functions. Two-of-three voting masks a single computer fault.

## Cooling dependency

The flight computers dissipate heat to the coolant loops through liquid **cold plates**. The primary computer stack is served by **Cold Plate CP-12**, which is on **Coolant Loop B**. This is an important coupling: a loss of Coolant Loop B removes active cooling from CP-12, and the computer stack must be re-cooled through the interloop heat exchanger by Loop A or the affected units must be load-shed. Avionics inlet air temperature is bounded by the **30 °C avionics limit** in the Thermal Control specification; above it, non-essential avionics are powered down to protect the voting computers.

This coupling is why a coolant or cabin-thermal event is never purely a "comfort" issue — sustained cabin temperature above the avionics limit endangers the flight computers themselves.

## Caution and warning

The Caution and Warning Unit annunciates three severity levels:

- **Advisory (caution)** — amber; crew acknowledges and monitors. Example: coolant Low caution at 285 kPa.
- **Warning** — master alarm, audible; crew executes the applicable malfunction procedure. Example: coolant Low warning at 270 kPa.
- **Emergency** — highest severity, associated with immediate crew-safety events such as cabin depressurization or fire.

Every alarm maps to a published procedure; the crew's first action on any warning is to identify the annunciated subsystem and open the corresponding malfunction procedure.

## Redundancy management

A single flight-computer fault is voted out and the crew is advised. Loss of a second computer degrades to a single string, at which point non-essential software functions are shed to protect core GNC and life-support control. The data bus is dual-redundant; a bus fault fails over automatically.

## Thermal history

The Ptolemy flight's cabin thermal rise from CHX-1 fouling (**ANOM-PTO-007**) is instructive for avionics operators: as cabin and coolant-return temperatures climbed, avionics inlet air approached the caution threshold before the underlying coolant-flow restriction was diagnosed. The event reinforced the rule that a rising cabin temperature is investigated as a coolant-system problem, not merely trimmed at the thermostat.
