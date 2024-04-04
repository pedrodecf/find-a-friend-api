import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJwt } from '../../middlewares/verify-jwt'
import { getDetails } from './get-details'
import { listPetsByCity } from './list-pets-by-city'
import { search } from './search'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/create', { onRequest: [verifyJwt] }, create)
  app.get('/pet/:petId', getDetails)
  app.get('/pets/:city', listPetsByCity)
  app.post('/pets/:city', search)
}
