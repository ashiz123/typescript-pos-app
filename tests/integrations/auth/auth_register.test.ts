import request from 'supertest'
import { describe, it, expect } from 'vitest'
import app from '../../../src/config/app'

describe.sequential('User registered Integration test', () => {
    const user = {
        email: 'ramesh@gmail.com',
        name: 'ramesh thapa',
        phone: '23333322222',
        password: 'ramesh123',
    }

    it('should create new user ', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send(user)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('_id')
    })

    it('should display user already registered', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send(user)
        expect(response.status).toBe(409)
        expect(response.body.error).toBe('User already exist')
    })
})
