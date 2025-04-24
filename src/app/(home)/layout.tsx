import { Navbar } from "@/modules/home/components/navbar"
import { ReactNode } from "react"

interface Props {
  children: ReactNode
}
const Layout = ({children}: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {children}
    </div>
  )
}

export default Layout