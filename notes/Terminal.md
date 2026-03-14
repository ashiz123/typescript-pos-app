Terminal adding process

Terminal create steps
1. Owner authenticate and login with business with multi token acess
2. With the token contains businessId 
   POST - http://localhost:3000/api/terminal/create
   body - {
       "name" : "Terminal 101",
       "note" : "Terminal creation, note to owner"
   }
  header - Authorization Bearer
  const {businessId, userId, email} = req.user
3. User get the response of new terminal
  { businessId, -id as terminalId, ownerId}
4. Terminal create successfully


Terminal approve process
1. Admin receives the terminal request
2. Payment check first.
3. POST terminal approve - http://localhost:3000/api/terminal/approve
   body - {
       "businessId" : "698db24101683ab4bb6196ce",
       "terminalId" : "69b3fb024b449f56a0c2d311"
   }
   header - Authorization beared (admin authorization token)
4. The notification is sent to the owner
5. Terminal approved
