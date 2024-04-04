import { PetsRepository } from '../repositories/pets-repository'
import { NoResultsFoundError } from './errors/no-results-found-error'

import { Pet } from '@prisma/client'

interface SearchPetsUseCaseRequest {
  city: string
  type?: 'DOG' | 'CAT' | 'BIRD' | 'RODENT' | 'REPTILE' | 'OTHER'
  age?: 'BABY' | 'YOUNG' | 'ADULT' | 'SENIOR' | 'OTHER'
  size?: 'SMALL' | 'MEDIUM' | 'LARGE' | 'XLARGE' | 'OTHER'
  stamina?: 'LOW' | 'MEDIUM' | 'HIGH' | 'OTHER'
  autonomy?: 'LOW' | 'MEDIUM' | 'HIGH' | 'OTHER'
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    type,
    age,
    size,
    stamina,
    autonomy,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.searchPets({
      city,
      type,
      age,
      size,
      stamina,
      autonomy,
    })

    if (!pets) {
      throw new NoResultsFoundError()
    }

    return {
      pets,
    }
  }
}
