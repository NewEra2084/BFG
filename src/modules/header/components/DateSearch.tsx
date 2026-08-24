import { type FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { motion, AnimatePresence } from "motion/react"
import type { RootState } from "@/store/store"
import { updateChosenDate } from "@/store/slices/datesStore"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { DatePicker } from "./DatePicker"

/**
 * Компонент поиска по дате.
 * Содержит DatePicker и анимированную кнопку поиска.
 * Кнопка появляется при изменении даты и скрывается после обновления.
 */
const DateSearch: FC = () => {
  const dispatch = useDispatch()
  const { newDate, chosenDate } = useSelector((state: RootState) => state.dates)

  const isSearchVisible = newDate !== chosenDate

  const handleChangeDate = () => {
    dispatch(updateChosenDate())
  }

  return (
    <div className="flex items-center justify-center gap-4 overflow-hidden">
      <AnimatePresence mode="popLayout">
        {/* DatePicker сдвигается влево при появлении кнопки */}
        <motion.div
          key="datePicker"
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          animate={{ x: isSearchVisible ? 0 : 0 }}
        >
          <DatePicker />
        </motion.div>

        {/* Анимированная кнопка поиска: выезжает слева с появлением */}
        {isSearchVisible && (
          <motion.div
            key="searchButton"
            initial={{ opacity: 0, x: -20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Button
              className="p-4"
              onClick={() => {
                if (newDate === chosenDate) return
                handleChangeDate()
              }}
            >
              <span>Поиск</span>
              <Search />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DateSearch
