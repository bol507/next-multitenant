"use client";

import { StarRating } from "@/components/start-rating";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatCurrency, generateTenantURL } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CheckIcon, LinkIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import dynamic from "next/dynamic";
import { toast } from "sonner";

const CartButton = dynamic(
  () => import("../components/cart-button").then((mod) => mod.CartButton),
  { 
    ssr: false,
    loading: () => <Button disabled className="flex-1 bg-pink-400">Add to cart</Button>
  }
);

interface Props {
  productId: string;
  tenantSlug: string;
}

export const ProductView = (props: Props) => {
  const { productId, tenantSlug } = props;

  const trpc = useTRPC();
  const { data: product } = useSuspenseQuery(
    trpc.products.getOne.queryOptions({ id: productId })
  );

  const [isCopied, setIsCopied] = useState(false);
   
  return (
    <div className="px-4 lg:px-12 py-16">
      <div className="border rounded-sm bg-white overflow-hidden">
        <div className="relative aspect-[3.9] border-b">
          <Image
            src={product?.image?.url || "/placeholder.webp"}
            alt={product?.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-6">
          <div className="col-span-4">
            <div className="p-6">
              <h1 className="text-4xl font-medium">{product?.name}</h1>
            </div>
            <div className="border-y flex">
              <div className="px-6 py-4 flex items-center justify-center border-r">
                <div className="relative px-2 py-1 border bg-pink-400 w-fit">
                  <p className="text-base font-medium">
                    {formatCurrency(product?.price)}
                  </p>
                </div>
              </div>

              <div className="px-6 py-4 flex items-center justify-center lg:border-r">
                <Link
                  href={generateTenantURL(tenantSlug)}
                  className="flex items-center gap-2"
                >
                  {product?.tenant?.image?.url && (
                    <Image
                      src={product?.tenant?.image?.url} //https://picsum.photos/1280/720
                      alt={product?.tenant?.name}
                      width={20}
                      height={20}
                      className="rounded-full border shrink-0 size-[20px]"
                    />
                  )}
                  <p className="text-base font-medium underline ">
                    {product?.tenant?.name}
                  </p>
                </Link>
              </div>

              <div className="hidden lg:flex px-6 py-4 items-center justify-center">
                <div className="flex items-center gap-2">
                  <StarRating 
                    rating={product?.reviewRating}
                    iconClassName="size-4" 
                  />
                  <p className="text-base font-medium">
                  {product?.reviewCount} ratings
                </p>
                </div>
              </div>
            </div>
            
            <div className="block lg:hidden px-6 py-4 border-b items-center justify-center">
              <div className="flex items-center gap-2">
                <StarRating 
                  rating={product?.reviewRating}
                  iconClassName="size-4" 
                />
                <p className="text-base font-medium">
                  {product?.reviewCount} ratings
                </p>
              </div>
            </div>


            <div className="p-6">
              {
                product?.description ? (
                  <p>{product?.description}</p>
                ):(
                  <p className="text-medium text-muted-foreground italic">
                    No description available
                  </p>
                )
              }
            </div>

          </div>

          <div className="col-span-2">
            <div className="border-t lg:border-t-0 lg:border-l h-full">
              <div className="flex flex-col gap-4 p-6 border-b">
                <div className="flex flex-row items-center gap-2">
                
                  <CartButton
                    isPurchased={product.isPurchased}
                    tenantSlug={tenantSlug} 
                    productId={product?.id} 
                  />

                  <Button
                    variant="elevated"
                    className="size-12"
                    disabled={isCopied}
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href)
                      toast.success("Copied to clipboard")
                      setIsCopied(true)
                      setTimeout(() => setIsCopied(false), 2000)
                    }}
                  >
                    { 
                      isCopied ? <CheckIcon /> : <LinkIcon />
                    }
                    
                  </Button>
                </div>
                <p className="text-center font-medium">
                  {
                    product?.refundPolicy === 'no refund' ? "No refunds" : `${product?.refundPolicy} money back guarantee`
                  }
                </p>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium">
                    Ratings
                  </h3>
                  <div className="flex items-center gap-x-1 font-medium">
                    <StarIcon className="size-3.5 fill-black" />
                    <p>({product?.reviewRating})</p>
                    <p className='text-base'>
                      {product?.reviewCount} ratings
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-[auto_1fr_auto] gap-3 mt-4">
                  {
                    [5, 4, 3, 2, 1].map((stars) => (
                      <Fragment key={stars}>
                        <div className="font-medium">
                          {stars} {stars === 1 ? "star" : "stars"}
                        </div>
                        <Progress
                          value={product?.ratingDistribution[stars]}
                          className="h-[1lh]"
                        />
                        <div className="font-medium">
                          {product?.ratingDistribution[stars]}%
                        </div>
                      </Fragment>
                    ))
                  }
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
