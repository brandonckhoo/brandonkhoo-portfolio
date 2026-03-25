'use client'

import { useState, useMemo } from 'react'

// ─── TYPES ────────────────────────────────────────────────────────────────────

type Criticality = 'Critical' | 'High' | 'Medium' | 'Low'
type MonitoringStatus = 'Alert' | 'Active' | 'Pending Review' | 'Paused'
type RecAction = 'Reassess' | 'Accept Risk' | 'Request Update' | 'Assign Owner' | 'No Action'
type SignalSource = 'SecurityScorecard' | 'Bitsight' | 'Manual' | 'Questionnaire' | 'CVE Database' | 'News Feed'
type DetailTab = 'overview' | 'signals' | 'timeline' | 'evidence' | 'controls' | 'tasks' | 'audit'

interface MonitoringSignal {
  id: string
  type: string
  description: string
  source: SignalSource
  severity: Criticality
  detectedAt: string
  evidence?: string
}

interface AuditEntry {
  id: string
  actorType: 'system' | 'user'
  actor: string
  action: string
  timestamp: string
  details?: string
}

interface Task {
  id: string
  title: string
  status: 'Open' | 'In Progress' | 'Resolved'
  assignee: string
  dueDate: string
}

interface Document {
  name: string
  type: string
  date: string
  expired?: boolean
}

interface Vendor {
  id: string
  name: string
  initials: string
  logoColor: string
  category: string
  criticality: Criticality
  riskScore: number
  riskDelta: number
  primarySignal: string
  signalSource: SignalSource
  monitoringStatus: MonitoringStatus
  owner: string
  ownerInitials: string
  lastReview: string
  nextReview: string
  recommendedAction: RecAction
  aiSummary: string
  signals: MonitoringSignal[]
  tasks: Task[]
  auditLog: AuditEntry[]
  linkedControls: string[]
  linkedDocuments: Document[]
}

// ─── SAMPLE DATA ──────────────────────────────────────────────────────────────

