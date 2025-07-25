import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { ReviewGetOneOutput } from "@/modules/reviews/types"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface Props {
  productId: string
  initialData?: ReviewGetOneOutput
}

const formSchema = z.object({
  rating: z.number().min(1,{ message: "Rating must be greater than 1"}).max(5,{ message: "Rating must be less than 5"}),
  description: z.string().min(1,{ message: "Description must be greater than 1"}).max(250,{ message: "Description must be less than 250"}),
})

export const ReviewForm = ({ productId, initialData }: Props) => {
  const [isPreview, setIsPreview] = useState(!!initialData)
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      rating: initialData?.rating ?? 0,
      description: initialData?.description ?? "",
    }
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form 
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <p className="font-medium">
          {
            isPreview ? "Your rating: " : " Liked it? Give it a rating:"
          }
        </p>
        <FormField
          control={form.control}
          name="description"
          render={( field ) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Write a review"
                  disabled={isPreview}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {
          !isPreview && (
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="bg-black text-white hover:bg-pink-400 hover:text-primary w-fit"
              size="lg"
              variant="elevated"
            >
              { initialData ? "Update review" : "Post review" }
            </Button>
          )
        }
      </form>
      {
        isPreview && (
          <Button
            onClick={() => setIsPreview(false)}
            className=" w-fit"
            size="lg"
            variant="elevated"
            type="button"
          >
            Edit
          </Button>
        )
      }
    </Form >
  )
}