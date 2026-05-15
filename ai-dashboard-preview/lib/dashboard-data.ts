import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Cpu,
  LayoutGrid,
  LineChart,
  Settings,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";

export type PageKey =
  | "command"
  | "workspace"
  | "workflows"
  | "models"
  | "insights"
  | "team"
  | "trust"
  | "settings";

export type TableColumn = "model" | "requests" | "latencyMs" | "costUsd" | "successRate";

export type TableRow = {
  id: string;
  model: string;
  requests: number;
  latencyMs: number;
  costUsd: number;
  successRate: number;
  status: "Healthy" | "Watch" | "Optimized";
};

export type NavGroup = {
  title: string;
  items: { key: PageKey; label: string; icon: LucideIcon }[];
};

export const navGroups: NavGroup[] = [
  {
    title: "Overview",
    items: [
      { key: "command", label: "Command Center", icon: LayoutGrid },
      { key: "workspace", label: "AI Workspace", icon: Bot },
      { key: "workflows", label: "Workflows", icon: Workflow },
      { key: "models", label: "Model Usage", icon: Cpu },
      { key: "insights", label: "Insights", icon: LineChart },
    ],
  },
  {
    title: "Operations",
    items: [
      { key: "team", label: "Team Activity", icon: Users },
      { key: "trust", label: "Trust & Safety", icon: ShieldCheck },
      { key: "settings", label: "Settings", icon: Settings },
    ],
  },
];

export const pageMeta: Record<PageKey, { eyebrow: string; title: string; description: string }> = {
  command: {
    eyebrow: "Live command center",
    title: "AI Operations Dashboard",
    description:
      "A premium enterprise workspace for monitoring model performance, workflow health, team velocity, and AI-assisted decision making in one calm surface.",
  },
  workspace: {
    eyebrow: "AI authoring workspace",
    title: "AI Workspace",
    description:
      "Compose, test, and operationalize high-value AI work with model controls, prompt context, token visibility, and assistant-ready outputs in one polished environment.",
  },
  workflows: {
    eyebrow: "Workflow orchestration",
    title: "AI Workflows",
    description:
      "Create, monitor, and refine multi-step AI automations across revenue, support, legal, and operations teams.",
  },
  models: {
    eyebrow: "Inference operations",
    title: "Model Usage",
    description:
      "Monitor throughput, latency, cost, and reliability across every model tier in production.",
  },
  insights: {
    eyebrow: "Executive intelligence",
    title: "Insights",
    description:
      "Bring together analytics, AI summaries, and strategic recommendations in a single calm view.",
  },
  team: {
    eyebrow: "Collaboration stream",
    title: "Team Activity",
    description:
      "Review approvals, launches, comments, AI handoffs, and operational decisions in one activity feed.",
  },
  trust: {
    eyebrow: "Governance center",
    title: "Trust & Safety",
    description:
      "Keep AI systems aligned with enterprise policy through evaluations, monitoring, and review workflows.",
  },
  settings: {
    eyebrow: "Workspace controls",
    title: "Settings",
    description:
      "Manage organization-wide defaults for models, teams, security, and reporting.",
  },
};

export const metrics = [
  {
    id: "revenue",
    title: "AI Revenue Influence",
    value: "$2.48M",
    change: "+18.2%",
    tone: "info" as const,
    note: "Workflow-assisted pipeline this quarter",
  },
  {
    id: "efficiency",
    title: "Model Efficiency",
    value: "94.8%",
    change: "+6.1%",
    tone: "success" as const,
    note: "Spend per task dropped over 30 days",
  },
  {
    id: "automation",
    title: "Active Automations",
    value: "184",
    change: "+12",
    tone: "neutral" as const,
    note: "Across support, ops, and revenue teams",
  },
  {
    id: "risk",
    title: "Escalation Risk",
    value: "3.4%",
    change: "-1.1%",
    tone: "warning" as const,
    note: "Critical workflow exceptions this week",
  },
];

export const chartSeries = {
  "30d": [48, 46, 54, 52, 62, 66, 59, 71, 68, 74, 77, 80],
  "12w": [42, 56, 51, 68, 60, 74, 70, 88, 80, 91, 86, 95],
  ytd: [28, 34, 40, 49, 58, 62, 66, 70, 75, 80, 84, 89],
};

