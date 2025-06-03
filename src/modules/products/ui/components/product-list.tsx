"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

interface Props {
  category?: string
}

export const ProductList = ({ category }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.products.getMany.queryOptions({category}));
  return (
    <div>
      {JSON.stringify(data, null, 2)}
    </div>
  )
}

export const ProductListSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="w-full h-40 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="w-full h-40 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="w-full h-40 bg-gray-200 rounded-lg animate-pulse"></div>
        
      </div>
    </div>
  );
}