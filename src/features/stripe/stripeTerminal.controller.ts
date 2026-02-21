import { Request, Response } from 'express'
import { stripe } from './stripeClient'
import Stripe from 'stripe'

//this connect terminal to stripe account.
export const createConnectionToken = async (req: Request, res: Response) => {
    try {
        const token = await stripe.terminal.connectionTokens.create()
        res.json({ secret: token.secret })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: 'Unable to create the connection token',
        })
    }
}

export const createPaymentIntent = async (
    amount: number,
    currency: string = 'gbp'
) => {
    const intent = await stripe.paymentIntents.create({
        amount,
        currency,
        payment_method_types: ['card_present'],
        capture_method: 'automatic',
    })

    return intent
}

export const capturePaymentIntent = async (req: Request, res: Response) => {
    const intent = await stripe.paymentIntents.capture(
        req.body.payment_intent_id
    )
    res.send(intent)
}

export const webhookHandler = async (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'] as string
    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
        console.log(event)
    } catch (err) {
        console.error(err)
        res.status(400).send('Webhook Error')
        return
    }

    switch (event.type) {
        case 'payment_intent.succeeded':
            console.log('Payment succeeded')
            break

        case 'payment_intent.payment_failed':
            console.log('Payment failed')
            break

        default:
            console.log(`Unhandled event type ${event.type}`)
    }

    res.send()
}
