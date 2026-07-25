---
title: "Malfunction Procedure MAL-PROP-06: Propellant Leak"
slug: mal-prop-06-propellant-leak
doc_type: Malfunction Procedure
subsystem: Propulsion
components: ["MMH Tank", "NTO Tank", "Propellant Isolation Valve PV-1", "Propellant Isolation Valve PV-2", "RCS Thruster Cluster", "Main Engine ME-1", "Helium Pressurant Tank"]
crew: ["Pilot Lena Okoro", "Cmdr. Yuki Tan"]
flight_controllers: ["PROP", "GC", "FLIGHT", "SURGEON"]
anomaly_refs: ["ANOM-HAL-018"]
procedure_id: MAL-PROP-06
mission_phase: Anomaly Response
classification: Emergency
media_type: text
duration_minutes: null
published: 2041-10-05
source_url: https://helios.aurelian.mission/procedures/mal-prop-06
summary: "Procedure for a suspected MMH or NTO propellant leak, covering detection, isolation of the affected propellant branch, crew protection from toxic hypergolic vapour, and assessment of the impact on the Mars Orbit Insertion burn."
---

# Malfunction Procedure MAL-PROP-06: Propellant Leak

**Entry condition:** Unexplained propellant tank pressure decay, unexpected mass-property or attitude drift, or detection of MMH/NTO vapour.
**Classification:** Emergency — MMH and NTO are toxic and hypergolic.

## 1. Immediate actions

1.1 Confirm the indication: which propellant (MMH via PV-1 branch, NTO via PV-2 branch), tank pressure trend, and any vapour detection.
1.2 If vapour is detected in the cabin, don emergency suits and isolate the affected module; coordinate with SURGEON. Hypergolic vapour is a crew-health emergency independent of the propulsion impact.

## 2. Localize

2.1 Determine whether the leak is on the **main tank side** or the **RCS branch**. RCS shares the main tanks through PV-1/PV-2; a leak downstream of a valve can be isolated without losing the main propellant.
2.2 Watch attitude: a leaking RCS thruster produces a small continuous torque the reaction wheels must fight, showing as rising wheel momentum.

## 3. Isolate

3.1 Close the isolation valve on the affected branch — **PV-1 (MMH)** or **PV-2 (NTO)** — to separate the RCS branch from the main tanks and stop the loss, as was done on the Halley flight (ANOM-HAL-018).
3.2 Confirm the leak rate drops after isolation. If it does not, the leak is on the main-tank/pressurization side and cannot be isolated by PV-1/PV-2; proceed to Section 5.

## 4. If isolated to RCS

4.1 With the RCS branch isolated, attitude control reverts to reaction wheels with reduced RCS authority. Confirm sufficient RCS remains (opposite branch, remaining thrusters) for momentum dumping and burn control.
4.2 Assess whether main-engine burns (TCM, MOI) remain viable — they depend on the main tanks, which are now protected.

## 5. If leak is on the main tank side

5.1 A main-tank or pressurant leak directly reduces propellant available for the **Mars Orbit Insertion** burn (requires 2 210 kg MMH / 3 580 kg NTO). Log the loss rate and project remaining propellant at MOI.
5.2 Coordinate with PROP and GC: if projected propellant falls below the MOI requirement plus reserve, invoke the abort/return flight rules (FR-ABORT-1.0). A failed MOI results in a flyby, not capture.

## 6. Go / No-Go for MOI

- **GO for MOI** if isolated and projected propellant at the burn exceeds the 2 210 kg MMH / 3 580 kg NTO requirement with reserve intact.
- **NO-GO — abort assessment** if projected propellant cannot meet the MOI requirement; execute FR-ABORT-1.0.

## 7. Notify

7.1 Downlink tank pressures, leak rate, and projected MOI propellant to PROP. Isolation actions are executed onboard without waiting for the ~27-minute round trip.

## Reference anomaly
- **ANOM-HAL-018** — slow MMH leak at an RCS valve fitting, isolated to the RCS branch; MOI unaffected.
