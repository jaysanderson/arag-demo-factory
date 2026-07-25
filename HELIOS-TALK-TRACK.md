# HELIOS — Deep-Space Mission Intelligence
## The narrative & talk track

> A flagship demo for **Progress Agentic RAG**. Every ARAG capability, woven into one
> unfolding, high-stakes story. Fictional throughout — HELIOS and the vessel *Aurelian* are a
> synthetic deep-space program built to prove one thing: **grounded, cited AI you can bet a life on.**

---

## Cold open — read this first

> *It's mission day 248. The crewed vessel* **Aurelian** *is 80 million kilometres from Earth,
> mid-transit to Mars. A round-trip radio call takes nine minutes, so the crew can't just
> "ask Houston." At 04:11 mission-elapsed, a pressure sensor on* **ECLSS coolant loop B** *drops
> below its red line. Cabin temperature starts to climb. The flight director has minutes, not
> hours — and every answer she acts on has to be **right**, and has to be **traceable**, because
> out here a confident guess is indistinguishable from a fatal one.*
>
> *This is HELIOS. It runs on the ship's own documentation — procedures, flight rules, subsystem
> specs, the anomaly record of every mission that flew before. It never invents. Every answer
> comes back grounded and cited, or it comes back saying "I don't have that." Watch what happens
> in the next four minutes.*

**The bridge to the room:** *"This is the highest-stakes knowledge work there is. If you can
trust grounded AI to help keep a crew alive at the edge of deep space, the same platform — the
same guarantee — runs your enterprise's knowledge without hallucinating. Let me show you the
whole thing on one Knowledge Box."*

---

## The premise (why this demo lands)

