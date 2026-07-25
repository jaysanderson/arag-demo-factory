---
title: "Malfunction Procedure MAL-ECLSS-03: Cabin Thermal Excursion"
slug: mal-eclss-03-cabin-thermal-excursion
doc_type: Malfunction Procedure
subsystem: Thermal
components: ["Cabin Heat Exchanger CHX-1", "Coolant Loop A", "Coolant Loop B", "Interloop Heat Exchanger IHX-1", "Cold Plate CP-12", "Thermal Control Unit TCU", "Radiator Panel 1", "Radiator Panel 2"]
crew: ["Flt.Eng. Marco Reyes", "Sci. Priya Anand", "Cmdr. Yuki Tan"]
flight_controllers: ["EECOM", "FLIGHT", "SURGEON"]
anomaly_refs: ["ANOM-PTO-007", "ANOM-HAL-011"]
procedure_id: MAL-ECLSS-03
mission_phase: Anomaly Response
classification: Emergency
media_type: text
duration_minutes: null
published: 2041-10-05
source_url: https://helios.aurelian.mission/procedures/mal-eclss-03
summary: "Procedure for a rising cabin temperature, covering load shed, single-loop cooling management, avionics protection at the 30 C limit, and the timeline that follows a coolant-loop isolation."
---

# Malfunction Procedure MAL-ECLSS-03: Cabin Thermal Excursion

**Entry condition:** Cabin air temperature above the 27 °C caution, or a sustained upward trend exceeding 0.4 °C/hr, or entry directed by MAL-ECLSS-07 following a coolant-loop isolation.
**Classification:** Off-Nominal at 27 °C; Emergency approaching the 30 °C avionics limit.

## 1. Characterize the excursion

1.1 Record cabin air temperature, rate of rise, coolant supply/return temperatures on both loops, and avionics inlet air temperature. Log every 15 minutes.
1.2 Determine whether this is a **cooling-capacity loss** (a coolant loop degraded or isolated — see MAL-ECLSS-07) or a **heat-rejection loss** (radiator view degraded by attitude, or CHX-1 flow restriction as in ANOM-PTO-007).

## 2. Restore heat rejection where possible

2.1 If the excursion is attitude-related, coordinate with GNC (MAL-GNC-05 / GC console) to return to a radiator-favourable attitude. Each panel rejects 2.1 kW only with a clear view to space.
2.2 If a CHX-1 flow restriction is suspected (rising cabin temperature with a healthy loop pressure, as in ANOM-PTO-007), perform coolant flow balancing per NOM-ECLSS-15.
2.3 If a coolant loop is isolated, heat rejection is fixed at single-loop capacity (~3.8 kW). Proceed to manage the deficit.

## 3. Reduce heat generation — load shed

3.1 Shed non-essential load in priority order per NOM-EPS-02:
   - First: payload and science (~0.7 kW)
   - Second: galley and non-essential cabin systems (~0.5 kW)
   - Third: secondary avionics (~0.2 kW)
3.2 Full non-essential shed removes up to **1.4 kW** of heat generation and reduces the projected rise from ~0.9 °C/hr to **0.6 °C/hr**.
3.3 **Do not shed** coolant pumps, CO2 scrubbers, water processor, or core flight computers — these are survival and vehicle-critical.

## 4. Timeline and go/no-go

From the 22.5 °C setpoint on single-loop cooling with load shed:

| Milestone | Temperature | Time from setpoint |
|---|---|---|
| Caution | 27 °C | ~7.5 hr |
| Avionics limit | 30 °C | ~12.5 hr |
| Crew survivability bound | 35 °C | ~20 hr |

- **GO to continue single-loop operation** while the projected time to the 30 °C avionics limit exceeds the time required to recover the isolated loop or to reach a planned contingency.
- **NO-GO — escalate** if cabin temperature reaches **30 °C**: power down non-essential avionics to protect the voting flight computers (CP-12 stack), and coordinate a mission-level contingency (deeper load shed, crew relocation, timeline change) with ground.

## 5. Protect avionics

5.1 Approaching 30 °C, prioritize cooling to the CP-12 flight-computer cold plate; confirm IHX-1 is carrying the avionics load onto Loop A.
5.2 Power down non-essential avionics strings per the avionics load list to hold the voting computers within limits.

## 6. Crew and medical

6.1 SURGEON monitors crew for heat stress. Reduce crew physical activity to lower metabolic heat.
6.2 Increase cabin air circulation to avoid local hot spots at avionics inlets.

## 7. Notify

7.1 Downlink temperature trend and load-shed configuration to EECOM. Do not wait on ground for load-shed actions — execute against this procedure.

## Reference anomalies
- **ANOM-PTO-007** — CHX-1 fouling caused a cabin thermal rise with the loop pressure nominal; the flow-restriction path.
- **ANOM-HAL-011** — Loop B pressure decay drove a projected cabin thermal rise; the coolant-loss path.
