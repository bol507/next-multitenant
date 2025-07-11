import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/modules/checkout/hooks/use-cart";
import Link from "next/link";


interface Props {
  tenantSlug: string;
  productId: string;
  isPurchased?: boolean;
}

export const CartButton = (props: Props) => {
  const { tenantSlug, productId, isPurchased } = props;
  const cart = useCart(tenantSlug);

  if(isPurchased){
    return (
      <Link prefetch href={`/library/${productId}`} className="flex-1">
        <Button variant="elevated" className="w-full bg-white" aria-label="View this product in the library">
          View in library
        </Button>
      </Link>
    )
  }

  return (
    <Button
      variant="elevated"
      className={cn("flex-1 bg-pink-400", cart.isProductInCart(productId) && "bg-white")}
      onClick={() => cart.toggleProduct(productId)}
    >
      {
        cart.isProductInCart(productId) ? "Remove from cart" : "Add to cart"
      }
    </Button>
  )


}