const VENDORS: Vendor[] = [
  {
    id: '1',
    name: 'Stripe',
    initials: 'ST',
    logoColor: '#635BFF',
    category: 'Payment Processing',
    criticality: 'Critical',
    riskScore: 78,
    riskDelta: 12,
    primarySignal: 'Public data breach reported affecting 2.4M records',
    signalSource: 'SecurityScorecard',
    monitoringStatus: 'Alert',
    owner: 'Sarah Chen',
    ownerInitials: 'SC',
    lastReview: 'Jan 15, 2026',
    nextReview: 'Apr 1, 2026',
    recommendedAction: 'Reassess',
    aiSummary: "Stripe's risk score increased from 66 to 78 (+12 pts) over the past 7 days. The primary driver is a publicly disclosed data breach affecting ~2.4M customer records (Mar 18, 2026). SecurityScorecard flagged a drop in Application Security from 72 → 51, and an expired TLS certificate on api.stripe.com was detected Mar 20. Stripe processes payment data under your SOC 2 scope (CC6.1, PI1.1). Given the breach disclosure and score deterioration, an expedited reassessment is recommended before the scheduled Apr 1 review.",
    signals: [
      { id: 's1', type: 'Data Breach', description: 'Public breach affecting 2.4M records — disclosed via Stripe Security Advisory', source: 'SecurityScorecard', severity: 'Critical', detectedAt: 'Mar 18, 2026', evidence: 'https://security.stripe.com' },
      { id: 's2', type: 'TLS Certificate', description: 'Expired TLS cert detected on api.stripe.com (expired Mar 15, 2026)', source: 'SecurityScorecard', severity: 'High', detectedAt: 'Mar 20, 2026' },
      { id: 's3', type: 'Subscore Decline', description: 'Application Security subscore declined: 72 → 51 (−21 pts)', source: 'SecurityScorecard', severity: 'High', detectedAt: 'Mar 21, 2026' },
    ],
    tasks: [
      { id: 't1', title: 'Initiate expedited security reassessment', status: 'Open', assignee: 'Sarah Chen', dueDate: 'Mar 28, 2026' },
      { id: 't2', title: 'Request updated breach impact statement from Stripe', status: 'Open', assignee: 'Sarah Chen', dueDate: 'Mar 27, 2026' },
    ],
    auditLog: [
      { id: 'a1', actorType: 'system', actor: 'System', action: 'Risk score updated: 66 → 78', timestamp: 'Mar 21, 2026 09:14 AM', details: 'Triggered by SecurityScorecard Application Security subscore change' },
      { id: 'a2', actorType: 'system', actor: 'System', action: 'Alert generated — Critical signal detected', timestamp: 'Mar 18, 2026 03:22 PM', details: 'Data breach disclosure detected via SecurityScorecard and News Feed integration' },
      { id: 'a3', actorType: 'user', actor: 'Sarah Chen', action: 'Annual security review completed', timestamp: 'Jan 15, 2026 11:00 AM', details: 'SOC 2 Type II verified. No critical findings.' },
    ],
    linkedControls: ['CC6.1 – Logical Access Controls', 'CC9.2 – Vendor Risk Assessment', 'PI1.1 – Privacy Practices', 'CC7.2 – System Monitoring'],
    linkedDocuments: [
      { name: 'Stripe SOC 2 Type II Report', type: 'Compliance Report', date: 'Nov 2025' },
      { name: 'Stripe Data Processing Agreement', type: 'Legal', date: 'Aug 2025' },
      { name: 'Stripe Security Review — Q1 2026', type: 'Assessment', date: 'Jan 2026' },
    ],
  },
  {
    id: '2',
    name: 'Salesforce',
    initials: 'SF',
    logoColor: '#00A1E0',
    category: 'CRM',
    criticality: 'Critical',
    riskScore: 62,
    riskDelta: 8,
    primarySignal: 'SOC 2 report expired 45 days ago — no replacement received',
    signalSource: 'Manual',
    monitoringStatus: 'Alert',
    owner: 'Marcus Webb',
    ownerInitials: 'MW',
    lastReview: 'Dec 10, 2025',
    nextReview: 'Mar 10, 2026',
    recommendedAction: 'Request Update',
    aiSummary: "Salesforce's SOC 2 Type II report expired February 8, 2026 — 45 days ago. Two automated requests were sent (Feb 10, Feb 24) with no response. Overall risk score increased from 54 to 62 as a result. Salesforce holds customer data across Sales, Service, and Marketing Cloud under your SOC 2 scope. The absence of a current compliance report creates an audit evidence gap. Recommend requesting updated documentation within 5 business days or escalating through your procurement contact.",
    signals: [
      { id: 's1', type: 'Document Expiry', description: 'SOC 2 Type II report expired Feb 8, 2026 — no renewal on file', source: 'Manual', severity: 'High', detectedAt: 'Feb 8, 2026' },
      { id: 's2', type: 'No Response', description: 'Evidence request unanswered — 2 automated follow-ups sent', source: 'Questionnaire', severity: 'High', detectedAt: 'Mar 15, 2026' },
    ],
    tasks: [
      { id: 't1', title: 'Request updated SOC 2 report from Salesforce Trust Center', status: 'Open', assignee: 'Marcus Webb', dueDate: 'Mar 26, 2026' },
    ],
    auditLog: [
      { id: 'a1', actorType: 'system', actor: 'System', action: 'Document expiry alert triggered', timestamp: 'Feb 8, 2026 12:00 AM' },
      { id: 'a2', actorType: 'system', actor: 'System', action: 'Automated evidence request sent (1 of 2)', timestamp: 'Feb 10, 2026 09:00 AM' },
      { id: 'a3', actorType: 'system', actor: 'System', action: 'Follow-up request sent — no response received', timestamp: 'Feb 24, 2026 09:00 AM' },
      { id: 'a4', actorType: 'user', actor: 'Marcus Webb', action: 'Annual review completed', timestamp: 'Dec 10, 2025 02:30 PM' },
    ],
    linkedControls: ['CC9.2 – Vendor Risk Assessment', 'A1.2 – Availability Controls'],
    linkedDocuments: [
      { name: 'Salesforce SOC 2 Type II Report', type: 'Compliance Report', date: 'Sep 2025', expired: true },
      { name: 'Salesforce Master Subscription Agreement', type: 'Legal', date: 'Mar 2024' },
    ],
  },
  {
    id: '3',
    name: 'Okta',
    initials: 'OK',
    logoColor: '#007DC1',
    category: 'Identity & Access',
    criticality: 'Critical',
    riskScore: 55,
    riskDelta: 5,
    primarySignal: 'CVE-2026-1147 (CVSS 9.1) — patch status unconfirmed',
    signalSource: 'CVE Database',
    monitoringStatus: 'Alert',
    owner: 'Unassigned',
    ownerInitials: '—',
    lastReview: 'Feb 3, 2026',
    nextReview: 'May 3, 2026',
    recommendedAction: 'Assign Owner',
    aiSummary: "A critical vulnerability (CVE-2026-1147, CVSS 9.1) affecting Okta's WS-Federation module was published March 19, 2026. Patch confirmation has not been received. Okta manages SSO and MFA for your organization and is in scope for CC6.1. No owner is currently assigned to this vendor, creating a response gap. The combination of a critical unpatched CVE and unassigned ownership requires immediate action: assign an owner, then issue a patch confirmation request.",
    signals: [
      { id: 's1', type: 'CVE', description: 'CVE-2026-1147 (CVSS 9.1) — Remote Code Execution in WS-Federation module', source: 'CVE Database', severity: 'Critical', detectedAt: 'Mar 19, 2026', evidence: 'https://nvd.nist.gov/vuln/detail/CVE-2026-1147' },
      { id: 's2', type: 'Ownership Gap', description: 'No owner assigned — vendor cannot be triaged without an owner', source: 'Manual', severity: 'Medium', detectedAt: 'Mar 22, 2026' },
    ],
    tasks: [],
    auditLog: [
      { id: 'a1', actorType: 'system', actor: 'System', action: 'CVE-2026-1147 detected via NVD feed integration', timestamp: 'Mar 19, 2026 06:45 AM' },
      { id: 'a2', actorType: 'system', actor: 'System', action: 'Risk score updated: 50 → 55', timestamp: 'Mar 19, 2026 07:00 AM', details: 'Triggered by CVE severity weighting' },
      { id: 'a3', actorType: 'user', actor: 'Jamie Torres', action: 'Review completed', timestamp: 'Feb 3, 2026 10:00 AM' },
    ],
    linkedControls: ['CC6.1 – Logical Access Controls', 'CC6.2 – Authentication Controls'],
    linkedDocuments: [
      { name: 'Okta SOC 2 Type II Report', type: 'Compliance Report', date: 'Dec 2025' },
      { name: 'Okta Security Hardening Guide', type: 'Technical', date: 'Jan 2026' },
    ],
  },
  {
    id: '4',
    name: 'AWS',
    initials: 'AW',
    logoColor: '#FF9900',
    category: 'Cloud Infrastructure',
    criticality: 'Critical',
    riskScore: 32,
    riskDelta: -3,
    primarySignal: 'IAM policy over-permissioning detected in us-east-1',
    signalSource: 'Bitsight',
    monitoringStatus: 'Pending Review',
    owner: 'Priya Nair',
    ownerInitials: 'PN',
    lastReview: 'Mar 1, 2026',
    nextReview: 'Jun 1, 2026',
    recommendedAction: 'No Action',
    aiSummary: "AWS risk score decreased slightly from 35 to 32 (−3 pts), reflecting improved network hygiene. One open signal: IAM policy misconfigurations in us-east-1 were flagged March 14 and acknowledged by the infrastructure team (ticket INC-4821 in progress). Annual review completed March 1 with no critical findings. No immediate escalation required — continue standard monitoring cadence.",
    signals: [
      { id: 's1', type: 'Misconfiguration', description: 'IAM over-permissioning in us-east-1 — 3 roles with admin-level access not scoped correctly', source: 'Bitsight', severity: 'Medium', detectedAt: 'Mar 14, 2026' },
    ],
    tasks: [
      { id: 't1', title: 'Confirm INC-4821 remediation with infra team', status: 'In Progress', assignee: 'Priya Nair', dueDate: 'Mar 30, 2026' },
    ],
    auditLog: [
      { id: 'a1', actorType: 'system', actor: 'System', action: 'IAM misconfiguration signal detected', timestamp: 'Mar 14, 2026 11:30 AM' },
      { id: 'a2', actorType: 'user', actor: 'Priya Nair', action: 'Annual review completed', timestamp: 'Mar 1, 2026 09:00 AM', details: 'SOC 2 verified. ISO 27001 current.' },
      { id: 'a3', actorType: 'system', actor: 'System', action: 'Risk score updated: 35 → 32', timestamp: 'Mar 7, 2026 08:00 AM' },
    ],
    linkedControls: ['CC6.3 – Network Access', 'CC6.6 – Logical Access Removal', 'CC7.2 – System Monitoring'],
    linkedDocuments: [
      { name: 'AWS SOC 2 Type II Report', type: 'Compliance Report', date: 'Feb 2026' },
      { name: 'AWS ISO 27001 Certificate', type: 'Certification', date: 'Jan 2026' },
      { name: 'AWS Shared Responsibility Model', type: 'Technical', date: 'Jan 2026' },
    ],
  },
  {
    id: '5',
    name: 'GitHub',
    initials: 'GH',
    logoColor: '#24292F',
    category: 'Code Repository',
    criticality: 'High',
    riskScore: 41,
    riskDelta: 0,
    primarySignal: 'Scheduled review due in 14 days',
    signalSource: 'Manual',
    monitoringStatus: 'Active',
    owner: 'Alex Kim',
    ownerInitials: 'AK',
    lastReview: 'Dec 28, 2025',
    nextReview: 'Apr 8, 2026',
    recommendedAction: 'No Action',
    aiSummary: "GitHub's risk posture is stable. No new monitoring signals in the past 30 days. Score is unchanged at 41. Annual review is due April 8, 2026 — 14 days from today. Suggested review scope: access provisioning audit, branch protection policy verification, and GitHub Advanced Security enablement status for critical repositories.",
    signals: [],
    tasks: [],
    auditLog: [
      { id: 'a1', actorType: 'user', actor: 'Alex Kim', action: 'Annual review completed', timestamp: 'Dec 28, 2025 03:00 PM' },
      { id: 'a2', actorType: 'system', actor: 'System', action: 'Next review scheduled: Apr 8, 2026', timestamp: 'Dec 28, 2025 03:01 PM' },
    ],
    linkedControls: ['CC8.1 – Change Management', 'CC6.1 – Logical Access Controls'],
    linkedDocuments: [
      { name: 'GitHub SOC 2 Type II Report', type: 'Compliance Report', date: 'Oct 2025' },
    ],
  },
  {
    id: '6',
    name: 'Snowflake',
    initials: 'SN',
    logoColor: '#29B5E8',
    category: 'Data Warehouse',
    criticality: 'High',
    riskScore: 48,
    riskDelta: 6,
    primarySignal: 'Network security declined — 2 exposed S3 buckets detected',
    signalSource: 'SecurityScorecard',
    monitoringStatus: 'Alert',
    owner: 'Sarah Chen',
    ownerInitials: 'SC',
    lastReview: 'Feb 20, 2026',
    nextReview: 'May 20, 2026',
    recommendedAction: 'Reassess',
    aiSummary: "Snowflake's risk score increased from 42 to 48 (+6 pts). SecurityScorecard detected two publicly accessible S3 buckets associated with Snowflake infrastructure on March 17. Network security subscore dropped 68 → 52. Snowflake processes your analytical data including customer behavioral data under your data processing agreement. Recommend an updated assessment focused on data isolation and network security controls.",
    signals: [
      { id: 's1', type: 'Network Exposure', description: '2 publicly accessible S3 buckets detected on Snowflake-managed infrastructure', source: 'SecurityScorecard', severity: 'High', detectedAt: 'Mar 17, 2026' },
      { id: 's2', type: 'Subscore Decline', description: 'Network Security subscore: 68 → 52 (−16 pts)', source: 'SecurityScorecard', severity: 'Medium', detectedAt: 'Mar 17, 2026' },
    ],
    tasks: [
      { id: 't1', title: 'Schedule accelerated vendor assessment', status: 'Open', assignee: 'Sarah Chen', dueDate: 'Apr 1, 2026' },
    ],
    auditLog: [
      { id: 'a1', actorType: 'system', actor: 'System', action: 'Network Security score decline detected', timestamp: 'Mar 17, 2026 10:15 AM' },
      { id: 'a2', actorType: 'system', actor: 'System', action: 'Risk score updated: 42 → 48', timestamp: 'Mar 17, 2026 10:20 AM' },
      { id: 'a3', actorType: 'user', actor: 'Sarah Chen', action: 'Review completed', timestamp: 'Feb 20, 2026 02:00 PM' },
    ],
    linkedControls: ['CC9.2 – Vendor Risk Assessment', 'PI1.5 – Data Retention and Disposal'],
    linkedDocuments: [
      { name: 'Snowflake SOC 2 Type II Report', type: 'Compliance Report', date: 'Jan 2026' },
      { name: 'Snowflake DPA', type: 'Legal', date: 'Jun 2025' },
    ],
  },
  {
    id: '7',
    name: 'Slack',
    initials: 'SL',
    logoColor: '#4A154B',
    category: 'Communication',
    criticality: 'Medium',
    riskScore: 29,
    riskDelta: -2,
    primarySignal: 'No new signals — posture improving',
    signalSource: 'SecurityScorecard',
    monitoringStatus: 'Active',
    owner: 'Marcus Webb',
    ownerInitials: 'MW',
    lastReview: 'Jan 8, 2026',
    nextReview: 'Jul 8, 2026',
    recommendedAction: 'No Action',
    aiSummary: "Slack's risk posture improved slightly, score decreased from 31 to 29 (−2 pts). SecurityScorecard shows consistent improvements in patching cadence. No new signals in the last 30 days. Next scheduled review is July 8, 2026. Standard monitoring continues.",
    signals: [],
    tasks: [],
    auditLog: [
      { id: 'a1', actorType: 'system', actor: 'System', action: 'Risk score updated: 31 → 29', timestamp: 'Mar 10, 2026 09:00 AM' },
      { id: 'a2', actorType: 'user', actor: 'Marcus Webb', action: 'Annual review completed', timestamp: 'Jan 8, 2026 11:00 AM' },
    ],
    linkedControls: ['CC6.1 – Logical Access Controls'],
    linkedDocuments: [
      { name: 'Slack SOC 2 Type II Report', type: 'Compliance Report', date: 'Nov 2025' },
    ],
  },
]

