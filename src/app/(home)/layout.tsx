import { Footer } from "@/modules/home/components/footer"
import { Navbar } from "@/modules/home/components/navbar"
import { ReactNode } from "react"

interface Props {
  children: ReactNode
}
const Layout = ({children}: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-[#f4f4f0]">
        {children}
      </div>
      
      <Footer />
    </div>
  )
}

export default Layout