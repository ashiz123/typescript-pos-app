export default async function globalTeardown() {
    console.log('Global teardown running...')

    // Example: run migrations
    try {
        console.log('Database migrations done')
    } catch (err) {
        console.error('Migration failed', err)
        process.exit(1)
    }

    // No beforeAll, afterAll, test, or expect here!
}
