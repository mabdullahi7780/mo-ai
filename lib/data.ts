/* ============================================================
   Mo AI — content model
   Every metric here is sourced from a real delivered system.
   Client names are pseudonyms; see the disclaimer in <Work />.
   ============================================================ */

export type Metric = { value: string; label: string; sub?: string };

export type Segment = {
  id: string;
  label: string;
  headline: string;
  metrics: { to: number; prefix?: string; suffix?: string; label: string; sub: string }[];
};

/* --- "By the numbers", toggleable --------------------------- */
export const SEGMENTS: Segment[] = [
  {
    id: "enterprise",
    label: "For Enterprise",
    headline: "Built to run unattended, at volume, in production.",
    metrics: [
      { to: 2837, label: "AI calls in one week", sub: "One system, zero human dialling" },
      { to: 100, suffix: "%", label: "Auto-dispositioned", sub: "No manual CRM updates, ever" },
      { to: 3274, label: "Prospects in one pipeline", sub: "Deduped, scored and worked daily" },
      { to: 5, label: "Parallel calling lines", sub: "Load balanced so no number burns" },
    ],
  },
  {
    id: "agency",
    label: "For Scaling Agencies",
    headline: "One operator running the output of a full department.",
    metrics: [
      { to: 8, label: "Systems live in production", sub: "Voice, chat and backend" },
      { to: 60, suffix: "+", label: "Automations running live", sub: "Firing daily without supervision" },
      { to: 10000, suffix: "+", label: "Leads processed", sub: "Captured, enriched and contacted" },
      { to: 4, label: "Countries delivered in", sub: "US, Netherlands, Australia, UK" },
    ],
  },
];

/* --- Core services (bento) ---------------------------------- */
export const SERVICES = [
  {
    id: "crm",
    icon: "Database",
    eyebrow: "Custom CRM Architecture",
    title: "Data pipelines and business logic built for how you actually work.",
    body: "Lead capture, deduplication, deterministic scoring, AI enrichment and routing, all on a schema designed around your process instead of someone else's template. Two-way integrations between platforms that were never meant to talk.",
    bullets: ["Bespoke pipeline and stage design", "AI enrichment and lead scoring", "Two-way platform syncs", "Dashboards that report the truth"],
    span: "lg:col-span-4 lg:row-span-2",
  },
  {
    id: "ghl",
    icon: "Workflow",
    eyebrow: "GoHighLevel Engineering",
    title: "GHL pushed past what the builder UI can do.",
    body: "Advanced snapshots, API triggers, custom webhook relays and workflow automation that survives contact with real volume.",
    bullets: ["Snapshot design and migration", "API triggers and webhook relays", "Multi-calendar routing"],
    span: "lg:col-span-2",
  },
  {
    id: "agents",
    icon: "Bot",
    eyebrow: "Autonomous AI Agents",
    title: "Agents that call, answer, qualify and book.",
    body: "Voice and chat agents running 24/7 across phone, WhatsApp, SMS and email in English and Dutch, with warm handoff to a human the moment it matters.",
    bullets: ["Outbound calling and speed to lead", "Inbound receptionist and after hours", "WhatsApp and SMS assistants"],
    span: "lg:col-span-2",
  },
  {
    id: "web",
    icon: "Zap",
    eyebrow: "Modern Web Engineering",
    title: "Interfaces that load instantly and convert.",
    body: "Landing pages, webinar funnels and product surfaces wired directly into the follow-up machine, so a new lead is being worked before the tab closes.",
    bullets: ["Landing pages and webinar funnels", "Conversion-wired forms", "Sub-second load targets"],
    span: "lg:col-span-2",
  },
] as const;

