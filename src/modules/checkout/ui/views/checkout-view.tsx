"use client"

interface CheckoutViewProps {
  tenantSlug: string
}

export const CheckoutView = ({ tenantSlug }: CheckoutViewProps) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl">Checkout</h1>
      <p className="text-xl">
        Checkout for {tenantSlug}
      </p>
    </div>
  )
}