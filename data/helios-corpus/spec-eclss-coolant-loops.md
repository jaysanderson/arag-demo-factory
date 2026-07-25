---
title: "Subsystem Specification: ECLSS Active Thermal Coolant Loops A and B"
slug: spec-eclss-coolant-loops
doc_type: Subsystem Spec
subsystem: ECLSS
components: ["Coolant Loop A", "Coolant Loop B", "Pump P-203", "Pump P-204", "Accumulator ACC-1", "Accumulator ACC-2", "Interloop Heat Exchanger IHX-1", "Cabin Heat Exchanger CHX-1", "Cold Plate CP-12", "Isolation Valve MV-207", "Radiator Panel 3"]
crew: ["Flt.Eng. Marco Reyes"]
flight_controllers: ["EECOM", "FLIGHT"]
anomaly_refs: ["ANOM-KEP-014", "ANOM-KEP-022", "ANOM-HAL-011"]
procedure_id: null
mission_phase: Trans-Mars Cruise
classification: Nominal
media_type: text
duration_minutes: null
published: 2041-09-30
source_url: https://helios.aurelian.mission/specs/eclss/coolant-loops-ab
summary: "Design and operating specification for the Aurelian dual redundant single-phase coolant loops, including nominal pressures, alarm thresholds, pump and accumulator data, and the isolation criteria that govern loop safing."
---

# Subsystem Specification: ECLSS Active Thermal Coolant Loops A and B

## Purpose and architecture

The Aurelian Active Thermal Control System rejects waste heat from the crew cabin, avionics, and life-support equipment to space through four external radiator panels. Heat is transported by two independent, cross-connectable single-phase liquid coolant loops designated **Loop A** (primary) and **Loop B** (secondary). Each loop is individually capable of carrying the full survival heat load; together they carry the full nominal load with margin. The loops are physically separated and served by independent power buses so that no single failure disables both.

The working fluid is **HT-135**, a single-phase dielectric coolant selected for low freezing point and compatibility with wetted avionics cold plates. Each loop holds a nominal charge of **18.5 litres**.

## Loop flow path

Coolant is driven by a centrifugal pump through the following path:

1. Pump (P-203 on Loop A, P-204 on Loop B)
2. Cold plates CP-1 through CP-16, serving avionics and power electronics; CP-12 serves the primary flight computer stack
3. Cabin Heat Exchanger **CHX-1**, which conditions cabin air
4. Interloop Heat Exchanger **IHX-1**, which allows heat transfer between loops when one loop is isolated from its radiators
5. External radiator panels (Panel 3 and Panel 4 on Loop B; Panel 1 and Panel 2 on Loop A)
6. Accumulator (ACC-1 on Loop A, ACC-2 on Loop B), which sets loop pressure and absorbs thermal expansion
7. Return to pump inlet

Isolation valve **MV-207** separates Loop B from its radiator panels and permits the loop to be safed while the cabin side continues to reject heat through IHX-1 to Loop A.

## Nominal operating parameters

| Parameter | Nominal | Operating range |
|---|---|---|
| Loop pressure | 310 kPa | 290 – 330 kPa |
| Coolant supply temperature | 4 °C | 2 – 7 °C |
| Coolant return temperature | 18 °C | 14 – 22 °C |
| Mass flow rate | 0.85 kg/s | 0.75 – 0.95 kg/s |
| Pump speed | 11 200 rpm | 9 000 – 12 500 rpm |
| Pump differential pressure | 65 kPa | 55 – 75 kPa |
| Pump electrical load | 120 W | 90 – 150 W |
| Accumulator GN2 precharge | 340 kPa | 320 – 360 kPa |
| Accumulator fluid volume | 2.0 L | 1.2 – 2.4 L |

Loop B draws pump power from **Bus B**; Loop A draws from **Bus A**. Either pump can be cross-tied to the opposite bus through the EPS cross-tie contactor.

## Alarm and caution thresholds

Loop pressure is the primary health indicator. The flight computer annunciates:

- **Low caution** at **285 kPa** — advisory; crew acknowledges and begins trend monitoring.
- **Low warning** at **270 kPa** — master alarm; crew executes the applicable malfunction procedure.
- **Isolation criterion** — the loop is to be isolated (MV-207 closed, pump commanded off) if pressure falls **below 250 kPa** OR if the pressure decay rate exceeds **5 kPa per hour sustained over three consecutive readings**. See procedure MAL-ECLSS-07.

A falling loop pressure has two principal causes that the crew must distinguish. A **coolant leak** produces a monotonic pressure decay accompanied by a falling accumulator fluid quantity. **Gas ingress** — typically GN2 permeating the accumulator bladder — produces pressure oscillation and pump differential-pressure noise without a corresponding loss of coolant mass. The distinction determines the response: a leak is isolated; gas ingress is corrected by accumulator servicing (NOM-ECLSS-12).

## Heat rejection capacity

Each radiator panel rejects approximately **2.1 kW** at nominal coolant and attitude conditions, for a four-panel installed capacity of **8.4 kW**. The nominal cabin-plus-avionics heat load in Trans-Mars Cruise is **5.5 kW**, leaving roughly 2.9 kW of margin. With Loop B isolated, Loop A and its two panels (Panel 1, Panel 2) can carry approximately **70 %** of the nominal load; the balance must be removed by shedding non-essential electrical load and by allowing a controlled cabin temperature rise. See the Thermal Control specification and MAL-ECLSS-03.

## Redundancy and known failure history

The dual-loop design is a direct response to coolant-loop failures on earlier HELIOS-program vessels. Loop A pump cavitation from accumulator gas ingress was recorded on the Kepler flight (**ANOM-KEP-014**); a micrometeoroid puncture of a Loop B radiator panel caused a slow coolant leak on the same flight (**ANOM-KEP-022**); and an accumulator bladder permeation failure on Loop B produced a slow pressure decay on the Halley flight (**ANOM-HAL-011**), the closest analogue to the failure mode this specification's alarm thresholds are designed to catch.

## Maintenance

Accumulator precharge is verified every 30 days and after any isolation event. Coolant quantity is logged each shift by the Flight Engineer. Loop servicing and accumulator recharge are performed under NOM-ECLSS-12.