export const workflowData = [
  {
    id: "wf-1",
    name: "Lead qualification copilot",
    status: "Healthy" as const,
    owner: "Growth",
    runs: "2.4k/day",
    category: "active" as const,
    description: "Routes, scores, and enriches inbound pipeline.",
  },
  {
    id: "wf-2",
    name: "Support triage assistant",
    status: "Monitoring" as const,
    owner: "CX",
    runs: "1.1k/day",
    category: "watch" as const,
    description: "Summarizes cases and assigns urgency.",
  },
  {
    id: "wf-3",
    name: "Contract risk extraction",
    status: "Healthy" as const,
    owner: "Legal",
    runs: "840/day",
    category: "active" as const,
    description: "Flags clause issues and prepares legal summaries.",
  },
  {
    id: "wf-4",
    name: "Quarterly board brief",
    status: "Draft" as const,
    owner: "Strategy",
    runs: "Draft",
    category: "drafts" as const,
    description: "Drafts narrative summaries from cross-functional metrics.",
  },
];

export const baseTableRows: TableRow[] = [
  {
    id: "m1",
    model: "GPT-5.4",
    requests: 248390,
    latencyMs: 1200,
    costUsd: 18420,
    successRate: 98.4,
    status: "Healthy",
  },
  {
    id: "m2",
    model: "GPT-5.4 Mini",
    requests: 902114,
    latencyMs: 480,
    costUsd: 9870,
    successRate: 99.1,
    status: "Optimized",
  },
  {
    id: "m3",
    model: "Embedding Worker",
    requests: 1400000,
    latencyMs: 190,
    costUsd: 4110,
    successRate: 99.8,
    status: "Optimized",
  },
  {
    id: "m4",
    model: "Reasoning Fallback",
    requests: 121440,
    latencyMs: 1620,
    costUsd: 6120,
    successRate: 96.3,
    status: "Watch",
  },
];

export const timeline = [
  { title: "Weekly planning brief generated", time: "8 min ago", tone: "info" as const },
  { title: "Support escalation cluster detected", time: "27 min ago", tone: "warning" as const },
  { title: "Revenue summary sent to leadership", time: "1 hr ago", tone: "success" as const },
  { title: "Prompt library updated for sales", time: "2 hr ago", tone: "neutral" as const },
];

export const notificationItems = [
  "Two workflows need human approval",
  "Spend anomaly detected in GPT-5.4 tier",
  "Quarterly analytics pack is ready",
];

export const suggestedPrompts = [
  "Why did support escalations spike this morning?",
  "Summarize revenue-impacting workflow changes.",
  "Draft a status update for leadership.",
];

export const workspaceModelOptions = [
  {
    id: "gpt-5.4",
    name: "GPT-5.4",
    description: "Best for high-stakes reasoning, synthesis, and executive-ready outputs.",
  },
  {
    id: "gpt-5.4-mini",
    name: "GPT-5.4 Mini",
    description: "Fast drafting and lightweight analysis with strong cost efficiency.",
  },
  {
    id: "reasoning-fallback",
    name: "Reasoning Fallback",
    description: "Escalates complex requests that need deeper verification and policy review.",
  },
];

export const workspaceQuickPrompts = [
  "Draft a QBR narrative from the current workspace metrics.",
  "Summarize support escalations and recommend next steps.",
  "Turn this workflow output into a client-ready update.",
  "Extract risks, blockers, and recommended owners from the attached files.",
];

export const workspaceContextSuggestions = [
  "Use executive tone",
  "Include blockers and next actions",
  "Reference last 30 days of analytics",
  "Compare model cost before recommending rollout",
];

export const workspaceGenerationHistory = [
  {
    id: "gen-1",
    title: "Board update draft",
    model: "GPT-5.4",
    time: "4 min ago",
    status: "Ready" as const,
  },
  {
    id: "gen-2",
    title: "Support escalation summary",
    model: "GPT-5.4 Mini",
    time: "18 min ago",
    status: "Review" as const,
  },
  {
    id: "gen-3",
    title: "Legal clause extraction memo",
    model: "Reasoning Fallback",
    time: "42 min ago",
    status: "Approved" as const,
  },
];

export const workspaceResponses = [
  {
    id: "resp-1",
    title: "Executive summary",
    body: "Escalation volume rose after support routing thresholds were adjusted. Recommended action is to restore the previous confidence floor for medium-complexity tickets and re-evaluate human handoff quality after 48 hours.",
    badge: "High confidence",
    tone: "info" as const,
  },
  {
    id: "resp-2",
    title: "Next-step recommendations",
    body: "Publish a revised prompt pack for CX reviewers, add latency alerting for fallback routes, and route policy changes through the trust review queue before rollout.",
    badge: "Actionable",
    tone: "success" as const,
  },
];

