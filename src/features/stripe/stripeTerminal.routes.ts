import { Router } from 'express'
import {
    capturePaymentIntent,
    createConnectionToken,
    // createPaymentIntent,
} from './stripeTerminal.controller'

const router = Router()
router.post('/connection_token', createConnectionToken)
// router.post('/create_payment_intent', createPaymentIntent)
router.post('/capture_payment_intent', capturePaymentIntent)

export default router
