import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { setNewDate } from "@/store/slices/datesStore"

export const DatePicker = () => {
  const dispatch = useDispatch()
  const { newDate } = useSelector((state: RootState) => state.dates)

  const handleChooseDate = (date: Date) => {
    dispatch(setNewDate(date.toISOString()))
  }

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            data-empty={!newDate}
            className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal"
          />
        }
      >
        <CalendarIcon />
        {newDate ? (
          format(new Date(newDate), "PPP")
        ) : (
          <span>Выберите дату</span>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          required
          selected={new Date(newDate)}
          onSelect={(date) => handleChooseDate(date)}
        />
      </PopoverContent>
    </Popover>
  )
}
