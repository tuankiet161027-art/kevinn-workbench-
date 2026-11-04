/**
 * KEVIN OS — content STRUCTURE (language-neutral).
 *
 * What lives here:   ids, order, icons, anchors, raw numbers/dates
 * What lives in i18n: every word → src/i18n/locales/{vi,en,zh}.json under "content.*"
 *
 * Ids are string-literal unions, so components build keys like
 *   t(`content.focus.${id}.title`)
 * and TypeScript rejects any id that has no matching key in vi.json.
 *
 * Unknown values are `null` → UI shows "—" + "Chưa cập nhật / Not updated yet / 未更新".
 * Never put a guessed number here.
 */
import type { LucideIcon } from 'lucide-react'
import {
  BookOpen,
  Briefcase,
  CalendarCheck,
  Compass,
  Dumbbell,
  GraduationCap,
  Languages,
  LayoutDashboard,
  Network,
  RotateCcw,
  Sprout,
  Wallet,
} from 'lucide-react'

/* ---------- Group 2 · four focus cards ---------- */
export type FocusId = 'career' | 'english' | 'fitness' | 'growth'
export interface Focus {
  id: FocusId
  icon: LucideIcon
  /** Today's value. null = not logged yet. */
  today: number | null
  /** Progress toward the target, 0–100. null = no data → empty dashed track. */
  progress: number | null
}
export const FOCUS: Focus[] = [
  { id: 'career', icon: Briefcase, today: null, progress: null },
  { id: 'english', icon: Languages, today: null, progress: null },
  { id: 'fitness', icon: Dumbbell, today: null, progress: null },
  { id: 'growth', icon: Sprout, today: null, progress: null },
]
/** Previously stated nutrition plan (kcal) — shown as a note, not as a live metric. */
export const NUTRITION_PLAN = { normalKcal: 1900, restKcal: 1600 } as const

/* ---------- Group 3 · three pillars (first spans two columns) ---------- */
export type PillarId = 'career' | 'english' | 'health'
export type PillarItemId = 'a' | 'b' | 'c'
export const PILLAR_ITEMS: PillarItemId[] = ['a', 'b', 'c']
export const PILLARS: Array<{ id: PillarId; featured?: boolean }> = [
  { id: 'career', featured: true },
  { id: 'english' },
  { id: 'health' },
]

/* ---------- Group 4 · left navigation ---------- */
export type NavGroupId = 'groupA' | 'groupB'
export type NavId =
  | 'overview'
  | 'planner'
  | 'english'
  | 'fitness'
  | 'university'
  | 'networking'
  | 'finance'
  | 'mindset'
export interface NavItem {
  id: NavId
  icon: LucideIcon
  /** In-page anchor until each area gets its own page. */
  href: `#${string}`
}
export const NAV: Array<{ id: NavGroupId; items: NavItem[] }> = [
  {
    id: 'groupA',
    items: [
      { id: 'overview', icon: LayoutDashboard, href: '#dashboard' },
      { id: 'planner', icon: CalendarCheck, href: '#entry-plan' },
      { id: 'english', icon: BookOpen, href: '#focus-english' },
      { id: 'fitness', icon: Dumbbell, href: '#focus-fitness' },
    ],
  },
  {
    id: 'groupB',
    items: [
      { id: 'university', icon: GraduationCap, href: '#focus-career' },
      { id: 'networking', icon: Network, href: '#pillar-career' },
      { id: 'finance', icon: Wallet, href: '#profile' },
      { id: 'mindset', icon: Sprout, href: '#focus-growth' },
    ],
  },
]

/* ---------- Group 5 · quick entries · Group 6 · quick input modes ---------- */
export type QuickMode = 'plan' | 'learn' | 'reflect'
export const QUICK_MODES: QuickMode[] = ['plan', 'learn', 'reflect']

export type EntryId = 'plan' | 'explore' | 'reflect'
export const ENTRIES: Array<{ id: EntryId; icon: LucideIcon; mode: QuickMode }> = [
  { id: 'plan', icon: CalendarCheck, mode: 'plan' },
  { id: 'explore', icon: Compass, mode: 'learn' },
  { id: 'reflect', icon: RotateCcw, mode: 'reflect' },
]

/* ---------- Group 1 · identity ---------- */
export type IdentitySectionId = 'education' | 'business' | 'traits'
export const IDENTITY_SECTIONS: IdentitySectionId[] = ['education', 'business', 'traits']
export const PERSON = { name: 'Kevin', initial: 'K' } as const

/* ---------- Profile ---------- */
export type ProfileRowId =
  | 'displayName'
  | 'university'
  | 'program'
  | 'studyYear'
  | 'major'
  | 'height'
  | 'weight'
  | 'englishGoal'
  | 'fitnessGoal'
  | 'training'
  | 'businessInterest'
  | 'contentInterest'
  | 'financialAmbition'
  | 'learningPref'
  | 'planningPref'
  | 'values'
  | 'lifestyle'

/** Translated value key under content.profileData.values.* */
export type ProfileValueKey = Exclude<ProfileRowId, 'displayName' | 'university' | 'height'>

export type ProfileValue =
  | { kind: 'literal'; text: string } // proper nouns: same in every language
  | { kind: 'text'; key: ProfileValueKey }
  | { kind: 'measure'; value: number; unit: 'centimeter' | 'kilogram'; reportedAt?: string; key?: ProfileValueKey }

export const PROFILE: Array<{ id: ProfileRowId; value: ProfileValue }> = [
  { id: 'displayName', value: { kind: 'literal', text: 'Kevin' } },
  { id: 'university', value: { kind: 'literal', text: 'HUIT' } },
  { id: 'program', value: { kind: 'text', key: 'program' } },
  { id: 'studyYear', value: { kind: 'text', key: 'studyYear' } },
  { id: 'major', value: { kind: 'text', key: 'major' } },
  { id: 'height', value: { kind: 'measure', value: 170, unit: 'centimeter' } },
  { id: 'weight', value: { kind: 'measure', value: 73, unit: 'kilogram', reportedAt: '2026-10', key: 'weight' } },
  { id: 'englishGoal', value: { kind: 'text', key: 'englishGoal' } },
  { id: 'fitnessGoal', value: { kind: 'text', key: 'fitnessGoal' } },
  { id: 'training', value: { kind: 'text', key: 'training' } },
  { id: 'businessInterest', value: { kind: 'text', key: 'businessInterest' } },
  { id: 'contentInterest', value: { kind: 'text', key: 'contentInterest' } },
  { id: 'financialAmbition', value: { kind: 'text', key: 'financialAmbition' } },
  { id: 'learningPref', value: { kind: 'text', key: 'learningPref' } },
  { id: 'planningPref', value: { kind: 'text', key: 'planningPref' } },
  { id: 'values', value: { kind: 'text', key: 'values' } },
  { id: 'lifestyle', value: { kind: 'text', key: 'lifestyle' } },
]
