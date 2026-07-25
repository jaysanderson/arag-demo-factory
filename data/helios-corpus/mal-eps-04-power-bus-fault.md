---
title: "Malfunction Procedure MAL-EPS-04: Power Bus Fault"
slug: mal-eps-04-power-bus-fault
doc_type: Malfunction Procedure
subsystem: EPS
components: ["Bus A", "Bus B", "Cross-tie Contactor XT-1", "Battery BAT-1", "Battery BAT-2", "Solar Array SA-1", "Solar Array SA-2", "Pump P-203", "Pump P-204"]
crew: ["Flt.Eng. Marco Reyes", "Pilot Lena Okoro"]
flight_controllers: ["EPS", "EECOM", "FLIGHT"]
anomaly_refs: ["ANOM-HAL-003"]
procedure_id: MAL-EPS-04
mission_phase: Anomaly Response
classification: Emergency
media_type: text
duration_minutes: null
published: 2041-10-05
source_url: https://helios.aurelian.mission/procedures/mal-eps-04
summary: "Procedure for the loss or fault of a main power bus, covering fault isolation, the cross-tie decision, load shed to stay within single-source rating, and protection of the coolant pump on the affected bus."
---

# Malfunction Procedure MAL-EPS-04: Power Bus Fault

**Entry condition:** Bus voltage outside 114–126 VDC, bus undervoltage/overcurrent trip, or loss of a bus source (array or battery).
**Applicability:** Written for **Bus B**; substitute Bus A / SA-1 / BAT-1 / P-203 as required.
**Classification:** Emergency — a bus fault can remove a coolant pump.

## 1. Immediate actions

1.1 Identify the faulted bus and record bus voltage, current, battery state of charge, and array output.
1.2 Note which critical loads are on the faulted bus. **Coolant Pump P-204 is on Bus B** — its loss threatens Coolant Loop B (see MAL-ECLSS-09).

## 2. Isolate the fault

2.1 Determine whether the fault is a **source fault** (array or battery) or a **distribution fault** (a short or failed component downstream, as in ANOM-HAL-003).
2.2 For a distribution fault, open the faulted feeder to clear the short before cross-tying — otherwise the cross-tie propagates the fault to the healthy bus.

## 3. Cross-tie decision

3.1 If the faulted bus has lost its source but the distribution is clean, close cross-tie contactor **XT-1** to power Bus B from Bus A / SA-1.
3.2 Combined load (~6.2 kW) approaches the single-source continuous rating (4.6 kW). Before or immediately after cross-tie, **shed non-essential load** (NOM-EPS-02: payload/science, then galley, then secondary avionics — up to 1.4 kW) to keep the surviving source within limits.
3.3 **Never shed** coolant pumps, CO2 scrubbers, or core flight computers.

## 4. Protect the coolant pump

4.1 If cross-tie restores power to P-204, confirm Coolant Loop B returns to nominal (flow 0.85 kg/s, pressure 310 kPa).
4.2 If the pump cannot be repowered, treat as loss of Loop B cooling: command P-204 off and transition to MAL-ECLSS-09 / MAL-ECLSS-03 for single-loop thermal management.

## 5. Battery management

5.1 On the surviving source, monitor battery state of charge. If array output cannot cover combined load in all attitudes, prioritize battery charge during favourable attitudes and time non-essential loads accordingly.
5.2 Confirm each battery reserve (4.8 kWh) is protected for the survival load set.

## 6. Go / No-Go

- **GO to cross-tied single-source operation** if load shed holds the surviving source at or below 4.6 kW continuous and battery state of charge is stable or rising.
- **NO-GO — deeper contingency** if the surviving source cannot cover the survival load set (coolant pumps, life support, core avionics); coordinate a mission-level power contingency with ground.

## 7. Notify

7.1 Downlink bus, battery, and array telemetry to EPS/EECOM. Round-trip light time is ~27 minutes; execute isolation and cross-tie against this procedure without waiting.

## Reference anomaly
- **ANOM-HAL-003** — Bus A distribution fault from a failed power MOSFET dropped P-203; recovered by cross-tie with load shed.
