**PART 6 — BUILDING AND OPERATING**

**Chapter 16\
No-Code: The Search Widget and Dashboard**

*A production search experience without writing a backend*

Not every solution needs custom code. The platform ships a dashboard for
managing everything through a GUI and an embeddable **widget** that puts
a full search-and-answer experience on a web page with a two-line
snippet. For many internal tools and public help centres, this is the
entire frontend.

**The dashboard**

The dashboard at rag.progress.cloud covers the whole lifecycle without
code: sign up and pick a zone, upload data (files in
PDF/Word/Excel/PowerPoint/text, or links to web pages), watch
processing, then use the search page to try queries and generative
answers. Its most useful trick for developers is the **Get code**
button: configure a search visually, then copy the exact API call,
Python, or widget snippet it produces. Treat the dashboard as an
interactive query builder, not just an admin console.

**The embeddable widget**

The widget is a set of Web Components loaded from the platform's CDN.
Two custom elements — a search bar and a results area — plus your
Knowledge Box id and zone give a working experience:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr>
<th><p><strong>HTML</strong></p>
<p>&lt;script
src="https://cdn.rag.progress.cloud/nuclia-widget.umd.js"&gt;&lt;/script&gt;<br />
<br />
&lt;nuclia-search-bar<br />
knowledgebox="YOUR-KB"<br />
zone="aws-ap-southeast-2-1"<br />
features="answers,filter"&gt;<br />
&lt;/nuclia-search-bar&gt;<br />
&lt;nuclia-search-results&gt;&lt;/nuclia-search-results&gt;</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

The features attribute toggles behavior — answers enables generative
answers, filter enables faceted filtering, and so on. Build and preview
the snippet in the dashboard's **Widgets** section, then click **Embed
widget** to generate it.

**The three widget types**

| **Type** | **Experience** |
|----|----|
| Embedded in page | Search input on the page; results appear below; 'Ask more' opens full chat |
| Popup | A search button that opens the experience in an overlay |
| Chat | A conversational chat interface, suited to a Retrieval Agent |

**Using the widget with a private Knowledge Box**

A public Knowledge Box needs no key in the widget. A **private**
Knowledge Box does — and you must not paste a long-lived key into a
public page. The supported patterns are to restrict the key's **allowed
origins** so it only works from your domains, and to serve short-lived
credentials from your backend for the widget to use.

| **Warning** Restricting allowed origins is a genuine control, but it is not a secret store. For truly sensitive corpora, keep the Knowledge Box private, proxy search through your backend (which holds an SREADER key), and have the widget talk to your proxy — not directly to the platform. |
|----|

**Customizing appearance and behavior**

The widget exposes attributes and a JavaScript API for styling, prompts,
result rendering, and event hooks, so it can match your brand and wire
into your analytics. When you outgrow it, the JavaScript SDK (Chapter
14) picks up exactly where the widget leaves off — the widget is built
on it — so migrating from widget to custom UI is an incremental step,
not a rewrite.
