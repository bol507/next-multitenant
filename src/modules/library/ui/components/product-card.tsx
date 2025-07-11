
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


interface IProductCardProps {
  id: string;
  name: string;
  imageUrl?: string | null;
  tenantSlug: string;
  tenantImageUrl?: string | null;
  reviewRating: number;
  reviewCount: number;
}

export const ProductCard  = (props: IProductCardProps) => {
  const { id, name, imageUrl, tenantSlug, tenantImageUrl, reviewRating, reviewCount } = props;
  
  return (
    <Link href={`/library/${id}`}>
      <div className="hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-shadow border rounded-md bg-white overflow-hidden h-full flex flex-col">
        <div className="relative aspect-square">
          <Image 
            src={imageUrl || "/placeholder.webp"} //https://picsum.photos/1280/720
            alt={name} 
            fill
            className="object-cover" 
          />
          </div>
          <div className="p-4 border-y flex flex-col gap-3 flex-1">
            <h2 className="text-lg font-medium line-clamp-4">{name}</h2>
            {/* TODO: redirecto to user shop */}
            <div className="flex items-center gap-2">
              {
                tenantImageUrl && (
                  <Image 
                    src={tenantImageUrl} //https://picsum.photos/1280/720
                    alt={tenantSlug} 
                    width={16}
                    height={16}
                    className="rounded-full border shrink-0 size-[16px]"
                  />
                )
              }
              <p className="text-sm underline font-medium">{tenantSlug}</p>
            </div>
            {
              reviewCount > 0 && (
                <div className="flex items-center gap-1">
                  <StarIcon className="size-3.5 fill-black"/>
                  <p className="text-sm font-medium">{reviewRating} ({reviewCount})</p>
                </div>
              )
            }
        </div>
      </div>
    </Link>
  );
};  

export const ProductCardSkeleton = () => {
  return (
   <div className="border rounded-md bg-white overflow-hidden h-full flex flex-col">
+      <div className="relative aspect-square bg-neutral-200 animate-pulse"></div>
+      <div className="p-4 border-y flex flex-col gap-3 flex-1">
+        <div className="h-6 bg-neutral-200 rounded animate-pulse"></div>
+        <div className="h-4 bg-neutral-200 rounded animate-pulse w-2/3"></div>
+        <div className="h-4 bg-neutral-200 rounded animate-pulse w-1/2"></div>
+      </div>
+    </div>
  );
}