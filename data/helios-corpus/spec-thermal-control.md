---
title: "Subsystem Specification: Cabin Thermal Control and Heat Rejection"
slug: spec-thermal-control
doc_type: Subsystem Spec
subsystem: Thermal
components: ["Cabin Heat Exchanger CHX-1", "Radiator Panel 1", "Radiator Panel 2", "Radiator Panel 3", "Radiator Panel 4", "Thermal Control Unit TCU", "Cold Plate CP-12", "Interloop Heat Exchanger IHX-1", "Coolant Loop A", "Coolant Loop B"]
crew: ["Flt.Eng. Marco Reyes", "Sci. Priya Anand"]
flight_controllers: ["EECOM", "FLIGHT"]
anomaly_refs: ["ANOM-PTO-007", "ANOM-HAL-011"]
procedure_id: null
mission_phase: Trans-Mars Cruise
classification: Nominal
media_type: text
duration_minutes: null
published: 2041-09-30
source_url: https://helios.aurelian.mission/specs/thermal/cabin-thermal-control
summary: "Specification for the Aurelian cabin thermal environment, radiator heat-rejection budget, and the single-loop degraded-cooling response, including cabin temperature limits and the projected thermal rise rate when Coolant Loop B is isolated."
---

# Subsystem Specification: Cabin Thermal Control and Heat Rejection

## Scope

This specification defines the thermal environment maintained for the crew and avionics of the Aurelian, the heat-rejection budget serviced by the coolant loops (see the ECLSS Coolant Loops specification), and the degraded-cooling behaviour that governs the crew response to a loss of one coolant loop. The Thermal Control Unit (**TCU**) is the flight-computer function that manages cabin air temperature by modulating flow through the Cabin Heat Exchanger **CHX-1**.

## Cabin thermal limits

| Condition | Cabin air temperature |
|---|---|
| Nominal setpoint | 22.5 °C |
| Comfort range | 18 – 27 °C |
| Caution (advisory) | 27 °C |
| Avionics upper limit | 30 °C |
| Crew short-term survivability limit | 35 °C |

The **27 °C caution** is the operationally significant threshold. Above it, avionics inlet air begins to approach cold-plate design margins and the crew is required to be actively managing the thermal condition under a malfunction procedure. The **30 °C avionics limit** is the point at which non-essential avionics must be powered down to protect the flight computers. The 35 °C figure is a crew-survivability bound, not an operating target.

## Heat load budget

The nominal Trans-Mars Cruise heat load is **5.5 kW**, apportioned approximately as:

| Source | Load |
|---|---|
| Avionics and flight computers (via cold plates) | 2.4 kW |
| Cabin metabolic and lighting | 1.3 kW |
| Life-support equipment (scrubbers, pumps, water processor) | 1.1 kW |
| Payload and science | 0.7 kW |

Installed radiator capacity is **8.4 kW** across four panels at **2.1 kW** each, giving roughly **2.9 kW** of nominal margin. This margin is what permits continued operation on a single loop.

## Single-loop degraded operation

When Coolant Loop B is isolated, the cabin heat exchanger continues to reject heat through the Interloop Heat Exchanger **IHX-1** to Loop A. Loop A with its two radiator panels (Panel 1, Panel 2) can carry approximately **70 %** of the nominal load, or about **3.8 kW** of steady-state rejection. The remaining load must be removed by:

1. **Load shed** — powering down non-essential avionics, payload, and science reduces heat generation by up to **1.4 kW** (see NOM-EPS-02 load categories).
2. **Controlled temperature rise** — allowing cabin temperature to climb absorbs the residual imbalance in the thermal mass of the cabin.

With load shed applied, the projected cabin temperature rise on a single loop is **0.6 °C per hour**. Without load shed it is approximately **0.9 °C per hour**. Starting from the 22.5 °C setpoint, load-shed operation reaches the 27 °C caution in roughly **7.5 hours**, which sets the timescale within which either Loop B must be recovered or a further contingency (Mars approach timeline adjustment, deeper load shed) must be planned. This projection is the basis for the go/no-go timing in MAL-ECLSS-03 and MAL-ECLSS-07.

## Radiator panel considerations

Radiator performance depends on vehicle attitude and on the panel's view to deep space. A panel with a degraded view — for example during certain communication or burn attitudes — rejects less than its 2.1 kW rating. Panel 3, on Loop B, has a documented history of a micrometeoroid puncture on the Kepler flight (ANOM-KEP-022); its structural inspection status is tracked in the maintenance log. During any coolant-loop pressure investigation, radiator panels are a candidate leak location and are inspected by external camera survey.

## Related thermal events

Cabin thermal rise from a coolant-side flow restriction was recorded on the Ptolemy flight when CHX-1 fouled (**ANOM-PTO-007**), demonstrating that a thermal excursion can originate inside the coolant loop without any external leak. The Halley accumulator failure (**ANOM-HAL-011**) is the reference case for a slow Loop B pressure decay driving a projected cabin thermal rise. Both are required reading for EECOM console operators.
