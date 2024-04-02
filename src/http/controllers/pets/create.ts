import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterAPetUseCase } from '../../../use-cases/factories/make-register-a-pet-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    type: z
      .literal('DOG')
      .or(z.literal('CAT'))
      .or(z.literal('BIRD'))
      .or(z.literal('RODENT'))
      .or(z.literal('REPTILE'))
      .or(z.literal('OTHER')),
    age: z
      .literal('BABY')
      .or(z.literal('YOUNG'))
      .or(z.literal('ADULT'))
      .or(z.literal('SENIOR'))
      .or(z.literal('OTHER')),
    size: z
      .literal('SMALL')
      .or(z.literal('MEDIUM'))
      .or(z.literal('LARGE'))
      .or(z.literal('XLARGE'))
      .or(z.literal('OTHER')),
    stamina: z
      .literal('LOW')
      .or(z.literal('MEDIUM'))
      .or(z.literal('HIGH'))
      .or(z.literal('OTHER')),
    autonomy: z
      .literal('LOW')
      .or(z.literal('MEDIUM'))
      .or(z.literal('HIGH'))
      .or(z.literal('OTHER')),
    photos: z.array(z.string()),
  })

  const { name, description, type, age, size, stamina, autonomy, photos } =
    createBodySchema.parse(request.body)

  const createAPetUseCase = makeRegisterAPetUseCase()

  const { pet } = await createAPetUseCase.execute({
    name,
    description,
    type,
    age,
    size,
    stamina,
    autonomy,
    photos,
    org_id: request.user.sub,
  })

  return reply.code(201).send(pet)
} //