export const workspaceTokenStats = [
  { label: "Prompt tokens", value: "8.2k", note: "Current draft input" },
  { label: "Output tokens", value: "2.9k", note: "Latest generation" },
  { label: "Estimated cost", value: "$12.84", note: "Workspace session spend" },
];

export const workspaceAiActions = [
  "Optimize prompt",
  "Generate structured brief",
  "Convert to workflow",
  "Share with team reviewer",
];

export const workspaceSavedPrompts = [
  {
    id: "saved-1",
    title: "Leadership weekly brief",
    body: "Summarize product, support, and revenue changes from the last seven days with blockers, notable risks, and next actions.",
    badge: "Pinned",
    tone: "info" as const,
  },
  {
    id: "saved-2",
    title: "Escalation incident analysis",
    body: "Review support routing changes, anomaly detections, and reviewer load. Identify root cause and rollout-safe remediation.",
    badge: "Operations",
    tone: "warning" as const,
  },
  {
    id: "saved-3",
    title: "Client-ready workflow summary",
    body: "Turn a raw workflow output into a polished external-facing summary with confidence notes and approval disclaimers.",
    badge: "Template",
    tone: "success" as const,
  },
];

export const workspaceToolSections = [
  {
    id: "tool-1",
    title: "Prompt optimizer",
    body: "Refines tone, structure, and context density before generation to improve downstream quality and reduce token waste.",
    badge: "Built in",
    tone: "success" as const,
  },
  {
    id: "tool-2",
    title: "Workflow builder",
    body: "Promotes strong prompt patterns into reusable multi-step automations with approvals, routing, and model policies.",
    badge: "Automation",
    tone: "info" as const,
  },
  {
    id: "tool-3",
    title: "Source grounding",
    body: "Attaches uploaded files, notes, and recent workspace signals so assistant outputs remain traceable and reviewable.",
    badge: "Context",
    tone: "neutral" as const,
  },
];

export const workspaceLiveActivity = [
  { id: "live-1", title: "Prompt optimizer suggested a shorter opening paragraph", time: "Just now", tone: "info" as const },
  { id: "live-2", title: "Source grounding attached 3 files from the current workspace", time: "6 min ago", tone: "neutral" as const },
  { id: "live-3", title: "Workflow builder flagged legal review before external sharing", time: "14 min ago", tone: "warning" as const },
];

export const commandProjects = [
  { id: "proj-1", name: "Northstar AI Core", description: "Primary enterprise workspace", badge: "Current" },
  { id: "proj-2", name: "Support Intelligence", description: "CX automation and escalation review" },
  { id: "proj-3", name: "Revenue Ops Lab", description: "Forecasting, qualification, and QBR workflows" },
];

export const commandQuickActions = [
  {
    id: "cmd-ai-1",
    label: "Summarize workspace changes",
    description: "Generate a concise operating brief from current workflow, spend, and activity signals.",
    shortcut: "G S",
    tone: "info" as const,
  },
  {
    id: "cmd-ai-2",
    label: "Create AI workflow",
    description: "Launch a new multi-step automation from prompt, files, or recent outputs.",
    shortcut: "G W",
    tone: "success" as const,
  },
  {
    id: "cmd-ai-3",
    label: "Inspect model spend",
    description: "Open model usage with cost and latency context already filtered for anomalies.",
    shortcut: "G M",
    tone: "warning" as const,
  },
];

export const commandRecentActivity = [
  { id: "recent-1", title: "Support triage assistant adjusted threshold", time: "9 min ago", tone: "warning" as const },
  { id: "recent-2", title: "Executive summary draft shared with leadership", time: "26 min ago", tone: "success" as const },
  { id: "recent-3", title: "Prompt library synced to workspace defaults", time: "52 min ago", tone: "info" as const },
];

export const commandShortcuts = [
  { label: "Open palette", keys: "⌘ K" },
  { label: "Focus search", keys: "/" },
  { label: "New AI workflow", keys: "G W" },
  { label: "Workspace summary", keys: "G S" },
  { label: "Quick settings", keys: "G ," },
];