// ─── STYLE MAPS ───────────────────────────────────────────────────────────────

const CRIT_BADGE: Record<Criticality, string> = {
  Critical: 'bg-red-50 text-red-700 border-red-200',
  High: 'bg-orange-50 text-orange-700 border-orange-200',
  Medium: 'bg-amber-50 text-amber-700 border-amber-200',
  Low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
}

const STATUS_BADGE: Record<MonitoringStatus, string> = {
  Alert: 'bg-red-50 text-red-700 border-red-200',
  Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Pending Review': 'bg-amber-50 text-amber-700 border-amber-200',
  Paused: 'bg-slate-100 text-slate-500 border-slate-200',
}

const STATUS_DOT: Record<MonitoringStatus, string> = {
  Alert: 'bg-red-500',
  Active: 'bg-emerald-500',
  'Pending Review': 'bg-amber-500',
  Paused: 'bg-slate-400',
}

const SOURCE_BADGE: Record<SignalSource, string> = {
  SecurityScorecard: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  Bitsight: 'bg-blue-50 text-blue-700 border-blue-200',
  Manual: 'bg-slate-100 text-slate-600 border-slate-200',
  Questionnaire: 'bg-purple-50 text-purple-700 border-purple-200',
  'CVE Database': 'bg-red-50 text-red-700 border-red-200',
  'News Feed': 'bg-orange-50 text-orange-600 border-orange-200',
}

const TASK_STATUS: Record<string, string> = {
  Open: 'bg-slate-100 text-slate-600 border-slate-200',
  'In Progress': 'bg-blue-50 text-blue-700 border-blue-200',
  Resolved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
}

const DOC_TYPE: Record<string, string> = {
  'Compliance Report': 'bg-blue-50 text-blue-700 border-blue-200',
  Legal: 'bg-purple-50 text-purple-700 border-purple-200',
  Assessment: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  Certification: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Technical: 'bg-slate-100 text-slate-600 border-slate-200',
}

function cls(...args: (string | false | null | undefined)[]) {
  return args.filter(Boolean).join(' ')
}

// ─── MICRO COMPONENTS ────────────────────────────────────────────────────────

