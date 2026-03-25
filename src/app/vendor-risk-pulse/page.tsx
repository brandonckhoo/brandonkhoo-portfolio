'use client'

/*
 * Vendor Risk Pulse — Drata TPRM Prototype
 * ==========================================
 * A 5-screen clickable prototype demonstrating continuous vendor risk
 * monitoring beyond recurring reviews. Designed for PM interviews.
 *
 * Screen map:
 *   'overview'     → Triage queue — all monitoring signals with materiality + state
 *   'detail'       → Stripe deep-dive — issue history, evidence, active exception
 *   'reassessment' → Targeted reassessment flow — focused micro-assessment
 *   'exceptions'   → Active exceptions table — known issues tracked over time
 *   'executive'    → GRC leader summary — KPIs, trends, audit log
 *
 * Key navigation:
 *   Click Stripe row (overview)      → detail
 *   "Trigger Reassessment" (detail)  → reassessment
 *   "Accepted Risks" tab (overview)  → exceptions
 *   "Executive Summary" (sidebar)    → executive
 *   All back buttons return to origin
 *
 * Design: Drata design system — navy sidebar, #4362f5 primary, slate page bg
 */

import { useState, useMemo } from 'react'

// ─── TYPES ─────────────────────────────────────────────────────────────────────

type Screen = 'overview' | 'detail' | 'reassessment' | 'exceptions' | 'executive'
type Criticality = 'Critical' | 'High' | 'Medium' | 'Low'
type PulseStatus = 'New' | 'Linked' | 'Reopened' | 'Expiring' | 'Stalled' | 'Grouped' | 'Accepted'
type ExceptionState =
  | 'Accepted'
  | 'In Remediation'
  | 'Awaiting Evidence'
  | 'Escalated'
  | 'Expiring Soon'
  | 'Reopened'
  | 'Stalled'

interface PulseItem {
  id: string
  vendor: string
  initials: string
  logoColor: string
  category: string
  change: string
  materiality: Criticality
  severity: Criticality
  confidence: 'High' | 'Medium' | 'Low'
  whyItMatters: string
  status: PulseStatus
  owner: string | null
  ownerInitials: string | null
  detectedAt: string
  recommendedAction: string
  linkedIssue?: string
  grouped?: boolean
}

interface TimelineEvent {
  date: string
  event: string
  actor: string
  type: 'system' | 'user' | 'alert' | 'decision'
}

interface EvidenceDoc {
  name: string
  type: string
  date: string
  status: 'current' | 'expired' | 'missing'
}

interface ExceptionRow {
  id: string
  vendor: string
  initials: string
  logoColor: string
  exception: string
  severity: Criticality
  confidence: 'High' | 'Medium' | 'Low'
  state: ExceptionState
  acceptedUntil: string
  owner: string
  nextCheckpoint: string
  linkedSignals: number
}

interface AuditEntry {
  id: string
  actor: string
  actorType: 'system' | 'user'
  action: string
  timestamp: string
  rationale?: string
}

// ─── SAMPLE DATA ───────────────────────────────────────────────────────────────

const PULSE_ITEMS: PulseItem[] = [
  {
    id: '1',
    vendor: 'Stripe',
    initials: 'ST',
    logoColor: '#635BFF',
    category: 'Payment Processing',
    change: 'SOC 2 report expired 12 days ago — no renewal evidence received',
    materiality: 'High',
    severity: 'High',
    confidence: 'High',
    whyItMatters:
      'Stripe handles all payment card data. SOC 2 is a key compliance control under CC6.1 and PI1.1. An expired report creates an open audit gap.',
    status: 'New',
    owner: 'Sarah Chen',
    ownerInitials: 'SC',
    detectedAt: 'Mar 13, 2026',
    recommendedAction: 'Request updated evidence or trigger targeted reassessment',
  },
  {
    id: '2',
    vendor: 'Okta',
    initials: 'OK',
    logoColor: '#009FDB',
    category: 'Identity & Access',
    change: 'Questionnaire response regressed — MFA not enforced for admin accounts',
    materiality: 'High',
    severity: 'Medium',
    confidence: 'Medium',
    whyItMatters:
      'Okta is your SSO identity provider. Admin MFA gaps create direct lateral movement risk across all connected systems.',
    status: 'Linked',
    owner: 'James Park',
    ownerInitials: 'JP',
    detectedAt: 'Mar 20, 2026',
    recommendedAction: 'Review linked exception — confirm if new evidence changes the accepted decision',
    linkedIssue: 'EXC-042',
  },
  {
    id: '3',
    vendor: 'Deel',
    initials: 'DE',
    logoColor: '#FF6B35',
    category: 'HR & Payroll',
    change: 'Security review condition unresolved — 14 days past due date',
    materiality: 'High',
    severity: 'High',
    confidence: 'High',
    whyItMatters:
      'Deel processes PII and payroll data for all employees. Unresolved review conditions create open compliance gaps under your vendor policy.',
    status: 'Stalled',
    owner: null,
    ownerInitials: null,
    detectedAt: 'Mar 11, 2026',
    recommendedAction: 'Assign owner immediately and trigger follow-up',
  },
  {
    id: '4',
    vendor: 'Notion',
    initials: 'NO',
    logoColor: '#000000',
    category: 'Productivity',
    change: 'Risk exception expiring in 8 days — no renewal decision recorded',
    materiality: 'Medium',
    severity: 'Medium',
    confidence: 'High',
    whyItMatters:
      'The data residency exception expires Apr 2. Without a renewal decision, this becomes an unmanaged open risk with no audit trail.',
    status: 'Expiring',
    owner: 'Maya Torres',
    ownerInitials: 'MT',
    detectedAt: 'Mar 17, 2026',
    recommendedAction: 'Extend exception with rationale or escalate to risk register',
    linkedIssue: 'EXC-031',
  },
  {
    id: '5',
    vendor: 'Cloudflare',
    initials: 'CF',
    logoColor: '#F6821F',
    category: 'Network & CDN',
    change: 'Previously resolved encryption issue reopened — new evidence contradicts prior closure',
    materiality: 'High',
    severity: 'High',
    confidence: 'Medium',
    whyItMatters:
      'Cloudflare routes all inbound traffic. Encryption at rest gaps on log storage expose data and may violate GDPR Art. 32.',
    status: 'Reopened',
    owner: 'Sarah Chen',
    ownerInitials: 'SC',
    detectedAt: 'Mar 22, 2026',
    recommendedAction: 'Reopen prior resolution — require updated evidence with attestation',
    linkedIssue: 'EXC-018',
  },
  {
    id: '6',
    vendor: 'AWS',
    initials: 'AW',
    logoColor: '#FF9900',
    category: 'Cloud Infrastructure',
    change: 'Trust document updated — 3 new subprocessors added in EU-West region',
    materiality: 'Low',
    severity: 'Low',
    confidence: 'High',
    whyItMatters:
      'Subprocessor changes may affect data flow maps, GDPR DPA coverage, and SCCs. Review required before next audit.',
    status: 'New',
    owner: 'James Park',
    ownerInitials: 'JP',
    detectedAt: 'Mar 21, 2026',
    recommendedAction: 'Review subprocessor list and update data flow documentation',
  },
  {
    id: '7',
    vendor: 'Okta',
    initials: 'OK',
    logoColor: '#009FDB',
    category: 'Identity & Access',
    change: 'Duplicate signal — additional MFA regression from SecurityScorecard scan',
    materiality: 'High',
    severity: 'Low',
    confidence: 'Low',
    whyItMatters:
      'This signal duplicates the existing Okta MFA issue (EXC-042). Grouped to prevent noise. No additional action required.',
    status: 'Grouped',
    owner: 'James Park',
    ownerInitials: 'JP',
    detectedAt: 'Mar 22, 2026',
    recommendedAction: 'No additional action — merged under EXC-042',
    linkedIssue: 'EXC-042',
    grouped: true,
  },
]

