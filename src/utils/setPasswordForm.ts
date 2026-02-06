export const setPasswordForm = (token: string, businessId: string) => {
    return `
    <h2>Set Your Password</h2>
    <form method="POST" action="/api/userActivation">
     <input type="hidden" name="businessId" value="${businessId}" />
    <input type="hidden" name="token" value="${token}" />
    <input type="password" name="password" placeholder="Password" required />
    <input type="password" name="confirmPassword" placeholder="Confirm Password" required />
    <button type="submit">Set Password</button>
    </form>
  `
}