/* --- Architecture flow -------------------------------------- */
export const FLOW = [
  {
    id: "web",
    label: "Web Frontend",
    icon: "Globe",
    detail:
      "Landing pages, webinar funnels and forms capture intent. Every source feeds one pipeline instead of somebody's inbox, and the handoff is instant rather than nightly.",
    stack: ["Next.js", "Webinar funnels", "Meta and Google traffic"],
  },
  {
    id: "crm",
    label: "Custom CRM / GHL",
    icon: "Database",
    detail:
      "The record of truth. Duplicates removed, data enriched from public records and AI research, leads scored so the best ones get worked first, then routed to the right owner and calendar.",
    stack: ["GoHighLevel", "n8n", "Supabase", "Clay"],
  },
  {
    id: "agents",
    label: "AI Agents",
    icon: "Bot",
    detail:
      "Voice and chat agents contact within sixty seconds, qualify against your criteria, handle objections, and write a confirmed appointment straight into the calendar with notes attached.",
    stack: ["Retell AI", "ElevenLabs", "Claude API", "Twilio and Telnyx"],
  },
  {
    id: "outcome",
    label: "Booked Revenue",
    icon: "CalendarCheck",
    detail:
      "Outcome written back to the CRM automatically, the right person alerted in real time, and a dashboard that shows what actually happened rather than what should have.",
    stack: ["Live dashboards", "Real-time alerts", "Cal.com"],
  },
] as const;

/* --- Case studies ------------------------------------------- */
export type CaseStudy = {
  id: string;
  name: string;
  industry: string;
  geo: string;
  status: "live" | "build";
  summary: string;
  metrics: Metric[];
  problem: string;
  built: string[];
  outcome: string;
  span: string;
  featured?: boolean;
};