const STRIPE_TIMELINE: TimelineEvent[] = [
  { date: 'Jan 15, 2026', event: 'Annual vendor review completed — all controls passed', actor: 'Sarah Chen', type: 'user' },
  { date: 'Jan 18, 2026', event: 'SOC 2 Type II report uploaded (valid through Mar 1, 2026)', actor: 'System', type: 'system' },
  { date: 'Feb 5, 2026', event: 'Exception EXC-019 approved — SOC 2 renewal in progress', actor: 'Sarah Chen', type: 'decision' },
  { date: 'Mar 1, 2026', event: 'SOC 2 report expiry date reached', actor: 'System', type: 'alert' },
  { date: 'Mar 13, 2026', event: 'Alert triggered — SOC 2 expired 12 days, no renewal evidence received', actor: 'System', type: 'alert' },
  { date: 'Mar 14, 2026', event: 'Evidence request sent to Stripe security contact', actor: 'Sarah Chen', type: 'user' },
  { date: 'Mar 25, 2026', event: 'Automated follow-up sent — still no response received', actor: 'System', type: 'system' },
]

const STRIPE_EVIDENCE: EvidenceDoc[] = [
  { name: 'Stripe SOC 2 Type II (2025)', type: 'Compliance Report', date: 'Jan 18, 2026', status: 'expired' },
  { name: 'Stripe Privacy Policy v3.2', type: 'Policy Document', date: 'Feb 2, 2026', status: 'current' },
  { name: 'Stripe DPA (Signed)', type: 'Legal Agreement', date: 'Dec 1, 2025', status: 'current' },
  { name: 'SOC 2 Type II (2026) — Requested', type: 'Compliance Report', date: '—', status: 'missing' },
  { name: 'Penetration Test Report (2025)', type: 'Security Assessment', date: '—', status: 'missing' },
]

const EXCEPTIONS: ExceptionRow[] = [
  {
    id: 'EXC-019',
    vendor: 'Stripe',
    initials: 'ST',
    logoColor: '#635BFF',
    exception: 'SOC 2 compliance gap — report expired, renewal in progress',
    severity: 'High',
    confidence: 'High',
    state: 'Awaiting Evidence',
    acceptedUntil: 'Apr 1, 2026',
    owner: 'Sarah Chen',
    nextCheckpoint: 'Mar 28, 2026',
    linkedSignals: 1,
  },
  {
    id: 'EXC-042',
    vendor: 'Okta',
    initials: 'OK',
    logoColor: '#009FDB',
    exception: 'MFA not enforced for admin accounts — rollout in progress',
    severity: 'High',
    confidence: 'Medium',
    state: 'In Remediation',
    acceptedUntil: 'Apr 15, 2026',
    owner: 'James Park',
    nextCheckpoint: 'Apr 1, 2026',
    linkedSignals: 2,
  },
  {
    id: 'EXC-031',
    vendor: 'Notion',
    initials: 'NO',
    logoColor: '#000000',
    exception: 'Data residency gap — EU data stored outside EEA without adequate SCCs',
    severity: 'Medium',
    confidence: 'High',
    state: 'Expiring Soon',
    acceptedUntil: 'Apr 2, 2026',
    owner: 'Maya Torres',
    nextCheckpoint: 'Mar 30, 2026',
    linkedSignals: 1,
  },
  {
    id: 'EXC-018',
    vendor: 'Cloudflare',
    initials: 'CF',
    logoColor: '#F6821F',
    exception: 'Encryption at rest gap — not enforced on legacy log storage tier',
    severity: 'High',
    confidence: 'Medium',
    state: 'Reopened',
    acceptedUntil: 'Mar 20, 2026',
    owner: 'Sarah Chen',
    nextCheckpoint: 'Mar 25, 2026',
    linkedSignals: 1,
  },
  {
    id: 'EXC-055',
    vendor: 'Deel',
    initials: 'DE',
    logoColor: '#FF6B35',
    exception: 'Penetration test results overdue — annual test not yet completed',
    severity: 'High',
    confidence: 'High',
    state: 'Awaiting Evidence',
    acceptedUntil: 'Mar 28, 2026',
    owner: '—',
    nextCheckpoint: 'Mar 26, 2026',
    linkedSignals: 1,
  },
  {
    id: 'EXC-007',
    vendor: 'AWS',
    initials: 'AW',
    logoColor: '#FF9900',
    exception: 'Subprocessor disclosure gap — DPA not updated for 2 new EU regions',
    severity: 'Low',
    confidence: 'High',
    state: 'Accepted',
    acceptedUntil: 'Jun 1, 2026',
    owner: 'James Park',
    nextCheckpoint: 'May 15, 2026',
    linkedSignals: 1,
  },
]

const AUDIT_LOG: AuditEntry[] = [
  { id: 'a1', actor: 'System', actorType: 'system', action: 'Alert triggered — Stripe SOC 2 expired (12 days overdue)', timestamp: 'Mar 13, 2026 09:02' },
  { id: 'a2', actor: 'Sarah Chen', actorType: 'user', action: 'Evidence request sent to Stripe security contact', timestamp: 'Mar 14, 2026 10:15', rationale: 'Requesting updated SOC 2 Type II report ahead of Apr 1 exception review.' },
  { id: 'a3', actor: 'System', actorType: 'system', action: 'EXC-019 status updated to Awaiting Evidence', timestamp: 'Mar 14, 2026 10:16' },
  { id: 'a4', actor: 'James Park', actorType: 'user', action: 'EXC-042 extended — Okta MFA rollout on track', timestamp: 'Mar 18, 2026 14:30', rationale: 'Okta confirmed MFA rollout completes Apr 10. Extending exception by 15 days with hard deadline.' },
  { id: 'a5', actor: 'System', actorType: 'system', action: 'Duplicate Okta MFA signal grouped under EXC-042', timestamp: 'Mar 22, 2026 08:45' },
  { id: 'a6', actor: 'System', actorType: 'system', action: 'EXC-018 reopened — new Cloudflare evidence contradicts prior resolution', timestamp: 'Mar 22, 2026 09:10' },
  { id: 'a7', actor: 'Maya Torres', actorType: 'user', action: 'EXC-031 escalated to GRC lead for renewal decision', timestamp: 'Mar 23, 2026 11:00', rationale: 'Exception expires Apr 2. No viable remediation path — escalating for executive sign-off.' },
]

// ─── MICRO COMPONENTS ──────────────────────────────────────────────────────────

