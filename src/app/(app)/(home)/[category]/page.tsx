import { caller } from "@/trpc/server"


interface Props {
  params: Promise< {
    category: string
  }>
}

const Page = async({
  params
}: Props) => {
  const { category } = await params
  const products = await caller.products.getMany()
  return (
    <div>
       Catergory: {category}
       <br />
       <pre>{JSON.stringify(products, null, 2)}</pre>
    </div>
  )
}

export default Page