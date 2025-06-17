"use client"

import { generateTenantURL } from "@/lib/utils"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"

interface NavbarProps {
  slug: string
}

export const Navbar = ({ slug }: NavbarProps) => {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.tenants.getOne.queryOptions({
    slug
  }))
  return(
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-2">
        <Link 
          href={generateTenantURL(slug)}
          className="flex items-center gap-2 text-xl"
        >
          {
            data?.image?.url && (
              <Image
                src={data.image?.url}
                alt={slug}
                className="rounded-full border shrink-0 size-[32px]"
                width={32}
                height={32}
              />
            )
          }
          <p className="text-xl">{data?.name}</p>
        </Link>
      </div>


    </nav>
  )
}

export const NavbarSkeleton = () => {
  return(
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-2">
        <p className="text-xl animate-pulse"></p>
      </div>
      {/* TODO: skeleton for checkout button */}

    </nav>
  )
}