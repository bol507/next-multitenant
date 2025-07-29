"use client"

import { cn } from "@/lib/utils"
import { StarIcon } from "lucide-react"
import { useState } from "react"

interface StarPickerProps {
  value?: number
  onChange?: (value: number) => void
  disabled?: boolean
  className?: string
} 

function StarPicker({ value, onChange, disabled, className }: StarPickerProps) {
  const [hoverValue, setHoverValue] = useState(0)

  const handleChange = (value: number) => {
    onChange?.(value)
  }

  return (
    <div
      className={cn(
        "flex items-center",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      {
        [...Array(5)].map((star) => (
          <button
            key={star}
            type="button"
            className={
              cn(
                "p-0.5 hover:scale-110 transition",
                !disabled && "cursor-pointer",
              )
            }
            onClick={ () => handleChange(star) }
            onMouseEnter={ () => setHoverValue(star)}
            onMouseLeave={ () => setHoverValue(0)}
          >
            <StarIcon
              className={
                cn(
                  "size-5",
                  (hoverValue || value!) >= star
                    ? "fill-black stroke-black"
                    : "stroke-black"
                )}
            />
          </button>
        )
      )}
    </div>
  )
}

export default StarPicker