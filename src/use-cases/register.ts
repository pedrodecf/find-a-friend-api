import { OrgsRepository } from '../repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { Org } from '@prisma/client'

interface RegisterUseCaseRequest {
  org_name: string
  owner_name: string
  email: string
  cep: string
  city: string
  phone: string
  password: string
}

interface RegisterUseCaseResponse {
  org: Org
}

export class RegisterUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    org_name,
    owner_name,
    email,
    cep,
    city,
    phone,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)
    const userWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({
      org_name,
      owner_name,
      email,
      cep,
      city,
      phone,
      password_hash,
    })

    return {
      org,
    }
  }
}
