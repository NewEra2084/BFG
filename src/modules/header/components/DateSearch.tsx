import type { FC } from "react"
import { DatePicker } from "./DatePicker"
import { Search } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { updateChosenDate } from "@/store/slices/datesStore"
import { Button } from "@/components/ui/button"

const DateSearch: FC = () => {
  const dispatch = useDispatch()
  const { newDate, chosenDate } = useSelector((state: RootState) => state.dates)

  const handleChangeDate = () => {
    dispatch(updateChosenDate())
  }

  return (
    <div className="flex items-center justify-center gap-4">
      <DatePicker />
      {newDate !== chosenDate && (
        <Button
          className={"p-4"}
          onClick={() => {
            if (newDate === chosenDate) return
            handleChangeDate()
          }}
        >
          <span>Поиск</span>
          <Search />
        </Button>
      )}
    </div>
  )
}

export default DateSearch
