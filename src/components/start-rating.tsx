import { cn } from "@/lib/utils"
import { StarIcon } from "lucide-react"


const MAX_RATING = 5
const MIN_RATING = 1

interface StarRatingProps {
  rating: number
  className?: string
  iconClassName?: string
  text?: string
}

export const StarRating = (props:StarRatingProps) => {
  const { rating, className, iconClassName, text } = props
  const safeRating = Math.max(MIN_RATING, Math.min(MAX_RATING, rating))
  return (
    <div className={cn("flex items-center gap-x-1", className)}>
      {
        Array.from({ length: MAX_RATING }, (_, index) => (
          <StarIcon
            key={index}
            className={cn("size-4.5", index < safeRating ? "fill-black" : "", iconClassName)}
          />
        ))
      }
      {
        text && (
          <p className="text-sm font-medium">{text}</p>
        )
      }
    </div>
  )
}