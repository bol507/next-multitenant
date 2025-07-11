import { Media, Tenant } from "@/payload-types";
import { protectedProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";
import { DEFAULT_LIMIT } from "@/constants";

export const libraryRouter = createTRPCRouter({
  getMany: protectedProcedure
    .input(z.object({
        cursor: z.number().default(1),
        limit: z.number().default(DEFAULT_LIMIT),
      })
    )
    .query(async ({ ctx, input }) => {
      // First get all unique product IDs for the user
      const allOrdersData = await ctx.db.find({
        collection: "orders",
        depth: 0, // we want to get only the product
        pagination: false,
        where:{
          user:{
            equals: ctx.session.user.id
          }
        }
      });

      //get unique product ids to avoid duplicates
      const uniqueProductIds = [...new Set(allOrdersData.docs.map((order) => order.product))];
      // Apply pagination to the products query
      const productData = await ctx.db.find({
        collection: "products",
        depth:2,
        page: input.cursor,
        limit: input.limit,
        where: {
          id: {
            in: uniqueProductIds,
          }
        }
      });

      return {
        ...productData,
        docs: productData.docs.map((doc) => ({
          ...doc,
          image: doc.image as Media,
          tenant: doc.tenant as Tenant & { image: Media | null },
        })),
      }
  }),
});
  