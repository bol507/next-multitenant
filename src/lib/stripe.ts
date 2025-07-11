import Stripe from "stripe"

const secret = process.env.STRIPE_SECRET_KEY
if (!secret) {
  throw new Error("STRIPE_SECRET_KEY env var is not set")
}

export const stripe = new Stripe(secret, {
  apiVersion: "2025-03-31.basil", 
})