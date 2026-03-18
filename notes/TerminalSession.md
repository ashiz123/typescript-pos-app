Think about

1. order should have record of terminalSessionId rather terminalId, sessionId
2. When user logged in the terminal. dont allow that terminal to logged in again until session not logged out.
3. When user logged out terminal , the order should not be created. 
3. Automatically session logged out

working on authHandler and terminalSessionService
//if user logger out. than user should not able to order with that token.
