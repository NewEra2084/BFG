import type { FC } from "react"

export const Logo: FC = () => {
  return (
    <h1 className="flex max-w-36 flex-col text-4xl leading-7 text-light md:max-w-none md:leading-5">
      <span className="text-light/80">React-Redux</span>{" "}
      <span className="text-end md:pl-[84%]">Overflow</span>
    </h1>
  )
}
