"use client"

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { cn } from "@/lib/utils"
import { ComponentProps } from "react"

interface CalendarProps {
  mode?: "single" | "range"
  selected?: Date | undefined
  onSelect?: (date: Date | undefined) => void
  className?: string
}

type DatePickerProps = ComponentProps<typeof DatePicker>

function Calendar({
  className,
  selected,
  onSelect,
  mode,
  ...props
}: CalendarProps) {
  return (
    <div className={cn("p-3", className)}>
      <DatePicker
        selected={selected as Date | null}
        onChange={(date: Date | null) => onSelect?.(date || undefined)}
        inline
        className="w-full"
        calendarClassName="border rounded-md shadow-sm"
      />
    </div>
  )
}

export { Calendar }
