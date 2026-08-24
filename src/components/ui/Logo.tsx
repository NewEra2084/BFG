import type { FC } from "react"

export const Logo: FC = () => {
  return (
    <a
      href="https://github.com/NewEra2084/BFG"
      className="group relative flex max-w-36 flex-col text-4xl leading-7 text-light md:max-w-none md:leading-5"
    >
      <span className="text-light">
        <span className="group-hover:text-[#61dafb] transition-colors duration-600">React</span>-
        <span className="group-hover:text-[#764abc] transition-colors duration-300">Redux</span>
      </span>
      <span className="text-end md:pl-[84%]">Overflow</span>
      <span className="absolute bottom-0 left-0 group-hover:opacity-95 opacity-0 text-start text-xs transition-all duration-300">By NewEra2085</span>
    </a>
  )
}
