//init stripe SDK
import Stripe from 'stripe'

const secretKey = process.env.STRIPE_SECRET_KEYS
if (!secretKey) throw new Error('STRIPE_SECRET_KEYS is required')

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEYS!, {
    apiVersion: '2026-01-28.clover',
})