function CritBadge({ level }: { level: Criticality }) {
  const styles: Record<Criticality, string> = {
    Critical: 'bg-red-50 text-red-700 border border-red-200',
    High: 'bg-orange-50 text-orange-700 border border-orange-200',
    Medium: 'bg-amber-50 text-amber-700 border border-amber-200',
    Low: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  }
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wide ${styles[level]}`}>
      {level}
    </span>
  )
}

function PulseStatusBadge({ status }: { status: PulseStatus }) {
  const map: Record<PulseStatus, { cls: string; dot: string }> = {
    New: { cls: 'bg-blue-50 text-blue-700 border border-blue-200', dot: 'bg-blue-500' },
    Linked: { cls: 'bg-indigo-50 text-indigo-700 border border-indigo-200', dot: 'bg-indigo-500' },
    Reopened: { cls: 'bg-red-50 text-red-700 border border-red-200', dot: 'bg-red-500' },
    Expiring: { cls: 'bg-amber-50 text-amber-700 border border-amber-200', dot: 'bg-amber-500' },
    Stalled: { cls: 'bg-slate-100 text-slate-600 border border-slate-200', dot: 'bg-slate-400' },
    Grouped: { cls: 'bg-slate-100 text-slate-400 border border-slate-200', dot: 'bg-slate-300' },
    Accepted: { cls: 'bg-emerald-50 text-emerald-700 border border-emerald-200', dot: 'bg-emerald-500' },
  }
  const { cls, dot } = map[status]
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold ${cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  )
}

function ExStateBadge({ state }: { state: ExceptionState }) {
  const map: Record<ExceptionState, { cls: string; dot: string }> = {
    Accepted: { cls: 'bg-emerald-50 text-emerald-700 border border-emerald-200', dot: 'bg-emerald-500' },
    'In Remediation': { cls: 'bg-blue-50 text-blue-700 border border-blue-200', dot: 'bg-blue-500' },
    'Awaiting Evidence': { cls: 'bg-amber-50 text-amber-700 border border-amber-200', dot: 'bg-amber-500' },
    Escalated: { cls: 'bg-purple-50 text-purple-700 border border-purple-200', dot: 'bg-purple-500' },
    'Expiring Soon': { cls: 'bg-red-50 text-red-700 border border-red-200', dot: 'bg-red-400' },
    Reopened: { cls: 'bg-red-50 text-red-800 border border-red-300', dot: 'bg-red-600' },
    Stalled: { cls: 'bg-slate-100 text-slate-600 border border-slate-200', dot: 'bg-slate-400' },
  }
  const { cls, dot } = map[state]
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold ${cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {state}
    </span>
  )
}

function ConfidencePill({ level }: { level: 'High' | 'Medium' | 'Low' }) {
  const cls = level === 'High' ? 'text-slate-600 bg-slate-100' : level === 'Medium' ? 'text-amber-700 bg-amber-50' : 'text-slate-400 bg-slate-50'
  return <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${cls}`}>{level} conf.</span>
}

function VendorAvatar({ initials, color, size = 'md' }: { initials: string; color: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'w-6 h-6 text-[9px]', md: 'w-8 h-8 text-xs', lg: 'w-10 h-10 text-sm' }
  return (
    <div className={`${sizes[size]} rounded flex items-center justify-center text-white font-bold flex-shrink-0`} style={{ backgroundColor: color }}>
      {initials}
    </div>
  )
}

function OwnerPip({ initials, unassigned }: { initials: string | null; unassigned?: boolean }) {
  if (unassigned || !initials) {
    return (
      <div className="flex items-center gap-1">
        <div className="w-5 h-5 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center text-[9px] text-slate-400">?</div>
        <span className="text-[10px] text-red-500 font-medium">Unassigned</span>
      </div>
    )
  }
  return (
    <div className="flex items-center gap-1">
      <div className="w-5 h-5 rounded-full bg-indigo-400 flex items-center justify-center text-[9px] text-white font-bold">{initials}</div>
    </div>
  )
}

// ─── SIDEBAR ───────────────────────────────────────────────────────────────────

