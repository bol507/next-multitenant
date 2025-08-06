import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getPayload } from "payload";
import config from "@/payload.config";
import { ExpandedLineItem } from "@/modules/checkout/types";


export async function POST (req: Request) {
  let event : Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      await ( await req.blob() ).text(),
      req.headers.get("stripe-signature") as string,
      process.env.STRIPE_WEBHOOK_SECRET! as string,
      );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    if(!(error instanceof Error)) {
      console.log(error);
    }
    console.error(`❌ Error message: ${errorMessage}`);
    return NextResponse.json(
      { error: `Webhook Error: ${errorMessage}` }, 
      { status: 400 }
    );
  }

  console.log("✅ Successfully received webhook event:", event.id);
  const permittedEvents: string[] = [
    "checkout.session.completed",
    "account.updated",
  ]
  const payload = await getPayload({ config })
  if ( permittedEvents.includes(event.type)) {
    let data;
    try{
      switch (event.type) {
        case "checkout.session.completed":
          data = event.data.object as Stripe.Checkout.Session
          if (!data.metadata?.userId) {
            throw new Error("User ID not found in metadata");
          }
          const user = await payload.findByID({
            collection: "users",
            id: data.metadata.userId,
          })
          if (!user) {
            throw new Error("User not found");
          }
          const expandedSession = await stripe.checkout.sessions.retrieve(
            data.id,
            { expand: ["line_items.data.price.product"] }
          );
          if (!expandedSession.line_items?.data || !expandedSession.line_items.data.length) {
            throw new Error("Line items not found");
          }
          const lineItems = expandedSession.line_items.data as ExpandedLineItem[];
          for (const lineItem of lineItems) {
            await payload.create({
              collection: "orders",
              data: {
                stripeCheckoutSessionId: data.id,
                user: user.id,
                product: lineItem.price.product.metadata.id,
                name: lineItem.price.product.name || "Unknown product",
                
              },
            })
          }
          break;
        case "account.updated":
          data = event.data.object as Stripe.Account
          await payload.update({
            collection: "tenants",
            where: {
              stripeAccountId: {
                equals: data.id,
              }
            },
            data: {
              stripeDetailsSubmitted: data.details_submitted
            }
          })
          break;
        default:
          throw new Error("Unsupported event type : " + event.type);
          
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: `Webhook handler failed` }, 
        { status: 500 }
      );
    }
  }
  return NextResponse.json({ message: "Received"}, { status: 200 });
}