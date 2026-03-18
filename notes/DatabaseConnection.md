1. Created the connection using the mongoose
2. Use singleton of tsyringe to create the the single instance of DB
3. Registered the container as TOKENS.DATABASE_CONNECTION,
4. Store the state of mongoose.connection
5. Initially there is no connection so the connection is empty
6. But later mongoose.connection is about live connection, it get connection
when i connect to Db

const db = container.resolve(Database)
await db.connect()

This file named dbConnect.container.ts is added inside contianer.ts which is central file for container

and that container is added in index.ts
Make sure that app.ts await the container to finish so use await and import app.ts rather than directly adding to top level file


Stage	File	Action	Result
Stage 1	dbConnect.container.ts	Register useFactory	Container knows where to look.
Stage 2	dbConnect.container.ts	await db.connect()	The "Pipe" is filled with data.
Stage 3	index.ts	await import('./app.js')	The "Gate" opens for the rest of the app.
Stage 4	terminal.route.ts	container.resolve(...)	Service is built and grabs the live connection.
