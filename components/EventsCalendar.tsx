const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function parseEventDate(d: unknown): { y: number; m: number; day: number } | null {
  if (d == null) return null
  const s = String(d).trim()
  const datePart = s.includes('T') ? s.slice(0, 10) : s.slice(0, 10)
  const [y, m, day] = datePart.split('-').map(Number)
  if (!y || !m || !day) return null
  return { y, m, day }
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate()
}

function getFirstWeekday(year: number, month: number): number {
  return new Date(year, month - 1, 1).getDay()
}

export type CalendarEvent = { date?: unknown; title?: string }

type Props = {
  events: CalendarEvent[]
  year: number
  month: number
}

export function EventsCalendar({ events, year, month }: Props) {
  const daysInMonth = getDaysInMonth(year, month)
  const firstWeekday = getFirstWeekday(year, month)

  const eventDays = new Set<number>()
  for (const e of events) {
    const p = parseEventDate(e.date)
    if (p && p.y === year && p.m === month) eventDays.add(p.day)
  }

  const emptyCells = Array.from({ length: firstWeekday }, (_, i) => (
    <div key={`empty-${i}`} className="aspect-square p-0.5" />
  ))
  const dayCells = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1
    const hasEvent = eventDays.has(day)
    return (
      <div
        key={day}
        className={`aspect-square p-0.5 flex items-center justify-center rounded-md text-xs
          ${hasEvent ? 'bg-primary-100 text-primary-700 font-semibold ring-2 ring-primary-400' : 'text-gray-700'}`}
      >
        {day}
      </div>
    )
  })
  const allCells = [...emptyCells, ...dayCells]

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
      <h3 className="text-base font-semibold text-gray-900 mb-2">
        {MONTHS[month - 1]} {year}
      </h3>
      <div className="grid grid-cols-7 gap-0.5">
        {WEEKDAYS.map((d) => (
          <div key={d} className="p-0.5 text-center text-[11px] font-medium text-gray-500">
            {d}
          </div>
        ))}
        {allCells}
      </div>
    </div>
  )
}
