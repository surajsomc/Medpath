 'use client'

import { useMemo } from "react"
import { Calendar } from "@/components/ui/calendar"

function parseEventDate(d: unknown): Date | null {
  if (d == null) return null
  const s = String(d).trim()
  // Works for ISO strings (with/without time). We just take YYYY-MM-DD.
  const datePart = s.slice(0, 10)
  const [y, m, day] = datePart.split("-").map(Number)
  if (!y || !m || !day) return null
  return new Date(y, m - 1, day)
}

export type CalendarEvent = { date?: unknown; title?: string }

type Props = {
  events: CalendarEvent[]
  year: number
  month: number
}

export function EventsCalendar({ events, year, month }: Props) {
  const monthDate = new Date(year, month - 1, 1)

  const eventKeySet = useMemo(() => {
    const set = new Set<string>()
    for (const e of events) {
      const d = parseEventDate(e.date)
      if (!d) continue
      set.add(d.toDateString())
    }
    return set
  }, [events])

  return (
    <Calendar
      mode="single"
      month={monthDate}
      disableNavigation
      showOutsideDays
      fixedWeeks
      // Override the Calendar's default padding/size via className (tailwind last-wins).
      className="rounded-lg border shadow-sm p-2 [--cell-size:3rem]"
      modifiers={{ event: (date) => eventKeySet.has(date.toDateString()) }}
      modifiersClassNames={{
        // Ensure event highlight matches shadcn's rounded day styling.
        event: "bg-primary-100 text-primary-700 ring-2 ring-primary-400 rounded-md",
      }}
    />
  )
}
