export const userActivationHtml = (
    email: string,
    phone: string,
    role: string,
    token: string,
    businessId: string
) => {
    return `
Hello,

Welcome to Ashiz POS system.
You have been added as a ${role}.
Please click the link and create your password to activate the account.

Created by:
Email : ${email}
Phone: ${phone}

Activate this account by clicking the link
http://localhost:3000/api/userActivation/${businessId}/${token}

If you have any questions, please contact the creator directly.
Regards,
POS System
`
}
