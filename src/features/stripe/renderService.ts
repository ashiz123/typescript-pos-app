import { stripe } from './stripeClient'

//handle what get display or printed
export const renderService = async (
    registrationCode: string,
    locationId: string
) => {
    const render = await stripe.terminal.readers.create({
        registration_code: registrationCode,
        label: 'Front desk reader',
        location: locationId,
    })

    return render
}
