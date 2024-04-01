import { OrgsRepository } from '../repositories/orgs-repository'
import { PetsRepository } from '../repositories/pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

import { Pet } from '@prisma/client'

interface ListPetsFromUniqueCityUseCaseRequest {
  city: string
}

interface ListPetsFromUniqueCityUseCaseResponse {
  pets: Pet[]
}

export class ListPetsFromUniqueCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
  }: ListPetsFromUniqueCityUseCaseRequest): Promise<ListPetsFromUniqueCityUseCaseResponse> {
    const pets = await this.petsRepository.findByCity(city)

    if (!pets) {
      throw new ResourceNotFoundError()
    }

    return {
      pets,
    }
  }
}
