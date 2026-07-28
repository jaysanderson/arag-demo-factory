**PART 6 — BUILDING AND OPERATING**

**Chapter 18\
Backups, Export/Import, and Sync Connectors**

*Protecting data, moving it between Knowledge Boxes, and keeping it
fresh*

Content has a lifecycle beyond ingestion: it must be protected against
mistakes, moved between environments, and kept in sync with the systems
of record it came from. The platform provides three mechanisms for this
— backups, export/import, and sync connectors.

**Backup and restore**

The **backup and restore** feature captures the full state of a
Knowledge Box — its configuration *and* its resources — as a managed,
point-in-time snapshot. Both creating and restoring a backup are
asynchronous: you make a request, then poll for completion. Restoring
produces a Knowledge Box in the captured state, which makes backups
useful not only for disaster recovery but for cloning an environment.

| **Operation**     | **Effect**                                       |
|-------------------|--------------------------------------------------|
| Create backup     | Snapshot KB configuration + resources (async)    |
| List / get backup | Inspect available snapshots and their status     |
| Restore backup    | Recreate a Knowledge Box from a snapshot (async) |
| Delete backup     | Remove a snapshot                                |

| **Note** Backup/restore is an enterprise-account capability. For smaller Knowledge Boxes, export/import (below) may be all you need; reach for backup/restore when you need a complete state capture or are operating at scale. |
|----|

**Export and import**

**Export/import** serializes a Knowledge Box's data into a portable form
you can download and re-import elsewhere. Use it to move content between
accounts or zones, to seed a staging Knowledge Box from production, or
to keep an offline copy. For small-to-medium Knowledge Boxes it is
simpler than backup/restore; for very large ones or full-state capture,
prefer backups.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>PYTHON</strong></p>
<p># Conceptual flow (Python SDK)<br />
from nuclia import sdk<br />
export = sdk.NucliaExportImport()<br />
export.export_kb(...) # produces a portable export<br />
export.import_kb(...) # re-creates content in a target KB</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

**Keeping content fresh: the Sync Agent and cloud connectors**

Most content lives in a system of record — a shared drive, a website, a
cloud store — and changes there. The **Sync Agent** keeps a Knowledge
Box current with such a source automatically.

**The Sync Agent**

The Sync Agent is a small application (Windows, macOS, Linux) that
synchronizes a local folder, a sitemap, or an RSS feed into your
Knowledge Box. It runs on your laptop or a server; you point the
dashboard at its endpoint (for a local install, http://localhost:8090)
to configure it. New and changed items in the source flow into the
Knowledge Box without manual uploads.

**Cloud storage sync**

The platform also connects directly to cloud sources through **external
connections** and **sync configurations** (visible in the Zone API as
external_connections and sync_config endpoints). These let a Knowledge
Box pull from cloud storage and SaaS sources on a schedule, with OAuth
authorization handled through the platform, so content stays current
without running the local Sync Agent.

| **Tip** Choose by where the content lives and who controls the schedule. Local folders, sitemaps, and RSS -\> the Sync Agent. Cloud storage and SaaS sources -\> external connections and sync configurations, which run in the platform and need nothing installed. |
|----|
