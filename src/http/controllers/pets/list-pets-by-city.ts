import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeListPetsFromUniqueCityUseCase } from '../../../use-cases/factories/make-list-pets-from-unique-city-use-case'

export async function listPetsByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getDetailsParamsSchema = z.object({
    city: z.string(),
  })

  const { city } = getDetailsParamsSchema.parse(request.params)

  const getPetDetailsUseCase = makeListPetsFromUniqueCityUseCase()

  const { pets } = await getPetDetailsUseCase.execute({ city })

  return reply.status(200).send(pets)
}
