"use client"

import { CustomCategory } from "@/app/(app)/(home)/types"
import { Input } from "@/components/ui/input"
import { ListFilter, SearchIcon } from "lucide-react"
import { CategoriesSidebar } from "./categories-sidebar"
import { useState } from "react"
import { Button } from "@/components/ui/button"


interface Props {
  disabled?: boolean
  data: CustomCategory[] 
}

export const  SearchInput = ({
  disabled,
  data

}: Props) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)

  return (
    <div className="flex items-center gap-2 w-full">
      <CategoriesSidebar open={isSideBarOpen} onOpenChange={setIsSideBarOpen} data={data} />
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500"></SearchIcon>
        <Input className="pl-8" placeholder="Search products" disabled={disabled} />
      </div>
      <Button 
        variant="elevated" 
        className="size-12 shrink-0 flex lg:hidden"
        onClick={() => setIsSideBarOpen(true)}
      >
        <ListFilter  />
      </Button>
      {/* TODO: add library button */}
    </div>
  )
}