export const modelColumnLabels: Record<TableColumn, string> = {
  model: "Model",
  requests: "Requests",
  latencyMs: "Median latency",
  costUsd: "Spend",
  successRate: "Success",
};

export const simplePageCards: Record<
  Exclude<PageKey, "command">,
  {
    title: string;
    description: string;
    cards: {
      title: string;
      body: string;
      badge?: string;
      tone?: "info" | "success" | "warning" | "neutral";
    }[];
  }
> = {
  workspace: {
    title: "AI Workspace",
    description: "Interactive AI workspace for drafting, analysis, and generation.",
    cards: [
      {
        title: "Prompt composer",
        body: "Draft and refine prompts with structured context and AI assistance.",
        badge: "Active",
        tone: "info",
      },
      {
        title: "Generation history",
        body: "Review previous outputs, revisions, and saved generations.",
        badge: "Recent",
        tone: "success",
      },
      {
        title: "Context sources",
        body: "Attach files, notes, and references to improve AI output quality.",
        badge: "Connected",
        tone: "neutral",
      },
    ],
  },
  workflows: {
    title: "Workflow portfolio",
    description: "Interactive placeholder cards for multi-step automation monitoring and management.",
    cards: [
      { title: "Lead qualification copilot", body: "Routes, scores, and enriches inbound pipeline with CRM sync and approval checkpoints.", badge: "Healthy", tone: "success" },
      { title: "Support triage assistant", body: "Summarizes incoming tickets, assigns urgency, and proposes human escalation paths.", badge: "Monitoring", tone: "warning" },
      { title: "Contract risk extraction", body: "Parses uploaded legal documents and drafts structured clause summaries for counsel.", badge: "Healthy", tone: "success" },
    ],
  },
  models: {
    title: "Model operations",
    description: "Interactive placeholders for routing policy, usage optimization, and spend controls.",
    cards: [
      { title: "Tier mix", body: "Compare premium reasoning, standard generation, and lightweight inference allocation." },
      { title: "Cost controls", body: "Inspect budget ceilings, fallback logic, and optimization opportunities.", badge: "Below budget", tone: "success" },
      { title: "Latency watch", body: "See which routes have slower response times and trigger remediation." },
    ],
  },
  insights: {
    title: "Executive insights",
    description: "AI-generated summaries and recommendations that help leaders act on product and ops signal.",
    cards: [
      { title: "Revenue upside", body: "AI-assisted lead scoring increased qualified opportunities by 14% this quarter.", badge: "High impact", tone: "info" },
      { title: "Support pressure", body: "Escalation volume rose after routing thresholds became more conservative this week.", badge: "Needs review", tone: "warning" },
      { title: "Legal savings", body: "Contract extraction reduced first-pass review time by an estimated 11 hours per week.", badge: "Healthy", tone: "success" },
    ],
  },
  team: {
    title: "Team activity",
    description: "Approvals, launches, comments, and AI handoffs across every functional team.",
    cards: [
      { title: "Approvals today", body: "42 approvals completed with average review time below target.", badge: "42", tone: "neutral" },
      { title: "AI handoffs", body: "286 AI-to-human handoffs completed with strong completion quality.", badge: "286", tone: "info" },
      { title: "Blocked tasks", body: "Seven tasks currently need policy review or owner feedback.", badge: "7", tone: "warning" },
    ],
  },
  trust: {
    title: "Trust & safety",
    description: "Policy monitoring, evaluation coverage, reviewer queues, and incident posture.",
    cards: [
      { title: "Open alerts", body: "Three low-risk items currently need manual review.", badge: "3", tone: "warning" },
      { title: "Coverage", body: "87% of active workflows are mapped to baseline safety evaluations.", badge: "87%", tone: "success" },
      { title: "Reviewer queue", body: "14 pending reviews across trust, support, and legal oversight groups.", badge: "14", tone: "info" },
    ],
  },
  settings: {
    title: "Workspace settings",
    description: "Organization-wide controls for models, teams, budgets, and governance.",
    cards: [
      { title: "Workspace profile", body: "Manage brand, locale, reporting cadence, and owner configuration." },
      { title: "AI defaults", body: "Set base generation models, reasoning fallbacks, and cost ceilings." },
      { title: "Access templates", body: "Review admin, owner, reviewer, and audit permission models.", badge: "Scoped", tone: "neutral" },
    ],
  },
};

export const formatNumber = (value: number) => new Intl.NumberFormat("en-US").format(value);
export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
