---
title: "Nominal Procedure NOM-ECLSS-12: Coolant Loop Servicing and Accumulator Recharge"
slug: nom-eclss-12-coolant-servicing-accumulator-recharge
doc_type: Nominal Procedure
subsystem: ECLSS
components: ["Coolant Loop B", "Coolant Loop A", "Accumulator ACC-2", "Accumulator ACC-1", "Pump P-204", "GN2 Charge Panel", "High-point Vent", "Isolation Valve MV-207"]
crew: ["Flt.Eng. Marco Reyes"]
flight_controllers: ["EECOM", "FLIGHT"]
anomaly_refs: ["ANOM-KEP-014", "ANOM-HAL-011"]
procedure_id: NOM-ECLSS-12
mission_phase: Trans-Mars Cruise
classification: Nominal
media_type: text
duration_minutes: null
published: 2041-10-08
source_url: https://helios.aurelian.mission/procedures/nom-eclss-12
summary: "Routine procedure for servicing a coolant loop: verifying and restoring the accumulator GN2 precharge to 340 kPa, bleeding entrained gas at the high-point vent, and making up coolant to restore the 310 kPa nominal loop pressure."
---

# Nominal Procedure NOM-ECLSS-12: Coolant Loop Servicing and Accumulator Recharge

**Purpose:** Restore a coolant loop to nominal pressure and gas-free condition by recharging the accumulator GN2 precharge, bleeding entrained gas, and making up coolant. Performed on the 30-day maintenance cadence, after any isolation event, and as the corrective action called by MAL-ECLSS-07 (gas-ingress path) and MAL-ECLSS-09 (cavitation).
**Applicability:** Written for **Loop B / ACC-2**; substitute Loop A / ACC-1.

## 1. Pre-service checks

1.1 Confirm the loop is on procedure and the opposite loop is healthy and available.
1.2 Record loop pressure, accumulator ACC-2 fluid quantity, GN2 precharge, pump P-204 speed and differential pressure, and coolant temperatures. This is the "before" baseline.
1.3 Confirm the GN2 charge panel and high-point vent are configured and the make-up coolant reservoir has quantity.

## 2. Verify and restore GN2 precharge

2.1 Read the accumulator GN2 precharge. Nominal is **340 kPa** (range 320–360 kPa).
2.2 If low, charge GN2 to 340 kPa through the charge panel in small increments, allowing pressure to settle between increments. A chronically low precharge that will not hold indicates a permeating or failed bladder (the ANOM-HAL-011 failure mode) — stop and report; do not attempt to mask a failed bladder with repeated recharge.

## 3. Bleed entrained gas

3.1 Entrained GN2 in the coolant causes pump cavitation and pressure oscillation (ANOM-KEP-014). Open the high-point vent briefly to bleed gas, watching for liquid at the vent to confirm gas is cleared.
3.2 Re-observe pump differential-pressure noise; a clean, steady differential pressure confirms the gas is removed.

## 4. Coolant make-up

4.1 If loop fluid quantity is low (accumulator below its 2.0 L nominal), make up coolant from the reservoir to restore loop pressure toward **310 kPa** and accumulator quantity toward 2.0 L.
4.2 Make up in measured increments and log the quantity added. A loop that requires repeated make-up is **leaking**, not merely low — return to MAL-ECLSS-07 leak path.

## 5. Verify

5.1 Confirm loop pressure 290–330 kPa (nominal 310 kPa), flow 0.75–0.95 kg/s, pump differential pressure 55–75 kPa, and no oscillation.
5.2 Monitor for 30 minutes to confirm stability before returning the loop to routine status.

## 6. Log

6.1 Record the "after" readings, GN2 added, and coolant made up. Downlink to EECOM. A make-up quantity trend is the primary early indicator of a slow leak between services.

## Related
- Corrective call from **MAL-ECLSS-07** (gas ingress) and **MAL-ECLSS-09** (cavitation).
- Failure modes: **ANOM-KEP-014** (gas ingress), **ANOM-HAL-011** (bladder permeation).