Every buyer's real fear about AI is the same: **it makes things up, and you can't tell when.**
HELIOS dramatises the antidote. It takes the scariest possible setting — a place where a wrong
answer kills people and there's no one to call — and shows AI that is **grounded** (answers only
from the mission record), **cited** (every claim links to the procedure or report it came from),
**governed** (a groundedness score you rule against), and **honest** (it refuses out loud when
the record can't support an answer).

If it holds up here, the objection is gone for your contracts, your claims, your clinical notes,
your codebase.

---

## The story spine

One incident carries the whole demo: **the coolant-loop-B anomaly at T+248**. Each console the
flight team turns to is a different ARAG capability — so the feature tour *is* the story. Walk
them in this order and it reads as one continuous four-minute scene.

---

## The talk track — every ARAG capability as a beat

Thirteen consoles, the full ARAG surface set. Say the line, click the thing, land the capability.

### 1 · VOICE — "Flight, HELIOS, go for coolant loop B."
**Say:** *"The flight director doesn't type — she talks, hands on the console. She asks HELIOS out
loud for the malfunction procedure, and hears a grounded answer read back, cited to the exact
procedure."*
**Do:** Voice console → speak *"malfunction procedure for a coolant loop B pressure drop"* → the
spoken, cited answer streams back.
**ARAG proof:** real-time **spoken** grounded Q&A — voice over `/ask`, same governance as text.

### 2 · ASK (grounded + cited) — the answer, and where it came from
**Say:** *"Here it is in full. Notice every step is attributed — this line comes from
MAL-ECLSS-07, this threshold from the coolant subsystem spec. Nothing is invented."*
**Do:** Ask console → the streamed answer with the **sources panel**, grouped by document.
**ARAG proof:** grounded generative answers with **citations** — the core of ARAG. *(This surface
also carries **personas** — the same Knowledge Box answers a Flight Director and a Systems
engineer differently via stored search configurations.)*

### 3 · QUALITY (REMi) — the number you bet the crew on
**Say:** *"How do we know it's grounded? We measure it. Every answer gets a groundedness score.
Out here, that number is the difference between a crew that lives and one that doesn't — so we
govern against it, and we can prove it to a review board."*
**Do:** Quality console → groundedness near 100%; run the sweep.
**ARAG proof:** **REMi** groundedness scoring — trust turned into a governable metric.

### 4 · The refusal — HELIOS says "I don't have that"
**Say:** *"And here's the part that earns the trust. Ask it something the mission record can't
support — the crew's private medical history, today's stock market — and it declines. Out loud.
It would rather say nothing than invent."*
**Do:** Ask or Voice → a refusal probe → explicit ungrounded decline.
**ARAG proof:** **honest refusal** — the anti-hallucination guarantee, made visible.

### 5 · RELATED — "has this happened before?"
**Say:** *"A veteran flight director's first instinct: has anyone seen this? HELIOS recalls
similar past-mission anomalies two ways at once — by meaning, and by the subsystems they share
in the knowledge graph. Not by tags. It surfaces the Kepler coolant event from three missions
ago that no keyword search would have found."*
**Do:** Related console → seed "coolant loop B" → *Similar by meaning* beside *Connected in the
graph*.
**ARAG proof:** **semantic + knowledge-graph recommendation** — "more like this" that understands
content.

### 6 · GRAPH — trace the cascade
**Say:** *"Why does a coolant pressure drop threaten the whole cabin? The graph traces it —
loop B to pump P-204 to radiator panel 3 to the thermal subsystem to the crew. The connections
ARAG extracted from the documents, not a diagram someone drew."*
**Do:** Graph console → explore around the ECLSS coolant-loop entity.
**ARAG proof:** **knowledge graph** built automatically from NER on every resource.

### 7 · WORKFLOWS — composite-RAG root cause
**Say:** *"Now the hard question: root-cause the cabin thermal rise. This isn't one lookup —
it's a chain. HELIOS retrieves, reasons across subsystems, and composes a grounded root-cause
narrative, the way a systems engineer would, but in seconds."*
**Do:** Workflows console → run the incident root-cause workflow.
**ARAG proof:** **agentic, multi-step (composite) RAG** — reasoning, not just retrieval.

### 8 · CALLS — the voice loop, analysed
**Say:** *"Every CAPCOM-to-crew call is recorded. HELIOS transcribes and analyses them — flags
the loop where the crew first reported the odd reading, scores it for protocol compliance, and
lets you ask questions of the audio itself."*
**Do:** Calls console → the analysed voice-loop with synced transcript.
**ARAG proof:** **media / call analytics** — grounded Q&A over transcribed audio.

### 9 · DOC STUDIO — the incoming report, structured
**Say:** *"Downlinked telemetry and the crew's anomaly form arrive as raw documents. Drop one in
and watch HELIOS classify it, extract the structured fields, and standardise it — an anomaly
form becomes clean, queryable data in eight visible steps."*
**Do:** Doc Studio console → drop an anomaly report → the extraction pipeline.
**ARAG proof:** **document intelligence** — ingest, classify, extract, standardise.

### 10 · SEARCH + FACETS — the whole mission record, one query
**Say:** *"Under all of this is the corpus — every procedure, rule, spec and past anomaly. Search
it by meaning and filter live by subsystem, mission phase, emergency vs nominal. The counts come
straight from the Knowledge Box, never a stale index."*
**Do:** Search console → semantic query → facet down to ECLSS / Emergency.
**ARAG proof:** **semantic search + faceted browse** over one indexed corpus.

### 11 · ASSETS — schematics and imagery
**Say:** *"Specs aren't only text. The subsystem schematics and inspection imagery live in the
same library, discoverable by meaning, and you can ask the archive a question across them."*
**Do:** Assets console → find a coolant-loop schematic by description.
**ARAG proof:** **multi-modal asset library** — semantic discovery + Ask-the-Archive.

### 12 · FOR YOU (personalize) — your station, right now
**Say:** *"Six flight controllers, one Knowledge Box, six different views. EECOM sees the coolant
and thermal material first; PROP sees propulsion. HELIOS personalises each controller's console
to their station and the live anomaly — grounded, never a black box."*
**Do:** For You console → switch controller role → the feed re-ranks.
**ARAG proof:** **personalisation** — grounded, role-scoped feeds from the same corpus.

### 13 · MCP — HELIOS as a tool for other systems
**Say:** *"Finally: the Knowledge Box is itself an MCP server. The ground-systems agents, the
telemetry monitors — any AI system on the network can call HELIOS as a tool and get the same
grounded, cited answers. Your knowledge becomes something other agents can safely use."*
**Do:** MCP console → the endpoint + the tool list.
**ARAG proof:** **MCP-native** — the Agent-Experience story for technical buyers.

*(And a fourteenth, quiet one — **Visibility**: because the mission's public knowledge is also
being read by AI models, HELIOS measures how it appears to them and where the gaps are. The same
platform that answers questions also tells you how answerable your knowledge is.)*

---

## The close

> *"That was one Knowledge Box, one API, one guarantee — voice, search, graph, root-cause,
> document extraction, call analysis, personalised consoles, an MCP endpoint — every one of them
> grounded and cited, every one of them willing to say 'I don't know.' We put it in the least
> forgiving place we could imagine. Now picture it on your contracts, your claims, your
> clinical records, your codebase. Same platform. Same promise. Nothing invented."*

---

## Running the demo

- **Live URL:** https://helios-arag.fly.dev
- **Best three-minute cut:** Voice (1) → Refusal (4) → Related (5) → Graph (6) → Quality (3).
- **The one-liner if you only get a sentence:** *"AI that would rather say 'I don't know' than
  guess — proven where a guess is fatal."*

## Honesty notes for the presenter

- Everything is **synthetic** — a fictional program. Say so; it strengthens the pitch (no real
  data was needed to make it credible).
- The hero surfaces (Voice, Ask, Quality, Related, Graph, Search) answer **live** against the
  Knowledge Box. The heavier consoles (Doc Studio, Calls, Workflows, MCP, Visibility) are
  presented as mission consoles that showcase the capability; drive the live ones for the
  "wow", narrate the rest.
- The groundedness/refusal beat is the emotional core. If you cut everything else, keep that.
