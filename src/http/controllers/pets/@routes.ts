import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJwt } from '../../middlewares/verify-jwt'
import { getDetails } from './get-details'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/create', { onRequest: [verifyJwt] }, create)
  app.get('/pet/:petId', getDetails)
}
