import { type FC } from "react"
import { DatePicker } from "./components/DatePicker"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

type Props = {}

export const Header: FC<Props> = () => {
  return (
    <header className="flex flex-col justify-between gap-12 pt-8 md:flex-row">
      <h1 className="flex max-w-36 flex-col text-4xl leading-7 text-light md:max-w-none md:leading-5">
        <span className="text-light/80">React-Redux</span>{" "}
        <span className="text-end md:pl-[84%]">Overflow</span>
      </h1>
      <div className="flex items-center gap-4 justify-center">
        <DatePicker />
        <Button className={"p-4"}><span>Поиск</span><Search/></Button>
      </div>
    </header>
  )
}
