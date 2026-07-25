---
title: "Voice Loop VOICE-230-04: Trajectory Correction Burn Go/No-Go Poll"
slug: voice-04-tcm-burn-go-nogo
doc_type: Voice Loop
subsystem: Propulsion
components: ["Main Engine ME-1", "MMH Tank", "NTO Tank", "Propellant Isolation Valve PV-1", "Inertial Measurement Unit IMU-1", "High-Gain Antenna HGA-1", "Reaction Wheel RW-1", "Onboard Recorder"]
crew: ["Pilot Lena Okoro", "Cmdr. Yuki Tan"]
flight_controllers: ["CAPCOM", "PROP", "GC", "FLIGHT"]
anomaly_refs: ["ANOM-PTO-031"]
procedure_id: NOM-PROP-03
mission_phase: Trans-Mars Cruise
classification: Nominal
media_type: audio
duration_minutes: 12
published: 2042-07-02
source_url: https://helios.aurelian.mission/voice-loops/voice-230-04
summary: "The go/no-go poll for a mid-course trajectory correction burn, covering the pre-loaded burn sequence, propellant margin, and the crew's confirmation that a loss of signal will not abort a valid burn per FR-COMM-2.3."
---

# Voice Loop VOICE-230-04: Trajectory Correction Burn Go/No-Go Poll

**Aurelian air-to-ground, PROP coordination loop**
**Duration: 12 minutes** · **One-way light time: 13.2 min**
**Speakers:** Pilot Lena Okoro (crew, "Aurelian"); Cmdr. Yuki Tan (crew); CAPCOM (ground); PROP (ground, patched)

---

**T+230:11:30 — OKORO (Aurelian):** PROP, Aurelian. We're at burn minus forty for TCM-four. Running NOM-PROP-oh-three. Burn sequence is pre-loaded to the flight computers — ignition, throttle, cutoff, all onboard on the IMU-one reference. This one's small, forty-two seconds, eleven meters a second.

**T+230:11:31 — TAN (Aurelian):** Propellant check: MMH and NTO both nominal against the MOI budget with reserve. PV-one and PV-two open to the main engine feed. No leak indication — no wheel momentum buildup, no vapour, tanks holding pressure. Prop side is clean.

**T+230:11:32 — OKORO (Aurelian):** Attitude: maneuvering to burn attitude, IMU-one reference confirmed. Trackers may drop at this attitude, that's expected, IMU carries it. Wheels dumped, plenty of authority. One thing to flag — the burn attitude pulls HGA-one off the point-two lock. We'll lose Ka-band through the burn. Recorder's configured.

**T+230:11:44 — CAPCOM:** Aurelian, PROP. Copy burn minus forty, sequence pre-loaded, prop nominal, no leak. We see the attitude will break your high-gain lock — concur, expected. Reminder per FR-COMM-two-point-three: loss of signal is not a burn abort. If we go dark, you burn anyway on the pre-loaded sequence as long as the guidance solution's good. Same as Ptolemy thirty-one. Confirm you copy.

**T+230:11:46 — OKORO (Aurelian):** Copy loud and clear — LOS is not a no-go. We burn on the sequence. The only things that stop this burn are a bad guidance solution, a prop fault, or loss of attitude reference. Comms dropping out is a non-event, it's in the flight rule. We're expecting to go quiet at ignition and reacquire after cutoff.

**T+230:11:47 — TAN (Aurelian):** Running the go/no-go poll onboard. Guidance solution: valid, converged. Propellant margin against FR-CONS-three-point-two: go. Comms-blackout-during-burn, FR-COMM-two-point-three: go, we're briefed and the recorder's up. Abort criteria FR-ABORT-one-point-oh: no triggers. Aurelian is GO for TCM-four.

**T+230:11:58 — CAPCOM:** Aurelian, PROP and FLIGHT concur — you are GO for TCM-four. Guidance matches ours, prop margin's good. We'll go over the horizon with you at ignition and expect the recorder dump on reacquisition. Thirteen minutes behind you as always — this is your burn to run.

**T+230:12:00 — OKORO (Aurelian):** Copy, GO for TCM-four, we run it. Arming the sequence now. Expect LOS at ignition, reacquisition and recorder dump after cutoff. Talk to you on the other side. Aurelian out.

**T+230:12:10 — OKORO (Aurelian):** [post-burn, link reacquired] PROP, Aurelian — TCM-four complete. Clean burn, forty-two seconds, achieved delta-v eleven-point-zero meters a second, right on target. Went dark at ignition like we said, back on Ka-band now, dumping the recorder to you. Attitude back to cruise, HGA relocked inside point-two. Textbook, exactly like the flight rule says it should be.

---

*Recorded on the PROP coordination loop. Demonstrates FR-COMM-2.3 in routine practice ahead of the higher-stakes MOI burn.*
