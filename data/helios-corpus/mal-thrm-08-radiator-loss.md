---
title: "Malfunction Procedure MAL-THRM-08: Radiator Loss / Heat Rejection Fault"
slug: mal-thrm-08-radiator-loss
doc_type: Malfunction Procedure
subsystem: Thermal
components: ["Radiator Panel 1", "Radiator Panel 2", "Radiator Panel 3", "Radiator Panel 4", "Coolant Loop A", "Coolant Loop B", "Isolation Valve MV-207", "Interloop Heat Exchanger IHX-1", "Cabin Heat Exchanger CHX-1"]
crew: ["Flt.Eng. Marco Reyes", "Sci. Priya Anand"]
flight_controllers: ["EECOM", "GC", "FLIGHT"]
anomaly_refs: ["ANOM-KEP-022", "ANOM-PTO-007"]
procedure_id: MAL-THRM-08
mission_phase: Anomaly Response
classification: Off-Nominal
media_type: text
duration_minutes: null
published: 2041-10-05
source_url: https://helios.aurelian.mission/procedures/mal-thrm-08
summary: "Procedure for degraded heat rejection from a radiator panel — micrometeoroid puncture, attitude view loss, or flow blockage — including panel isolation and the resulting reduction in cooling capacity."
---

# Malfunction Procedure MAL-THRM-08: Radiator Loss / Heat Rejection Fault

**Entry condition:** Coolant return temperature rising with pump and loop pressure nominal, a radiator panel outlet temperature anomaly, or a coolant leak localized to a radiator panel.
**Classification:** Off-Nominal; escalates with cabin thermal excursion (MAL-ECLSS-03).

## 1. Characterize

1.1 Record each panel's inlet/outlet temperatures, coolant return temperature, loop pressure, and vehicle attitude. A panel not rejecting heat shows a small inlet-to-outlet temperature drop.
1.2 Distinguish the cause:
   - **View loss** — an unfavourable attitude reduces a panel's view to deep space. Correctable by attitude (coordinate with GC).
   - **MMOD puncture** — a micrometeoroid strike punctures a panel, causing a coolant leak on that loop (ANOM-KEP-022). This is also a MAL-ECLSS-07 case.
   - **Flow blockage** — reduced flow through a panel; may be a loop-side restriction (ANOM-PTO-007).

## 2. View loss

2.1 If attitude-driven, coordinate a return to a radiator-favourable attitude. Confirm panel outlet temperatures recover. No isolation required.

## 3. MMOD puncture on a panel

3.1 A punctured panel leaks coolant. If on Loop B, isolate the loop from its panels by closing **MV-207** (this also isolates the healthy Loop B panel) and follow MAL-ECLSS-07 for the pressure loss.
3.2 With Loop B isolated, cooling reverts to Loop A single-loop capacity (~3.8 kW); manage cabin temperature per MAL-ECLSS-03.
3.3 Where the design permits isolating a single panel rather than the whole loop, isolate only the punctured panel to preserve the remaining panel's capacity; confirm loop pressure stabilizes after single-panel isolation.

## 4. Flow blockage

4.1 A flow restriction with intact loop pressure is corrected by flow balancing per NOM-ECLSS-15. If CHX-1 fouling is implicated (ANOM-PTO-007), balance flow to restore cabin cooling.

## 5. Capacity accounting

5.1 Each healthy panel rejects ~2.1 kW. Nominal load is 5.5 kW against 8.4 kW installed. Losing one panel (down to 6.3 kW) still covers nominal load; losing a full loop's two panels (down to 4.2 kW) requires load shed and cabin-temperature management.
5.2 Report the surviving rejection capacity to EECOM for the thermal timeline (MAL-ECLSS-03).

## 6. Notify

6.1 Downlink panel temperatures and attitude to EECOM/GC.

## Reference anomalies
- **ANOM-KEP-022** — MMOD puncture of Radiator Panel 3, coolant leak on Loop B.
- **ANOM-PTO-007** — CHX-1 fouling reduced heat rejection with loop pressure nominal.
