"use client"

import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import Image from "next/image"


interface Props {
  productId: string
  tenantSlug: string
}

export const ProductView = (props: Props) => {
  const { productId, tenantSlug } = props
  const trpc = useTRPC()
  const { data: product } = useSuspenseQuery(trpc.products.getOne.queryOptions({ id: productId }))
  return (
    <div className="px-4 lg:px-12 py-16">
      <div className="border rounded-sm bg-white overflow-hidden">
        <div className="relative aspect-[3.9] border-b">
          <Image
            src={product?.image?.url || "/placeholder.webp"}
            alt={product?.name}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
} 