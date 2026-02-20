import { stripe } from './stripeClient'

//stripe location
export const locationService = async () => {
    const location = await stripe.terminal.locations.create({
        display_name: 'HQ',
        address: {
            line1: '137 Shorncliffe road',
            city: 'Folkestone',
            state: 'Kent',
            postal_code: 'CT20 3PB',
            country: 'GB',
        },
    })

    return location
}
