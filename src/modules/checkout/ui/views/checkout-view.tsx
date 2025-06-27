"use client"

import { useTRPC } from "@/trpc/client"
import { useCart } from "../../hooks/use-cart"
import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { useEffect } from "react"

interface CheckoutViewProps {
  tenantSlug: string
}

export const CheckoutView = ({ tenantSlug }: CheckoutViewProps) => {
  const { productIds, clearAllCarts } = useCart(tenantSlug)
  const trpc = useTRPC()
  const { data,error } = useQuery(trpc.checkout.getProducts.queryOptions({
    ids: productIds
  }))
  useEffect(()=>{
    if(error?.data?.code === "NOT_FOUND") {
      clearAllCarts()
      toast.warning("Invalid products found, cart cleared")
    }
  },[error,clearAllCarts])
  return (
    <div className="lg:pt-16 pt-4 px-4 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16">

        <div className="lg:col-span-4">
          <div className="border rounded-md overflow-hidden bg-white">
            1:30
          </div>
        </div>
        <div className="lg:col-span-3">
          checkout sidebar
        </div>

      </div>
      {JSON.stringify(data, null, 2)}
    </div>
  )
}