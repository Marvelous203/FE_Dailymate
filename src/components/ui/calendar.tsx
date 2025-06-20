"use client"


import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import { cn } from "@/lib/utils"

interface CalendarProps {
  mode?: "single" | "range"
  selected?: Date | undefined
  onSelect?: (date: Date | undefined) => void
  className?: string
  modifiers?: any
  modifiersClassNames?: any
  showOutsideDays?: boolean
}

function Calendar({
  className,
  selected,
  onSelect,
  mode = "single",
  ...props
}: CalendarProps) {
  return (
    <div className={cn("p-3", className)}>
      <DatePicker
        selected={selected}
        onChange={(date) => onSelect?.(date)}
        inline
        className="w-full"
        calendarClassName="border rounded-md shadow-sm"
        {...props}
      />
    </div>
  )
}

export { Calendar }
