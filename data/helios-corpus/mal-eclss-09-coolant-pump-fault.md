---
title: "Malfunction Procedure MAL-ECLSS-09: Coolant Pump Fault"
slug: mal-eclss-09-coolant-pump-fault
doc_type: Malfunction Procedure
subsystem: ECLSS
components: ["Pump P-204", "Pump P-203", "Coolant Loop B", "Coolant Loop A", "Accumulator ACC-2", "Bus B", "Cross-tie Contactor XT-1", "Interloop Heat Exchanger IHX-1"]
crew: ["Flt.Eng. Marco Reyes"]
flight_controllers: ["EECOM", "EPS", "FLIGHT"]
anomaly_refs: ["ANOM-KEP-014", "ANOM-HAL-003"]
procedure_id: MAL-ECLSS-09
mission_phase: Anomaly Response
classification: Off-Nominal
media_type: text
duration_minutes: null
published: 2041-10-05
source_url: https://helios.aurelian.mission/procedures/mal-eclss-09
summary: "Procedure for a coolant pump fault — loss of flow, cavitation, or overspeed — including the distinction between a pump-mechanical fault and a power-side loss, and the transition to single-loop cooling."
---

# Malfunction Procedure MAL-ECLSS-09: Coolant Pump Fault

**Entry condition:** Coolant flow below 0.75 kg/s, pump speed outside 9 000–12 500 rpm, pump differential pressure below 55 kPa, or pump electrical fault.
**Applicability:** Written for **Pump P-204 (Loop B)**; substitute P-203/Loop A/Bus A as required.
**Classification:** Off-Nominal; escalates if it leads to loss of cooling.

## 1. Characterize the fault

1.1 Record pump P-204 speed, differential pressure, electrical current, coolant flow, and Bus B voltage.
1.2 Distinguish the fault class:
   - **Power-side loss** — pump current zero, Bus B voltage abnormal. This is an EPS fault (see MAL-EPS-04), not a pump fault. Go to Section 2.
   - **Cavitation** — differential pressure noisy and low, possible gas ingress (ANOM-KEP-014). Go to Section 3.
   - **Mechanical/overspeed** — speed outside range with normal bus voltage. Go to Section 4.

## 2. Power-side loss

2.1 If Bus B is faulted, execute MAL-EPS-04. The pump may be recovered by cross-tie of P-204 to Bus A via XT-1, as was done for P-203 during ANOM-HAL-003.
2.2 If cross-tie restores flow, remain on both loops and monitor. If not, treat as loss of Loop B cooling and go to Section 5.

## 3. Cavitation

3.1 Cavitation usually indicates gas in the loop. Perform accumulator ACC-2 recharge and gas bleed per NOM-ECLSS-12.
3.2 If flow and differential pressure recover, monitor for 3 hours. If cavitation persists, command **P-204 OFF** to prevent pump damage and go to Section 5.

## 4. Mechanical fault or overspeed

4.1 A pump commanding outside its speed envelope with normal power is a mechanical or controller fault. Command **P-204 OFF**.
4.2 There is no in-flight pump replacement. Loss of the pump means loss of forced circulation on Loop B. Go to Section 5.

## 5. Transition to single-loop cooling

5.1 With P-204 off, Loop B provides no circulation. Confirm cabin heat exchanger CHX-1 rejects through the Interloop Heat Exchanger IHX-1 to Loop A.
5.2 Execute load shed (NOM-EPS-02) and manage cabin temperature per MAL-ECLSS-03. Single-loop capacity is ~3.8 kW; projected rise with load shed is 0.6 °C/hr.
5.3 Note that a pump fault differs from a leak: loop coolant charge is intact, so if the pump can later be restored (for example a recovered bus), two-loop cooling returns immediately.

## 6. Notify

6.1 Downlink pump and bus telemetry to EECOM and EPS. Coordinate with EPS if a bus is implicated.

## Reference anomalies
- **ANOM-KEP-014** — pump cavitation from accumulator gas ingress.
- **ANOM-HAL-003** — Bus A fault dropped P-203; recovered by cross-tie.
