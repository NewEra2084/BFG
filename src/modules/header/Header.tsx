import { type FC } from "react"
import { Logo } from "@/components/ui/Logo"
import DateSearch from "./components/DateSearch"

type Props = {}

export const Header: FC<Props> = () => {
  return (
    <header className="flex flex-col justify-between gap-12 pt-8 md:flex-row">
      <Logo />
      <DateSearch />
    </header>
  )
}
