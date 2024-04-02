import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/login', authenticate)
}
