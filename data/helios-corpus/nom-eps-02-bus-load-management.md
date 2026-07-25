---
title: "Nominal Procedure NOM-EPS-02: Bus Load Management and Load Shed"
slug: nom-eps-02-bus-load-management
doc_type: Nominal Procedure
subsystem: EPS
components: ["Bus A", "Bus B", "Battery BAT-1", "Battery BAT-2", "Solar Array SA-1", "Solar Array SA-2", "Cross-tie Contactor XT-1", "Pump P-203", "Pump P-204", "CO2 Scrubber Bed A"]
crew: ["Flt.Eng. Marco Reyes", "Pilot Lena Okoro"]
flight_controllers: ["EPS", "EECOM", "FLIGHT"]
anomaly_refs: ["ANOM-HAL-003"]
procedure_id: NOM-EPS-02
mission_phase: Trans-Mars Cruise
classification: Nominal
media_type: text
duration_minutes: null
published: 2041-10-08
source_url: https://helios.aurelian.mission/procedures/nom-eps-02
summary: "Routine procedure for daily power configuration and the load-shed category list, defining which loads are shed and in what order to free up to 1.4 kW for cross-tie operation or single-loop cooling."
---

# Nominal Procedure NOM-EPS-02: Bus Load Management and Load Shed

**Purpose:** Manage the daily electrical configuration on Buses A and B, and define the authoritative **load-shed category list** used by the power (MAL-EPS-04) and thermal (MAL-ECLSS-03, MAL-ECLSS-07) contingencies. The load-shed list is the single reference for "what can be turned off" across the corpus.

## 1. Daily power configuration

1.1 Confirm both buses at 120 VDC (114–126 VDC), each within its 4.0 kW continuous rating, and array output covering load with the batteries at or near full charge.
1.2 Nominal cruise load is ~6.2 kW split across the two buses (see the EPS specification). Confirm the coolant pumps (P-203 on Bus A, P-204 on Bus B) are powered — these are **essential** and never shed.

## 2. Load-shed categories

Shed non-essential load in this priority order:

| Priority | Category | Approx. power | Notes |
|---|---|---|---|
| 1 | Payload and science | 0.7 kW | First to shed; no vehicle impact |
| 2 | Galley and non-essential cabin systems | 0.5 kW | Crew comfort impact only |
| 3 | Secondary avionics strings | 0.2 kW | Protects voting computers indirectly |
| — | **Total non-essential** | **1.4 kW** | Full shed value |

**Never shed:** coolant pumps P-203/P-204, CO2 scrubbers (Bed A/B), water processor, core flight computers FC-A/B/C, GNC, and life-support atmosphere control. These are survival and vehicle-critical.

## 3. When to shed

3.1 **Power reason:** a bus fault with cross-tie (MAL-EPS-04) where combined load must be held within the 4.6 kW single-source limit.
3.2 **Thermal reason:** single-loop cooling (MAL-ECLSS-07 / MAL-ECLSS-03), where shedding 1.4 kW of load reduces heat generation and lowers the cabin rise from ~0.9 to 0.6 °C/hr.
3.3 The 1.4 kW figure is used identically for both reasons — shedding load reduces both electrical draw and heat generation.

## 4. Cross-tie coordination

4.1 Before closing XT-1 to join buses (as in the ANOM-HAL-003 recovery), apply the shed so the surviving source stays within rating.
4.2 After the contingency clears, restore loads in reverse priority order (secondary avionics, then galley, then payload), confirming bus margins at each step.

## 5. Log

5.1 Record the shed configuration, time, and reason. Downlink to EPS/EECOM. Restoration is also logged so the mission power and thermal timelines stay consistent.

## Related
- Invoked by **MAL-EPS-04**, **MAL-ECLSS-03**, **MAL-ECLSS-07**.
- Reference event: **ANOM-HAL-003** (bus fault, cross-tie with shed).
