import type { CollectionConfig } from 'payload'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  admin: {
    useAsTitle: 'slug',
  },
  auth: true,
  fields: [
    {
      name:"name",
      type:"text",
      required:true,
      label: "Store Name",
      admin: {
        description: "The name of the stor (e.g. Funroad Store)",
      },
    },
    {
      name:"slug",
      type:"text",
      index: true,
      required:true,
      unique:true,
      admin: {
        description: "This is the subdomain of the store (e.g. [slug].funroad.com)",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media"
    },
    {
      name: "stripeAccountId",
      type: "text",
      required: true,
      admin: {
        readOnly: true,
        description: "The Stripe account ID for this tenant",
      },
    }, 
    {
      name: "stripeDetailsSubmitted",
      type: "checkbox",
      admin: {
        readOnly: true,
        description: "you cannot create products until you submit your stripe details",
      },
    } 
     
  ],
}
