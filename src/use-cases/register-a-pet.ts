import { OrgsRepository } from '../repositories/orgs-repository'
import { PetsRepository } from '../repositories/pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

import { Pet } from '@prisma/client'

interface RegisterAPetUseCaseRequest {
  name: string
  description: string
  type: 'DOG' | 'CAT' | 'BIRD' | 'RODENT' | 'REPTILE' | 'OTHER'
  age: 'BABY' | 'YOUNG' | 'ADULT' | 'SENIOR' | 'OTHER'
  size: 'SMALL' | 'MEDIUM' | 'LARGE' | 'XLARGE' | 'OTHER'
  stamina: 'LOW' | 'MEDIUM' | 'HIGH' | 'OTHER'
  autonomy: 'LOW' | 'MEDIUM' | 'HIGH' | 'OTHER'
  photos: string[]
  org_id: string
}

interface RegisterAPetUseCaseResponse {
  pet: Pet
}

export class RegisterAPetUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    name,
    description,
    type,
    age,
    size,
    stamina,
    autonomy,
    photos,
    org_id,
  }: RegisterAPetUseCaseRequest): Promise<RegisterAPetUseCaseResponse> {
    const org = await this.orgsRepository.findById(org_id)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      description,
      type,
      age,
      size,
      stamina,
      autonomy,
      photos,
      org_id: org.id,
    })

    return {
      pet,
    }
  }
}
