import { RegisterAPetUseCase } from '../register-a-pet'
import { PrismaPetsRepository } from '../../repositories/prisma/prisma-pets-repository'
import { PrismaOrgsRepository } from '../../repositories/prisma/prisma-orgs-repository'

export function makeRegisterAPetUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const petsRepository = new PrismaPetsRepository()
  const useCase = new RegisterAPetUseCase(orgsRepository, petsRepository)

  return useCase
}
