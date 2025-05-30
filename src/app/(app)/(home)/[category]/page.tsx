

interface Props {
  params: Promise< {
    category: string
  }>
}

const Page = async({
  params
}: Props) => {
  const { category } = await params
  return (
    <div>
       Catergory: {category}
    </div>
  )
}

export default Page