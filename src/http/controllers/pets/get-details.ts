import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetPetDetailsUseCase } from '../../../use-cases/factories/make-get-pet-details-use-case'

export async function getDetails(request: FastifyRequest, reply: FastifyReply) {
  const getDetailsParamsSchema = z.object({
    petId: z.string().cuid(),
  })

  const { petId } = getDetailsParamsSchema.parse(request.params)

  const getPetDetailsUseCase = makeGetPetDetailsUseCase()

  const { pet } = await getPetDetailsUseCase.execute({ id: petId })

  return reply.status(200).send(pet)
}
