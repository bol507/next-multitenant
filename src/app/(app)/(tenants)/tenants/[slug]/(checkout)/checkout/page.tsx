import { CheckoutView } from "@/modules/checkout/ui/views/checkout-view"

interface pageProps {
  params: Promise<{ slug: string }>
}

const Page = async ({ params }: pageProps) => {
  const { slug } = await params
  return <CheckoutView tenantSlug={slug} />
}

export default Page 