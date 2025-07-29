import StarPicker from "@/components/start-picker"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { ReviewGetOneOutput } from "@/modules/reviews/types"
import { useTRPC } from "@/trpc/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
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
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const createReview = useMutation(trpc.reviews.create.mutationOptions(
    {
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.reviews.getOne.queryOptions({ productId }))
        setIsPreview(true)
      },
      onError: (error) => {
        toast.error(error.message)
      }
    }
  ))
  const updateReview = useMutation(trpc.reviews.update.mutationOptions(
    {
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.reviews.getOne.queryOptions({ productId }))
        setIsPreview(true)
      },
      onError: (error) => {
        toast.error(error.message)
      }
    }
  ))

  const [isPreview, setIsPreview] = useState(!!initialData)
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      rating: initialData?.rating ?? 0,
      description: initialData?.description ?? "",
    },
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if(initialData) {
      updateReview.mutate({
        reviewId: initialData.id,
        rating: values.rating,
        description: values.description,
      })
    } else {
      createReview.mutate({
        productId,
        rating: values.rating,
        description: values.description,
      })
    }
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
          name="rating"
          render={( { field } ) => (
            <FormItem>
              <FormControl>
                <StarPicker
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isPreview}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
              disabled={createReview.isPending || updateReview.isPending}
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
            className=" w-fit mt-4"
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