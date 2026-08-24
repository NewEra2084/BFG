import { type FC } from "react"
import { Logo } from "@/components/ui/Logo"
import DateSearch from "./components/DateSearch"
import { motion } from "motion/react"

/**
 * Компонент шапки приложения.
 * Содержит логотип и блок поиска по дате.
 */
export const Header: FC = () => {
  return (
    <motion.header initial={{y:-100}} animate={{y:0}} className="flex flex-col justify-between gap-12 pt-8 md:flex-row">
      <Logo />
      <DateSearch />
    </motion.header>
  )
}
