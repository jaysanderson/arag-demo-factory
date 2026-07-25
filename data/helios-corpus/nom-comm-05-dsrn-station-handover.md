---
title: "Nominal Procedure NOM-COMM-05: DSRN Station Handover"
slug: nom-comm-05-dsrn-station-handover
doc_type: Nominal Procedure
subsystem: Comms
components: ["High-Gain Antenna HGA-1", "Ka-band Transmitter", "X-band Transponder", "DSRN Uplink", "Cygnus Station", "Draco Station", "Lyra Station", "Onboard Recorder"]
crew: ["Sci. Priya Anand", "Cmdr. Yuki Tan"]
flight_controllers: ["CAPCOM", "GC", "FLIGHT"]
anomaly_refs: ["ANOM-PTO-031"]
procedure_id: NOM-COMM-05
mission_phase: Trans-Mars Cruise
classification: Nominal
media_type: text
duration_minutes: null
published: 2041-10-08
source_url: https://helios.aurelian.mission/procedures/nom-comm-05
summary: "Routine procedure for handing the communications link between the three DSRN ground stations every eight hours, including the planned overlap, onboard recording during any gap, and playback on acquisition of signal."
---

# Nominal Procedure NOM-COMM-05: DSRN Station Handover

**Purpose:** Maintain continuous command and telemetry as coverage passes between the three Deep Space Relay Network stations — **Cygnus**, **Draco**, and **Lyra** — approximately every 8 hours as the Earth rotates.

## 1. Pre-handover

1.1 Confirm the next acquiring station and its scheduled acquisition-of-signal (AOS) time. At T+248 the one-way light time is 13.5 minutes; account for it when correlating onboard and ground times.
1.2 Confirm HGA-1 pointing is within the 0.2° requirement for Ka-band lock and that the transmitter is configured for the outgoing station.

## 2. Overlap handover (nominal)

2.1 During the planned overlap both the setting and rising stations receive the downlink. Confirm the rising station reports good lock before the setting station loses geometry.
2.2 Transfer the uplink command authority to the rising station. Verify a command echo through the new station to confirm the uplink.
2.3 There is **no data loss** in a nominal overlap handover.

## 3. Gapped handover

3.1 If the rising station cannot acquire on schedule (station weather, local outage), the link gaps. Confirm the **onboard recorder** captures all telemetry, including continuous ECLSS coolant-loop parameters, during the gap.
3.2 On acquisition at the next available station, dump the recorded telemetry so ground reconstructs the gap with no loss of the record.

## 4. Special cases

4.1 **Solar conjunction:** when the trajectory carries the Sun near the Earth–vehicle line, the link degrades regardless of station (ANOM-PTO-031). Handovers during a conjunction window are expected to be poor; rely on the onboard recorder and plan critical events around the window per FR-COMM-2.3.
4.2 **During a burn:** a burn attitude may break HGA lock; coordinate handover timing with burn planning (NOM-PROP-03) and expect to operate on LGA low rate or recorder through the event.

## 5. Log

5.1 Record AOS/LOS times per station, any gap and its cause, and confirmation of recorder playback. Report the handover schedule health to CAPCOM.

## Related
- Off-nominal handling: **MAL-COMM-02** (loss of signal).
- Burn coordination: **NOM-PROP-03**, **FR-COMM-2.3**.
