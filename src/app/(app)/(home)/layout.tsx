import { ReactNode, Suspense } from "react"
import { Footer } from "@/modules/home/ui/components/footer"
import { Navbar } from "@/modules/home/ui/components/navbar"
import { SearchFilters, SearchFiltersLoading } from "@/modules/home/ui/components/search-filters"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

interface Props {
  children: ReactNode
}
const Layout = async ({children}: Props) => {
  
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions())


  return (
    <div  className="flex flex-col min-h-screen">
      <Navbar />
      
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFiltersLoading />}>
           <SearchFilters></SearchFilters>
        </Suspense>
        
      </HydrationBoundary>
      
      <div className="flex-1 bg-[#f4f4f0]">
        {children}
      </div>
      
      <Footer />
    </div>
  )
}

export default Layout