function Sidebar({ screen, onNavigate }: { screen: Screen; onNavigate: (s: Screen) => void }) {
  const nav = [
    { label: 'Dashboard', icon: '⊞', group: 'OVERVIEW' },
    { label: 'Vendors', icon: '◈', group: 'THIRD-PARTY RISK' },
    { label: 'Assessments', icon: '◎' },
    { label: 'Risk Register', icon: '▤' },
    { label: 'Vendor Risk Pulse', icon: '⬡', screen: 'overview' as Screen },
    { label: 'Active Exceptions', icon: '◷', screen: 'exceptions' as Screen },
    { label: 'Executive Summary', icon: '▦', screen: 'executive' as Screen },
    { label: 'Controls', icon: '⊛', group: 'COMPLIANCE' },
    { label: 'Policies', icon: '≡' },
  ]

  const isActive = (itemScreen?: Screen) => {
    if (!itemScreen) return false
    if (itemScreen === 'overview') return screen === 'overview' || screen === 'detail' || screen === 'reassessment'
    return itemScreen === screen
  }

  return (
    <div className="w-[220px] flex-shrink-0 h-full flex flex-col" style={{ backgroundColor: '#0f172a' }}>
      <div className="px-5 py-4 border-b border-white/10">
        <span className="text-white font-bold text-[17px] tracking-tight">drata</span>
      </div>
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {nav.map((item, i) => (
          <div key={i}>
            {item.group && (
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 px-2 pt-4 pb-1.5">
                {item.group}
              </p>
            )}
            <button
              onClick={() => item.screen && onNavigate(item.screen)}
              className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded text-[13px] text-left mb-0.5 transition-colors ${
                isActive(item.screen)
                  ? 'bg-[#4362f5] text-white font-medium'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="text-[14px]">{item.icon}</span>
              {item.label}
            </button>
          </div>
        ))}
      </nav>
      <div className="px-3 py-3 border-t border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">SC</div>
          <div>
            <p className="text-white text-[12px] font-medium">Sarah Chen</p>
            <p className="text-slate-500 text-[10px]">GRC Manager</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── TOPBAR ────────────────────────────────────────────────────────────────────

function TopBar({ crumbs, actions }: { crumbs: { label: string; onClick?: () => void }[]; actions?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-6 h-[52px] bg-white border-b border-slate-200 flex-shrink-0">
      <div className="flex items-center gap-1.5 text-[12px] text-slate-500">
        {crumbs.map((c, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-slate-300">›</span>}
            {c.onClick ? (
              <button onClick={c.onClick} className="hover:text-slate-800 transition-colors">{c.label}</button>
            ) : (
              <span className="text-slate-800 font-medium">{c.label}</span>
            )}
          </span>
        ))}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}

// ─── SCREEN 1: VENDOR RISK PULSE OVERVIEW ──────────────────────────────────────

function OverviewScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [activeTab, setActiveTab] = useState<'all' | 'critical' | 'awaiting' | 'resolved'>('all')
  const [search, setSearch] = useState('')
  const [matFilter, setMatFilter] = useState('All')

  const filtered = useMemo(() => {
    let items = PULSE_ITEMS
    if (activeTab === 'critical') items = items.filter(i => i.severity === 'Critical' || i.severity === 'High')
    if (activeTab === 'awaiting') items = items.filter(i => ['New', 'Stalled', 'Expiring', 'Reopened'].includes(i.status))
    if (activeTab === 'resolved') items = items.filter(i => i.status === 'Accepted')
    if (search) items = items.filter(i => i.vendor.toLowerCase().includes(search.toLowerCase()) || i.change.toLowerCase().includes(search.toLowerCase()))
    if (matFilter !== 'All') items = items.filter(i => i.materiality === matFilter)
    return items
  }, [activeTab, search, matFilter])

  const tabs = [
    { key: 'all', label: 'All Changes', count: PULSE_ITEMS.length },
    { key: 'critical', label: 'Critical Changes', count: PULSE_ITEMS.filter(i => i.severity === 'High' || i.severity === 'Critical').length },
    { key: 'awaiting', label: 'Awaiting Action', count: PULSE_ITEMS.filter(i => ['New', 'Stalled', 'Expiring', 'Reopened'].includes(i.status)).length },
    { key: 'accepted', label: 'Accepted Risks', count: EXCEPTIONS.length },
    { key: 'resolved', label: 'Resolved', count: 3 },
  ]

  const severityBar = (s: Criticality) =>
    s === 'Critical' ? 'bg-red-500' : s === 'High' ? 'bg-orange-400' : s === 'Medium' ? 'bg-amber-400' : 'bg-slate-300'

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#f8fafc]">
      <TopBar
        crumbs={[{ label: 'Third-Party Risk' }, { label: 'Vendor Risk Pulse' }]}
        actions={
          <>
            <span className="text-[11px] text-slate-400">Refreshed Mar 25, 2026 09:42</span>
            <button className="text-[12px] text-slate-600 border border-slate-200 rounded px-2.5 py-1 hover:bg-slate-50">↻ Refresh</button>
            <button className="text-[12px] bg-[#4362f5] text-white rounded px-3 py-1 hover:bg-indigo-700">Export Report</button>
          </>
        }
      />

      {/* Page header */}
      <div className="px-6 pt-5 pb-4 bg-white border-b border-slate-200 flex-shrink-0">
        <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">Vendor Risk Pulse</h1>
        <p className="text-[13px] text-slate-500 mt-0.5">Continuous monitoring feed across 24 vendors. Showing material risk changes since your last review.</p>
      </div>

      {/* KPI strip */}
      <div className="px-6 py-4 grid grid-cols-5 gap-3 flex-shrink-0">
        {[
          { label: 'Vendors Monitored', value: '24', sub: '6 with active signals', vc: 'text-slate-900', sc: 'text-slate-500' },
          { label: 'Awaiting Action', value: '5', sub: '2 unassigned', vc: 'text-red-600', sc: 'text-red-500' },
          { label: 'Material Changes', value: '4', sub: 'This week', vc: 'text-amber-600', sc: 'text-slate-500' },
          { label: 'Active Exceptions', value: '6', sub: '3 expiring ≤30 days', vc: 'text-slate-900', sc: 'text-amber-600' },
          { label: 'Grouped Duplicates', value: '2', sub: 'No action needed', vc: 'text-slate-400', sc: 'text-slate-400' },
        ].map((k, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-lg px-4 py-3.5">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">{k.label}</p>
            <p className={`text-[26px] font-bold mt-1 leading-none ${k.vc}`}>{k.value}</p>
            <p className={`text-[11px] mt-1 ${k.sc}`}>{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Tabs + filters */}
      <div className="px-6 flex items-center justify-between bg-white border-b border-slate-200 flex-shrink-0">
        <div className="flex">
          {tabs.map(tab => {
            const isActiveTab = tab.key !== 'accepted' && activeTab === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => tab.key === 'accepted' ? onNavigate('exceptions') : setActiveTab(tab.key as 'all' | 'critical' | 'awaiting' | 'resolved')}
                className={`flex items-center gap-1.5 px-4 py-3 text-[12px] font-medium border-b-2 transition-colors ${
                  isActiveTab ? 'border-[#4362f5] text-[#4362f5]' : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab.label}
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${isActiveTab ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'}`}>
                  {tab.count}
                </span>
              </button>
            )
          })}
        </div>
        <div className="flex items-center gap-2 pb-2">
          <input
            type="text"
            placeholder="Search vendors or changes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="text-[12px] border border-slate-200 rounded px-2.5 py-1.5 w-52 focus:outline-none focus:border-indigo-300"
          />
          <select value={matFilter} onChange={e => setMatFilter(e.target.value)} className="text-[12px] border border-slate-200 rounded px-2 py-1.5 focus:outline-none">
            {['All', 'Critical', 'High', 'Medium', 'Low'].map(v => <option key={v}>{v}</option>)}
          </select>
        </div>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
        {filtered.length === 0 && (
          <div className="flex items-center justify-center h-32 text-[13px] text-slate-400">No changes match your filters.</div>
        )}
        {filtered.map(item => (
          <div
            key={item.id}
            onClick={() => item.id === '1' && onNavigate('detail')}
            className={`bg-white border rounded-lg px-4 py-3.5 flex gap-3 transition-all ${
              item.grouped
                ? 'opacity-60 border-dashed border-slate-200'
                : item.id === '1'
                ? 'border-slate-200 hover:border-indigo-300 hover:shadow-sm cursor-pointer'
                : 'border-slate-200 cursor-default'
            }`}
          >
            {/* Severity strip */}
            <div className={`w-1 rounded-full flex-shrink-0 self-stretch ${severityBar(item.severity)}`} />

            <VendorAvatar initials={item.initials} color={item.logoColor} />

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[13px] font-semibold text-slate-900">{item.vendor}</span>
                    <span className="text-[11px] text-slate-400">{item.category}</span>
                    <CritBadge level={item.materiality} />
                    <PulseStatusBadge status={item.status} />
                    {item.linkedIssue && (
                      <span className="text-[10px] text-indigo-600 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded font-medium">
                        ↗ {item.linkedIssue}
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] font-medium text-slate-700 mt-1">{item.change}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    <span className="font-medium text-slate-600">Why it matters: </span>
                    {item.whyItMatters}
                  </p>
                </div>

                <div className="flex-shrink-0 text-right space-y-1.5 min-w-[120px]">
                  <p className="text-[10px] text-slate-400">{item.detectedAt}</p>
                  <ConfidencePill level={item.confidence} />
                  <div className="flex justify-end">
                    <OwnerPip initials={item.ownerInitials} unassigned={!item.owner} />
                    {item.owner && <span className="text-[10px] text-slate-500 ml-1">{item.owner}</span>}
                  </div>
                </div>
              </div>

              {!item.grouped && (
                <div className="mt-2.5 flex items-center justify-between">
                  <p className="text-[11px] text-slate-500">
                    <span className="text-[#4362f5] font-medium">→ </span>
                    {item.recommendedAction}
                  </p>
                  {item.id === '1' && (
                    <button
                      onClick={e => { e.stopPropagation(); onNavigate('detail') }}
                      className="text-[11px] text-[#4362f5] bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded hover:bg-indigo-100 flex-shrink-0"
                    >
                      View detail →
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── SCREEN 2: VENDOR CHANGE DETAIL ────────────────────────────────────────────

function DetailScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [tab, setTab] = useState<'overview' | 'timeline' | 'evidence' | 'exception' | 'audit'>('overview')

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#f8fafc]">
      <TopBar
        crumbs={[
          { label: 'Vendor Risk Pulse', onClick: () => onNavigate('overview') },
          { label: 'Stripe — SOC 2 Expired' },
        ]}
        actions={<button onClick={() => onNavigate('overview')} className="text-[12px] text-slate-600 border border-slate-200 rounded px-2.5 py-1 hover:bg-slate-50">← Back</button>}
      />

      <div className="flex-1 overflow-y-auto">
        {/* Vendor header */}
        <div className="bg-white border-b border-slate-200 px-6 py-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <VendorAvatar initials="ST" color="#635BFF" size="lg" />
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-[18px] font-bold text-slate-900">Stripe</h1>
                  <CritBadge level="Critical" />
                  <PulseStatusBadge status="New" />
                </div>
                <p className="text-[12px] text-slate-500 mt-0.5">Payment Processing · Owner: Sarah Chen · Next review: Apr 1, 2026</p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap justify-end">
              <button onClick={() => onNavigate('reassessment')} className="text-[12px] bg-[#4362f5] text-white rounded px-3 py-1.5 hover:bg-indigo-700 font-medium">
                Trigger Reassessment
              </button>
              <button className="text-[12px] border border-slate-200 text-slate-600 rounded px-3 py-1.5 hover:bg-slate-50">Accept Risk</button>
              <button className="text-[12px] border border-slate-200 text-slate-600 rounded px-3 py-1.5 hover:bg-slate-50">Escalate</button>
            </div>
          </div>
        </div>

        {/* AI summary */}
        <div className="mx-6 mt-5">
          <div className="border border-indigo-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #4362f5 0%, #7B61FF 100%)' }}>
              <span className="text-white text-[11px] font-bold tracking-widest uppercase">✦ TPRM Agent — Risk Summary</span>
              <span className="text-indigo-200 text-[11px]">Mar 25, 2026 09:42</span>
            </div>
            <div className="px-4 py-3.5 bg-gradient-to-b from-indigo-50/50 to-white">
              <p className="text-[12.5px] text-slate-700 leading-relaxed">
                Stripe's SOC 2 Type II report expired 12 days ago (Mar 1, 2026). An exception (EXC-019) was approved in February while Stripe completed their audit cycle, but no evidence has been received since the request on Mar 14. Stripe processes payment card data under your SOC 2 scope (CC6.1, PI1.1) and is classified as Critical. The current state represents an open compliance gap. <strong>Recommended: trigger a targeted reassessment requesting the updated report, or extend the exception with a hard evidence deadline of Mar 30.</strong>
              </p>
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-indigo-100">
                <button className="text-[11px] text-indigo-600 hover:underline">View supporting inputs →</button>
                <button className="text-[11px] text-slate-400 hover:text-slate-600">Regenerate</button>
                <button className="text-[11px] text-slate-400 hover:text-slate-600">Dismiss</button>
              </div>
            </div>
          </div>
        </div>

        {/* Risk change summary */}
        <div className="mx-6 mt-4 bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-3">Risk Change Summary</h3>
          <div className="grid grid-cols-4 gap-5">
            {[
              { label: 'Change', value: 'SOC 2 report expired', sub: '12 days overdue' },
              { label: 'Materiality', value: 'High', sub: 'Payment data processor' },
              { label: 'Confidence', value: 'High', sub: 'Direct expiry detection' },
              { label: 'Signal Source', value: 'Internal', sub: 'Evidence vault check' },
            ].map((item, i) => (
              <div key={i}>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{item.label}</p>
                <p className="text-[13px] font-semibold text-slate-800 mt-0.5">{item.value}</p>
                <p className="text-[11px] text-slate-400">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tab nav */}
        <div className="mx-6 mt-4 border-b border-slate-200 flex">
          {[
            { key: 'overview', label: 'Overview' },
            { key: 'timeline', label: 'Timeline' },
            { key: 'evidence', label: 'Evidence', count: 2 },
            { key: 'exception', label: 'Active Exception' },
            { key: 'audit', label: 'Audit Log', count: AUDIT_LOG.length },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as typeof tab)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-[12px] font-medium border-b-2 transition-colors ${
                tab === t.key ? 'border-[#4362f5] text-[#4362f5]' : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {t.label}
              {t.count && (
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${tab === t.key ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'}`}>
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="mx-6 mt-4 pb-24">
          {tab === 'overview' && (
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 space-y-3">
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <h3 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-3">Active Signals</h3>
                  <div className="space-y-2.5">
                    {[
                      { label: 'SOC 2 report expired — 12 days overdue', severity: 'High' as Criticality, source: 'Internal', date: 'Mar 13, 2026', isNew: true },
                      { label: 'Evidence request sent — no response in 11 days', severity: 'Medium' as Criticality, source: 'Internal', date: 'Mar 14, 2026', isNew: false },
                    ].map((sig, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded border border-slate-100">
                        <CritBadge level={sig.severity} />
                        <div className="flex-1">
                          <p className="text-[12px] text-slate-700 font-medium">{sig.label}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">Source: {sig.source} · Detected {sig.date}</p>
                        </div>
                        {sig.isNew && <span className="text-[10px] bg-blue-50 text-blue-600 border border-blue-200 px-1.5 py-0.5 rounded font-medium">New</span>}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3.5">
                  <p className="text-[12px] text-amber-800 font-semibold mb-1">⚠ Open compliance gap</p>
                  <p className="text-[11px] text-amber-700">SOC 2 expired. Controls CC6.1 and PI1.1 are untested until new evidence is received. This gap will appear in your next audit if unresolved.</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <h3 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2.5">Vendor Profile</h3>
                  {[
                    { label: 'Category', value: 'Payment Processing' },
                    { label: 'Data types', value: 'PCI, PII, Financial' },
                    { label: 'Criticality', value: 'Critical' },
                    { label: 'Active since', value: 'Jul 2022' },
                    { label: 'Last assessment', value: 'Jan 15, 2026' },
                    { label: 'Linked controls', value: 'CC6.1, PI1.1' },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between py-1.5 border-b border-slate-100 last:border-0">
                      <span className="text-[11px] text-slate-500">{item.label}</span>
                      <span className="text-[11px] text-slate-700 font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'timeline' && (
            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <h3 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-4">Issue History</h3>
              {STRIPE_TIMELINE.map((event, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0 ${
                      event.type === 'alert' ? 'bg-red-400' : event.type === 'decision' ? 'bg-indigo-400' : event.type === 'user' ? 'bg-slate-400' : 'bg-slate-200'
                    }`} />
                    {i < STRIPE_TIMELINE.length - 1 && <div className="w-px flex-1 bg-slate-100 my-1" />}
                  </div>
                  <div className="pb-4 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-medium text-slate-700">{event.event}</span>
                      {event.type === 'alert' && <span className="text-[10px] bg-red-50 text-red-600 border border-red-200 px-1.5 py-0.5 rounded">Alert</span>}
                      {event.type === 'decision' && <span className="text-[10px] bg-indigo-50 text-indigo-600 border border-indigo-200 px-1.5 py-0.5 rounded">Decision</span>}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{event.date} · {event.actor}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'evidence' && (
            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <h3 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-4">Evidence Vault</h3>
              <div className="space-y-2">
                {STRIPE_EVIDENCE.map((doc, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded border ${
                    doc.status === 'missing' ? 'bg-red-50 border-dashed border-red-200' :
                    doc.status === 'expired' ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-200'
                  }`}>
                    <span className="text-[18px] flex-shrink-0">
                      {doc.status === 'missing' ? '□' : doc.status === 'expired' ? '⚠' : '✓'}
                    </span>
                    <div className="flex-1">
                      <p className="text-[12px] font-medium text-slate-700">{doc.name}</p>
                      <p className="text-[11px] text-slate-400">{doc.type} · {doc.date}</p>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold flex-shrink-0 ${
                      doc.status === 'missing' ? 'bg-red-100 text-red-700' :
                      doc.status === 'expired' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {doc.status === 'missing' ? 'Missing' : doc.status === 'expired' ? 'Expired' : 'Current'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <button className="text-[12px] text-[#4362f5] bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded hover:bg-indigo-100">
                  + Upload Evidence
                </button>
              </div>
            </div>
          )}

          {tab === 'exception' && (
            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Active Exception — EXC-019</h3>
                <ExStateBadge state="Awaiting Evidence" />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {[
                  { label: 'Exception type', value: 'SOC 2 compliance gap' },
                  { label: 'Accepted until', value: 'Apr 1, 2026' },
                  { label: 'Risk owner', value: 'Sarah Chen' },
                  { label: 'Issue linkage', value: 'New signal — linked to EXC-019' },
                  { label: 'Remediation status', value: 'Stripe renewal in progress' },
                  { label: 'Next checkpoint', value: 'Mar 28, 2026' },
                ].map((item, i) => (
                  <div key={i}>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{item.label}</p>
                    <p className="text-[12px] text-slate-700 font-medium mt-0.5">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="bg-slate-50 rounded p-3 border border-slate-100 mb-4">
                <p className="text-[11px] font-semibold text-slate-600 mb-1">Decision rationale</p>
                <p className="text-[11px] text-slate-500">Stripe confirmed their SOC 2 audit cycle is complete and the report is being finalized. Evidence request sent Mar 14. Follow-up triggered Mar 25 — no response received. Exception valid until Apr 1. A new decision is required if evidence is not received by Mar 30.</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                {['Extend Exception', 'Escalate to Risk Register', 'Mark Resolved', 'Reassign Owner'].map(action => (
                  <button key={action} className="text-[11px] border border-slate-200 text-slate-600 rounded px-2.5 py-1.5 hover:bg-slate-50 transition-colors">{action}</button>
                ))}
              </div>
            </div>
          )}

          {tab === 'audit' && (
            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <h3 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-4">Audit Trail</h3>
              <div className="space-y-2.5">
                {AUDIT_LOG.map(entry => (
                  <div key={entry.id} className="flex gap-3 p-2.5 bg-slate-50 rounded border border-slate-100">
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${entry.actorType === 'system' ? 'bg-slate-300' : 'bg-indigo-400'}`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[11px] font-semibold text-slate-700">{entry.actor}</span>
                        <span className="text-[11px] text-slate-500">{entry.action}</span>
                      </div>
                      {entry.rationale && <p className="text-[11px] text-slate-400 mt-0.5 italic">"{entry.rationale}"</p>}
                      <p className="text-[10px] text-slate-400 mt-0.5">{entry.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky action bar */}
        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center gap-2 flex-wrap">
          <button onClick={() => onNavigate('reassessment')} className="text-[12px] bg-[#4362f5] text-white rounded px-3 py-1.5 hover:bg-indigo-700 font-medium">
            Trigger Targeted Reassessment
          </button>
          <button className="text-[12px] border border-slate-200 text-slate-600 rounded px-3 py-1.5 hover:bg-slate-50">Request Evidence</button>
          <button className="text-[12px] border border-slate-200 text-slate-600 rounded px-3 py-1.5 hover:bg-slate-50">Accept Risk Until Date</button>
          <button className="text-[12px] border border-slate-200 text-slate-600 rounded px-3 py-1.5 hover:bg-slate-50">Assign Remediation</button>
          <button className="text-[12px] border border-slate-200 text-slate-600 rounded px-3 py-1.5 hover:bg-slate-50">Snooze</button>
          <button className="text-[12px] border border-slate-200 text-slate-600 rounded px-3 py-1.5 hover:bg-slate-50">Override with Rationale</button>
          <div className="ml-auto flex gap-2">
            <button className="text-[12px] border border-red-200 text-red-600 rounded px-3 py-1.5 hover:bg-red-50">Escalate</button>
            <button className="text-[12px] border border-slate-200 text-slate-400 rounded px-3 py-1.5 hover:bg-slate-50 text-[11px]">Dismiss low-confidence signal</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── SCREEN 3: TRIGGER TARGETED REASSESSMENT ───────────────────────────────────

function ReassessmentScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [editMode, setEditMode] = useState(false)
  const [reason, setReason] = useState('SOC 2 compliance gap — report expired')
  const [dueDate, setDueDate] = useState('Apr 1, 2026')
  const [assignee, setAssignee] = useState('Sarah Chen (me)')

  const questions = [
    'Please upload your latest SOC 2 Type II report (issued after Jan 1, 2026).',
    'Confirm whether your SOC 2 audit has been completed. If not, provide a firm completion date with supporting evidence.',
    'Explain the status of the open remediation item from the January 2026 assessment.',
    'Confirm whether MFA is enforced for all administrator accounts across your production environment.',
  ]

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#f8fafc]">
      <TopBar
        crumbs={[
          { label: 'Vendor Risk Pulse', onClick: () => onNavigate('overview') },
          { label: 'Stripe', onClick: () => onNavigate('detail') },
          { label: 'Targeted Reassessment' },
        ]}
        actions={<button onClick={() => onNavigate('detail')} className="text-[12px] text-slate-600 border border-slate-200 rounded px-2.5 py-1 hover:bg-slate-50">← Back to Detail</button>}
      />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto space-y-4">

          {/* Header */}
          <div className="flex items-center gap-3">
            <VendorAvatar initials="ST" color="#635BFF" />
            <div>
              <h1 className="text-[17px] font-bold text-slate-900">Targeted Reassessment — Stripe</h1>
              <p className="text-[12px] text-slate-500">A focused evidence request for a specific issue. Not a full vendor questionnaire.</p>
            </div>
          </div>

          {/* AI context */}
          <div className="border border-indigo-200 rounded-lg overflow-hidden">
            <div className="px-4 py-2" style={{ background: 'linear-gradient(135deg, #4362f5 0%, #7B61FF 100%)' }}>
              <span className="text-white text-[11px] font-bold tracking-widest uppercase">✦ TPRM Agent — Reassessment Context</span>
            </div>
            <div className="px-4 py-3 bg-indigo-50/40">
              <p className="text-[12px] text-slate-700 leading-relaxed">
                Based on the current issue state (SOC 2 expired 12 days, no evidence received), I've pre-selected the relevant reason and generated targeted follow-up questions. Use these as-is or edit before sending. This replaces the need for a full annual questionnaire and will be logged to the audit trail automatically.
              </p>
            </div>
          </div>

          {/* Reason */}
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">Reason for Reassessment</label>
            <select value={reason} onChange={e => setReason(e.target.value)} className="w-full text-[13px] border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-indigo-300 bg-white">
              {['SOC 2 compliance gap — report expired', 'Questionnaire response regressed', 'Security review condition unresolved', 'Prior resolution reopened', 'Exception expiring — new decision required'].map(r => <option key={r}>{r}</option>)}
            </select>
          </div>

          {/* Questions */}
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">AI-Suggested Follow-up Questions</label>
              <button onClick={() => setEditMode(!editMode)} className="text-[11px] text-[#4362f5] hover:underline">
                {editMode ? 'Use recommended ↩' : 'Edit questions'}
              </button>
            </div>
            <div className="space-y-2">
              {questions.map((q, i) => (
                <div key={i} className="flex gap-2.5 items-start p-2.5 bg-slate-50 rounded border border-slate-100">
                  <span className="text-[11px] font-bold text-indigo-400 mt-0.5 flex-shrink-0">{i + 1}.</span>
                  {editMode ? (
                    <textarea defaultValue={q} rows={2} className="flex-1 text-[12px] text-slate-700 bg-transparent resize-none focus:outline-none" />
                  ) : (
                    <p className="text-[12px] text-slate-700">{q}</p>
                  )}
                </div>
              ))}
            </div>
            <button className="mt-3 text-[11px] text-[#4362f5] hover:underline">+ Add question</button>
          </div>

          {/* Settings */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 grid grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">Due Date</label>
              <input type="text" value={dueDate} onChange={e => setDueDate(e.target.value)} className="w-full text-[13px] border border-slate-200 rounded px-3 py-2 focus:outline-none focus:border-indigo-300" />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">Assign To</label>
              <select value={assignee} onChange={e => setAssignee(e.target.value)} className="w-full text-[13px] border border-slate-200 rounded px-3 py-2 focus:outline-none bg-white">
                <option>Sarah Chen (me)</option>
                <option>James Park</option>
                <option>Maya Torres</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">Link to Exception</label>
              <select className="w-full text-[13px] border border-slate-200 rounded px-3 py-2 focus:outline-none bg-white">
                <option>EXC-019 — Stripe SOC 2 compliance gap (recommended)</option>
                <option>Create new exception</option>
                <option>No exception link</option>
              </select>
            </div>
          </div>

          {/* Note */}
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-3.5">
            <p className="text-[11px] text-slate-500">
              <span className="font-semibold text-slate-600">Note: </span>
              This targeted reassessment will be logged in the audit trail and linked to the active exception. Stripe will receive a focused evidence request — not a full annual questionnaire. Responses will be added to the evidence vault and the exception will update automatically.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pb-6">
            <button onClick={() => onNavigate('detail')} className="flex-1 text-[13px] bg-[#4362f5] text-white rounded px-4 py-2.5 hover:bg-indigo-700 font-semibold">
              Send Targeted Reassessment →
            </button>
            <button onClick={() => onNavigate('detail')} className="text-[13px] border border-slate-200 text-slate-600 rounded px-4 py-2.5 hover:bg-slate-50">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── SCREEN 4: ACTIVE EXCEPTIONS ───────────────────────────────────────────────

function ExceptionsScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#f8fafc]">
      <TopBar
        crumbs={[{ label: 'Third-Party Risk' }, { label: 'Active Exceptions' }]}
        actions={
          <>
            <button className="text-[12px] border border-slate-200 text-slate-600 rounded px-2.5 py-1 hover:bg-slate-50">Export</button>
            <button className="text-[12px] bg-[#4362f5] text-white rounded px-3 py-1 hover:bg-indigo-700">+ New Exception</button>
          </>
        }
      />

      {/* Page header */}
      <div className="px-6 pt-5 pb-4 bg-white border-b border-slate-200 flex-shrink-0">
        <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">Active Exceptions</h1>
        <p className="text-[13px] text-slate-500 mt-0.5">Known vendor issues tracked over time. Prevents repeated alert noise while preserving accountability and audit trail.</p>
      </div>

      {/* KPI strip */}
      <div className="px-6 py-4 grid grid-cols-5 gap-3 flex-shrink-0">
        {[
          { label: 'Total Exceptions', value: '6', sub: 'Across 5 vendors', vc: 'text-slate-900', sc: 'text-slate-500' },
          { label: 'Expiring ≤30 days', value: '3', sub: 'Action required', vc: 'text-red-600', sc: 'text-red-500' },
          { label: 'In Remediation', value: '1', sub: 'On track', vc: 'text-blue-600', sc: 'text-slate-500' },
          { label: 'Awaiting Evidence', value: '2', sub: 'Follow-up sent', vc: 'text-amber-600', sc: 'text-slate-500' },
          { label: 'Reopened', value: '1', sub: 'Needs review', vc: 'text-red-600', sc: 'text-red-500' },
        ].map((k, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-lg px-4 py-3.5">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">{k.label}</p>
            <p className={`text-[26px] font-bold mt-1 leading-none ${k.vc}`}>{k.value}</p>
            <p className={`text-[11px] mt-1 ${k.sc}`}>{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto px-6 pb-6">
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {['Vendor', 'Exception', 'Severity', 'Confidence', 'State', 'Accepted Until', 'Owner', 'Next Checkpoint', 'Signals', 'Actions'].map(col => (
                  <th key={col} className="px-3 py-2.5 text-[10px] uppercase tracking-wider font-semibold text-slate-500 whitespace-nowrap">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {EXCEPTIONS.map(exc => (
                <tr
                  key={exc.id}
                  onClick={() => exc.vendor === 'Stripe' && onNavigate('detail')}
                  className={`hover:bg-slate-50 transition-colors ${exc.vendor === 'Stripe' ? 'cursor-pointer' : 'cursor-default'} ${
                    exc.state === 'Reopened' || exc.state === 'Expiring Soon' ? 'bg-red-50/30' : ''
                  }`}
                >
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <VendorAvatar initials={exc.initials} color={exc.logoColor} size="sm" />
                      <div>
                        <p className="text-[12px] font-semibold text-slate-800">{exc.vendor}</p>
                        <p className="text-[10px] text-slate-400">{exc.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 max-w-[220px]">
                    <p className="text-[11px] text-slate-600 leading-snug">{exc.exception}</p>
                  </td>
                  <td className="px-3 py-3"><CritBadge level={exc.severity} /></td>
                  <td className="px-3 py-3"><ConfidencePill level={exc.confidence} /></td>
                  <td className="px-3 py-3"><ExStateBadge state={exc.state} /></td>
                  <td className="px-3 py-3">
                    <span className={`text-[11px] font-medium ${['Expiring Soon', 'Reopened'].includes(exc.state) ? 'text-red-600' : 'text-slate-700'}`}>
                      {exc.acceptedUntil}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    {exc.owner === '—' ? (
                      <OwnerPip initials={null} unassigned />
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-indigo-400 flex items-center justify-center text-[9px] text-white font-bold">
                          {exc.owner.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-[11px] text-slate-600">{exc.owner}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-3 py-3">
                    <span className={`text-[11px] ${['Expiring Soon', 'Reopened'].includes(exc.state) ? 'text-red-500 font-medium' : 'text-slate-500'}`}>
                      {exc.nextCheckpoint}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-[11px] bg-indigo-50 text-indigo-700 border border-indigo-200 px-1.5 py-0.5 rounded font-medium">{exc.linkedSignals}</span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex gap-1">
                      {['Extend', 'Reopen', 'Resolve'].map(action => (
                        <button key={action} onClick={e => e.stopPropagation()} className="text-[10px] text-slate-500 hover:text-[#4362f5] bg-slate-100 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 px-1.5 py-0.5 rounded transition-colors">
                          {action}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footnote */}
        <p className="text-[11px] text-slate-400 mt-3 px-1">
          Grouped duplicates are suppressed in this view. Linked signal counts show how many monitoring alerts are associated with each exception.
        </p>
      </div>
    </div>
  )
}

// ─── SCREEN 5: EXECUTIVE SUMMARY ───────────────────────────────────────────────

// Simple CSS bar chart — no external dependency
function MiniBarChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data)
  return (
    <div className="flex items-end gap-1 h-10">
      {data.map((val, i) => (
        <div
          key={i}
          className={`flex-1 rounded-sm ${color} ${i === data.length - 1 ? '' : 'opacity-50'}`}
          style={{ height: `${(val / max) * 100}%` }}
        />
      ))}
    </div>
  )
}

function ExecutiveScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const topVendors = [
    { vendor: 'Stripe', initials: 'ST', color: '#635BFF', score: 78, delta: '+12', state: 'Awaiting Evidence' as ExceptionState },
    { vendor: 'Cloudflare', initials: 'CF', color: '#F6821F', score: 65, delta: '+8', state: 'Reopened' as ExceptionState },
    { vendor: 'Deel', initials: 'DE', color: '#FF6B35', score: 62, delta: '+5', state: 'Stalled' as ExceptionState },
    { vendor: 'Okta', initials: 'OK', color: '#009FDB', score: 55, delta: '+3', state: 'In Remediation' as ExceptionState },
    { vendor: 'Notion', initials: 'NO', color: '#000000', score: 44, delta: '+2', state: 'Expiring Soon' as ExceptionState },
  ]

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#f8fafc]">
      <TopBar
        crumbs={[{ label: 'Third-Party Risk' }, { label: 'Executive Summary' }]}
        actions={
          <>
            <span className="text-[11px] text-slate-400">Week of Mar 17 – 23, 2026</span>
            <button className="text-[12px] border border-slate-200 text-slate-600 rounded px-2.5 py-1 hover:bg-slate-50">Export PDF</button>
          </>
        }
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <div>
          <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">Executive & Audit Summary</h1>
          <p className="text-[13px] text-slate-500 mt-0.5">Weekly overview for GRC leadership. Supports oversight, defensibility, and audit readiness.</p>
        </div>

        {/* KPI strip */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'Vendors Monitored', value: '24', sub: '3 added this quarter', vc: 'text-slate-900', sc: 'text-slate-500' },
            { label: 'Material Changes', value: '4', sub: 'This week', vc: 'text-amber-600', sc: 'text-slate-500' },
            { label: 'Critical Awaiting Action', value: '2', sub: 'Stripe, Deel', vc: 'text-red-600', sc: 'text-red-500' },
            { label: 'Exceptions Expiring ≤30d', value: '3', sub: 'Decision required', vc: 'text-red-600', sc: 'text-red-500' },
          ].map((k, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-lg px-4 py-4">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">{k.label}</p>
              <p className={`text-[30px] font-bold mt-1 leading-none ${k.vc}`}>{k.value}</p>
              <p className={`text-[11px] mt-1.5 ${k.sc}`}>{k.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Top vendors by risk */}
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h3 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-3">Top Vendors by Residual Risk</h3>
            <div className="space-y-3">
              {topVendors.map((v, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <span className="text-[11px] text-slate-400 w-4 flex-shrink-0">{i + 1}</span>
                  <VendorAvatar initials={v.initials} color={v.color} size="sm" />
                  <span className="text-[12px] text-slate-700 font-medium flex-1">{v.vendor}</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-20 bg-slate-100 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${v.score >= 70 ? 'bg-red-400' : v.score >= 50 ? 'bg-amber-400' : 'bg-emerald-400'}`}
                        style={{ width: `${v.score}%` }}
                      />
                    </div>
                    <span className={`text-[12px] font-bold w-6 ${v.score >= 70 ? 'text-red-600' : v.score >= 50 ? 'text-amber-600' : 'text-slate-600'}`}>{v.score}</span>
                    <span className="text-[10px] text-red-500 font-medium w-8">{v.delta}</span>
                  </div>
                  <ExStateBadge state={v.state} />
                </div>
              ))}
            </div>
          </div>

          {/* Trends */}
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h3 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-3">7-Week Trends</h3>
            <div className="space-y-4">
              {[
                { label: 'Open Issues', data: [3, 4, 5, 4, 6, 5, 7], color: 'bg-red-400', unit: '' },
                { label: 'Avg. Time to Triage (hrs)', data: [36, 28, 32, 24, 22, 19, 17], color: 'bg-amber-400', unit: 'hrs' },
                { label: 'Avg. Time to Resolution (days)', data: [18, 15, 16, 13, 12, 11, 10], color: 'bg-blue-400', unit: 'days' },
              ].map(chart => (
                <div key={chart.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] text-slate-600 font-medium">{chart.label}</span>
                    <span className="text-[11px] font-bold text-slate-700">{chart.data[chart.data.length - 1]}{chart.unit}</span>
                  </div>
                  <MiniBarChart data={chart.data} color={chart.color} />
                  <div className="flex justify-between mt-1">
                    <span className="text-[9px] text-slate-400">Feb 3</span>
                    <span className="text-[9px] text-slate-400">Mar 17</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Audit log */}
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Audit Log — Recent Actions</h3>
            <button className="text-[11px] text-[#4362f5] hover:underline">View full log →</button>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {['Actor', 'Action', 'Timestamp', 'Rationale'].map(col => (
                  <th key={col} className="px-3 py-2 text-[10px] uppercase tracking-wider font-semibold text-slate-500">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {AUDIT_LOG.map(entry => (
                <tr key={entry.id} className="hover:bg-slate-50">
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0 ${entry.actorType === 'system' ? 'bg-slate-400' : 'bg-indigo-500'}`}>
                        {entry.actorType === 'system' ? '⚙' : entry.actor.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <span className="text-[11px] font-medium text-slate-700 whitespace-nowrap">{entry.actor}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-[11px] text-slate-600 max-w-[240px]">{entry.action}</td>
                  <td className="px-3 py-2.5 text-[11px] text-slate-400 whitespace-nowrap">{entry.timestamp}</td>
                  <td className="px-3 py-2.5 text-[11px] text-slate-500 italic max-w-[220px]">
                    {entry.rationale ? `"${entry.rationale}"` : <span className="text-slate-300 not-italic">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Narrative footer */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <p className="text-[12px] font-semibold text-indigo-800 mb-1">Vendor Risk Pulse — What this means</p>
          <p className="text-[11px] text-indigo-700 leading-relaxed">
            Drata continuously monitors vendor signals between scheduled reviews. This week, 4 material changes were detected — 2 are open and unresolved. Duplicate signals were automatically grouped (no analyst time spent). Active exceptions ensure known issues are tracked with accountability and expiry dates. Every decision is logged to the audit trail with actor, rationale, and timestamp.
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── MAIN APP ──────────────────────────────────────────────────────────────────

export default function VendorRiskPulsePage() {
  const [screen, setScreen] = useState<Screen>('overview')

  return (
    <div
      className="fixed inset-0 z-50 flex"
      style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
    >
      <Sidebar screen={screen} onNavigate={setScreen} />

      {screen === 'overview' && <OverviewScreen onNavigate={setScreen} />}
      {screen === 'detail' && <DetailScreen onNavigate={setScreen} />}
      {screen === 'reassessment' && <ReassessmentScreen onNavigate={setScreen} />}
      {screen === 'exceptions' && <ExceptionsScreen onNavigate={setScreen} />}
      {screen === 'executive' && <ExecutiveScreen onNavigate={setScreen} />}
    </div>
  )
}
