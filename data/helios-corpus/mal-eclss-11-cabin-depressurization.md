---
title: "Malfunction Procedure MAL-ECLSS-11: Cabin Depressurization"
slug: mal-eclss-11-cabin-depressurization
doc_type: Malfunction Procedure
subsystem: Life Support
components: ["Cabin Pressure Sensor", "Nitrogen Tank N2-1", "Oxygen Tank O2-1", "Cabin Isolation Hatch", "Emergency Repress Valve", "CO2 Scrubber Bed A"]
crew: ["Cmdr. Yuki Tan", "Flt.Eng. Marco Reyes", "Sci. Priya Anand", "Pilot Lena Okoro"]
flight_controllers: ["EECOM", "SURGEON", "FLIGHT"]
anomaly_refs: ["ANOM-PTO-045"]
procedure_id: MAL-ECLSS-11
mission_phase: Anomaly Response
classification: Emergency
media_type: text
duration_minutes: null
published: 2041-10-05
source_url: https://helios.aurelian.mission/procedures/mal-eclss-11
summary: "Emergency procedure for a cabin pressure loss, covering leak-rate classification, module isolation, emergency repressurization, and the pressure thresholds at which the crew dons suits or retreats to the safe haven."
---

# Malfunction Procedure MAL-ECLSS-11: Cabin Depressurization

**Entry condition:** Total cabin pressure below 96 kPa or falling faster than 0.5 kPa/min.
**Classification:** Emergency.

## 1. Immediate actions (all crew)

1.1 On the depress warning, all crew acknowledge and go to assigned stations.
1.2 Record cabin pressure and **leak rate** (kPa/min). Leak rate sets the timeline and the response.
1.3 Verify the emergency repress supply (N2-1, O2-1) is available.

## 2. Classify by leak rate

| Leak rate | Time from 101 to 55 kPa | Class |
|---|---|---|
| < 0.3 kPa/min | > 2.5 hr | Slow — time to isolate (as in ANOM-PTO-045) |
| 0.3 – 2 kPa/min | 20 min – 2.5 hr | Moderate — isolate promptly |
| > 2 kPa/min | < 20 min | Rapid — suits and safe haven now |

## 3. Slow and moderate leaks — isolate the module

3.1 Sequentially isolate cabin modules using the Cabin Isolation Hatch to localize the leak: close a hatch, watch whether the leak rate in the occupied volume drops.
3.2 When the leaking module is identified and isolated, the leak is contained. Repressurize the occupied volume with the emergency repress valve from N2-1/O2-1 to restore 101 kPa and 21.3 kPa O2 partial pressure.
3.3 Confirm CO2 scrubbing (Bed A/B) and atmosphere composition remain in limits in the reduced volume.

## 4. Rapid leak — protect the crew first

4.1 All crew **don emergency suits** immediately.
4.2 Retreat to the designated **safe haven** module and isolate it.
4.3 Repressurize the safe haven only. Do not attempt to localize a rapid leak in a large volume before the crew is protected.

## 5. Pressure go/no-go for suits

- **35 kPa** total cabin pressure — mandatory suit donning if not already suited; below this, unassisted consciousness time is short.
- Repressurization is attempted only after the leak is isolated; adding gas to an unisolated large leak wastes irreplaceable N2/O2 consumables.

## 6. Consumables accounting

6.1 Every repressurization consumes N2 and O2 stores. Log the quantity used; report to EECOM for the consumables margin assessment (FR-CONS-3.2). The binding consumable margin is water at 74 days, but a large repress event can move the oxygen/nitrogen margin materially.

## 7. Coupling to thermal

7.1 A depressurized module loses convective coupling to the cabin heat exchanger; monitor local avionics temperatures in any isolated volume and coordinate with MAL-ECLSS-03 if a thermal excursion develops.

## Reference anomaly
- **ANOM-PTO-045** — slow cabin seal leak on the Ptolemy flight, isolated by module without suit donning.
