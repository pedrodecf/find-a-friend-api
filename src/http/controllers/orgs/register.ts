import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterUseCase } from '../../../use-cases/factories/make-register-use-case'
import { UserAlreadyExistsError } from '../../../use-cases/errors/user-already-exists-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const reigsterBodySchema = z.object({
    org_name: z.string(),
    owner_name: z.string(),
    email: z.string().email(),
    cep: z.string().length(8),
    city: z.string(),
    phone: z.string(),
    password: z.string().min(6),
  })

  const { org_name, owner_name, email, cep, city, phone, password } =
    reigsterBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      org_name,
      owner_name,
      email,
      cep,
      city,
      phone,
      password,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.code(409).send({ message: err.message })
    }

    throw err
  }

  return reply.code(201).send()
} //