export const CASES: CaseStudy[] = [
  {
    id: "harbourline",
    name: "Harbourline Finance",
    industry: "Development finance brokerage",
    geo: "Sydney, Australia",
    status: "live",
    featured: true,
    span: "lg:col-span-3 lg:row-span-2",
    summary:
      "An eight-stage AI business development pipeline that finds property developers, works out who they are, contacts them, and hands the interested ones to the broker. It runs every day on its own.",
    metrics: [
      { value: "7,000+", label: "Leads captured" },
      { value: "870+", label: "Contacts enriched by AI" },
      { value: "6", label: "Deals booked in week one" },
      { value: "29", label: "Automations running live" },
    ],
    problem:
      "A two person brokerage was finding deals through personal relationships and referrals. There was no repeatable way to find a property developer who needed finance before a competitor did, and no capacity to chase thousands of prospects by hand.",
    built: [
      "Six lead sources scraped daily into one clean pipeline, with duplicates removed automatically",
      "AI enrichment that researches each company and finds the decision maker's direct contact details",
      "A scoring system that ranks every lead so the best ones get contacted first",
      "SMS and email outreach with a conversational AI that replies to responses in real time",
      "Automatic handoff into the broker's own CRM the moment a lead shows genuine interest",
      "A daily market brief that lands in the owner's inbox at 6am every weekday",
      "Five operating manuals and a live dashboard so the team can run it without us",
    ],
    outcome:
      "Six deals were in the pipeline within the first week of going live. The brokerage went from relationship-dependent lead flow to a system that produces qualified conversations every day, and the owner gets a real-time alert the second somebody says they are interested.",
  },
  {
    id: "veritas",
    name: "Veritas Access",
    industry: "Facial recognition access control",
    geo: "United States",
    status: "live",
    featured: true,
    span: "lg:col-span-3 lg:row-span-2",
    summary:
      "An AI cold caller that phones property management companies across the US, qualifies them against the ideal customer profile, and books demos into the sales director's calendar.",
    metrics: [
      { value: "3,274", label: "Prospects in pipeline" },
      { value: "~450/day", label: "Calls placed, sustained" },
      { value: "2,837", label: "Calls in a single week" },
      { value: "100%", label: "Auto-categorised outcomes" },
    ],
    problem:
      "A hardware company needed to reach thousands of multifamily, student housing and senior living operators. Hiring a team of callers to do it would have cost more per month than the whole system cost to build, and human callers cannot work a 3,000 lead list evenly.",
    built: [
      "An AI voice agent that opens the call, qualifies against the customer profile, and books a demo without a human touching it",
      "Five phone lines dialling in parallel, load balanced so no single number gets burned",
      "A three attempt retry ladder: two hours later, then the next day, always inside the legal calling window",
      "Timezone-safe calling so nobody is ever phoned outside business hours",
      "Deduplication so the same company is never called twice by two different lines",
      "Every call outcome written back automatically, so the pipeline stages are always true",
    ],
    outcome:
      "The system sustains roughly 450 calls a day and has peaked over 1,100, which is more dialling than a full desk of human callers gets through. Every single call is categorised automatically, so nobody spends their morning updating a CRM.",
  },
  {
    id: "noorddak",
    name: "Noorddak",
    industry: "Roofing and inspections",
    geo: "Netherlands",
    status: "live",
    span: "lg:col-span-2",
    summary:
      "A Dutch speaking AI that handles new roof inspection requests over both phone and WhatsApp, then books the right inspector based on who is closest and who is free.",
    metrics: [
      { value: "720+", label: "Opportunities managed" },
      { value: "8", label: "Inspector calendars routed" },
      { value: "5", label: "Live dashboards" },
      { value: "2", label: "Channels, one brain" },
    ],
    problem:
      "A roofing company offering free inspections was fielding leads by phone and losing the ones that came in after hours. Inspections were also being booked without regard to geography, so inspectors were driving across the country between two jobs.",
    built: [
      "A Dutch AI voice agent that answers inbound calls and books inspections",
      "A WhatsApp assistant that runs the same booking conversation in text",
      "A routing engine that geocodes the address and picks the inspector with the shortest detour",
      "Eight individual inspector calendars, each syncing to that inspector's own phone",
      "A full CRM build with an eight stage pipeline and automated follow-up ladder",
      "Five operational dashboards reporting on volume, conversion and inspector load",
    ],
    outcome:
      "Inspection planning went live with the whole booking journey automated end to end. The office no longer assigns jobs by hand, inspectors stop being sent across the country, and a homeowner who asks at 11pm gets an answer immediately.",
  },
  {
    id: "planwise",
    name: "Planwise Field Services",
    industry: "Field service software",
    geo: "Netherlands",
    status: "live",
    span: "lg:col-span-2",
    summary:
      "A Dutch voice agent that calls homeowners to schedule installations, backed by an engine that picks the crew who has to drive the least. Two other AI vendors tried this and could not ship it.",
    metrics: [
      { value: "285", label: "Slots evaluated per call" },
      { value: "~20", label: "Installer companies served" },
      { value: "2", label: "Vendors who failed first" },
      { value: "38", label: "Conversation nodes" },
    ],
    problem:
      "A field service software company needed installations scheduled by phone at volume. The hard part was not the conversation, it was that a valid appointment depends on which technicians are free, whether they are qualified, and how far each would have to drive from their previous job.",
    built: [
      "A Dutch AI agent that calls the customer, offers real appointment options, and books during the call",
      "A planning engine that reads every technician's diary and generates every workable combination",
      "Route ranking so the crew with the least additional driving is offered first",
      "Natural date handling, so a customer saying 'sometime in two weeks' is understood properly",
      "Live booking written straight into the client's own planning system with the call notes attached",
    ],
    outcome:
      "The agent books real installations into the live planning system during the call. The engine evaluates hundreds of valid options per request and returns the most efficient ones, a problem two previous AI vendors had failed to deliver.",
  },
  {
    id: "ridgeline",
    name: "Ridgeline Studio",
    industry: "Boutique fitness",
    geo: "United States",
    status: "live",
    span: "lg:col-span-2",
    summary:
      "Two booking systems that were never designed to talk, kept in sync both ways, with a hard guarantee that two clients can never land on one trainer.",
    metrics: [
      { value: "8/8", label: "QA scenarios passed" },
      { value: "0", label: "Double bookings possible" },
      { value: "0", label: "Dropped events" },
      { value: "2-way", label: "Real-time sync" },
    ],
    problem:
      "The studio ran bookings in one platform and all its marketing in another. Staff were re-typing every appointment into the second system, which meant the marketing side was always wrong, and clients were occasionally double booked onto the same trainer.",
    built: [
      "A two-way sync where a booking made in either system appears in the other within seconds",
      "Reschedules and cancellations that propagate both directions without creating duplicates",
      "Identity matching, so the same person booking in two places is recognised as one client",
      "A database-level guard that makes a double booking structurally impossible, not just unlikely",
      "Loop prevention, so the system never mistakes its own writes for a new booking",
    ],
    outcome:
      "Every scenario in the test plan passed, with zero dropped events and zero double bookings, verified against both platforms' own records. The staff stopped re-typing appointments entirely.",
  },
  {
    id: "havenpoort",
    name: "Havenpoort Shelter",
    industry: "Animal rescue and rehoming",
    geo: "Netherlands",
    status: "live",
    span: "lg:col-span-2",
    summary:
      "Seven separate Dutch voice agents, one for each kind of call a rescue centre gets, all on a single shared backend.",
    metrics: [
      { value: "7", label: "Specialised voice agents" },
      { value: "1", label: "Shared backend" },
      { value: "24/7", label: "Phone coverage" },
      { value: "0", label: "Duplicate bookings" },
    ],
    problem:
      "A rescue centre run by a handful of people was taking every call themselves: adoptions, boarding, surrenders, behaviour advice, urgent cases, donations and volunteers. The phone was eating the day and calls outside office hours went unanswered.",
    built: [
      "Seven Dutch voice agents, each trained on one type of enquiry",
      "One shared backend handling bookings, records and notifications for all seven",
      "Automatic appointment booking into the team's calendars",
      "SMS confirmations that work across Dutch and Belgian carriers",
      "Urgent cases escalated straight to a human instead of being queued",
    ],
    outcome:
      "Six agents went live, the phone is answered around the clock, and a family adopting two dogs now gets one correct appointment instead of two conflicting ones. The team got their day back.",
  },
  {
    id: "summit",
    name: "Summit Stone",
    industry: "Stone fabrication",
    geo: "Denver, United States",
    status: "live",
    span: "lg:col-span-2",
    summary:
      "An AI receptionist that answers the phone, transfers to whoever is on duty during business hours, and runs the front desk after hours.",
    metrics: [
      { value: "85%", label: "Scenario pass rate" },
      { value: "24/7", label: "Coverage" },
      { value: "0", label: "Missed after-hours calls" },
      { value: "1", label: "Text-back price list" },
    ],
    problem:
      "A stone fabricator was missing calls during the day when the team was on site, and missing all of them at night. Every missed call was a homeowner with a live project who simply phoned the next company on the list.",
    built: [
      "An AI receptionist that answers every inbound call",
      "Live lookup of who is on duty, including the weekend rota, then a warm transfer to that person",
      "After hours mode: answers common questions, captures the lead, and texts the price list automatically",
      "Instant SMS notification to the team with the caller's details and what they wanted",
    ],
    outcome:
      "The phone is answered every time. Calls that used to go to voicemail now arrive as a captured lead with a transcript, and the price list goes out by text before the caller has hung up.",
  },
  {
    id: "northgate",
    name: "Northgate Homes",
    industry: "Home and ADU construction",
    geo: "United States",
    status: "build",
    span: "lg:col-span-2",
    summary:
      "An education-led acquisition system for a builder with a six figure average project value, replacing a decaying bottom-of-funnel ad campaign.",
    metrics: [
      { value: "$150k–$300k", label: "Average project value" },
      { value: "~$2,000", label: "Current cost per customer" },
      { value: "$75", label: "Current cost per lead" },
      { value: "5", label: "Build milestones" },
    ],
    problem:
      "The builder was spending on ads pointed at a single 'book an assessment' form. It only ever caught people already ready to buy, the cost per lead was climbing, and the whole funnel was decaying. Lead flow also depended too heavily on the owner's personal network, which blocks a future sale of the business.",
    built: [
      "A live webinar publishing real all-in project costs, positioned as the top of funnel",
      "AI speed-to-lead calling so every registrant is contacted within a minute",
      "A five-touch show-up sequence to get registrants actually attending",
      "Four branch post-webinar follow-up depending on what each person did",
      "A twelve month nurture hold for the long decision cycle",
      "A reactivation campaign across the owner's existing unworked data",
    ],
    outcome:
      "Currently in build. The strategy and scope are locked and the system is being delivered across five milestones. Results will be published here once it has run.",
  },
];

export const STACK = [
  "Retell AI", "ElevenLabs", "n8n", "GoHighLevel", "Claude API", "Supabase",
  "Railway", "Twilio", "Telnyx", "Cal.com", "Zapier", "Clay", "Next.js", "Vercel",
];

export const CAL_LINK = "mabdullahi7780/mo-ai-consultation-call";
export const CAL_URL = "https://cal.com/mabdullahi7780/mo-ai-consultation-call";
export const CONTACT_EMAIL = "mabdullahi7780@gmail.com";
