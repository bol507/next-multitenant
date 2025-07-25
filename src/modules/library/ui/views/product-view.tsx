"use client"

import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { ReviewSidebar } from "../components/review-sidebar"

interface Props {
  productId: string
}

export const ProductView = ({ productId }: Props) => {

  const trpc = useTRPC()

  const { data: product } = useSuspenseQuery(trpc.library.getOne.queryOptions({ 
    productId 
  }))

  return (
    <div className="min-h-screen bg-white">
      <nav className="p-4 w-full border-b bg-[#f4f4f0]">
        <Link prefetch href="/" className="flex items-center gap-2">
          <ArrowLeftIcon className="size-4" />
          <span className="font-medium text">Back to library</span>
        </Link>
      </nav>
      <header className="bg-[#f4f4f0] py-8 border-b">
        <div className="mx-auto px-4 max-w-7xl lg:px-12">
          <h1 className="text-[40px] font-medium">{ product?.name }</h1>
        </div>
      </header>
      <section className="max-w-(--breakpoint-xl) mx-auto px-4 py-10 lg:px-12">
        <div className="grip grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16">

          <div className="lg:col-span-2">
            <div className="p-4 bg-white rounded-md border gap-4">
              <ReviewSidebar productId={productId} />
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="font-medium italic text-muted-foreground">
              No special content
            </p>
          </div>

        </div>
      </section>
    </div>
  )
} 