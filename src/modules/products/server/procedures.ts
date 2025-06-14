import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Where } from "payload";
import { z } from "zod";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(z.object({
        category: z.string().nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {}
      if(input.category){
        const categoriesData = await ctx.db.find({
          collection: "categories",
          limit: 1,
          depth: 1,
          pagination: false,
          where: {
            slug: {
              equals: input.category
            }
          }
        })

        const formattedData = categoriesData.docs.map((doc) => ({
              ...doc,
              subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
                ...(doc as Category),
                subcategories: undefined,
              })),
            }))
        
        const subcategoriesSlugs = []
        const parentCategory = formattedData[0]

        if(parentCategory){

          subcategoriesSlugs.push(
            ...parentCategory.subcategories.map((subcategory) => subcategory.slug)
          )
        } // end if
        
        where["category.slug"] = {
          in: [parentCategory.slug, ...subcategoriesSlugs]
        }
      
      } // end if
      
      const data = await ctx.db.find({
        collection: "products",
        depth: 1, // populate "category", "image"
        where
      })
    // await new Promise((resolve) => setTimeout(resolve, 5000))
    return data;
  }),
});
  