//This is always for next day. 


Working on admin request . This is to hold all the request comes from the owner. There can be numbers of owners who send the request. The admin handles the request prioritizely. 
For that 

AdminRequest feature is created.
. it hold the request , where the request from , what priority been set.

Terminal Creation
1. Owner create the terminal with status pending
2. Admin recives the notification through email and db(Admin request ) as per the owner request
3. When the admin sees the notification, He accept terminal and notify to owner. For that he accept the request from owner. 
4. than Terminal pending status be accept and Admin request approved. this means terminal accepted by admin approving
5. Notification or request should be displayed by priority.


Todo:
Create Terminal
1. set up Admin Request Service and repo
2. When the terminal create add the request to that collection
3. Email the admin as well 

Accept Terminal
1. Admin can only view the request coming by owner
2. Via prioritize, Admin can see the request, do approve 
3. Check the payment method , if possible.

Assign User to Terminal(only the user associate with that business in userBusiness)
1. user of the business can login only to that terminal
2. Each terminal have their own report (order by terminalId) - add terminalId in order collection
3. Owner should know , who access the terminal, who makes the order.
