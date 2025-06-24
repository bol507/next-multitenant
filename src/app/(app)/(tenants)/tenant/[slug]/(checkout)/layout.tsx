import { Navbar } from "@/modules/checkout/ui/components/navbar"
import { Footer } from "@/modules/tenants/ui/components/footer"
import { ReactNode, Suspense } from "react"

interface LayoutProps {
  children: ReactNode
  params: Promise<{ slug: string }>
}


const Layout = async ({
  children,
  params
}: LayoutProps
) => {
  const { slug } = await params
  
  return (
    <div className="min-h-screen bg-[#f4f4f0] flex flex-col">
      <Navbar slug={slug} />
      <div className="flex-1">
        <div className="mx-auto max-w-(--breakpoint-xl) ">
          {children}
        </div>
      </div>

      <Footer />

    </div>
  )
}

export default Layout