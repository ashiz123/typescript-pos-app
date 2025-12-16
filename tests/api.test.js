import request from 'supertest'
import app from '../dist/app.js'

test('app is defined', () => {
    expect(app).toBeDefined()
})

describe('GET /', () => {
    it('returns 200', async () => {
        const res = await request(app).get('/api/health')
        expect(res.status).toBe(200)
    })
})
