import { type FC } from "react"
import { Logo } from "@/components/ui/Logo"
import DateSearch from "./components/DateSearch"

/**
 * Компонент шапки приложения.
 * Содержит логотип и блок поиска по дате.
 */
export const Header: FC = () => {
  return (
    <header className="flex flex-col justify-between gap-12 pt-8 md:flex-row">
      <Logo />
      <DateSearch />
    </header>
  )
}
