---
title: "Hazard Analysis HAZ-MMOD-02: Micrometeoroid and Orbital Debris Strike"
slug: haz-02-micrometeoroid-strike
doc_type: Hazard Analysis
subsystem: Multiple
components: ["Radiator Panel 3", "Radiator Panel 4", "Coolant Loop B", "Cabin Pressure Sensor", "Solar Array SA-1", "High-Gain Antenna HGA-1", "MMH Tank"]
crew: ["Cmdr. Yuki Tan", "Sci. Priya Anand"]
flight_controllers: ["EECOM", "GC", "FLIGHT", "SURGEON"]
anomaly_refs: ["ANOM-KEP-022", "ANOM-PTO-045"]
procedure_id: null
mission_phase: Contingency
classification: Emergency
media_type: text
duration_minutes: null
published: 2041-08-20
source_url: https://helios.aurelian.mission/hazard-analyses/haz-mmod-02
summary: "Hazard analysis of a micrometeoroid or debris strike, spanning radiator coolant leaks, cabin depressurization, and damage to arrays, antenna, or propellant tanks, with the controls of shielding, redundancy, and panel- and module-level isolation."
---

# Hazard Analysis HAZ-MMOD-02: Micrometeoroid and Orbital Debris Strike

**Hazard:** A hypervelocity micrometeoroid or debris (MMOD) particle penetrates a vehicle surface, damaging a pressurized volume, coolant system, propellant system, or exposed subsystem.
**Severity:** ranges from Minor to Catastrophic depending on what is struck.
**Category:** External environment / penetration.

## Hazard description

Throughout the Trans-Mars cruise the Aurelian is exposed to the micrometeoroid environment. A strike is a random event; the concern is not preventing strikes but bounding their consequences. Credible targets, in rough order of exposure, are the external radiator panels, the pressurized cabin shell, the solar arrays, the high-gain antenna, and — worst case — a propellant tank.

## Consequence paths

1. **Radiator / coolant leak.** A puncture of a radiator panel produces a coolant leak on that loop (the exact Kepler event, ANOM-KEP-022, at Panel 3). Handled by MAL-ECLSS-07 (pressure drop) and MAL-THRM-08 (radiator loss); mitigated by panel-level isolation preserving the rest of the loop.
2. **Cabin depressurization.** A puncture of the pressure shell produces a cabin leak, from a slow seep (as in the seal-leak case ANOM-PTO-045) to a rapid decompression. Handled by MAL-ECLSS-11; mitigated by module isolation and, for rapid leaks, suits and safe haven.
3. **Solar array damage.** A strike degrades a wing's output, reducing bus power. Handled by bus/load management (MAL-EPS-04, NOM-EPS-02); mitigated by dual-bus redundancy and margin.
4. **Antenna damage.** A strike degrades HGA-1, reducing the high-rate link. Handled by MAL-COMM-02; mitigated by the LGA low-rate fallback.
5. **Propellant tank penetration.** The worst case: a hypergolic leak (see HAZ-PROP-03) with toxicity and loss of propulsion. Lowest probability due to tank placement and shielding.

## Controls

1. **Shielding** — bumper/standoff shielding on the pressure shell and critical plumbing to break up and disperse particles.
2. **Redundancy** — dual coolant loops, dual buses/arrays, dual antennas, and the RCS/main propellant split so no single strike disables a function.
3. **Isolation granularity** — panel-level isolation on radiators (ANOM-KEP-022), module-level isolation on the cabin (MAL-ECLSS-11), and branch isolation on propellant (MAL-PROP-06) limit the extent lost to a single strike.
4. **Rapid detection** — pressure, coolant-quantity, power, and attitude telemetry give prompt indication so the crew can isolate before a leak propagates.

## Residual risk

The dominant residual risk is a strike large enough to defeat isolation granularity — a puncture that breaches a pressurized volume faster than the crew can isolate, or that strikes a propellant tank. These are low-probability but high-consequence and are the reason suits, safe haven, and abort criteria exist. For the common case — a single-panel coolant leak or a slow cabin seep — the layered isolation controls reduce the consequence to a managed, survivable event, as both referenced flight anomalies demonstrated.