function CritBadge({ v }: { v: Criticality }) {
  return (
    <span className={cls('inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium border', CRIT_BADGE[v])}>
      {v}
    </span>
  )
}

function StatusBadge({ v }: { v: MonitoringStatus }) {
  return (
    <span className={cls('inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded text-[11px] font-medium border', STATUS_BADGE[v])}>
      <span className={cls('w-1.5 h-1.5 rounded-full flex-shrink-0', STATUS_DOT[v])} />
      {v}
    </span>
  )
}

function SourceBadge({ v }: { v: SignalSource }) {
  return (
    <span className={cls('inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium border', SOURCE_BADGE[v])}>
      {v}
    </span>
  )
}

function RiskScore({ score }: { score: number }) {
  const color = score >= 70 ? 'text-red-600' : score >= 50 ? 'text-amber-600' : score >= 35 ? 'text-yellow-600' : 'text-emerald-600'
  return <span className={cls('font-semibold tabular-nums text-sm', color)}>{score}</span>
}

function RiskDelta({ delta }: { delta: number }) {
  if (delta === 0) return <span className="text-slate-400 text-xs">—</span>
  const up = delta > 0
  return (
    <span className={cls('inline-flex items-center gap-0.5 text-xs font-semibold tabular-nums', up ? 'text-red-600' : 'text-emerald-600')}>
      {up ? '↑' : '↓'}{Math.abs(delta)}
    </span>
  )
}

function VendorAvatar({ initials, color, size = 'sm' }: { initials: string; color: string; size?: 'sm' | 'md' | 'lg' }) {
  const sz = size === 'lg' ? 'w-10 h-10 text-sm rounded' : size === 'md' ? 'w-8 h-8 text-xs rounded' : 'w-6 h-6 text-[10px] rounded'
  return (
    <span className={cls('inline-flex items-center justify-center font-semibold text-white flex-shrink-0', sz)} style={{ backgroundColor: color }}>
      {initials}
    </span>
  )
}

