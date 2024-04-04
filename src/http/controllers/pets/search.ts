import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchPetsUseCase } from '../../../use-cases/factories/make-search-pets-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchParamsSchema = z.object({
    city: z.string(),
  })

  const searchBodySchema = z.object({
    type: z
      .literal('DOG')
      .or(z.literal('CAT'))
      .or(z.literal('BIRD'))
      .or(z.literal('RODENT'))
      .or(z.literal('REPTILE'))
      .or(z.literal('OTHER'))
      .optional(),
    age: z
      .literal('BABY')
      .or(z.literal('YOUNG'))
      .or(z.literal('ADULT'))
      .or(z.literal('SENIOR'))
      .or(z.literal('OTHER'))
      .optional(),
    size: z
      .literal('SMALL')
      .or(z.literal('MEDIUM'))
      .or(z.literal('LARGE'))
      .or(z.literal('XLARGE'))
      .or(z.literal('OTHER'))
      .optional(),
    stamina: z
      .literal('LOW')
      .or(z.literal('MEDIUM'))
      .or(z.literal('HIGH'))
      .or(z.literal('OTHER'))
      .optional(),
    autonomy: z
      .literal('LOW')
      .or(z.literal('MEDIUM'))
      .or(z.literal('HIGH'))
      .or(z.literal('OTHER'))
      .optional(),
  })

  const { city } = searchParamsSchema.parse(request.params)

  const { age, autonomy, size, stamina, type } = searchBodySchema.parse(
    request.body,
  )

  const getPetDetailsUseCase = makeSearchPetsUseCase()

  const { pets } = await getPetDetailsUseCase.execute({
    city,
    age,
    autonomy,
    size,
    stamina,
    type,
  })

  return reply.status(200).send(pets)
}
