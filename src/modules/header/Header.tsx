import { type FC } from "react"
import { Logo } from "@/components/ui/Logo"
import DateSearch from "./components/DateSearch"
import { motion } from "motion/react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/store/store"
import { changeQType } from "@/store/slices/questionsStore"
import { Button } from "@/components/ui/button"

/**
 * Компонент шапки приложения.
 * Содержит логотип и блок поиска по дате.
 */
export const Header: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { qType } = useSelector(
    (state: RootState) => state.questions
  )
  return (
    <motion.header initial={{y:-100}} animate={{y:0}} className="flex flex-col items-center justify-between gap-4 pt-8 md:flex-row">
      <Logo />
      <Button className={"ml-auto min-w-40"} onClick={()=>dispatch(changeQType())}>{qType === "all" ? "Все" : "React-Redux"}</Button>
      <DateSearch />
    </motion.header>
  )
}
