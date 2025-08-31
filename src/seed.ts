import { getPayload } from "payload"
import config from "@payload-config"
import { stripe } from "./lib/stripe";

const categories = [
  {
    name: "All",
    slug: "all",
  },
  { 
    name: "Business & Money",
    slug: "business-money",
    color: "#FFB347",
    subcategories:[
      { 
        name: "Accounting",
        slug: "accounting",
      },
      {
        name: "Entrepreneurship",
        slug: "entrepreneurship",
      }
    ]
  },
]

const seed = async () => {
  const payload = await getPayload({config});
  const adminAccount = await stripe.accounts.create({})

  // Create admin tenant
  const adminTenant = await payload.create({
    collection: "tenants",
    data: {
      name: "Admin",
      slug: "admin",
      stripeAccountId: adminAccount.id,
    },
  })  
/*
  await payload.create({
    collection: "users",
    data: {
      email: "admin@demo.com",
      password: "demo",
      roles: ["super-admin"],
      username: "admin",
      tenants: [
        {
          tenant: adminTenant.id
        }
      ]
    },
  });
*/
  for (const category of categories) {
    const parentCategory = await payload.create({
      collection: "categories",
      data: {
        name: category.name,
        slug: category.slug,
        color: category.color,
        parent: null,
      },
    })

    for (const subcategory of category.subcategories || []) {
      await payload.create({
        collection: "categories",
        data: {
          name: subcategory.name,
          slug: subcategory.slug,
          parent: parentCategory.id,
        },
      })
    }
  } 
}
const runSeed = async () => {
  await seed();
  process.exit(0);
}

runSeed().catch(console.error);