function OwnerPip({ initials }: { initials: string }) {
  const isUnassigned = initials === '—'
  return (
    <span className={cls(
      'inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-semibold flex-shrink-0',
      isUnassigned ? 'bg-slate-200 text-slate-400 border border-dashed border-slate-300' : 'bg-indigo-100 text-indigo-700'
    )}>
      {isUnassigned ? '?' : initials}
    </span>
  )
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────

const NAV = [
  { section: 'Overview', items: [{ label: 'Dashboard', icon: <SquaresIcon /> }] },
  {
    section: 'Third-Party Risk',
    items: [
      { label: 'Vendors', icon: <BuildingIcon /> },
      { label: 'Assessments', icon: <ClipboardIcon /> },
      { label: 'Risk Register', icon: <FlagIcon /> },
      { label: 'Continuous Monitoring', icon: <RadioIcon />, active: true },
    ],
  },
  {
    section: 'Compliance',
    items: [
      { label: 'Controls', icon: <ShieldIcon /> },
      { label: 'Policies', icon: <DocIcon /> },
    ],
  },
  { section: 'Reports', items: [{ label: 'Reports', icon: <ChartIcon /> }] },
]

function Sidebar() {
  return (
    <aside className="w-[220px] bg-[#0f172a] flex flex-col flex-shrink-0 h-full">
      <div className="h-[52px] flex items-center px-4 border-b border-white/[0.08]">
        <span className="text-white font-bold text-[17px] tracking-tight">DRATA</span>
      </div>
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {NAV.map(({ section, items }) => (
          <div key={section}>
            <p className="px-2 mb-0.5 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">{section}</p>
            {items.map(item => (
              <button
                key={item.label}
                className={cls(
                  'w-full flex items-center gap-2 px-2 py-1.5 rounded text-[13px] mb-0.5 transition-colors text-left',
                  'active' in item && item.active
                    ? 'bg-[#4362f5] text-white font-medium'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
                )}
              >
                <span className="w-4 h-4 flex-shrink-0 opacity-80">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        ))}
      </nav>
      <div className="p-3 border-t border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-[#4362f5] flex items-center justify-center text-white text-[11px] font-semibold flex-shrink-0">BK</span>
          <div className="min-w-0">
            <p className="text-white text-xs font-medium truncate">Brandon Khoo</p>
            <p className="text-slate-500 text-[11px] truncate">GRC Lead</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

// ─── TOP BAR ─────────────────────────────────────────────────────────────────

function TopBar() {
  return (
    <div className="h-[52px] bg-white border-b border-slate-200 flex items-center justify-between px-5 flex-shrink-0">
      <nav className="flex items-center gap-1.5 text-[13px] text-slate-400">
        <span>Third-Party Risk</span>
        <span className="text-slate-300">/</span>
        <span className="text-slate-700 font-medium">Continuous Monitoring</span>
      </nav>
      <div className="flex items-center gap-2">
        <button className="relative p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors">
          <BellIcon />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
        </button>
        <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors">
          <GearIcon />
        </button>
        <div className="w-px h-4 bg-slate-200 mx-1" />
        <span className="w-7 h-7 rounded-full bg-[#4362f5] flex items-center justify-center text-white text-[11px] font-semibold">BK</span>
      </div>
    </div>
  )
}

// ─── KPI STRIP ────────────────────────────────────────────────────────────────

const KPIS = [
  { label: 'Vendors Monitored', value: '41', sub: 'Across all business units', variant: 'neutral' },
  { label: 'Active Alerts', value: '7', sub: '+2 vs. last week', variant: 'danger' },
  { label: 'Risk Score Increased', value: '4', sub: 'Since last scan', variant: 'warning' },
  { label: 'Pending Review', value: '12', sub: 'Awaiting action', variant: 'neutral' },
  { label: 'Overdue Reviews', value: '3', sub: 'Action required', variant: 'danger' },
]

function KPIStrip() {
  return (
    <div className="grid grid-cols-5 gap-3">
      {KPIS.map(k => (
        <div key={k.label} className="bg-white border border-slate-200 rounded-lg px-4 py-3.5">
          <p className="text-[11px] text-slate-500 font-medium mb-1.5 uppercase tracking-wide">{k.label}</p>
          <p className={cls(
            'text-[26px] font-bold leading-none tabular-nums mb-1',
            k.variant === 'danger' ? 'text-red-600' : k.variant === 'warning' ? 'text-amber-600' : 'text-slate-900'
          )}>
            {k.value}
          </p>
          <p className={cls(
            'text-[11px]',
            k.variant === 'danger' ? 'text-red-400' : k.variant === 'warning' ? 'text-amber-400' : 'text-slate-400'
          )}>
            {k.sub}
          </p>
        </div>
      ))}
    </div>
  )
}

// ─── ACTION PANEL ─────────────────────────────────────────────────────────────

const PRIORITY_ITEMS = [
  {
    sev: 'Critical' as Criticality,
    vendor: 'Stripe',
    initials: 'ST',
    color: '#635BFF',
    title: 'Data breach reported — expedited reassessment required',
    detail: 'SecurityScorecard score −18 pts. Public breach affecting 2.4M records disclosed Mar 18.',
    cta: 'Reassess Now',
    age: '4 days ago',
  },
  {
    sev: 'High' as Criticality,
    vendor: 'Salesforce',
    initials: 'SF',
    color: '#00A1E0',
    title: 'SOC 2 report expired 45 days ago — evidence not received',
    detail: '2 automated requests sent with no response. Audit evidence gap risk.',
    cta: 'Request Update',
    age: '45 days',
  },
  {
    sev: 'High' as Criticality,
    vendor: 'Okta',
    initials: 'OK',
    color: '#007DC1',
    title: 'Critical CVE published — patch unconfirmed, no owner assigned',
    detail: 'CVE-2026-1147 (CVSS 9.1) Mar 19. No vendor owner on record.',
    cta: 'Assign Owner',
    age: '3 days ago',
  },
]

function ActionPanel() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[13px] font-semibold text-slate-900">Prioritized Actions</span>
          <span className="bg-red-50 text-red-700 border border-red-200 text-[11px] font-medium px-1.5 py-0.5 rounded">
            3 require attention
          </span>
        </div>
        <button className="text-[12px] text-[#4362f5] hover:underline font-medium">View all →</button>
      </div>
      <div className="divide-y divide-slate-100">
        {PRIORITY_ITEMS.map((item, i) => (
          <div key={i} className="px-4 py-3 flex items-start gap-3 hover:bg-slate-50 transition-colors">
            <CritBadge v={item.sev} />
            <VendorAvatar initials={item.initials} color={item.color} />
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-slate-900 leading-snug">{item.title}</p>
              <p className="text-[12px] text-slate-500 mt-0.5">{item.detail}</p>
            </div>
            <div className="flex-shrink-0 flex items-center gap-2">
              <span className="text-[11px] text-slate-400">{item.age}</span>
              <button className="px-3 py-1.5 bg-[#4362f5] text-white text-[12px] font-medium rounded hover:bg-indigo-700 transition-colors whitespace-nowrap">
                {item.cta}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── VENDOR TABLE ─────────────────────────────────────────────────────────────

type FilterView = 'All' | 'Alerts' | 'Needs Review' | 'No Action'

function VendorTable({
  onSelect,
  selectedId,
}: {
  onSelect: (v: Vendor) => void
  selectedId?: string
}) {
  const [search, setSearch] = useState('')
  const [critFilter, setCritFilter] = useState('All')
  const [viewFilter, setViewFilter] = useState<FilterView>('All')

  const filtered = useMemo(() => {
    return VENDORS.filter(v => {
      const matchSearch =
        v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.category.toLowerCase().includes(search.toLowerCase()) ||
        v.owner.toLowerCase().includes(search.toLowerCase())
      const matchCrit = critFilter === 'All' || v.criticality === critFilter
      const matchView =
        viewFilter === 'All' ||
        (viewFilter === 'Alerts' && v.monitoringStatus === 'Alert') ||
        (viewFilter === 'Needs Review' && (v.monitoringStatus === 'Pending Review' || v.recommendedAction !== 'No Action')) ||
        (viewFilter === 'No Action' && v.recommendedAction === 'No Action')
      return matchSearch && matchCrit && matchView
    })
  }, [search, critFilter, viewFilter])

  const VIEWS: FilterView[] = ['All', 'Alerts', 'Needs Review', 'No Action']

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="px-4 py-3 border-b border-slate-100">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1">
            {VIEWS.map(v => (
              <button
                key={v}
                onClick={() => setViewFilter(v)}
                className={cls(
                  'px-3 py-1.5 text-[12px] font-medium rounded transition-colors',
                  viewFilter === v
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                )}
              >
                {v}
                {v === 'Alerts' && (
                  <span className="ml-1.5 bg-red-500 text-white text-[10px] font-bold px-1 py-0.5 rounded-full">7</span>
                )}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 border border-slate-200 rounded px-2.5 py-1.5 bg-white">
              <FilterIcon />
              <select
                value={critFilter}
                onChange={e => setCritFilter(e.target.value)}
                className="text-[12px] text-slate-600 bg-transparent outline-none cursor-pointer"
              >
                <option>All</option>
                <option>Critical</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <div className="flex items-center gap-1.5 border border-slate-200 rounded px-2.5 py-1.5 bg-white">
              <SearchIcon />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search vendors..."
                className="text-[12px] text-slate-700 bg-transparent outline-none w-36 placeholder-slate-400"
              />
            </div>
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-[12px] text-slate-600 border border-slate-200 rounded hover:bg-slate-50 transition-colors">
              <DownloadIcon />
              Export
            </button>
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-[12px] font-medium text-white bg-[#4362f5] rounded hover:bg-indigo-700 transition-colors">
              <PlusIcon />
              Add Vendor
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="w-8 px-3 py-2.5">
                <input type="checkbox" className="w-3.5 h-3.5 rounded border-slate-300 accent-indigo-600" />
              </th>
              {[
                'Vendor', 'Criticality', 'Risk Score', 'Δ Delta',
                'New Signal', 'Source', 'Status', 'Owner', 'Last Review', 'Action',
              ].map(col => (
                <th key={col} className="px-3 py-2.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={11} className="px-4 py-10 text-center">
                  <p className="text-[13px] font-medium text-slate-500">No vendors match your filters</p>
                  <p className="text-[12px] text-slate-400 mt-1">Try adjusting your search or filter criteria</p>
                </td>
              </tr>
            ) : (
              filtered.map(v => (
                <tr
                  key={v.id}
                  onClick={() => onSelect(v)}
                  className={cls(
                    'cursor-pointer hover:bg-slate-50 transition-colors relative',
                    selectedId === v.id ? 'bg-indigo-50/60' : ''
                  )}
                  style={selectedId === v.id ? { boxShadow: 'inset 2px 0 0 #4362f5' } : {}}
                >
                  <td className="px-3 py-3" onClick={e => e.stopPropagation()}>
                    <input type="checkbox" className="w-3.5 h-3.5 rounded border-slate-300 accent-indigo-600" />
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <VendorAvatar initials={v.initials} color={v.logoColor} />
                      <div>
                        <p className="text-[13px] font-medium text-slate-900 whitespace-nowrap">{v.name}</p>
                        <p className="text-[11px] text-slate-400">{v.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3"><CritBadge v={v.criticality} /></td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <RiskScore score={v.riskScore} />
                      <div className="w-14 h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={cls(
                            'h-full rounded-full',
                            v.riskScore >= 70 ? 'bg-red-500' : v.riskScore >= 50 ? 'bg-amber-500' : v.riskScore >= 35 ? 'bg-yellow-400' : 'bg-emerald-500'
                          )}
                          style={{ width: `${v.riskScore}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3"><RiskDelta delta={v.riskDelta} /></td>
                  <td className="px-3 py-3 max-w-[220px]">
                    <p className="text-[12px] text-slate-700 truncate">{v.primarySignal}</p>
                  </td>
                  <td className="px-3 py-3"><SourceBadge v={v.signalSource} /></td>
                  <td className="px-3 py-3"><StatusBadge v={v.monitoringStatus} /></td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1.5">
                      <OwnerPip initials={v.ownerInitials} />
                      <span className={cls('text-[12px] whitespace-nowrap', v.owner === 'Unassigned' ? 'text-slate-400 italic' : 'text-slate-600')}>
                        {v.owner}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-[12px] text-slate-500 whitespace-nowrap">{v.lastReview}</span>
                  </td>
                  <td className="px-3 py-3" onClick={e => e.stopPropagation()}>
                    {v.recommendedAction !== 'No Action' ? (
                      <button
                        onClick={() => onSelect(v)}
                        className="px-2.5 py-1 text-[11px] font-medium text-[#4362f5] bg-indigo-50 border border-indigo-200 rounded hover:bg-indigo-100 transition-colors whitespace-nowrap"
                      >
                        {v.recommendedAction}
                      </button>
                    ) : (
                      <span className="text-[12px] text-slate-400">—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Table footer */}
      <div className="px-4 py-2.5 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[12px] text-slate-400">
          Showing {filtered.length} of {VENDORS.length} vendors
        </span>
        <div className="flex items-center gap-1">
          <button className="p-1 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-100 transition-colors">‹</button>
          <button className="w-6 h-6 text-[11px] font-medium text-white bg-[#4362f5] rounded">1</button>
          <button className="p-1 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-100 transition-colors">›</button>
        </div>
      </div>
    </div>
  )
}

// ─── DETAIL PANEL ─────────────────────────────────────────────────────────────

function DetailPanel({ vendor, onClose }: { vendor: Vendor; onClose: () => void }) {
  const [tab, setTab] = useState<DetailTab>('overview')

  const tabs: { id: DetailTab; label: string; count?: number }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'signals', label: 'Signals', count: vendor.signals.length },
    { id: 'timeline', label: 'Timeline' },
    { id: 'evidence', label: 'Evidence', count: vendor.linkedDocuments.length },
    { id: 'controls', label: 'Controls', count: vendor.linkedControls.length },
    { id: 'tasks', label: 'Tasks', count: vendor.tasks.length },
    { id: 'audit', label: 'Audit Log', count: vendor.auditLog.length },
  ]

  return (
    <div className="w-[680px] flex-shrink-0 bg-white border-l border-slate-200 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-200">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <VendorAvatar initials={vendor.initials} color={vendor.logoColor} size="lg" />
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h2 className="text-[15px] font-semibold text-slate-900">{vendor.name}</h2>
                <CritBadge v={vendor.criticality} />
              </div>
              <p className="text-[12px] text-slate-500">{vendor.category}</p>
              <p className="text-[12px] text-slate-400 mt-0.5">
                Owner: <span className={vendor.owner === 'Unassigned' ? 'italic text-slate-400' : 'text-slate-600'}>{vendor.owner}</span>
                <span className="mx-1.5 text-slate-300">·</span>
                Next review: <span className="text-slate-600">{vendor.nextReview}</span>
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors">
            <XIcon />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-5 border-b border-slate-200 flex gap-0 overflow-x-auto">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cls(
              'flex items-center gap-1 px-0 mr-5 py-2.5 text-[12px] font-medium border-b-2 transition-colors whitespace-nowrap',
              tab === t.id ? 'border-[#4362f5] text-[#4362f5]' : 'border-transparent text-slate-500 hover:text-slate-700'
            )}
          >
            {t.label}
            {t.count !== undefined && t.count > 0 && (
              <span className={cls(
                'px-1.5 py-0.5 rounded text-[10px] font-semibold',
                tab === t.id ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'
              )}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto">
        {tab === 'overview' && <OverviewTab vendor={vendor} />}
        {tab === 'signals' && <SignalsTab vendor={vendor} />}
        {tab === 'timeline' && <TimelineTab vendor={vendor} />}
        {tab === 'evidence' && <EvidenceTab vendor={vendor} />}
        {tab === 'controls' && <ControlsTab vendor={vendor} />}
        {tab === 'tasks' && <TasksTab vendor={vendor} />}
        {tab === 'audit' && <AuditTab vendor={vendor} />}
      </div>

      {/* Action bar */}
      <div className="px-4 py-3 border-t border-slate-200 bg-slate-50 flex items-center gap-2">
        <button className="px-3 py-2 bg-[#4362f5] text-white text-[12px] font-semibold rounded hover:bg-indigo-700 transition-colors whitespace-nowrap">
          Create Assessment
        </button>
        <button className="px-3 py-2 text-[12px] font-medium text-slate-700 bg-white border border-slate-200 rounded hover:bg-slate-50 transition-colors whitespace-nowrap">
          Accept Risk
        </button>
        <button className="px-3 py-2 text-[12px] font-medium text-slate-700 bg-white border border-slate-200 rounded hover:bg-slate-50 transition-colors whitespace-nowrap">
          Assign Owner
        </button>
        <button className="px-3 py-2 text-[12px] font-medium text-slate-700 bg-white border border-slate-200 rounded hover:bg-slate-50 transition-colors whitespace-nowrap">
          Request Evidence
        </button>
      </div>
    </div>
  )
}

// ─── DETAIL TABS ──────────────────────────────────────────────────────────────

function OverviewTab({ vendor }: { vendor: Vendor }) {
  return (
    <div className="p-5 space-y-4">
      {/* AI Summary — TPRM Agent card */}
      <div className="border border-indigo-200 rounded-lg overflow-hidden">
        <div className="px-4 py-2.5 flex items-center gap-2" style={{ background: 'linear-gradient(135deg, #4362f5 0%, #7B61FF 100%)' }}>
          <SparkleIcon />
          <span className="text-white text-[11px] font-semibold tracking-wide uppercase">TPRM Agent — AI Risk Summary</span>
          <span className="ml-auto text-white/60 text-[10px]">Mar 22, 2026 · 09:15 AM</span>
        </div>
        <div className="bg-gradient-to-b from-indigo-50/50 to-white px-4 py-3.5">
          <p className="text-[12.5px] text-slate-700 leading-[1.6]">{vendor.aiSummary}</p>
          <div className="mt-3 pt-2.5 border-t border-indigo-100 flex items-center gap-3">
            <button className="text-[12px] text-[#4362f5] font-medium hover:underline">View supporting inputs →</button>
            <span className="text-slate-300">·</span>
            <button className="text-[12px] text-slate-400 hover:text-slate-600">Regenerate</button>
            <span className="text-slate-300">·</span>
            <button className="text-[12px] text-slate-400 hover:text-slate-600">Dismiss</button>
          </div>
        </div>
      </div>

      {/* Risk metric tiles */}
      <div className="grid grid-cols-3 gap-3">
        <div className="border border-slate-200 rounded-lg p-3">
          <p className="text-[11px] text-slate-500 uppercase tracking-wide mb-1.5">Risk Score</p>
          <div className="flex items-baseline gap-1.5">
            <RiskScore score={vendor.riskScore} />
            <RiskDelta delta={vendor.riskDelta} />
          </div>
        </div>
        <div className="border border-slate-200 rounded-lg p-3">
          <p className="text-[11px] text-slate-500 uppercase tracking-wide mb-1.5">Last Review</p>
          <p className="text-[13px] font-semibold text-slate-900">{vendor.lastReview}</p>
        </div>
        <div className="border border-slate-200 rounded-lg p-3">
          <p className="text-[11px] text-slate-500 uppercase tracking-wide mb-1.5">Next Review</p>
          <p className="text-[13px] font-semibold text-slate-900">{vendor.nextReview}</p>
        </div>
      </div>

      {/* Status summary */}
      <div className="border border-slate-200 rounded-lg p-3.5 grid grid-cols-2 gap-3">
        <div>
          <p className="text-[11px] text-slate-500 uppercase tracking-wide mb-1.5">Monitoring Status</p>
          <StatusBadge v={vendor.monitoringStatus} />
        </div>
        <div>
          <p className="text-[11px] text-slate-500 uppercase tracking-wide mb-1.5">Signal Source</p>
          <SourceBadge v={vendor.signalSource} />
        </div>
        <div>
          <p className="text-[11px] text-slate-500 uppercase tracking-wide mb-1.5">Open Signals</p>
          <span className="text-[13px] font-semibold text-slate-900">{vendor.signals.length || '0'}</span>
        </div>
        <div>
          <p className="text-[11px] text-slate-500 uppercase tracking-wide mb-1.5">Recommended Action</p>
          <span className={cls(
            'text-[13px] font-semibold',
            vendor.recommendedAction === 'No Action' ? 'text-slate-400' :
            vendor.recommendedAction === 'Reassess' ? 'text-red-600' :
            vendor.recommendedAction === 'Request Update' ? 'text-amber-600' :
            'text-orange-600'
          )}>
            {vendor.recommendedAction}
          </span>
        </div>
      </div>
    </div>
  )
}

function SignalsTab({ vendor }: { vendor: Vendor }) {
  if (vendor.signals.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckIcon />
        </div>
        <p className="text-[13px] font-medium text-slate-700">No active signals</p>
        <p className="text-[12px] text-slate-400 mt-1">No new signals detected in the last 30 days. Monitoring active.</p>
      </div>
    )
  }
  return (
    <div className="p-5 space-y-3">
      {vendor.signals.map(s => (
        <div key={s.id} className="border border-slate-200 rounded-lg p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <CritBadge v={s.severity} />
              <span className="text-[12px] font-semibold text-slate-700">{s.type}</span>
            </div>
            <SourceBadge v={s.source} />
          </div>
          <p className="text-[12.5px] text-slate-700 leading-relaxed mb-2">{s.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Detected {s.detectedAt}</span>
            {s.evidence && (
              <span className="text-[11px] text-[#4362f5] cursor-pointer hover:underline">View evidence ↗</span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function TimelineTab({ vendor }: { vendor: Vendor }) {
  const events = [
    ...vendor.signals.map(s => ({
      type: 'signal' as const,
      title: `Signal detected: ${s.type}`,
      detail: s.description,
      ts: s.detectedAt,
      sev: s.severity,
    })),
    ...vendor.auditLog.map(a => ({
      type: a.actorType as 'system' | 'user',
      title: a.action,
      detail: a.details,
      ts: a.timestamp,
      actor: a.actor,
    })),
  ]

  return (
    <div className="p-5">
      <div className="relative">
        <div className="absolute left-2.5 top-0 bottom-4 w-px bg-slate-200" />
        <div className="space-y-4">
          {events.map((ev, i) => (
            <div key={i} className="flex gap-3">
              <div className={cls(
                'w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 z-10 ring-2 ring-white mt-0.5',
                ev.type === 'signal' ? 'bg-red-100' : ev.type === 'user' ? 'bg-indigo-100' : 'bg-slate-200'
              )}>
                {ev.type === 'signal'
                  ? <span className="text-red-500 text-[8px] font-bold">!</span>
                  : ev.type === 'user'
                  ? <span className="text-indigo-600 text-[8px]">●</span>
                  : <span className="text-slate-400 text-[8px]">⚙</span>
                }
              </div>
              <div className="flex-1 pb-3">
                {'actor' in ev && ev.actor && (
                  <span className="text-[11px] font-semibold text-slate-600 mr-1.5">{ev.actor}</span>
                )}
                <p className="text-[12.5px] text-slate-800 leading-snug">{ev.title}</p>
                {ev.detail && <p className="text-[11px] text-slate-400 mt-0.5">{ev.detail}</p>}
                <p className="text-[11px] text-slate-400 mt-0.5">{ev.ts}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function EvidenceTab({ vendor }: { vendor: Vendor }) {
  return (
    <div className="p-5 space-y-2">
      {vendor.linkedDocuments.map((doc, i) => (
        <div key={i} className={cls(
          'flex items-center gap-3 border rounded-lg px-3.5 py-3 hover:bg-slate-50 transition-colors cursor-pointer',
          doc.expired ? 'border-red-200 bg-red-50/30' : 'border-slate-200'
        )}>
          <DocFileIcon />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-[12.5px] font-medium text-slate-900 truncate">{doc.name}</p>
              {doc.expired && (
                <span className="flex-shrink-0 text-[10px] font-medium text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
                  Expired
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400">{doc.date}</p>
          </div>
          <span className={cls('text-[10px] font-medium px-1.5 py-0.5 rounded border flex-shrink-0', DOC_TYPE[doc.type] || 'bg-slate-100 text-slate-600 border-slate-200')}>
            {doc.type}
          </span>
        </div>
      ))}
      <button className="w-full mt-2 px-3 py-2.5 text-[12px] font-medium text-[#4362f5] border border-dashed border-indigo-300 rounded-lg hover:bg-indigo-50 transition-colors">
        + Upload document
      </button>
    </div>
  )
}

function ControlsTab({ vendor }: { vendor: Vendor }) {
  return (
    <div className="p-5 space-y-2">
      {vendor.linkedControls.map((ctrl, i) => (
        <div key={i} className="flex items-center gap-3 border border-slate-200 rounded-lg px-3.5 py-2.5 hover:bg-slate-50 transition-colors cursor-pointer">
          <div className="w-4 h-4 flex-shrink-0 text-indigo-500"><ShieldSmallIcon /></div>
          <p className="text-[12.5px] text-slate-700 font-medium flex-1">{ctrl}</p>
          <span className="text-slate-300 text-[11px]">›</span>
        </div>
      ))}
    </div>
  )
}

function TasksTab({ vendor }: { vendor: Vendor }) {
  if (vendor.tasks.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-[13px] font-medium text-slate-500">No open tasks</p>
        <button className="mt-3 text-[12px] text-[#4362f5] font-medium hover:underline">+ Create task</button>
      </div>
    )
  }
  return (
    <div className="p-5 space-y-2">
      {vendor.tasks.map(task => (
        <div key={task.id} className="border border-slate-200 rounded-lg px-3.5 py-3">
          <div className="flex items-start justify-between gap-2 mb-2">
            <p className="text-[12.5px] font-medium text-slate-900 leading-snug">{task.title}</p>
            <span className={cls('text-[10px] font-medium px-1.5 py-0.5 rounded border flex-shrink-0', TASK_STATUS[task.status])}>
              {task.status}
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span>Assignee: {task.assignee}</span>
            <span className="text-slate-300">·</span>
            <span>Due: {task.dueDate}</span>
          </div>
        </div>
      ))}
      <button className="w-full mt-1 px-3 py-2 text-[12px] font-medium text-[#4362f5] border border-dashed border-indigo-300 rounded-lg hover:bg-indigo-50 transition-colors">
        + Create task
      </button>
    </div>
  )
}

function AuditTab({ vendor }: { vendor: Vendor }) {
  return (
    <div className="p-5">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="pb-2 pr-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider w-20">Actor</th>
            <th className="pb-2 pr-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Action</th>
            <th className="pb-2 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">Timestamp</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {vendor.auditLog.map(e => (
            <tr key={e.id}>
              <td className="py-2.5 pr-3 w-20">
                <span className={cls('text-[12px] font-medium block truncate', e.actorType === 'system' ? 'text-slate-400' : 'text-indigo-700')}>
                  {e.actor}
                </span>
              </td>
              <td className="py-2.5 pr-3">
                <p className="text-[12px] text-slate-700 leading-snug">{e.action}</p>
                {e.details && <p className="text-[11px] text-slate-400">{e.details}</p>}
              </td>
              <td className="py-2.5">
                <span className="text-[11px] text-slate-400 whitespace-nowrap">{e.timestamp}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── ICON COMPONENTS ──────────────────────────────────────────────────────────

function SquaresIcon() {
  return <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4"><rect x="1" y="1" width="6" height="6" rx="1" /><rect x="9" y="1" width="6" height="6" rx="1" /><rect x="1" y="9" width="6" height="6" rx="1" /><rect x="9" y="9" width="6" height="6" rx="1" /></svg>
}
function BuildingIcon() {
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><rect x="2" y="3" width="12" height="11" rx="1" /><path d="M5 14V9h6v5M8 3V1" /></svg>
}
function ClipboardIcon() {
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><rect x="3" y="2" width="10" height="13" rx="1" /><path d="M6 2a2 2 0 004 0" /></svg>
}
function FlagIcon() {
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path d="M3 14V2l10 4-10 4" /></svg>
}
function RadioIcon() {
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><circle cx="8" cy="8" r="2" fill="currentColor" /><circle cx="8" cy="8" r="5" /><circle cx="8" cy="8" r="8" opacity="0.3" /></svg>
}
function ShieldIcon() {
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path d="M8 1L2 3.5v5C2 12 5 14.5 8 15c3-0.5 6-3 6-6.5v-5L8 1z" /></svg>
}
function DocIcon() {
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><rect x="3" y="1" width="10" height="14" rx="1" /><path d="M6 5h4M6 8h4M6 11h2" /></svg>
}
function ChartIcon() {
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path d="M2 14h12M4 14V9M8 14V5M12 14V2" /></svg>
}
function BellIcon() {
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path d="M8 1a5 5 0 015 5v3l1.5 2H1.5L3 9V6a5 5 0 015-5zM6.5 13.5a1.5 1.5 0 003 0" /></svg>
}
function GearIcon() {
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><circle cx="8" cy="8" r="2.5" /><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.42 1.42M11.53 11.53l1.42 1.42M3.05 12.95l1.42-1.42M11.53 4.47l1.42-1.42" /></svg>
}
function FilterIcon() {
  return <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 text-slate-400"><path d="M1 2h12L8 7.5V12L6 13V7.5L1 2z" /></svg>
}
function SearchIcon() {
  return <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 text-slate-400"><circle cx="6" cy="6" r="4" /><path d="M10 10l3 3" /></svg>
}
function DownloadIcon() {
  return <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path d="M7 1v8M4 6l3 3 3-3M2 11h10" /></svg>
}
function PlusIcon() {
  return <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M7 2v10M2 7h10" /></svg>
}
function SparkleIcon() {
  return <svg viewBox="0 0 16 16" fill="white" className="w-3.5 h-3.5"><path d="M8 0l1.5 5.5L15 7l-5.5 1.5L8 14l-1.5-5.5L1 7l5.5-1.5z" /></svg>
}
function XIcon() {
  return <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M1 1l12 12M13 1L1 13" /></svg>
}
function CheckIcon() {
  return <svg viewBox="0 0 20 20" fill="none" stroke="#16a34a" strokeWidth="2" className="w-5 h-5"><path d="M4 10l5 5 7-8" /></svg>
}
function DocFileIcon() {
  return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-slate-300 flex-shrink-0"><path d="M7 2H5a1 1 0 00-1 1v14a1 1 0 001 1h10a1 1 0 001-1V7l-4-5z" /><path d="M13 2v5h4" /><path d="M7 10h6M7 13h4" /></svg>
}
function ShieldSmallIcon() {
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path d="M8 1L2 3.5v5C2 12 5 14.5 8 15c3-0.5 6-3 6-6.5v-5L8 1z" /></svg>
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function TPRMMonitoringPage() {
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null)

  return (
    // Full-screen overlay over portfolio layout
    <div className="fixed inset-0 z-50 flex bg-slate-50 overflow-hidden" style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar />
        <div className="flex flex-1 overflow-hidden">
          {/* Scrollable main area */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-4 w-full">
              {/* Page header */}
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">Continuous Monitoring</h1>
                  <p className="text-[13px] text-slate-500 mt-0.5">
                    Real-time risk signal feed across 41 monitored vendors. Last refreshed Mar 22, 2026 at 09:15 AM.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-2 text-[13px] text-slate-600 bg-white border border-slate-200 rounded hover:bg-slate-50 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.5"><path d="M14 8A6 6 0 112 8" /><path d="M14 8l-2-2M14 8l2-2" /></svg>
                    Refresh
                  </button>
                  <button className="px-3 py-2 text-[13px] text-slate-600 bg-white border border-slate-200 rounded hover:bg-slate-50 transition-colors">
                    Configure
                  </button>
                  <button className="px-3 py-2 text-[13px] font-medium text-white bg-[#4362f5] rounded hover:bg-indigo-700 transition-colors">
                    Export Report
                  </button>
                </div>
              </div>

              <KPIStrip />
              <ActionPanel />
              <VendorTable onSelect={setSelectedVendor} selectedId={selectedVendor?.id} />
            </div>
          </div>

          {/* Detail panel — slides in */}
          {selectedVendor && (
            <DetailPanel vendor={selectedVendor} onClose={() => setSelectedVendor(null)} />
          )}
        </div>
      </div>
    </div>
  )
}
