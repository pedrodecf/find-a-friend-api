import { SearchPetsUseCase } from '../search-pets'
import { PrismaPetsRepository } from '../../repositories/prisma/prisma-pets-repository'

export function makeSearchPetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new SearchPetsUseCase(petsRepository)

  return useCase
}
