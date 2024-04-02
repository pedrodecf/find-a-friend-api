import { ListPetsFromUniqueCityUseCase } from '../list-pets-from-unique-city'
import { PrismaPetsRepository } from '../../repositories/prisma/prisma-pets-repository'

export function makeListPetsFromUniqueCityUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new ListPetsFromUniqueCityUseCase(petsRepository)

  return useCase
}
